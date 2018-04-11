// libraries
import * as Web3 from "web3";
// tslint:disable-next-line
import { BigNumber } from "bignumber.js";

// utils
import * as Units from "utils/units";
import { ACCOUNTS } from "../../../accounts";

// apis
import { OrderAPI, ServicingAPI, SignerAPI, ContractsAPI, AdaptersAPI, TokenAPI } from "src/apis";

// wrappers
import { DummyTokenContract } from "src/wrappers";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractsApi = new ContractsAPI(web3);
const adaptersApi = new AdaptersAPI(web3, contractsApi);
const orderApi = new OrderAPI(web3, contractsApi, adaptersApi);
const signerApi = new SignerAPI(web3, contractsApi);
const servicingApi = new ServicingAPI(web3, contractsApi);
const tokenApi = new TokenAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address };

import { GetInvestmentsScenario } from "../scenarios";

export class GetInvestmentsRunner {
    static testScenario(scenario: GetInvestmentsScenario) {
        let principalToken: DummyTokenContract;

        const CONTRACT_OWNER = ACCOUNTS[0].address;
        const DEBTOR = ACCOUNTS[1].address;

        beforeAll(async () => {
            const tokenRegistry = await contractsApi.loadTokenRegistry();
            const principalTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(
                "REP",
            );

            principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);

            // Grant creditor a balance of tokens
            await principalToken.setBalance.sendTransactionAsync(
                scenario.creditor,
                Units.ether(100),
                {
                    from: CONTRACT_OWNER,
                },
            );

            // Grant token transfer proxy an unlimited allowance
            await tokenApi.setUnlimitedProxyAllowanceAsync(principalToken.address, {
                from: scenario.creditor,
            });
        });

        describe(scenario.description, () => {
            let issuanceHashes = [];

            beforeEach(async () => {
                for (let i = 0; i < scenario.numInvestments; i++) {
                    const debtOrder = await adaptersApi.simpleInterestLoan.toDebtOrder({
                        debtor: DEBTOR,
                        creditor: scenario.creditor,
                        principalAmount: Units.ether(1),
                        principalTokenSymbol: "REP",
                        interestRate: new BigNumber(0.1),
                        amortizationUnit: "months",
                        termLength: new BigNumber(2),
                        salt: new BigNumber(i),
                    });

                    debtOrder.debtorSignature = await signerApi.asDebtor(debtOrder, false);

                    const issuanceHash = await orderApi.getIssuanceHash(debtOrder);
                    issuanceHashes.push(issuanceHash);

                    // NOTE: We fill debt orders in the `beforeEach` block to ensure
                    // that the blockchain is snapshotted *before* order filling
                    // in the parent scope's `beforeEach` block.  For more information,
                    // read about Jest's order of execution in scoped tests:
                    // https://facebook.github.io/jest/docs/en/setup-teardown.html#scoping
                    await orderApi.fillAsync(debtOrder, { from: scenario.creditor });
                }
            });

            if (!scenario.errorMessage) {
                test(`return the ${
                    scenario.numInvestments
                } debt agreements invested in by the creditor`, async () => {
                    await expect(
                        servicingApi.getInvestmentsAsync(scenario.account),
                    ).resolves.toEqual(issuanceHashes);
                });
            } else {
                test(`throws error: ${scenario.errorMessage}`, async () => {
                    await expect(
                        servicingApi.getInvestmentsAsync(scenario.account),
                    ).rejects.toThrowError(scenario.errorMessage);
                });
            }
        });
    }
}
