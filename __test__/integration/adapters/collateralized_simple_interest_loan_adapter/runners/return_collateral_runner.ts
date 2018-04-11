// External libraries
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import * as Units from "utils/units";

// Utils
import { Web3Utils } from "utils/web3_utils";

// Scenarios
import { ReturnCollateralScenario } from "../scenarios";

// Adapters
import { CollateralizedSimpleInterestLoanAdapter } from "src/adapters/collateralized_simple_interest_loan_adapter";

// Wrappers
import { DebtKernelContract } from "src/wrappers/contract_wrappers/debt_kernel_wrapper";
import { RepaymentRouterContract } from "src/wrappers/contract_wrappers/repayment_router_wrapper";
import { DummyTokenContract } from "src/wrappers/contract_wrappers/dummy_token_wrapper";
import { CollateralizedSimpleInterestTermsContractContract } from "src/wrappers/contract_wrappers/collateralized_simple_interest_terms_contract_wrapper";
import { TokenTransferProxyContract } from "src/wrappers/contract_wrappers/token_transfer_proxy_wrapper";

// APIs
import { OrderAPI } from "src/apis/order_api";
import { SignerAPI } from "src/apis/signer_api";
import { ServicingAPI } from "src/apis/servicing_api";

// Types
import { DebtOrder } from "src/types/debt_order";

// Accounts
import { ACCOUNTS } from "__test__/accounts";
import { ContractsAPI } from "../../../../../src/apis/contracts_api";
import { TokenAPI } from "../../../../../src/apis/token_api";

const CONTRACT_OWNER = ACCOUNTS[0];
const DEBTOR = ACCOUNTS[1];
const CREDITOR = ACCOUNTS[2];
const UNDERWRITER = ACCOUNTS[3];
const RELAYER = ACCOUNTS[4];

const TX_DEFAULTS = { from: CONTRACT_OWNER.address, gas: 4712388 };

export interface APIs {
    orderApi: OrderAPI;
    signerApi: SignerAPI;
    servicingApi: ServicingAPI;
    contractsApi: ContractsAPI;
    tokenApi: TokenAPI;
}

export class ReturnCollateralRunner {
    private adapter: CollateralizedSimpleInterestLoanAdapter;
    private debtKernel: DebtKernelContract;
    private repaymentRouter: RepaymentRouterContract;
    private principalToken: DummyTokenContract;
    private collateralToken: DummyTokenContract;
    private termsContract: CollateralizedSimpleInterestTermsContractContract;
    private orderApi: OrderAPI;
    private signerApi: SignerAPI;
    private tokenTransferProxy: TokenTransferProxyContract;
    private web3: Web3;
    private web3Utils: Web3Utils;
    private servicingApi: ServicingAPI;
    private contractsApi: ContractsAPI;
    private tokenApi: TokenAPI;
    private snapshotId: number;
    private debtOrder: DebtOrder.Instance;

    constructor(web3: Web3, adapter: CollateralizedSimpleInterestLoanAdapter, apis: APIs) {
        this.web3 = web3;

        this.orderApi = apis.orderApi;
        this.signerApi = apis.signerApi;
        this.servicingApi = apis.servicingApi;
        this.contractsApi = apis.contractsApi;
        this.tokenApi = apis.tokenApi;

        this.adapter = adapter;

        this.web3Utils = new Web3Utils(web3);

        this.testScenario = this.testScenario.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async saveSnapshotAsync() {
        this.snapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.snapshotId);
    }

