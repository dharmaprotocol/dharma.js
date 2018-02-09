import { BigNumber } from "utils/bignumber";
import { DebtOrder, IssuanceCommitment } from "../types";
export declare class DebtOrderWrapper {
    private debtOrder;
    constructor(debtOrder: DebtOrder);
    getCreditor(): string;
    /**
     * Returns the subset of the debt order we refer to as the "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Issuance commitment associated with this debt order
     */
    getIssuanceCommitment(): IssuanceCommitment;
    /**
     * Returns the hash of this debt order's "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Hash of the issuance commitment associated with this debt order.
     */
    getIssuanceCommitmentHash(): string;
    /**
     * Returns the hash of the debt order in its entirety, in the order defined
     * in the Dharma whitepaper.
     * See https://whitepaper.dharma.io/#debtorcreditor-commitment-hash
     *
     * @return The debt order's hash
     */
    getHash(): string;
    /**
     * Returns the debt agreement's unique identifier --
     * an alias for the issuance commitment hash cast to a BigNumber
     *
     * @return Debt agreement id.
     */
    getDebtAgreementId(): BigNumber;
    /**
     * Returns the payload that a debtor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return Debtor commitment hash
     */
    getDebtorCommitmentHash(): string;
    /**
     * Returns the payload that a creditor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return
     * creditor commitment hash
     */
    getCreditorCommitmentHash(): string;
    /**
     * Returns the payload that an underwriter must sign in order to
     * indicate her consent to the parameters of the debt order, as
     * defined in the Dharma whitepaper.
     *
     * See https://whitepaper.dharma.io/#underwriter-commitment-hash
     *
     * @return Underwriter commitment hash
     */
    getUnderwriterCommitmentHash(): string;
    getOrderAddresses(): string[];
    getOrderValues(): BigNumber[];
    getOrderBytes32(): string[];
    getSignaturesR(): string[];
    getSignaturesS(): string[];
    getSignaturesV(): number[];
    private getSignatures();
}
