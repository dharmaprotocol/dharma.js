"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// External libraries
var bignumber_1 = require("../../utils/bignumber");
// Utils
var constants_1 = require("../../utils/constants");
var web3_utils_1 = require("../../utils/web3_utils");
/**
 * Decorate a given debt order with various higher level functions.
 */
var DebtOrderDataWrapper = /** @class */ (function () {
    function DebtOrderDataWrapper(debtOrderData) {
        this.debtOrderData = debtOrderData;
    }
    /**
     * Returns the address representing the creditor of the debt order.
     *
     * @returns {string}
     */
    DebtOrderDataWrapper.prototype.getCreditor = function () {
        return this.debtOrderData.creditor;
    };
    /**
     * Returns the subset of the debt order we refer to as the "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Issuance commitment associated with this debt order
     */
    DebtOrderDataWrapper.prototype.getIssuanceCommitment = function () {
        return {
            issuanceVersion: this.debtOrderData.issuanceVersion,
            debtor: this.debtOrderData.debtor,
            underwriter: this.debtOrderData.underwriter,
            underwriterRiskRating: this.debtOrderData.underwriterRiskRating,
            termsContract: this.debtOrderData.termsContract,
            termsContractParameters: this.debtOrderData.termsContractParameters,
            salt: this.debtOrderData.salt,
        };
    };
    /**
     * Returns the hash of this debt order's "Issuance Commitment".
     * See https://whitepaper.dharma.io/#debt-issuance-commitments
     *
     * @return Hash of the issuance commitment associated with this debt order.
     */
    DebtOrderDataWrapper.prototype.getIssuanceCommitmentHash = function () {
        var issuanceCommitment = this.getIssuanceCommitment();
        return web3_utils_1.Web3Utils.soliditySHA3(issuanceCommitment.issuanceVersion, issuanceCommitment.debtor, issuanceCommitment.underwriter, issuanceCommitment.underwriterRiskRating, issuanceCommitment.termsContract, issuanceCommitment.termsContractParameters, issuanceCommitment.salt);
    };
    /**
     * Returns the hash of the debt order in its entirety, in the order defined
     * in the Dharma whitepaper.
     * See https://whitepaper.dharma.io/#debtorcreditor-commitment-hash
     *
     * @return The debt order's hash
     */
    DebtOrderDataWrapper.prototype.getHash = function () {
        return web3_utils_1.Web3Utils.soliditySHA3(this.debtOrderData.kernelVersion, this.getIssuanceCommitmentHash(), this.debtOrderData.underwriterFee, this.debtOrderData.principalAmount, this.debtOrderData.principalToken, this.debtOrderData.debtorFee, this.debtOrderData.creditorFee, this.debtOrderData.relayer, this.debtOrderData.relayerFee, this.debtOrderData.expirationTimestampInSec);
    };
    /**
     * Returns the debt agreement's unique identifier --
     * an alias for the issuance commitment hash cast to a BigNumber
     *
     * @return Debt agreement id.
     */
    DebtOrderDataWrapper.prototype.getDebtAgreementId = function () {
        return new bignumber_1.BigNumber(this.getHash());
    };
    /**
     * Returns the payload that a debtor must sign in order to
     * indicate her consent to the parameters of the debt order --
     * which is, currently, the debt order's hash.
     *
     * @return Debtor commitment hash
     */
    DebtOrderDataWrapper.prototype.getDebtorCommitmentHash = function () {
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
    DebtOrderDataWrapper.prototype.getCreditorCommitmentHash = function () {
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
    DebtOrderDataWrapper.prototype.getUnderwriterCommitmentHash = function () {
        return web3_utils_1.Web3Utils.soliditySHA3(this.debtOrderData.kernelVersion, this.getIssuanceCommitmentHash(), this.debtOrderData.underwriterFee, this.debtOrderData.principalAmount, this.debtOrderData.principalToken, this.debtOrderData.expirationTimestampInSec);
    };
    DebtOrderDataWrapper.prototype.getOrderAddresses = function () {
        return [
            this.debtOrderData.issuanceVersion,
            this.debtOrderData.debtor,
            this.debtOrderData.underwriter,
            this.debtOrderData.termsContract,
            this.debtOrderData.principalToken,
            this.debtOrderData.relayer,
        ];
    };
    DebtOrderDataWrapper.prototype.getOrderValues = function () {
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
    };
    DebtOrderDataWrapper.prototype.getOrderBytes32 = function () {
        return [this.debtOrderData.termsContractParameters];
    };
    DebtOrderDataWrapper.prototype.getSignaturesR = function () {
        var _a = this.getSignatures(), debtorSignature = _a[0], creditorSignature = _a[1], underwriterSignature = _a[2];
        return [debtorSignature.r, creditorSignature.r, underwriterSignature.r];
    };
    DebtOrderDataWrapper.prototype.getSignaturesS = function () {
        var _a = this.getSignatures(), debtorSignature = _a[0], creditorSignature = _a[1], underwriterSignature = _a[2];
        return [debtorSignature.s, creditorSignature.s, underwriterSignature.s];
    };
    DebtOrderDataWrapper.prototype.getSignaturesV = function () {
        var _a = this.getSignatures(), debtorSignature = _a[0], creditorSignature = _a[1], underwriterSignature = _a[2];
        return [debtorSignature.v, creditorSignature.v, underwriterSignature.v];
    };
    /*
     * Getters
     */
    DebtOrderDataWrapper.prototype.getDebtOrderData = function () {
        return this.debtOrderData;
    };
    DebtOrderDataWrapper.prototype.getSignatures = function () {
        var _a = this.debtOrderData, debtorSignature = _a.debtorSignature, creditorSignature = _a.creditorSignature, underwriterSignature = _a.underwriterSignature;
        debtorSignature = debtorSignature || constants_1.NULL_ECDSA_SIGNATURE;
        creditorSignature = creditorSignature || constants_1.NULL_ECDSA_SIGNATURE;
        underwriterSignature = underwriterSignature || constants_1.NULL_ECDSA_SIGNATURE;
        return [debtorSignature, creditorSignature, underwriterSignature];
    };
    return DebtOrderDataWrapper;
}());
exports.DebtOrderDataWrapper = DebtOrderDataWrapper;
//# sourceMappingURL=debt_order_data_wrapper.js.map