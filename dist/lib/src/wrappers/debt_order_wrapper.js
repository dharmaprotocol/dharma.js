"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("../../utils/bignumber");
var web3_utils_1 = require("../../utils/web3_utils");
var constants_1 = require("../../utils/constants");
var moment = require("moment");
var assignDefaults = require("lodash.defaults");
var DEFAULTS = {
    kernelVersion: constants_1.NULL_ADDRESS,
    issuanceVersion: constants_1.NULL_ADDRESS,
    principalAmount: new bignumber_1.BigNumber(0),
    principalToken: constants_1.NULL_ADDRESS,
    debtor: constants_1.NULL_ADDRESS,
    debtorFee: new bignumber_1.BigNumber(0),
    creditor: constants_1.NULL_ADDRESS,
    creditorFee: new bignumber_1.BigNumber(0),
    relayer: constants_1.NULL_ADDRESS,
    relayerFee: new bignumber_1.BigNumber(0),
    underwriter: constants_1.NULL_ADDRESS,
    underwriterFee: new bignumber_1.BigNumber(0),
    underwriterRiskRating: new bignumber_1.BigNumber(0),
    termsContract: constants_1.NULL_ADDRESS,
    termsContractParameters: constants_1.NULL_BYTES32,
    expirationTimestampInSec: new bignumber_1.BigNumber(moment()
        .add(30, "days")
        .unix()),
    salt: new bignumber_1.BigNumber(0),
    debtorSignature: constants_1.NULL_ECDSA_SIGNATURE,
    creditorSignature: constants_1.NULL_ECDSA_SIGNATURE,
    underWriterSignature: constants_1.NULL_ECDSA_SIGNATURE,
};
var DebtOrderWrapper = /** @class */ (function () {
    function DebtOrderWrapper(debtOrder) {
        this.debtOrder = Object.assign({}, debtOrder);
        assignDefaults(this.debtOrder, DEFAULTS);
    }
    DebtOrderWrapper.applyNetworkDefaults = function (debtOrder, contracts) {
        return __awaiter(this, void 0, void 0, function () {
            var debtKernel, repaymentRouter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contracts.loadDebtKernelAsync()];
                    case 1:
                        debtKernel = _a.sent();
                        return [4 /*yield*/, contracts.loadRepaymentRouterAsync()];
                    case 2:
                        repaymentRouter = _a.sent();
                        return [2 /*return*/, new DebtOrderWrapper(__assign({ kernelVersion: debtOrder.kernelVersion || debtKernel.address, issuanceVersion: debtOrder.issuanceVersion || repaymentRouter.address }, debtOrder))];
                }
            });
        });
    };
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
        return web3_utils_1.Web3Utils.soliditySHA3(issuanceCommitment.issuanceVersion, issuanceCommitment.debtor, issuanceCommitment.underwriter, issuanceCommitment.underwriterRiskRating, issuanceCommitment.termsContract, issuanceCommitment.termsContractParameters, issuanceCommitment.salt);
    };
    /**
     * Returns the hash of the debt order in its entirety, in the order defined
     * in the Dharma whitepaper.
     * See https://whitepaper.dharma.io/#debtorcreditor-commitment-hash
     *
     * @return The debt order's hash
     */
    DebtOrderWrapper.prototype.getHash = function () {
        return web3_utils_1.Web3Utils.soliditySHA3(this.debtOrder.kernelVersion, this.getIssuanceCommitmentHash(), this.debtOrder.underwriterFee, this.debtOrder.principalAmount, this.debtOrder.principalToken, this.debtOrder.debtorFee, this.debtOrder.creditorFee, this.debtOrder.relayer, this.debtOrder.relayerFee, this.debtOrder.expirationTimestampInSec);
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
        return web3_utils_1.Web3Utils.soliditySHA3(this.debtOrder.kernelVersion, this.getIssuanceCommitmentHash(), this.debtOrder.underwriterFee, this.debtOrder.principalAmount, this.debtOrder.principalToken, this.debtOrder.expirationTimestampInSec);
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
    /*
     * Getters
     */
    DebtOrderWrapper.prototype.getDebtOrder = function () {
        return this.debtOrder;
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