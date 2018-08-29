// Utils
import { BigNumber } from "../../../../../utils/bignumber";
import * as Units from "../../../../../utils/units";
// Adapters
import { ERC721CollateralizedTermsContractParameters } from "../../../../../src/adapters/erc721_collateralized_simple_interest/loan_adapter";
import { SimpleInterestTermsContractParameters } from "src/adapters/simple_interest_loan_adapter";
// Wrappers
import { ERC721TokenContract } from "../../../../../src/wrappers";

export interface SeizeCollateralScenario {
    // The test's description.
    description: string;
    // True if the scenario succeeds in returning collateral.
    succeeds: boolean;
    simpleTerms: SimpleInterestTermsContractParameters;
    collateralTerms: ERC721CollateralizedTermsContractParameters;
    // True if the debt order's term has lapsed.
    termLapsed: boolean;
    // True if the entire debt has been repaid to the creditor.
    debtRepaid: boolean;
    // True if the collateral has already been withdrawn.
    collateralWithdrawn: boolean;
    // Returns the agreement id that should be provided to the function.
    givenAgreementId: (agreementId: string) => string;
    tokenReference: (tokenContract: ERC721TokenContract) => BigNumber;
    // If there is an error in returning collateral, this defines the expected message.
    error?: RegExp | string;
}

export type ReturnCollateralScenario = SeizeCollateralScenario;

let defaultSimpleTerms: SimpleInterestTermsContractParameters;
let defaultCollateralTerms: ERC721CollateralizedTermsContractParameters;

defaultSimpleTerms = {
    amortizationUnit: "hours",
    principalAmount: Units.ether(1),
    interestRate: new BigNumber(32),
    termLength: new BigNumber(1),
    principalTokenIndex: new BigNumber(0),
};

defaultCollateralTerms = {
    erc721ContractIndex: new BigNumber(0),
    tokenReference: new BigNumber(0),
    isEnumerable: new BigNumber(1),
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
    // Overrides the default token reference.
    tokenReference: (tokenContract) => tokenContract.totalSupply.callAsync(),
};