    public testScenario(scenario: ReturnCollateralScenario) {
        let agreementId;

        describe(scenario.description, () => {
            beforeAll(async () => {
                await this.initializeWrappers();

                this.snapshotId = await this.web3Utils.saveTestSnapshot();

                // We fill a generic collateralized loan order, against which
                // we can test making repayments and returning collateral.
                await this.generateAndFillOrder(scenario);

                agreementId = await this.orderApi.getIssuanceHash(this.debtOrder);

                // The time, in seconds since unix epoch, at which the term will end.
                const termEnd = await this.termsContract.getTermEndTimestamp.callAsync(agreementId);

                if (scenario.debtRepaid) {
                    // Repay the full debt, to test making the collateral returnable.
                    await this.repayDebt(agreementId, termEnd);
                }

                if (scenario.termLapsed) {
                    // Increase the EVM's time, such that the term has elapsed.
                    await this.increaseTime(termEnd.toNumber() + 1);
                }

                if (scenario.collateralWithdrawn) {
                    await this.adapter.returnCollateral(agreementId);
                }
            });

            afterAll(async () => {
                // Once the test has run, revert to a clean EVM state.
                await this.web3Utils.revertToSnapshot(this.snapshotId);
            });

            if (scenario.succeeds) {
                it("returns a valid transaction hash", async () => {
                    const txHash = await this.adapter.returnCollateral(
                        scenario.givenAgreementId(agreementId),
                    );

                    expect(txHash.length).toEqual(66);
                });

                it("transfers collateral back to the debtor", async () => {
                    const collateralAmount = await this.collateralToken.balanceOf.callAsync(
                        this.debtOrder.debtor,
                    );

                    expect(collateralAmount).toEqual(scenario.collateralTerms.collateralAmount);
                });
            } else {
                it(`throws with message: ${scenario.error}`, async () => {
                    await expect(
                        this.adapter.returnCollateral(scenario.givenAgreementId(agreementId)),
                    ).rejects.toThrow(scenario.error);
                });

                if (!scenario.collateralWithdrawn) {
                    it("does not transfer collateral back to the debtor", async () => {
                        const collateralAmount = await this.collateralToken.balanceOf.callAsync(
                            this.debtOrder.debtor,
                        );

                        expect(collateralAmount.toNumber()).toEqual(0);
                    });
                }
            }
        });
    }

    // Increases EVM time to a given new time in seconds since unix epoch.
    private async increaseTime(newTime: number): Promise<void> {
        const secondsUntilNewTime = newTime - (await this.web3Utils.getCurrentBlockTime());

        await this.web3Utils.increaseTime(secondsUntilNewTime + 1);
    }

    private async setBalances(scenario: ReturnCollateralScenario): Promise<void> {
        // 1. Set up Debtor balances.

        // The debtor has the exact amount of the collateral token as
        // they are going to set up as collateral.
        await this.collateralToken.setBalance.sendTransactionAsync(
            DEBTOR.address,
            scenario.collateralTerms.collateralAmount,
            {
                from: CONTRACT_OWNER.address,
            },
        );

        // The debtor has more than enough of the principal token to repay debts.
        await this.principalToken.setBalance.sendTransactionAsync(
            DEBTOR.address,
            scenario.simpleTerms.principalAmount.mul(2),
            {
                from: CONTRACT_OWNER.address,
            },
        );

        // 2. Set up creditor balances.

        // The creditor has exactly the amount necessary to loan to the debtor,
        // as well as to pay for the creditor fee.
        await this.principalToken.setBalance.sendTransactionAsync(
            CREDITOR.address,
            scenario.simpleTerms.principalAmount.add(this.debtOrder.creditorFee),
            {
                from: CONTRACT_OWNER.address,
            },
        );

        // 3. Set up underwriter balances.

        // The underwriter has enough balance to pay the underwriter fee.
        await this.principalToken.setBalance.sendTransactionAsync(
            UNDERWRITER.address,
            this.debtOrder.underwriterFee,
            {
                from: CONTRACT_OWNER.address,
            },
        );
    }

