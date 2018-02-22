// libraries
import * as Web3 from "web3";
import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// utils
import * as Units from "utils/units";

import { OrderAPI, ServicingAPI, SignerAPI, ContractsAPI, AdaptersAPI } from "src/apis";
import { DebtOrder } from "src/types";
import {
    DebtOrderWrapper,
    DummyTokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "src/wrappers";

import { ACCOUNTS } from "../../../accounts";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractsApi = new ContractsAPI(web3);
const orderApi = new OrderAPI(web3, contractsApi);
const adaptersApi = new AdaptersAPI(web3, contractsApi);
const signerApi = new SignerAPI(web3, contractsApi);
const servicingApi = new ServicingAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

import { GetValueRepaidScenario } from "../scenarios/index";

export class GetValueRepaidRunner {
    static testGetValueRepaidScenario(scenario: GetValueRepaidScenario) {
        let principalToken: DummyTokenContract;
        let nonPrincipalToken: DummyTokenContract;
        let tokenTransferProxy: TokenTransferProxyContract;
        let repaymentRouter: RepaymentRouterContract;
        let debtOrder: DebtOrder;
        let issuanceHash: string;

        const CONTRACT_OWNER = ACCOUNTS[0].address;

        const CREDITOR = ACCOUNTS[1].address;

        const DEBTOR = ACCOUNTS[2].address;

        beforeAll(async () => {
            const tokenRegistry = await contractsApi.loadTokenRegistry();
            const principalTokenAddress = await tokenRegistry.getTokenAddress.callAsync("REP");
            const nonPrincipalTokenAddress = await tokenRegistry.getTokenAddress.callAsync("ZRX");
            const repaymentRouter = await contractsApi.loadRepaymentRouterAsync();

            tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();
            principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS);
            nonPrincipalToken = await DummyTokenContract.at(
                nonPrincipalTokenAddress,
                web3,
                TX_DEFAULTS,
            );

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

            debtOrder = await adaptersApi.simpleInterestLoan.toDebtOrder({
                debtor: DEBTOR,
                creditor: CREDITOR,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                interestRate: new BigNumber(0.1),
                amortizationUnit: "months",
                termLength: new BigNumber(2),
                salt: new BigNumber(Math.trunc(Math.random() * 10000)), // TODO: use snapshotting instead of rotating salts,
                //  this is a silly way of preventing clashes
            });

            debtOrder.debtorSignature = await signerApi.asDebtor(debtOrder);

            const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
                debtOrder,
                contractsApi,
            );
            issuanceHash = debtOrderWrapped.getIssuanceCommitmentHash();

            await orderApi.fillAsync(debtOrder, { from: CREDITOR });

            ABIDecoder.addABI(repaymentRouter.abi);
        });

        afterAll(() => {
            ABIDecoder.removeABI(repaymentRouter.abi);
        });

        describe(scenario.description, () => {
            beforeEach(async () => {
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
