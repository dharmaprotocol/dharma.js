// libraries
import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "utils/bignumber";
import * as Web3 from "web3";

// utils
import * as Units from "utils/units";

import { AdaptersAPI, ContractsAPI, OrderAPI, ServicingAPI, SignerAPI } from "src/apis";
import { DebtOrderData } from "src/types";
import {
    DummyTokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "src/wrappers";

import { ACCOUNTS } from "../../../accounts";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractsApi = new ContractsAPI(web3);
const adaptersApi = new AdaptersAPI(web3, contractsApi);
const orderApi = new OrderAPI(web3, contractsApi, adaptersApi);
const signerApi = new SignerAPI(web3, contractsApi);
const servicingApi = new ServicingAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

import { GetValueRepaidScenario } from "../scenarios";

export class GetValueRepaidRunner {
    public static testGetValueRepaidScenario(scenario: GetValueRepaidScenario) {
        let principalToken: DummyTokenContract;
        let tokenTransferProxy: TokenTransferProxyContract;
        let repaymentRouter: RepaymentRouterContract;
        let debtOrderData: DebtOrderData;
        let issuanceHash: string;

        const CONTRACT_OWNER = ACCOUNTS[0].address;

        const CREDITOR = ACCOUNTS[1].address;

        const DEBTOR = ACCOUNTS[2].address;

        beforeAll(async () => {
            const tokenRegistry = await contractsApi.loadTokenRegistry();
            const principalTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(
                "REP",
            );
            const repaymentRouter = await contractsApi.loadRepaymentRouterAsync();

            tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();
            principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);

            // Grant creditor a balance of tokens
            await principalToken.setBalance.sendTransactionAsync(CREDITOR, Units.ether(10), {
                from: CONTRACT_OWNER,
            });

            // Grant debtor a balance of tokens
            await principalToken.setBalance.sendTransactionAsync(DEBTOR, Units.ether(10), {
                from: CONTRACT_OWNER,
            });

            // Approve the token transfer proxy for a sufficient
            // amount of tokens for an order fill.
            await principalToken.approve.sendTransactionAsync(
                tokenTransferProxy.address,
                Units.ether(10),
                { from: CREDITOR },
            );

            await principalToken.approve.sendTransactionAsync(
                tokenTransferProxy.address,
                Units.ether(10),
                { from: DEBTOR },
            );

            debtOrderData = await adaptersApi.simpleInterestLoan.toDebtOrder({
                debtor: DEBTOR,
                creditor: CREDITOR,
                principalAmount: Units.ether(1),
                principalTokenSymbol: "REP",
                interestRate: new BigNumber(0.1),
                amortizationUnit: "months",
                termLength: new BigNumber(2),
            });

            debtOrderData.debtorSignature = await signerApi.asDebtor(debtOrderData, false);

            issuanceHash = await orderApi.getIssuanceHash(debtOrderData);

            ABIDecoder.addABI(repaymentRouter.abi);
        });

        afterAll(() => {
            ABIDecoder.removeABI(repaymentRouter.abi);
        });

        describe(scenario.description, () => {
            beforeEach(async () => {
                // NOTE: We fill debt orders in the `beforeEach` block to ensure
                // that the blockchain is snapshotted *before* order filling
                // in the parent scope's `beforeEach` block.  For more information,
                // read about Jest's order of execution in scoped tests:
                // https://facebook.github.io/jest/docs/en/setup-teardown.html#scoping
                await orderApi.fillAsync(debtOrderData, { from: CREDITOR });

                for (let i = 0; i < scenario.repaymentAttempts; i++) {
                    await servicingApi.makeRepayment(
                        issuanceHash,
                        scenario.amount,
                        principalToken.address,
                        { from: DEBTOR },
                    );
                }
            });

            test(`returns a value of ${scenario.expected}`, async () => {
                await expect(servicingApi.getValueRepaid(issuanceHash)).resolves.toEqual(
                    scenario.expected,
                );
            });
        });
    }
}
