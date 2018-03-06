import {
    DebtKernelContract,
    DebtOrderWrapper,
    RepaymentRouterContract,
    TokenTransferProxyContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";
import { OrderAPI, SignerAPI } from "src/apis";
import {
    FillScenario,
    OrderCancellationScenario,
    IssuanceCancellationScenario,
} from "./scenarios/";
import * as Web3 from "web3";
import { Web3Utils } from "utils/web3_utils";
import { DebtOrder } from "src/types";
import * as compact from "lodash.compact";
import * as ABIDecoder from "abi-decoder";

export class OrderScenarioRunner {
    public web3Utils: Web3Utils;
    public debtKernel: DebtKernelContract;
    public repaymentRouter: RepaymentRouterContract;
    public tokenTransferProxy: TokenTransferProxyContract;
    public principalToken: DummyTokenContract;
    public termsContract: SimpleInterestTermsContractContract;
    public orderApi: OrderAPI;
    public orderSigner: SignerAPI;
    public abiDecoder: any;

    private currentSnapshotId: number;

    constructor(web3: Web3) {
        this.web3Utils = new Web3Utils(web3);

        this.testFillScenario = this.testFillScenario.bind(this);
        this.testOrderCancelScenario = this.testOrderCancelScenario.bind(this);
        this.testIssuanceCancelScenario = this.testIssuanceCancelScenario.bind(this);
        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public testFillScenario(scenario: FillScenario) {
        describe(scenario.description, () => {
            let debtOrder: DebtOrder;

            beforeAll(() => {
                ABIDecoder.addABI(this.debtKernel.abi);
            });

            afterAll(() => {
                ABIDecoder.removeABI(this.debtKernel.abi);
            });

            beforeEach(async () => {
                debtOrder = scenario.generateDebtOrder(
                    this.debtKernel,
                    this.repaymentRouter,
                    this.principalToken,
                    this.termsContract,
                );

                // We dynamically set the creditor's balance and
                // allowance of a given principal token to either
                // their assigned values in the fill scenario, or
                // to a default amount (i.e sufficient balance / allowance
                // necessary for order fill)
                const creditorBalance =
                    scenario.creditorBalance || debtOrder.principalAmount.times(2);
                const creditorAllowance =
                    scenario.creditorAllowance || debtOrder.principalAmount.times(2);

                await this.principalToken.setBalance.sendTransactionAsync(
                    debtOrder.creditor,
                    creditorBalance,
                );
                await this.principalToken.approve.sendTransactionAsync(
                    this.tokenTransferProxy.address,
                    creditorAllowance,
                    { from: debtOrder.creditor },
                );

                // We dynamically attach signatures based on whether the
                // the scenario specifies that a signature from a signatory
                // ought to be attached.
                debtOrder.debtorSignature = scenario.signatories.debtor
                    ? await this.orderSigner.asDebtor(debtOrder)
                    : undefined;
                debtOrder.creditorSignature = scenario.signatories.creditor
                    ? await this.orderSigner.asCreditor(debtOrder)
                    : undefined;
                debtOrder.underwriterSignature = scenario.signatories.underwriter
                    ? await this.orderSigner.asUnderwriter(debtOrder)
                    : undefined;

                if (scenario.beforeBlock) {
                    await scenario.beforeBlock(debtOrder, this.debtKernel);
                }
            });

            if (scenario.successfullyFills) {
                test("emits log indicating successful fill", async () => {
                    const txHash = await this.orderApi.fillAsync(debtOrder, {
                        from: scenario.filler,
                    });

                    const receipt = await this.web3Utils.getTransactionReceiptAsync(txHash);

                    const [debtOrderFilledLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(debtOrderFilledLog.name).toBe("LogDebtOrderFilled");
                });
            } else {
                test(`throws ${scenario.errorType} error`, async () => {
                    await expect(
                        this.orderApi.fillAsync(debtOrder, { from: scenario.filler }),
                    ).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }

    public async testOrderCancelScenario(scenario: OrderCancellationScenario) {
        describe(scenario.description, () => {
            let debtOrder: DebtOrder;

            beforeAll(() => {
                ABIDecoder.addABI(this.debtKernel.abi);
            });

            afterAll(() => {
                ABIDecoder.removeABI(this.debtKernel.abi);
            });

            beforeEach(async () => {
                debtOrder = scenario.generateDebtOrder(
                    this.debtKernel,
                    this.repaymentRouter,
                    this.principalToken,
                );

                if (scenario.orderAlreadyCancelled) {
                    await this.orderApi.cancelOrderAsync(debtOrder, { from: debtOrder.debtor });
                }

                if (scenario.issuanceAlreadyCancelled) {
                    const debtOrderWrapped = new DebtOrderWrapper(debtOrder);
                    await this.orderApi.cancelIssuanceAsync(
                        debtOrderWrapped.getIssuanceCommitment(),
                        { from: debtOrder.debtor },
                    );
                }
            });

            if (scenario.successfullyCancels) {
                test("emits log indicating successful fill", async () => {
                    const txHash = await this.orderApi.cancelOrderAsync(debtOrder, {
                        from: scenario.canceller,
                    });
                    const receipt = await this.web3Utils.getTransactionReceiptAsync(txHash);

                    const [debtOrderCancelledLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(debtOrderCancelledLog.name).toBe("LogDebtOrderCancelled");
                });
            } else {
                test(`throws ${scenario.errorType} error`, async () => {
                    await expect(
                        this.orderApi.cancelOrderAsync(debtOrder, { from: scenario.canceller }),
                    ).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }

    public async testIssuanceCancelScenario(scenario: IssuanceCancellationScenario) {
        describe(scenario.description, () => {
            let debtOrder: DebtOrder;

            beforeAll(() => {
                ABIDecoder.addABI(this.debtKernel.abi);
            });

            afterAll(() => {
                ABIDecoder.removeABI(this.debtKernel.abi);
            });

            beforeEach(async () => {
                debtOrder = scenario.generateDebtOrder(
                    this.debtKernel,
                    this.repaymentRouter,
                    this.principalToken,
                );

                if (scenario.orderAlreadyCancelled) {
                    await this.orderApi.cancelOrderAsync(debtOrder, { from: debtOrder.debtor });
                }

                if (scenario.issuanceAlreadyCancelled) {
                    const debtOrderWrapped = new DebtOrderWrapper(debtOrder);
                    await this.orderApi.cancelIssuanceAsync(
                        debtOrderWrapped.getIssuanceCommitment(),
                        { from: debtOrder.debtor },
                    );
                }
            });

            if (scenario.successfullyCancels) {
                test("emits log indicating successful fill", async () => {
                    const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

                    const txHash = await this.orderApi.cancelIssuanceAsync(
                        debtOrderWrapped.getIssuanceCommitment(),
                        { from: scenario.canceller },
                    );
                    const receipt = await this.web3Utils.getTransactionReceiptAsync(txHash);

                    const [debtIssuanceCancelledLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(debtIssuanceCancelledLog.name).toBe("LogIssuanceCancelled");
                });
            } else {
                test(`throws ${scenario.errorType} error`, async () => {
                    const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

                    await expect(
                        this.orderApi.cancelIssuanceAsync(
                            debtOrderWrapped.getIssuanceCommitment(),
                            { from: scenario.canceller },
                        ),
                    ).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }
}
