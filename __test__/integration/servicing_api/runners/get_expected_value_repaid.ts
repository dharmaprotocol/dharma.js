// libraries
import * as Web3 from "web3";
import * as ABIDecoder from "abi-decoder";
import * as moment from "moment";
import { BigNumber } from "bignumber.js";

// utils
import * as Units from "utils/units";

import { OrderAPI, ServicingAPI, SignerAPI, ContractsAPI, AdaptersAPI } from "src/apis";
import { DebtOrder } from "src/types";
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

const TX_DEFAULTS = { from: ACCOUNTS[0].address };

import { GetExpectedValueRepaidScenario } from "../scenarios/index";

export class GetExpectedValueRepaidRunner {
    static testGetExpectedValueRepaidScenario(scenario: GetExpectedValueRepaidScenario) {
        let principalToken: DummyTokenContract;
        let tokenTransferProxy: TokenTransferProxyContract;
        let repaymentRouter: RepaymentRouterContract;
        let debtOrder: DebtOrder.Instance;
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

            debtOrder = await adaptersApi.simpleInterestLoan.toDebtOrder({
                debtor: DEBTOR,
                creditor: CREDITOR,
                principalAmount: scenario.principalAmount,
                principalTokenSymbol: "REP",
                interestRate: scenario.interestRate,
                amortizationUnit: scenario.amortizationUnit,
                termLength: new BigNumber(2),
            });

            debtOrder.debtorSignature = await signerApi.asDebtor(debtOrder, false);

            issuanceHash = await orderApi.getIssuanceHash(debtOrder);

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
                await orderApi.fillAsync(debtOrder, { from: CREDITOR });
            });

            test(`returns a value of ${scenario.expected}`, async () => {
                await expect(
                    servicingApi.getExpectedValueRepaid(
                        issuanceHash,
                        moment()
                            .add(scenario.days, "days")
                            .unix(),
                    ),
                ).resolves.toEqual(scenario.expected);
            });
        });
    }
}
