// external
import { BigNumber } from "../../utils/bignumber";

// types
import { DebtOrderData, ECDSASignature, IssuanceCommitment } from "../types";

// utils
import { NULL_ECDSA_SIGNATURE } from "../../utils/constants";
import { Web3Utils } from "../../utils/web3_utils";

export class DebtOrderDataWrapper {
    constructor(private debtOrderData: DebtOrderData) {}

    public getCreditor(): string {
        return this.debtOrderData.creditor;
    }

    /**
     * Returns the subset of the debt order we refer to as the "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Issuance commitment associated with this debt order
     */
    public getIssuanceCommitment(): IssuanceCommitment {
        return {
            issuanceVersion: this.debtOrderData.issuanceVersion,
            debtor: this.debtOrderData.debtor,
            underwriter: this.debtOrderData.underwriter,
            underwriterRiskRating: this.debtOrderData.underwriterRiskRating,
            termsContract: this.debtOrderData.termsContract,
            termsContractParameters: this.debtOrderData.termsContractParameters,
            salt: this.debtOrderData.salt,
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
            this.debtOrderData.kernelVersion,
            this.getIssuanceCommitmentHash(),
            this.debtOrderData.underwriterFee,
            this.debtOrderData.principalAmount,
            this.debtOrderData.principalToken,
            this.debtOrderData.debtorFee,
            this.debtOrderData.creditorFee,
            this.debtOrderData.relayer,
            this.debtOrderData.relayerFee,
            this.debtOrderData.expirationTimestampInSec,
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
            this.debtOrderData.kernelVersion,
            this.getIssuanceCommitmentHash(),
            this.debtOrderData.underwriterFee,
            this.debtOrderData.principalAmount,
            this.debtOrderData.principalToken,
            this.debtOrderData.expirationTimestampInSec,
        );
    }

    public getOrderAddresses(): string[] {
        return [
            this.debtOrderData.issuanceVersion,
            this.debtOrderData.debtor,
            this.debtOrderData.underwriter,
            this.debtOrderData.termsContract,
            this.debtOrderData.principalToken,
            this.debtOrderData.relayer,
        ];
    }

    public getOrderValues(): BigNumber[] {
        return [
            this.debtOrderData.underwriterRiskRating,
            this.debtOrderData.salt,
            this.debtOrderData.principalAmount,
            this.debtOrderData.underwriterFee,
            this.debtOrderData.relayerFee,
            this.debtOrderData.creditorFee,
            this.debtOrderData.debtorFee,
            this.debtOrderData.expirationTimestampInSec,
        ];
    }

    public getOrderBytes32(): string[] {
        return [this.debtOrderData.termsContractParameters];
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

    public getDebtOrderData(): DebtOrderData {
        return this.debtOrderData;
    }

    private getSignatures(): ECDSASignature[] {
        let { debtorSignature, creditorSignature, underwriterSignature } = this.debtOrderData;

        debtorSignature = debtorSignature || NULL_ECDSA_SIGNATURE;
        creditorSignature = creditorSignature || NULL_ECDSA_SIGNATURE;
        underwriterSignature = underwriterSignature || NULL_ECDSA_SIGNATURE;

        return [debtorSignature, creditorSignature, underwriterSignature];
    }
}