    private async setApprovals(scenario: ReturnCollateralScenario): Promise<void> {
        const { debtor, creditor, principalAmount } = this.debtOrder;

        // The debtor grants the transfer proxy an allowance for moving the collateral.
        await this.tokenApi.setProxyAllowanceAsync(
            this.collateralToken.address,
            scenario.collateralTerms.collateralAmount,
            { from: debtor },
        );

        // The debtor grants the transfer proxy some sufficient allowance for making repayments.
        await this.tokenApi.setProxyAllowanceAsync(
            this.principalToken.address,
            principalAmount.mul(2),
            { from: debtor },
        );

        // The creditor grants allowance of the principal token being loaned,
        // as well as the creditor fee.
        await this.tokenApi.setProxyAllowanceAsync(
            this.principalToken.address,
            principalAmount.add(this.debtOrder.creditorFee),
            { from: creditor },
        );
    }

    private async signOrder(): Promise<void> {
        this.debtOrder.debtorSignature = await this.signerApi.asDebtor(this.debtOrder, false);
        this.debtOrder.creditorSignature = await this.signerApi.asCreditor(this.debtOrder, false);
        this.debtOrder.underwriterSignature = await this.signerApi.asUnderwriter(
            this.debtOrder,
            false,
        );
    }

    private async repayDebt(agreementId, termEnd): Promise<void> {
        const amount = await this.termsContract.getExpectedRepaymentValue.callAsync(
            agreementId,
            termEnd,
        );

        await this.servicingApi.makeRepayment(agreementId, amount, this.principalToken.address, {
            from: this.debtOrder.debtor,
        });
    }

    private generateDebtOrder(
        scenario: ReturnCollateralScenario,
        termsParams: string,
    ): DebtOrder.Instance {
        return {
            kernelVersion: this.debtKernel.address,
            issuanceVersion: this.repaymentRouter.address,
            principalAmount: scenario.simpleTerms.principalAmount,
            principalToken: this.principalToken.address,
            debtor: DEBTOR.address,
            debtorFee: Units.ether(0.001),
            creditor: CREDITOR.address,
            creditorFee: Units.ether(0.002),
            relayer: RELAYER.address,
            relayerFee: Units.ether(0.0015),
            termsContract: this.termsContract.address,
            termsContractParameters: termsParams,
            expirationTimestampInSec: new BigNumber(
                moment()
                    .add(7, "days")
                    .unix(),
            ),
            underwriter: UNDERWRITER.address,
            underwriterFee: Units.ether(0.0015),
            underwriterRiskRating: new BigNumber(1350),
            salt: new BigNumber(0),
        };
    }

    private async generateAndFillOrder(scenario: ReturnCollateralScenario): Promise<void> {
        const termsParams = this.adapter.packParameters(
            scenario.simpleTerms,
            scenario.collateralTerms,
        );

        this.debtOrder = this.generateDebtOrder(scenario, termsParams);

        await this.signOrder();

        await this.setBalances(scenario);

        await this.setApprovals(scenario);

        await this.orderApi.fillAsync(this.debtOrder, {
            from: CREDITOR.address,
            // NOTE: Using the maximum gas here, to prevent potentially confusing
            // reverts due to insufficient gas. This wouldn't be applied in practice.
            gas: 4712388,
        });
    }

    private async initializeWrappers() {
        this.debtKernel = await DebtKernelContract.deployed(this.web3);

        this.repaymentRouter = await RepaymentRouterContract.deployed(this.web3);

        this.termsContract = await this.contractsApi.loadCollateralizedSimpleInterestTermsContract(
            TX_DEFAULTS,
        );

        this.principalToken = await DummyTokenContract.at(
            (await this.contractsApi.loadTokenBySymbolAsync("REP")).address,
            this.web3,
            TX_DEFAULTS,
        );

        this.collateralToken = await DummyTokenContract.at(
            (await this.contractsApi.loadTokenBySymbolAsync("ZRX")).address,
            this.web3,
            TX_DEFAULTS,
        );

        this.tokenTransferProxy = await this.contractsApi.loadTokenTransferProxyAsync();
    }
}
