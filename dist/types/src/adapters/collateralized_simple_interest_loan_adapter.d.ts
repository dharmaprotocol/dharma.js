import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { ContractsAPI } from "../apis";
import { DebtOrderData, DebtRegistryEntry, TxData } from "../types";
import { SimpleInterestLoanOrder, SimpleInterestTermsContractParameters } from "./simple_interest_loan_adapter";
import { Adapter } from "./adapter";
export interface CollateralizedSimpleInterestLoanOrder extends SimpleInterestLoanOrder {
    collateralTokenSymbol: string;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}
export interface CollateralizedTermsContractParameters {
    collateralTokenIndex: BigNumber;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}
export interface CollateralizedSimpleInterestTermsContractParameters extends SimpleInterestTermsContractParameters, CollateralizedTermsContractParameters {
}
export declare const CollateralizerAdapterErrors: {
    INVALID_TOKEN_INDEX: (tokenIndex: BigNumber) => any;
    COLLATERAL_AMOUNT_MUST_BE_POSITIVE: () => any;
    COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM: () => any;
    INSUFFICIENT_COLLATERAL_TOKEN_ALLOWANCE: () => string;
    INSUFFICIENT_COLLATERAL_TOKEN_BALANCE: () => string;
    GRACE_PERIOD_IS_NEGATIVE: () => any;
    GRACE_PERIOD_EXCEEDS_MAXIMUM: () => any;
    INVALID_DECIMAL_VALUE: () => any;
    MISMATCHED_TOKEN_SYMBOL: (tokenAddress: string, symbol: string) => any;
    MISMATCHED_TERMS_CONTRACT: (termsContractAddress: string) => any;
    COLLATERAL_NOT_FOUND: (agreementId: string) => any;
    DEBT_NOT_YET_REPAID: (agreementId: string) => any;
    LOAN_NOT_IN_DEFAULT_FOR_GRACE_PERIOD: (agreementId: string) => any;
};
export declare class CollateralizedSimpleInterestLoanAdapter implements Adapter {
    private assert;
    private readonly contractsAPI;
    private simpleInterestLoanTerms;
    private collateralizedLoanTerms;
    private web3Utils;
    constructor(web3: Web3, contractsAPI: ContractsAPI);
    toDebtOrder(collateralizedSimpleInterestLoanOrder: CollateralizedSimpleInterestLoanOrder): Promise<DebtOrderData>;
    /**
     * Validates that the basic invariants have been met for a given
     * CollateralizedSimpleInterestLoanOrder.
     *
     * @param {CollateralizedSimpleInterestLoanOrder} loanOrder
     * @returns {Promise<void>}
     */
    validateAsync(loanOrder: CollateralizedSimpleInterestLoanOrder): Promise<void>;
    /**
     * Given a valid debt order, returns a promise for a CollateralizedSimpleInterestLoanOrder,
     * which includes the DebtOrder information as well as as the contract terms (see documentation
     * on the `CollateralizedSimpleInterestLoanOrder` interface for more information.)
     *
     * @param {DebtOrderData} debtOrderData
     * @returns {Promise<CollateralizedSimpleInterestLoanOrder>}
     */
    fromDebtOrder(debtOrderData: DebtOrderData): Promise<CollateralizedSimpleInterestLoanOrder>;
    /**
     * Given a valid DebtRegistryEntry, returns a CollateralizedSimpleInterestLoanOrder.
     *
     * @param {DebtRegistryEntry} entry
     * @returns {Promise<CollateralizedSimpleInterestLoanOrder>}
     */
    fromDebtRegistryEntry(entry: DebtRegistryEntry): Promise<CollateralizedSimpleInterestLoanOrder>;
    /**
     * Given a valid DebtRegistryEntry, returns an array of repayment dates (as unix timestamps.)
     *
     * @example
     *   adapter.getRepaymentSchedule(debtEntry);
     *   => [1521506879]
     *
     * @param {DebtRegistryEntry} debtEntry
     * @returns {number[]}
     */
    getRepaymentSchedule(debtEntry: DebtRegistryEntry): number[];
    /**
     * Seizes the collateral from the given debt agreement and
     * transfers it to the debt agreement's beneficiary.
     *
     * @param {string} agreementId
     * @param {TxData} options
     * @returns {Promise<string>} The transaction's hash.
     */
    seizeCollateralAsync(agreementId: string, options?: TxData): Promise<string>;
    /**
     * Returns collateral to the debt agreement's original collateralizer
     * if and only if the debt agreement's term has lapsed and
     * the total expected repayment value has been repaid.
     *
     * @param {string} agreementId
     * @param {TxData} options
     * @returns {Promise<string>} The transaction's hash.
     */
    returnCollateralAsync(agreementId: string, options?: TxData): Promise<string>;
    unpackParameters(termsContractParameters: string): CollateralizedSimpleInterestTermsContractParameters;
    packParameters(simpleTermsParams: SimpleInterestTermsContractParameters, collateralTermsParams: CollateralizedTermsContractParameters): string;
    /**
     * Given an agreement ID for a valid collateralized debt agreement, returns true if the
     * collateral is returnable according to the terms of the agreement - I.E. the debt
     * has been repaid, and the collateral has not already been withdrawn.
     *
     * @example
     *  await adapter.canReturnCollateral(
     *     "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    canReturnCollateral(agreementId: string): Promise<boolean>;
    /**
     * Given an agreement ID for a valid collateralized debt agreement, returns true if the
     * collateral can be seized by the creditor, according to the terms of the agreement. Collateral
     * is seizable if the collateral has not been withdrawn yet, and the loan has been in a state
     * of default for a duration of time greater than the grace period.
     *
     * @example
     *  await adapter.canSeizeCollateral(
     *     "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    canSeizeCollateral(agreementId: string): Promise<boolean>;
    /**
     * Returns true if the collateral associated with the given agreement ID
     * has already been seized or returned.
     *
     * @example
     *  await adapter.isCollateralWithdrawn(
     *    "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    isCollateralWithdrawn(agreementId: string): Promise<boolean>;
    private assertTokenCorrespondsToSymbol(tokenAddress, symbol);
    private assertIsCollateralizedSimpleInterestTermsContract(termsContractAddress);
    private assertDebtAgreementExists(agreementId);
    /**
     * Collateral is seizable if the collateral has not been withdrawn yet, and the
     * loan has been in a state of default for a duration of time greater than the grace period.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    private assertCollateralSeizeable(agreementId);
    /**
     * Collateral is returnable if the debt is repaid, and the collateral has not yet
     * been withdrawn.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    private assertCollateralReturnable(agreementId);
    private assertDebtRepaid(agreementId);
    private assertDefaultedForGracePeriod(agreementId, gracePeriod);
    private defaultedForGracePeriod(agreementId, gracePeriod);
    private assertCollateralNotWithdrawn(agreementId);
    private assertCollateralBalanceAndAllowanceInvariantsAsync(order);
    private debtRepaid(agreementId);
    private getTxDefaultOptions();
}
