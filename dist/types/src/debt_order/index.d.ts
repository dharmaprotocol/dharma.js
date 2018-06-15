import { Dharma } from "../";
import { DebtOrderData, EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../types";
export interface BaseDebtOrderParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    debtorAddress: EthereumAddress;
}
export interface DebtOrderParams extends BaseDebtOrderParams {
    expiresIn: TimeInterval;
}
export interface FillParameters {
    creditorAddress: EthereumAddress;
}
export declare class DebtOrder {
    private dharma;
    private params;
    private data;
    static create(dharma: Dharma, params: DebtOrderParams): Promise<DebtOrder>;
    static load(dharma: Dharma, data: DebtOrderData): Promise<DebtOrder>;
    private static generateSalt();
    private constructor();
    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @returns {Promise<boolean>}
     */
    isExpired(): Promise<boolean>;
    isSignedByDebtor(): boolean;
    signAsDebtor(): Promise<void>;
    /**
     * Eventually returns true if the current debt order has been cancelled.
     *
     * @example
     * await debtOrder.isCancelled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    isCancelled(): Promise<boolean>;
    /**
     * Attempts to cancel the current debt order. A debt order can be cancelled by the debtor
     * if it is open and unfilled.
     *
     * @example
     * await debtOrder.cancelAsDebtor();
     * => "0x000..."
     *
     * @returns {Promise<string>} the transaction hash
     */
    cancelAsDebtor(): Promise<string>;
    isFilled(): Promise<boolean>;
    fill(parameters: FillParameters): Promise<string>;
    /**
     * Makes a repayment on the loan, with the default payment amount being the
     * expected size of a single installment given the principal, interest rate,
     * and terms.
     *
     * @example
     * order.makeRepayment();
     * => Promise<string>
     *
     * const outstandingAmount = await order.getOutstandingAmount();
     * order.makeRepayment(outstandingAmount);
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the transaction to make the repayment
     */
    makeRepayment(repaymentAmount?: TokenAmount): Promise<string>;
    isCollateralWithdrawn(): Promise<boolean>;
    isCollateralSeizable(): Promise<boolean>;
    isCollateralReturnable(): Promise<boolean>;
    /**
     * Returns the collateral and sends it to the debtor.
     * This will fail if the collateral is not returnable.
     *
     * @example
     * order.returnCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the transaction to return the collateral
     */
    returnCollateral(): Promise<string>;
    /**
     * Seizes the collateral and sends it to the creditor.
     * This will fail if the collateral is not seizable.
     *
     * @example
     * order.seizeCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the transaction to seize the collateral
     */
    seizeCollateral(): Promise<string>;
    /**
     * Returns the total amount expected to be repaid.
     *
     * @example
     * order.getTotalExpectedRepaymentAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    getTotalExpectedRepaymentAmount(): Promise<TokenAmount>;
    /**
     * Returns the outstanding balance of the loan.
     *
     * @example
     * order.getOutstandingAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    getOutstandingAmount(): Promise<TokenAmount>;
    /**
     * Returns the total amount repaid so far.
     *
     * @example
     * order.getRepaidAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    getRepaidAmount(): Promise<TokenAmount>;
    private isSignedByCreditor();
    private signAsCreditor();
    private getAgreementId();
    private serialize();
    private getCurrentBlocktime();
}
