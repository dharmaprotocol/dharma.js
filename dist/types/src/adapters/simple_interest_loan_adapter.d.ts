import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { DebtOrderData, DebtRegistryEntry } from "../types";
import { ContractsAPI } from "../apis";
import { Adapter } from "./adapter";
export interface SimpleInterestLoanOrder extends DebtOrderData {
    principalAmount: BigNumber;
    principalTokenSymbol: string;
    interestRate: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
}
export interface SimpleInterestTermsContractParameters {
    principalAmount: BigNumber;
    interestRate: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
    principalTokenIndex: BigNumber;
}
export declare type AmortizationUnit = "hours" | "days" | "weeks" | "months" | "years";
export declare const SimpleInterestAdapterErrors: {
    INVALID_TOKEN_INDEX: (tokenIndex: BigNumber) => any;
    INVALID_PRINCIPAL_AMOUNT: () => any;
    INVALID_INTEREST_RATE: () => any;
    INVALID_AMORTIZATION_UNIT_TYPE: () => any;
    INVALID_TERM_LENGTH: () => any;
    MISMATCHED_TOKEN_SYMBOL: (principalTokenIndex: BigNumber, symbol: string) => any;
    MISMATCHED_TERMS_CONTRACT: (termsContract: string) => any;
};
export declare class SimpleInterestLoanAdapter implements Adapter {
    static Installments: {
        [type: string]: AmortizationUnit;
    };
    private assert;
    private readonly contracts;
    private termsContractInterface;
    constructor(web3: Web3, contracts: ContractsAPI);
    /**
     * Asynchronously generates a Dharma debt order given an instance of a
     * simple interest loan order.
     *
     * @param  simpleInterestLoanOrder a simple interest loan order instance.
     * @return the generated Dharma debt order.
     */
    toDebtOrder(simpleInterestLoanOrder: SimpleInterestLoanOrder): Promise<DebtOrderData>;
    /**
     * Asynchronously generates a simple interest loan order given a Dharma
     * debt order instance.
     *
     * @param  debtOrderData a Dharma debt order instance.
     * @return           the generated simple interest loan order.
     */
    fromDebtOrder(debtOrderData: DebtOrderData): Promise<SimpleInterestLoanOrder>;
    /**
     * Asynchronously translates a Dharma debt registry entry into a
     * simple interest loan order.
     *
     * @param entry a Dharma debt registry entry
     * @return      the translated simple interest loan order
     */
    fromDebtRegistryEntry(entry: DebtRegistryEntry): Promise<SimpleInterestLoanOrder>;
    getRepaymentSchedule(debtEntry: DebtRegistryEntry): number[];
    unpackParameters(packedParams: string): SimpleInterestTermsContractParameters;
    /**
     * Validates that the basic invariants have been met for a given SimpleInterestLoanOrder.
     *
     * @param {SimpleInterestLoanOrder} simpleInterestLoanOrder
     * @returns {Promise<void>}
     */
    validateAsync(simpleInterestLoanOrder: SimpleInterestLoanOrder): Promise<void>;
    private assertIsSimpleInterestTermsContract(termsContractAddress);
    /**
     * Asserts that the address of the principal token specified in the loan order
     * matches the address of the principal token specified in the terms contract parameters.
     *
     * @param {SimpleInterestLoanOrder} loanOrder
     * @returns {Promise<void>}
     */
    private assertPrincipalTokenValidAsync(loanOrder);
}
