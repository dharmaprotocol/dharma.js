// External libraries
import * as Web3 from "web3";

// Utils
import { BigNumber } from "../../../utils/bignumber";
import { TransactionUtils } from "../../../utils/transaction_utils";
import * as Units from "../../../utils/units";
import { Web3Utils } from "../../../utils/web3_utils";

// Adapters
import { SimpleInterestLoanAdapter } from "../../../src/adapters";

// Apis
import { AdaptersAPI, BlockchainAPI, ContractsAPI, OrderAPI, SignerAPI } from "../../../src/apis/";

// Types
import { DebtKernelError, DebtOrder, RepaymentRouterError } from "../../../src/types";

// Scenarios
import { DebtKernelErrorScenario, RepaymentRouterErrorScenario } from "./scenarios";

// Wrappers
import {
    DebtKernelContract,
    DebtOrderWrapper,
    DummyTokenContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
    TokenRegistryContract,
    TokenTransferProxyContract,
} from "../../../src/wrappers";

import { ACCOUNTS } from "../../accounts";

const CONTRACT_OWNER = ACCOUNTS[0].address;
const CREDITOR = ACCOUNTS[1].address;
const DEBTOR = ACCOUNTS[2].address;

const ZERO_AMOUNT = Units.ether(0);
const REPAYMENT_AMOUNT = Units.ether(10);
const PRINCIPAL_AMOUNT = REPAYMENT_AMOUNT.mul(3);

const TX_DEFAULTS = { from: CONTRACT_OWNER, gas: 400000 };

export class ErrorScenarioRunner {
    private web3Utils: Web3Utils;
    private web3: Web3;

    // Contracts
    private debtKernel: DebtKernelContract;
    private repaymentRouter: RepaymentRouterContract;
    private principalToken: DummyTokenContract;
    private termsContract: SimpleInterestTermsContractContract;
    private tokenTransferProxy: TokenTransferProxyContract;
    private tokenRegistry: TokenRegistryContract;

    // APIs
    private adaptersAPI: AdaptersAPI;
    private contractsAPI: ContractsAPI;
    private blockchainAPI: BlockchainAPI;
    private signerAPI: SignerAPI;
    private adaptersApi: AdaptersAPI;
    private orderAPI: OrderAPI;

    // Adapters
    private simpleInterestLoan: SimpleInterestLoanAdapter;

    private isConfigured: boolean = false;
    private currentSnapshotId: number;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.web3Utils = new Web3Utils(web3);

        this.testRepaymentRouterErrorScenario = this.testRepaymentRouterErrorScenario.bind(this);
        this.testDebtKernelErrorScenario = this.testDebtKernelErrorScenario.bind(this);
        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async configure() {
        // Prevent unnecessary configuration.
        if (this.isConfigured) {
            return;
        }

        // Construct all necessary dependencies.
        this.contractsAPI = new ContractsAPI(this.web3);
        this.blockchainAPI = new BlockchainAPI(this.web3, this.contractsAPI);
        this.signerAPI = new SignerAPI(this.web3, this.contractsAPI);
        this.adaptersApi = new AdaptersAPI(this.web3, this.contractsAPI);
        this.orderAPI = new OrderAPI(this.web3, this.contractsAPI, this.adaptersApi);

        const {
            debtKernel,
            repaymentRouter,
            tokenTransferProxy,
        } = await this.contractsAPI.loadDharmaContractsAsync();
        const tokenRegistry = await this.contractsAPI.loadTokenRegistry();
        const dummyREPAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync("REP");
        const principalToken = await DummyTokenContract.at(dummyREPAddress, this.web3, TX_DEFAULTS);
        const termsContract = await this.contractsAPI.loadSimpleInterestTermsContract();

        this.debtKernel = debtKernel;
        this.repaymentRouter = repaymentRouter;
        this.principalToken = principalToken;
        this.termsContract = termsContract;
        this.tokenTransferProxy = tokenTransferProxy;
        this.tokenRegistry = tokenRegistry;

        this.simpleInterestLoan = new SimpleInterestLoanAdapter(this.web3, this.contractsAPI);

        // Mark instance as configured.
        this.isConfigured = true;
    }

