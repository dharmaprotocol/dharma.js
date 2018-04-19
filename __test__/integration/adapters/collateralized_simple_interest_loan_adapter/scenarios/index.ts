// External Libraries
import { BigNumber } from "utils/bignumber";

// Utils
import * as Units from "utils/units";

// Adapters
import { SimpleInterestTermsContractParameters } from "src/adapters/simple_interest_loan_adapter";
import { CollateralizedTermsContractParameters } from "src/adapters/collateralized_simple_interest_loan_adapter";

export interface SeizeCollateralScenario {
    // The test's description.
    description: string;
    // True if the scenario succeeds in returning collateral.
    succeeds: boolean;
    simpleTerms: SimpleInterestTermsContractParameters;
    collateralTerms: CollateralizedTermsContractParameters;
    // True if the debt order's term has lapsed.
    termLapsed: boolean;
    // True if the entire debt has been repaid to the creditor.
    debtRepaid: boolean;
    // True if the collateral has already been withdrawn.
    collateralWithdrawn: boolean;
    // Returns the agreement id that should be provided to the function.
    givenAgreementId: (agreementId: string) => string;
    // If there is an error in returning collateral, this defines the expected message.
    error?: RegExp | string;
}

export type ReturnCollateralScenario = SeizeCollateralScenario;

let defaultSimpleTerms: SimpleInterestTermsContractParameters;
let defaultCollateralTerms: CollateralizedTermsContractParameters;

defaultSimpleTerms = {
    amortizationUnit: "hours",
    principalAmount: Units.ether(1),
    interestRate: new BigNumber(32),
    termLength: new BigNumber(1),
    principalTokenIndex: new BigNumber(0),
};

defaultCollateralTerms = {
    collateralTokenIndex: new BigNumber(2),
    collateralAmount: Units.ether(0.1),
    gracePeriodInDays: new BigNumber(30),
};

export const defaultArgs = {
    description: "default description",
    succeeds: true,
    termLapsed: true,
    debtRepaid: true,
    collateralTerms: defaultCollateralTerms,
    simpleTerms: defaultSimpleTerms,
    collateralWithdrawn: false,
    givenAgreementId: (agreementId: string) => agreementId,
};
