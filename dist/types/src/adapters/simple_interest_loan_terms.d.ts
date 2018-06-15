import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { ContractsAPI } from "../apis";
import { AmortizationUnit, SimpleInterestTermsContractParameters } from "./simple_interest_loan_adapter";
export declare class SimpleInterestLoanTerms {
    private assert;
    constructor(web3: Web3, contracts: ContractsAPI);
    packParameters(termsContractParameters: SimpleInterestTermsContractParameters): string;
    unpackParameters(termsContractParametersPacked: string): SimpleInterestTermsContractParameters;
    /**
     * Asserts that invariants are met for a given packed parameters string.
     *
     * @param {string} packedParameters
     */
    validate(packedParameters: string): void;
    assertPrincipalTokenIndexWithinBounds(principalTokenIndex: BigNumber): void;
    assertPrincipalAmountWithinBounds(principalAmount: BigNumber): void;
    assertInterestRateValid(interestRate: BigNumber): void;
    assertValidAmortizationUnitCode(amortizationUnitCode: number): void;
    assertValidAmortizationUnit(amortizationUnitType: AmortizationUnit): void;
    assertTermLengthWholeAndWithinBounds(termLengthInAmortizationUnits: BigNumber): void;
}
