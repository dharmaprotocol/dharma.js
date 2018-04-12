// External
import { BigNumber } from "utils/bignumber";

// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";
import { TxData } from "src/types";

// Wrappers
import { MockERC721ReceiverContract, TokenRegistryContract } from "src/wrappers";

// APIs
import { DebtTokenAPI } from "src/apis";

// Utils
import { ACCOUNTS } from "../../../accounts";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

export interface TransferAPICallParameters {
    api: DebtTokenAPI;
    from: string;
    to: string;
    tokenID: BigNumber;
    data: string;
    txOptions: TxData;
}

export abstract class TransferBaseScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.TransferFromScenario) {
        const NONEXISTENT_TOKEN_ID = new BigNumber(13);
        const USER_RECIPIENT = ACCOUNTS[5].address;

        const NON_CREDITOR_ADDRESS = ACCOUNTS[8].address;
        const MALFORMED_TOKEN_RECIPIENT = "0x123";

        let scenarioRecipient: string;
        let recipientIsContract: boolean;
        let erc721ReceiverContract: MockERC721ReceiverContract;

        const { debtTokenAPI } = this.testAPIs;
        let scenarioTokenID: BigNumber;
        let apiCallPromise: Promise<string>;

        describe(scenario.description, () => {
            beforeEach(async () => {
                erc721ReceiverContract = await MockERC721ReceiverContract.deployed(
                    this.web3,
                    TX_DEFAULTS,
                );
                const tokenRegistryContract = await TokenRegistryContract.deployed(
                    this.web3,
                    TX_DEFAULTS,
                );

                // Reset erc721Receiver contract so we can detect whether it's being called
                await erc721ReceiverContract.reset.sendTransactionAsync();

                // Contracts receiving transfers must implement the wallet interface...
                const VALID_CONTRACT_RECIPIENT = erc721ReceiverContract.address;
                // ...which the TokenRegistry contract does not
                const INVALID_CONTRACT_RECIPIENT = tokenRegistryContract.address;

                scenarioRecipient = scenario.to(
                    USER_RECIPIENT,
                    VALID_CONTRACT_RECIPIENT,
                    INVALID_CONTRACT_RECIPIENT,
                    MALFORMED_TOKEN_RECIPIENT,
                );

                const tokenIDs = await Promise.all(
                    scenario.orders.map(this.generateDebtTokenForOrder),
                );

                const [creditorsTokenID, nonCreditorsTokenID] = tokenIDs;

                // Transfer nonCreditorsToken to a different address
                await debtTokenAPI.transferFrom(
                    scenario.creditor,
                    NON_CREDITOR_ADDRESS,
                    nonCreditorsTokenID,
                    "",
                    { from: scenario.creditor },
                );

                // Set token approvals
                await debtTokenAPI.approve(scenario.tokensApprovedOperator, creditorsTokenID, {
                    from: scenario.creditor,
                });

                // Set owner's approvals
                await debtTokenAPI.setApprovalForAll(scenario.ownersApprovedOperator, true);

                scenarioTokenID = scenario.tokenID(
                    creditorsTokenID,
                    nonCreditorsTokenID,
                    NONEXISTENT_TOKEN_ID,
                );

                // If the recipient is the MockERC721Recipient contract, we have to budget
                // more gas to account for fees spent on recording the onERC721Received
                // mock method call.  If the gas is left unspecified (i.e. null), the
                // debtToken API will choose a default gas value for transferFrom
                recipientIsContract =
                    scenarioRecipient === VALID_CONTRACT_RECIPIENT ||
                    scenarioRecipient === INVALID_CONTRACT_RECIPIENT;

                // HACK: This is a temporary measure for dealing with discrepancies in gas costs
                //       for different transferFrom calls (depending on how much gas the recipient contract
                //       guzzles in the onER721Received method call).  A more permanent solution is tracked
                //       in this Pivotal story: https://www.pivotaltracker.com/story/show/156644350
                const gas = recipientIsContract ? 300000 : 250000;

                apiCallPromise = this.getAPICallPromise({
                    api: debtTokenAPI,
                    from: scenario.from,
                    to: scenarioRecipient,
                    tokenID: scenarioTokenID,
                    data: scenario.data,
                    txOptions: {
                        from: scenario.sender,
                        gas,
                    },
                });

                if (scenario.succeeds) {
                    await apiCallPromise;
                }
            });

            if (scenario.succeeds) {
                test(`token's owner has changed to scenario's recipient`, async () => {
                    await expect(debtTokenAPI.ownerOf(scenarioTokenID)).resolves.toEqual(
                        scenarioRecipient,
                    );
                });

                test("(if recipient is contract) onERC721Received method was called with correct data", async () => {
                    if (recipientIsContract) {
                        await expect(
                            erc721ReceiverContract.wasOnERC721ReceivedCalledWith.callAsync(
                                scenario.from,
                                scenarioTokenID,
                                scenario.data || "",
                            ),
                        ).resolves.toBeTruthy();
                    }
                });
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    await expect(apiCallPromise).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }

    protected abstract getAPICallPromise(params: TransferAPICallParameters): Promise<string>;
}
