// External libraries
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";
import * as moment from "moment";

// Utils
import { Web3Utils } from "utils/web3_utils";
import * as Units from "utils/units";

// Scenarios
import { ReturnCollateralScenario, SeizeCollateralScenario } from "../scenarios";

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

export abstract class BaseCollateralRunner {
    protected adapter: CollateralizedSimpleInterestLoanAdapter;
    protected debtKernel: DebtKernelContract;
    protected repaymentRouter: RepaymentRouterContract;
    protected principalToken: DummyTokenContract;
    protected collateralToken: DummyTokenContract;
    protected termsContract: CollateralizedSimpleInterestTermsContractContract;
    protected orderApi: OrderAPI;
    protected signerApi: SignerAPI;
    protected tokenTransferProxy: TokenTransferProxyContract;
    protected web3: Web3;
    protected web3Utils: Web3Utils;
    protected servicingApi: ServicingAPI;
    protected contractsApi: ContractsAPI;
    protected tokenApi: TokenAPI;
    protected snapshotId: number;
    protected debtOrder: DebtOrder;

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

    public abstract testScenario(scenario: ReturnCollateralScenario | SeizeCollateralScenario);

    // Increases EVM time to a given new time in seconds since unix epoch.
    protected async increaseTime(newTime: number): Promise<void> {
        const secondsUntilNewTime = newTime - (await this.web3Utils.getCurrentBlockTime());

        await this.web3Utils.increaseTime(secondsUntilNewTime + 1);
    }

    protected async setBalances(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ): Promise<void> {
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

    protected async setApprovals(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ): Promise<void> {
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

    protected async signOrder(): Promise<void> {
        this.debtOrder.debtorSignature = await this.signerApi.asDebtor(this.debtOrder, false);
        this.debtOrder.creditorSignature = await this.signerApi.asCreditor(this.debtOrder, false);
        this.debtOrder.underwriterSignature = await this.signerApi.asUnderwriter(
            this.debtOrder,
            false,
        );
    }

    protected async repayDebt(agreementId, termEnd): Promise<void> {
        const amount = await this.termsContract.getExpectedRepaymentValue.callAsync(
            agreementId,
            termEnd,
        );

        await this.servicingApi.makeRepayment(agreementId, amount, this.principalToken.address, {
            from: this.debtOrder.debtor,
        });
    }

    protected generateDebtOrder(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ): DebtOrder {
        const termsParams = this.adapter.packParameters(
            scenario.simpleTerms,
            scenario.collateralTerms,
        );

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

    protected async generateAndFillOrder(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ): Promise<void> {
        this.debtOrder = this.generateDebtOrder(scenario);

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

    protected async initializeWrappers(
        scenario: ReturnCollateralScenario | SeizeCollateralScenario,
    ) {
        this.debtKernel = await DebtKernelContract.deployed(this.web3);

        this.repaymentRouter = await RepaymentRouterContract.deployed(this.web3);

        this.termsContract = await this.contractsApi.loadCollateralizedSimpleInterestTermsContract(
            TX_DEFAULTS,
        );

        const principalTokenSymbol = await this.contractsApi.getTokenSymbolByIndexAsync(
            scenario.simpleTerms.principalTokenIndex,
        );
        const collateralTokenSymbol = await this.contractsApi.getTokenSymbolByIndexAsync(
            scenario.collateralTerms.collateralTokenIndex,
        );

        this.principalToken = await DummyTokenContract.at(
            (await this.contractsApi.loadTokenBySymbolAsync(principalTokenSymbol)).address,
            this.web3,
            TX_DEFAULTS,
        );

        this.collateralToken = await DummyTokenContract.at(
            (await this.contractsApi.loadTokenBySymbolAsync(collateralTokenSymbol)).address,
            this.web3,
            TX_DEFAULTS,
        );

        this.tokenTransferProxy = await this.contractsApi.loadTokenTransferProxyAsync();
    }
}
