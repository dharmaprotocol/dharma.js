// libraries
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";
import * as compact from "lodash.compact";
import * as ABIDecoder from "abi-decoder";

import * as Units from "utils/units";
import { Web3Utils } from "utils/web3_utils";

import { OrderAPI, ServicingAPI, SignerAPI, ContractsAPI, AdaptersAPI } from "src/apis";
import { DebtOrder } from "src/types";
import {
    DummyTokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "src/wrappers";

import { ACCOUNTS } from "../../../accounts";
import { MakeRepaymentScenario } from "../scenarios";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3Utils = new Web3Utils(web3);

const contractsApi = new ContractsAPI(web3);
const adaptersApi = new AdaptersAPI(web3, contractsApi);
const orderApi = new OrderAPI(web3, contractsApi, adaptersApi);
const signerApi = new SignerAPI(web3, contractsApi);
const servicingApi = new ServicingAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

export class MakeRepaymentRunner {
    static testMakeRepaymentScenario(scenario: MakeRepaymentScenario) {
        describe(scenario.description, () => {
            let principalToken: DummyTokenContract;
            let nonPrincipalToken: DummyTokenContract;
            let tokenTransferProxy: TokenTransferProxyContract;
            let debtOrder: DebtOrder.Instance;
            let issuanceHash: string;

            const CONTRACT_OWNER = ACCOUNTS[0].address;

            // The creditor is initially the beneficiary of repayments
            const BENEFICIARY = ACCOUNTS[1].address;
            const CREDITOR = ACCOUNTS[1].address;

            const DEBTOR = ACCOUNTS[2].address;

            let txHash: string;
            // From token address to amount.
            let debtorBalanceBefore = {};
            let beneficiaryBalanceBefore = {};

            // From address to token.
            let repaymentTokenMap = {};
            let repaymentToken: any;
            let repaymentTokenAddress: string;

            beforeEach(async () => {
                const tokenRegistry = await contractsApi.loadTokenRegistry();
                const principalTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(
                    "REP",
                );
                const nonPrincipalTokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(
                    "ZRX",
                );
                const repaymentRouter = await contractsApi.loadRepaymentRouterAsync();

                tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();
                principalToken = await DummyTokenContract.at(
                    principalTokenAddress,
                    web3,
                    TX_DEFAULTS,
                );
                nonPrincipalToken = await DummyTokenContract.at(
                    nonPrincipalTokenAddress,
                    web3,
                    TX_DEFAULTS,
                );
                repaymentTokenMap[principalToken.address] = principalToken;
                repaymentTokenMap[nonPrincipalToken.address] = nonPrincipalToken;

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
                    principalAmount: Units.ether(1),
                    principalTokenSymbol: "REP",
                    interestRate: new BigNumber(0.1),
                    amortizationUnit: "months",
                    termLength: new BigNumber(2),
                });

                debtOrder.debtorSignature = await signerApi.asDebtor(debtOrder);

                issuanceHash = await orderApi.getIssuanceHash(debtOrder);

                // NOTE: We fill debt orders in the `beforeEach` block to ensure
                // that the blockchain is snapshotted *before* order filling
                // in the parent scope's `beforeEach` block.  For more information,
                // read about Jest's order of execution in scoped tests:
                // https://facebook.github.io/jest/docs/en/setup-teardown.html#scoping
                await orderApi.fillAsync(debtOrder, { from: CREDITOR });

                ABIDecoder.addABI(repaymentRouter.abi);

                await principalToken.setBalance.sendTransactionAsync(DEBTOR, scenario.balance, {
                    from: CONTRACT_OWNER,
                });

                await principalToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    scenario.allowance,
                    { from: DEBTOR },
                );

                await nonPrincipalToken.setBalance.sendTransactionAsync(DEBTOR, scenario.balance, {
                    from: CONTRACT_OWNER,
                });

                await nonPrincipalToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    scenario.allowance,
                    { from: DEBTOR },
                );

                debtorBalanceBefore[
                    principalToken.address
                ] = await principalToken.balanceOf.callAsync(DEBTOR);
                beneficiaryBalanceBefore[
                    principalToken.address
                ] = await principalToken.balanceOf.callAsync(BENEFICIARY);
                debtorBalanceBefore[
                    nonPrincipalToken.address
                ] = await nonPrincipalToken.balanceOf.callAsync(DEBTOR);
                beneficiaryBalanceBefore[
                    nonPrincipalToken.address
                ] = await nonPrincipalToken.balanceOf.callAsync(BENEFICIARY);

                repaymentTokenAddress = scenario.repaymentToken(
                    principalToken.address,
                    nonPrincipalToken.address,
                );
                repaymentToken = repaymentTokenMap[repaymentTokenAddress];

                if (!scenario.throws) {
                    for (let i = 0; i < scenario.repaymentAttempts; i++) {
                        txHash = await servicingApi.makeRepayment(
                            scenario.agreementId(issuanceHash),
                            scenario.amount,
                            repaymentTokenAddress,
                            { from: DEBTOR },
                        );
                    }
                }
            });

            if (scenario.throws) {
                test(`throws ${scenario.errorMessage} error`, async () => {
                    await expect(
                        servicingApi.makeRepayment(
                            scenario.agreementId(issuanceHash),
                            scenario.amount,
                            repaymentTokenAddress,
                            { from: DEBTOR },
                        ),
                    ).rejects.toThrow(scenario.errorMessage);
                });
            } else {
                if (scenario.successfullyRepays) {
                    test("should emit log indicating successful repayment", async () => {
                        const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                        const [repaymentSuccessLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                        expect(repaymentSuccessLog.name).toBe("LogRepayment");
                    });

                    test("should debit payer amount repaid", async () => {
                        await expect(repaymentToken.balanceOf.callAsync(DEBTOR)).resolves.toEqual(
                            debtorBalanceBefore[repaymentTokenAddress].minus(
                                scenario.amount.mul(scenario.repaymentAttempts),
                            ),
                        );
                    });

                    test("should credit beneficiary amount repaid", async () => {
                        await expect(
                            repaymentToken.balanceOf.callAsync(BENEFICIARY),
                        ).resolves.toEqual(
                            beneficiaryBalanceBefore[repaymentTokenAddress].plus(
                                scenario.amount.mul(scenario.repaymentAttempts),
                            ),
                        );
                    });
                } else {
                    // Doesn't throw, but it did not repay debit funds.
                    test("should emit log indicating terms contract rejection", async () => {
                        const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                        const [repaymentErrorLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                        expect(repaymentErrorLog.name).toBe("LogError");
                    });

                    test("should not debit payer amount repaid", async () => {
                        await expect(repaymentToken.balanceOf.callAsync(DEBTOR)).resolves.toEqual(
                            debtorBalanceBefore[repaymentTokenAddress],
                        );
                    });

                    test("should not credit beneficiary amount repaid", async () => {
                        await expect(
                            repaymentToken.balanceOf.callAsync(BENEFICIARY),
                        ).resolves.toEqual(beneficiaryBalanceBefore[repaymentTokenAddress]);
                    });
                }
            }
        });
    }
}
