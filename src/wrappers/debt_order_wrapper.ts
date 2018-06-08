// External libraries
import { BigNumber } from "../../utils/bignumber";

// Types
import { DebtOrder, ECDSASignature, IssuanceCommitment } from "../types";

// Utils
import { NULL_ECDSA_SIGNATURE } from "../../utils/constants";
import { Web3Utils } from "../../utils/web3_utils";

/**
 * Decorate a given debt order with various higher level functions.
 */
export class DebtOrderWrapper {
    constructor(private debtOrder: DebtOrder) {}

    /**
     * Returns the address representing the creditor of the debt order.
     *
     * @returns {string}
     */
    public getCreditor(): string {
        return this.debtOrder.creditor;
    }

    /**
     * Returns the subset of the debt order we refer to as the "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Issuance commitment associated with this debt order
     */
    public getIssuanceCommitment(): IssuanceCommitment {
        return {
            issuanceVersion: this.debtOrder.issuanceVersion,
            debtor: this.debtOrder.debtor,
            underwriter: this.debtOrder.underwriter,
            underwriterRiskRating: this.debtOrder.underwriterRiskRating,
            termsContract: this.debtOrder.termsContract,
            termsContractParameters: this.debtOrder.termsContractParameters,
            salt: this.debtOrder.salt,
        };
    }

    /**
     * Returns the hash of this debt order's "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Hash of the issuance commitment associated with this debt order.
     */
    public getIssuanceCommitmentHash(): string {
        const issuanceCommitment = this.getIssuanceCommitment();
        return Web3Utils.soliditySHA3(
            issuanceCommitment.issuanceVersion,
            issuanceCommitment.debtor,
            issuanceCommitment.underwriter,
            issuanceCommitment.underwriterRiskRating,
            issuanceCommitment.termsContract,
            issuanceCommitment.termsContractParameters,
            issuanceCommitment.salt,
        );
    }

    /**
     * Returns the hash of the debt order in its entirety, in the order defined
     * in the Dharma whitepaper.
     * See https://whitepaper.dharma.io/#debtorcreditor-commitment-hash
     *
     * @return The debt order's hash
     */
    public getHash(): string {
        return Web3Utils.soliditySHA3(
            this.debtOrder.kernelVersion,
            this.getIssuanceCommitmentHash(),
            this.debtOrder.underwriterFee,
            this.debtOrder.principalAmount,
            this.debtOrder.principalToken,
            this.debtOrder.debtorFee,
            this.debtOrder.creditorFee,
            this.debtOrder.relayer,
            this.debtOrder.relayerFee,
            this.debtOrder.expirationTimestampInSec,
        );
    }

    /**
     * Returns the debt agreement's unique identifier --
     * an alias for the issuance commitment hash cast to a BigNumber
     *
     * @return Debt agreement id.
     */
    public getDebtAgreementId(): BigNumber {
        return new BigNumber(this.getHash());
    }

    /**
     * Returns the payload that a debtor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return Debtor commitment hash
     */
    public getDebtorCommitmentHash(): string {
        return this.getHash();
    }

    /**
     * Returns the payload that a creditor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return
     * creditor commitment hash
     */
    public getCreditorCommitmentHash(): string {
        return this.getHash();
    }

    /**
     * Returns the payload that an underwriter must sign in order to
     * indicate her consent to the parameters of the debt order, as
     * defined in the Dharma whitepaper.
     *
     * See https://whitepaper.dharma.io/#underwriter-commitment-hash
     *
     * @return Underwriter commitment hash
     */
    public getUnderwriterCommitmentHash(): string {
        return Web3Utils.soliditySHA3(
            this.debtOrder.kernelVersion,
            this.getIssuanceCommitmentHash(),
            this.debtOrder.underwriterFee,
            this.debtOrder.principalAmount,
            this.debtOrder.principalToken,
            this.debtOrder.expirationTimestampInSec,
        );
    }

    public getOrderAddresses(): string[] {
        return [
            this.debtOrder.issuanceVersion,
            this.debtOrder.debtor,
            this.debtOrder.underwriter,
            this.debtOrder.termsContract,
            this.debtOrder.principalToken,
            this.debtOrder.relayer,
        ];
    }

    public getOrderValues(): BigNumber[] {
        return [
            this.debtOrder.underwriterRiskRating,
            this.debtOrder.salt,
            this.debtOrder.principalAmount,
            this.debtOrder.underwriterFee,
            this.debtOrder.relayerFee,
            this.debtOrder.creditorFee,
            this.debtOrder.debtorFee,
            this.debtOrder.expirationTimestampInSec,
        ];
    }

    public getOrderBytes32(): string[] {
        return [this.debtOrder.termsContractParameters];
    }

    public getSignaturesR(): string[] {
        const [debtorSignature, creditorSignature, underwriterSignature] = this.getSignatures();

        return [debtorSignature.r, creditorSignature.r, underwriterSignature.r];
    }

    public getSignaturesS(): string[] {
        const [debtorSignature, creditorSignature, underwriterSignature] = this.getSignatures();

        return [debtorSignature.s, creditorSignature.s, underwriterSignature.s];
    }

    public getSignaturesV(): number[] {
        const [debtorSignature, creditorSignature, underwriterSignature] = this.getSignatures();

        return [debtorSignature.v, creditorSignature.v, underwriterSignature.v];
    }

    /*
     * Getters
     */

    public getDebtOrder(): DebtOrder {
        return this.debtOrder;
    }

    private getSignatures(): ECDSASignature[] {
        let { debtorSignature, creditorSignature, underwriterSignature } = this.debtOrder;

        debtorSignature = debtorSignature || NULL_ECDSA_SIGNATURE;
        creditorSignature = creditorSignature || NULL_ECDSA_SIGNATURE;
        underwriterSignature = underwriterSignature || NULL_ECDSA_SIGNATURE;

        return [debtorSignature, creditorSignature, underwriterSignature];
    }
}
