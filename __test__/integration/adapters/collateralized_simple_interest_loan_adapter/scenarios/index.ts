// External Libraries
import { BigNumber } from "bignumber.js";
import * as moment from "moment";

// Utils
import * as Units from "utils/units";

// Wrappers
import { DebtKernelContract } from "src/wrappers/contract_wrappers/debt_kernel_wrapper";
import { RepaymentRouterContract } from "src/wrappers/contract_wrappers/repayment_router_wrapper";
import { CollateralizedSimpleInterestTermsContractContract } from "src/wrappers/contract_wrappers/collateralized_simple_interest_terms_contract_wrapper";
import { DummyTokenContract } from "src/wrappers/contract_wrappers/dummy_token_wrapper";

// Adapters
import { SimpleInterestTermsContractParameters } from "src/adapters/simple_interest_loan_adapter";
import { CollateralizedTermsContractParameters } from "src/adapters/collateralized_simple_interest_loan_adapter";

// Types
import { DebtOrder } from "src/types/debt_order";

export interface SeizeCollateralScenario {
    // The test's description.
    description: string;
    // True if the scenario succeeds in returning collateral.
    succeeds: boolean;
    simpleTerms: SimpleInterestTermsContractParameters;
    collateralTerms: CollateralizedTermsContractParameters;
    // A function that returns a valid DebtOrder instance.
    generateDebtOrder: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
        termsContract: CollateralizedSimpleInterestTermsContractContract,
        termsParams: string,
    ) => DebtOrder.Instance;
    // Typically the underwriter fills the debt order.
    orderFiller: string;
    // True if the debt order's term has lapsed.
    termLapsed: boolean;
    // True if the entire debt has been repaid to the creditor.
    debtRepaid: boolean;
    // If there is an error in returning collateral, this defines the expected message.
    error?: RegExp | string;
}

export interface ReturnCollateralScenario {
    // The test's description.
    description: string;
    // True if the scenario succeeds in returning collateral.
    succeeds: boolean;
    simpleTerms: SimpleInterestTermsContractParameters;
    collateralTerms: CollateralizedTermsContractParameters;
    // A function that returns a valid DebtOrder instance.
    generateDebtOrder: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
        termsContract: CollateralizedSimpleInterestTermsContractContract,
        termsParams: string,
    ) => DebtOrder.Instance;
    // Typically the underwriter fills the debt order.
    orderFiller: string;
    // True if the debt order's term has lapsed.
    termLapsed: boolean;
    // True if the entire debt has been repaid to the creditor.
    debtRepaid: boolean;
    // If there is an error in returning collateral, this defines the expected message.
    error?: RegExp | string;
}

let defaultSimpleTerms: SimpleInterestTermsContractParameters;
let defaultCollateralTerms: CollateralizedTermsContractParameters;

defaultSimpleTerms = {
    amortizationUnit: "hours",
    principalAmount: Units.ether(1),
    interestRate: new BigNumber(0.32),
    termLength: new BigNumber(1),
    principalTokenIndex: new BigNumber(0),
};

defaultCollateralTerms = {
    collateralTokenIndex: new BigNumber(2),
    collateralAmount: Units.ether(0.1),
    gracePeriodInDays: new BigNumber(30),
};

export function scenarioDefaults(
    accounts: Array<any>,
): ReturnCollateralScenario | SeizeCollateralScenario {
    const debtor = accounts[1];
    const creditor = accounts[2];
    const underwriter = accounts[3];
    const relayer = accounts[4];

    return {
        description: "default description",
        succeeds: true,
        termLapsed: true,
        debtRepaid: true,
        orderFiller: underwriter.address,
        collateralTerms: defaultCollateralTerms,
        simpleTerms: defaultSimpleTerms,
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: CollateralizedSimpleInterestTermsContractContract,
            termsParams: string,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: defaultSimpleTerms.principalAmount,
                principalToken: principalToken.address,
                debtor: debtor.address,
                debtorFee: Units.ether(0.001),
                creditor: creditor.address,
                creditorFee: Units.ether(0.002),
                relayer: relayer.address,
                relayerFee: Units.ether(0.0015),
                termsContract: termsContract.address,
                termsContractParameters: termsParams,
                orderSignatories: { debtor: debtor, creditor: creditor, underwriter: underwriter },
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                underwriter: underwriter.address,
                underwriterFee: Units.ether(0.0015),
                underwriterRiskRating: new BigNumber(1350),
                salt: new BigNumber(0),
            };
        },
    };
}
