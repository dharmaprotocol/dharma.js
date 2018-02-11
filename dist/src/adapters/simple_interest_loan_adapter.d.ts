import { DebtOrder } from "../types";
import { ContractsAPI } from "../apis";
import { BigNumber } from "../../utils/bignumber";
import Web3 from "web3";
export interface SimpleInterestLoanOrder extends DebtOrder {
    principalAmount: BigNumber;
    principalToken: string;
    interestRate: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
}
export interface SimpleInterestTermsContractParameters {
    totalExpectedRepayment: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
}
export declare type AmortizationUnit = "hours" | "days" | "weeks" | "months" | "years";
export declare const SimpleInterestAdapterErrors: {
    INVALID_EXPECTED_REPAYMENT_VALUE: () => any;
    INVALID_AMORTIZATION_UNIT_TYPE: () => any;
    INVALID_TERM_LENGTH: () => any;
    INVALID_TERMS_CONTRACT: (principalToken: string, termsContract: string) => any;
};
export declare class SimpleInterestLoanTerms {
    packParameters(termsContractParameters: SimpleInterestTermsContractParameters): string;
    unpackParameters(termsContractParametersPacked: string): SimpleInterestTermsContractParameters;
    assertTotalExpectedRepaymentWithinBounds(totalExpectedRepayment: BigNumber): void;
    assertValidAmortizationUnitCode(amortizationUnitCode: number): void;
    assertValidAmortizationUnit(amortizationUnitType: AmortizationUnit): void;
    assertTermLengthWithinBounds(termLengthInAmortizationUnits: BigNumber): void;
}
export declare class SimpleInterestLoanAdapter {
    static Installments: {
        [type: string]: AmortizationUnit;
    };
    private assert;
    private contracts;
    private termsContractInterface;
    constructor(web3: Web3, contracts: ContractsAPI);
    toDebtOrder(simpleInterestLoanOrder: SimpleInterestLoanOrder): Promise<DebtOrder>;
    fromDebtOrder(debtOrder: DebtOrder): Promise<SimpleInterestLoanOrder>;
    private assertTermsContractCorrespondsToPrincipalToken(principalToken, termsContract);
}
