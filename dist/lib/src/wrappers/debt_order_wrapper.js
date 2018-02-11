"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("../../utils/bignumber");
var web3_utils_1 = require("web3-utils");
var constants_1 = require("../../utils/constants");
var DebtOrderWrapper = /** @class */ (function () {
    function DebtOrderWrapper(debtOrder) {
        this.debtOrder = debtOrder;
    }
    DebtOrderWrapper.prototype.getCreditor = function () {
        return this.debtOrder.creditor;
    };
    /**
     * Returns the subset of the debt order we refer to as the "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Issuance commitment associated with this debt order
     */
    DebtOrderWrapper.prototype.getIssuanceCommitment = function () {
        return {
            issuanceVersion: this.debtOrder.issuanceVersion,
            debtor: this.debtOrder.debtor,
            underwriter: this.debtOrder.underwriter,
            underwriterRiskRating: this.debtOrder.underwriterRiskRating,
            termsContract: this.debtOrder.termsContract,
            termsContractParameters: this.debtOrder.termsContractParameters,
            salt: this.debtOrder.salt,
        };
    };
    /**
     * Returns the hash of this debt order's "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Hash of the issuance commitment associated with this debt order.
     */
    DebtOrderWrapper.prototype.getIssuanceCommitmentHash = function () {
        var issuanceCommitment = this.getIssuanceCommitment();
        return web3_utils_1.default.soliditySha3(issuanceCommitment.issuanceVersion, issuanceCommitment.debtor, issuanceCommitment.underwriter, issuanceCommitment.underwriterRiskRating, issuanceCommitment.termsContract, issuanceCommitment.termsContractParameters, issuanceCommitment.salt);
    };
    /**
     * Returns the hash of the debt order in its entirety, in the order defined
     * in the Dharma whitepaper.
     * See https://whitepaper.dharma.io/#debtorcreditor-commitment-hash
     *
     * @return The debt order's hash
     */
    DebtOrderWrapper.prototype.getHash = function () {
        return web3_utils_1.default.soliditySha3(this.debtOrder.kernelVersion, this.getIssuanceCommitmentHash(), this.debtOrder.underwriterFee, this.debtOrder.principalAmount, this.debtOrder.principalToken, this.debtOrder.debtorFee, this.debtOrder.creditorFee, this.debtOrder.relayer, this.debtOrder.relayerFee, this.debtOrder.expirationTimestampInSec);
    };
    /**
     * Returns the debt agreement's unique identifier --
     * an alias for the issuance commitment hash cast to a BigNumber
     *
     * @return Debt agreement id.
     */
    DebtOrderWrapper.prototype.getDebtAgreementId = function () {
        return new bignumber_1.BigNumber(this.getHash());
    };
    /**
     * Returns the payload that a debtor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return Debtor commitment hash
     */
    DebtOrderWrapper.prototype.getDebtorCommitmentHash = function () {
        return this.getHash();
    };
    /**
     * Returns the payload that a creditor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return
     * creditor commitment hash
     */
    DebtOrderWrapper.prototype.getCreditorCommitmentHash = function () {
        return this.getHash();
    };
    /**
     * Returns the payload that an underwriter must sign in order to
     * indicate her consent to the parameters of the debt order, as
     * defined in the Dharma whitepaper.
     *
     * See https://whitepaper.dharma.io/#underwriter-commitment-hash
     *
     * @return Underwriter commitment hash
     */
    DebtOrderWrapper.prototype.getUnderwriterCommitmentHash = function () {
        return web3_utils_1.default.soliditySha3(this.debtOrder.kernelVersion, this.getIssuanceCommitmentHash(), this.debtOrder.underwriterFee, this.debtOrder.principalAmount, this.debtOrder.principalToken, this.debtOrder.expirationTimestampInSec);
    };
    DebtOrderWrapper.prototype.getOrderAddresses = function () {
        return [
            this.debtOrder.issuanceVersion,
            this.debtOrder.debtor,
            this.debtOrder.underwriter,
            this.debtOrder.termsContract,
            this.debtOrder.principalToken,
            this.debtOrder.relayer,
        ];
    };
    DebtOrderWrapper.prototype.getOrderValues = function () {
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
    };
    DebtOrderWrapper.prototype.getOrderBytes32 = function () {
        return [this.debtOrder.termsContractParameters];
    };
    DebtOrderWrapper.prototype.getSignaturesR = function () {
        var _a = this.getSignatures(), debtorSignature = _a[0], creditorSignature = _a[1], underwriterSignature = _a[2];
        return [debtorSignature.r, creditorSignature.r, underwriterSignature.r];
    };
    DebtOrderWrapper.prototype.getSignaturesS = function () {
        var _a = this.getSignatures(), debtorSignature = _a[0], creditorSignature = _a[1], underwriterSignature = _a[2];
        return [debtorSignature.s, creditorSignature.s, underwriterSignature.s];
    };
    DebtOrderWrapper.prototype.getSignaturesV = function () {
        var _a = this.getSignatures(), debtorSignature = _a[0], creditorSignature = _a[1], underwriterSignature = _a[2];
        return [debtorSignature.v, creditorSignature.v, underwriterSignature.v];
    };
    DebtOrderWrapper.prototype.getSignatures = function () {
        var _a = this.debtOrder, debtorSignature = _a.debtorSignature, creditorSignature = _a.creditorSignature, underwriterSignature = _a.underwriterSignature;
        debtorSignature = debtorSignature || constants_1.NULL_ECDSA_SIGNATURE;
        creditorSignature = creditorSignature || constants_1.NULL_ECDSA_SIGNATURE;
        underwriterSignature = underwriterSignature || constants_1.NULL_ECDSA_SIGNATURE;
        return [debtorSignature, creditorSignature, underwriterSignature];
    };
    return DebtOrderWrapper;
}());
exports.DebtOrderWrapper = DebtOrderWrapper;
//# sourceMappingURL=debt_order_wrapper.js.map