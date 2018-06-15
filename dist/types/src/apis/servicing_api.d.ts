import { ContractsAPI } from "./";
import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { DebtRegistryEntry, TxData } from "../types";
export declare const ServicingAPIErrors: {
    DEBT_AGREEMENT_NONEXISTENT: (issuanceHash: string) => any;
    INSUFFICIENT_REPAYMENT_BALANCE: () => any;
    INSUFFICIENT_REPAYMENT_ALLOWANCE: () => any;
    UNKNOWN_LOAN_ADAPTER: (termsContract: string) => any;
};
export declare class ServicingAPI {
    private web3;
    private contracts;
    private assert;
    constructor(web3: Web3, contracts: ContractsAPI);
    /**
     * Asynchronously issue a repayment towards a debt agreement.
     *
     * Note that the address of whoever is making the repayment must allot a
     * sufficient allowance (equal to or greater than the amount specified in
     * this call) to the `tokenTransferProxy` in order for this transaction to
     * succeed.
     *
     * @param  issuanceHash the hash of the issuance to which the repayment is being made.
     * @param  amount       the amount that is being repaid.
     * @param  tokenAddress the address of the token in which the repayment is being made.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    makeRepayment(issuanceHash: string, amount: BigNumber, tokenAddress: string, options?: TxData): Promise<string>;
    /**
     * Asynchronously retrieve the amount that has been repaid to date towards a
     * debt agreement.
     *
     * @param  issuanceHash the hash of the debt agreement.
     * @return              the amount that has been repaid to date.
     */
    getValueRepaid(issuanceHash: string): Promise<BigNumber>;
    /**
     * Asynchronously determine the expected value of repayments at a given
     * point in time for a given debt agreement.
     *
     * @param  issuanceHash the hash of a debt agreement.
     * @param  timestamp    the point in time at which the expected value is to be calculated.
     * @return              the expected value of repayments at the point in time specified.
     */
    getExpectedValueRepaid(issuanceHash: string, timestamp: number): Promise<BigNumber>;
    /**
     * Given an issuance hash, returns the amount that is expected to be repaid
     * per repayment period.
     *
     * @example
     * const amount = await dharma.servicing.getExpectedAmountPerRepayment(
     *   "0x069cb8891d9dbf02d89079a77169e0dc8bacda65"
     * );
     * amount.toNumber();
     * => 5500000000
     *
     * @param {string} issuanceHash
     * @returns {Promise<BigNumber>}
     */
    getExpectedAmountPerRepayment(issuanceHash: string): Promise<BigNumber>;
    /**
     * Given an issuanceHash, returns the total amount that the borrower is expected to
     * pay by the end of the associated terms agreement.
     *
     * @param issuanceHash
     */
    getTotalExpectedRepayment(issuanceHash: string): Promise<BigNumber>;
    /**
     * Asynchronously retrieve the `DebtRegistryEntry` instance mapped to the
     * issuance hash specified.
     *
     * @param  issuanceHash the id of the issuance to retrieve.
     * @return              the relevant `DebtRegistryEntry` instance .
     */
    getDebtRegistryEntry(issuanceHash: string): Promise<DebtRegistryEntry>;
    /**
     * Given a debtor's account, returns a list of issuance hashes
     * corresponding to debts which the debtor has issued in the past.
     *
     * @param  account The debtor's account
     * @return         A list of issuance hashes of the debtor's debts
     */
    getDebtsAsync(account: string): Promise<string[]>;
    /**
     * Given a creditor's account, returns a list of issuance hashes
     * corresponding to debts which the creditor has invested in.
     *
     * @param account The creditor's account
     * @return        A list of issuance hashes of the creditor's investments
     */
    getInvestmentsAsync(account: string): Promise<string[]>;
    getRepaymentScheduleAsync(issuanceHash: string): Promise<number[]>;
    private getTxDefaultOptions();
    private adapterForTermsContract(termsContract);
}