    public testRepaymentRouterErrorScenario(scenario: RepaymentRouterErrorScenario) {
        describe(scenario.description, () => {
            let txHash: string;

            beforeEach(async () => {
                const principalToken = await this.generateTokenForSymbol("REP");

                const debtOrder = await this.generateSignedDebtOrderWithToken("REP");

                const issuanceHash = await this.orderAPI.getIssuanceHash(debtOrder);

                // Should there be a valid debt agreement in this scenario?
                if (scenario.agreementExists) {
                    await this.orderAPI.fillAsync(debtOrder, { from: CREDITOR });
                }

                // Does the debtor have sufficient balance to make the repayment?
                if (scenario.isPayerBalanceInsufficient) {
                    await principalToken.setBalance.sendTransactionAsync(DEBTOR, ZERO_AMOUNT, {
                        from: CONTRACT_OWNER,
                    });
                }

                /* Will the terms contract accept this repayment?

                In our scenario, the terms contract is a `SimpleInterestLoan`
                and if the repayment is not in the correct token, then it
                will reject the repayment. Thus, if
                `willTermsContractAcceptRepayment` is false, we generate a
                new token that is not the principal token and use that for
                repayment, which should trigger the repayment router to
                reject the repayment.
                */
                let repaymentToken: DummyTokenContract;

                if (scenario.willTermsContractAcceptRepayment) {
                    repaymentToken = principalToken;
                } else {
                    repaymentToken = await this.generateTokenForSymbol("ZRX");
                }

                txHash = await this.repaymentRouter.repay.sendTransactionAsync(
                    issuanceHash,
                    REPAYMENT_AMOUNT,
                    repaymentToken.address,
                    { from: DEBTOR },
                );
            });

            if (scenario.error != null) {
                test("it returns the correct human-readable error message", async () => {
                    const errors = await this.blockchainAPI.getErrorLogs(txHash);
                    expect(errors.length).toEqual(1);
                    expect(errors[0]).toEqual(RepaymentRouterError.messageForError(scenario.error));
                });
            } else {
                test("it returns no error messages", async () => {
                    const errors = await this.blockchainAPI.getErrorLogs(txHash);
                    expect(errors.length).toEqual(0);
                });
            }
        });
    }

    public testDebtKernelErrorScenario(scenario: DebtKernelErrorScenario) {
        describe(scenario.description, () => {
            let txHash: string;

            beforeEach(async () => {
                let debtOrder = scenario.generateDebtOrder(
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
                    ? await this.signerAPI.asDebtor(debtOrder, false)
                    : undefined;
                debtOrder.creditorSignature = scenario.signatories.creditor
                    ? await this.signerAPI.asCreditor(debtOrder, false)
                    : undefined;
                debtOrder.underwriterSignature = scenario.signatories.underwriter
                    ? await this.signerAPI.asUnderwriter(debtOrder, false)
                    : undefined;

                if (scenario.beforeBlock) {
                    await scenario.beforeBlock(debtOrder, this.debtKernel);
                }

                debtOrder = await TransactionUtils.applyNetworkDefaults(
                    debtOrder,
                    this.contractsAPI,
                );
                const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

                txHash = await this.debtKernel.fillDebtOrder.sendTransactionAsync(
                    debtOrderWrapped.getCreditor(),
                    debtOrderWrapped.getOrderAddresses(),
                    debtOrderWrapped.getOrderValues(),
                    debtOrderWrapped.getOrderBytes32(),
                    debtOrderWrapped.getSignaturesV(),
                    debtOrderWrapped.getSignaturesR(),
                    debtOrderWrapped.getSignaturesS(),
                    { from: debtOrderWrapped.getCreditor() },
                );
            });

            if (scenario.error != null) {
                test("it returns the correct human-readable error message", async () => {
                    const errors = await this.blockchainAPI.getErrorLogs(txHash);
                    expect(errors.length).toEqual(1);
                    expect(errors[0]).toEqual(DebtKernelError.messageForError(scenario.error));
                });
            } else {
                test("it returns no error messages", async () => {
                    const errors = await this.blockchainAPI.getErrorLogs(txHash);
                    expect(errors.length).toEqual(0);
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

    private async generateTokenForSymbol(symbol: string): Promise<DummyTokenContract> {
        const tokenAddress = await this.tokenRegistry.getTokenAddressBySymbol.callAsync(symbol);

        const token = await DummyTokenContract.at(tokenAddress, this.web3, TX_DEFAULTS);

        // Grant creditor a balance of tokens
        await token.setBalance.sendTransactionAsync(CREDITOR, PRINCIPAL_AMOUNT, {
            from: CONTRACT_OWNER,
        });

        // Grant debtor a balance of tokens
        await token.setBalance.sendTransactionAsync(DEBTOR, REPAYMENT_AMOUNT, {
            from: CONTRACT_OWNER,
        });

        // Approve the token transfer proxy for a sufficient
        // amount of tokens for an order fill.
        await token.approve.sendTransactionAsync(
            this.tokenTransferProxy.address,
            PRINCIPAL_AMOUNT,
            {
                from: CREDITOR,
            },
        );

        await token.approve.sendTransactionAsync(
            this.tokenTransferProxy.address,
            // TODO(kayvon): increasing the allowance to be greater than the
            // repayment amount shouldn't be necessary. This appears to be an
            // error in the contracts.
            REPAYMENT_AMOUNT.plus(1),
            {
                from: DEBTOR,
            },
        );

        return token;
    }

    private async generateSignedDebtOrderWithToken(token: string): Promise<DebtOrder> {
        const debtOrder = await this.simpleInterestLoan.toDebtOrder({
            debtor: DEBTOR,
            creditor: CREDITOR,
            principalAmount: PRINCIPAL_AMOUNT,
            principalTokenSymbol: token,
            interestRate: new BigNumber(0.1),
            amortizationUnit: "months",
            termLength: new BigNumber(2),
            salt: new BigNumber(0),
        });

        debtOrder.debtorSignature = await this.signerAPI.asDebtor(debtOrder, false);

        return debtOrder;
    }
}
