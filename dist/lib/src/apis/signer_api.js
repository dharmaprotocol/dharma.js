"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var promisify = require("tiny-promisify");
var debt_order_wrapper_1 = require("../wrappers/debt_order_wrapper");
var signature_utils_1 = require("../../utils/signature_utils");
var invariants_1 = require("../invariants");
var singleLineString = require("single-line-string");
var constants_1 = require("../../utils/constants");
exports.SignerAPIErrors = {
    INVALID_SIGNING_KEY: function (unavailableKey) {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Unable to sign debt order because private key\n                         associated with ", " is invalid\n                         or unavailable"], ["Unable to sign debt order because private key\n                         associated with ", " is invalid\n                         or unavailable"])), unavailableKey);
    },
};
var SignerAPI = /** @class */ (function () {
    function SignerAPI(web3) {
        this.web3 = web3;
        this.assert = new invariants_1.Assertions(this.web3);
    }
    /**
     * Given a debt order, produce ECDSA signature of the debtor commitment hash using the debtor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the debtor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    SignerAPI.prototype.asDebtor = function (debtOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var wrappedDebtOrder;
            return __generator(this, function (_a) {
                wrappedDebtOrder = new debt_order_wrapper_1.DebtOrderWrapper(debtOrder);
                return [2 /*return*/, this.signPayloadWithAddress(wrappedDebtOrder.getDebtorCommitmentHash(), debtOrder.debtor)];
            });
        });
    };
    /**
     * Given a debt order, produce ECDSA signature of the creditor commitment hash using the creditor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the creditor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    SignerAPI.prototype.asCreditor = function (debtOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var wrappedDebtOrder;
            return __generator(this, function (_a) {
                wrappedDebtOrder = new debt_order_wrapper_1.DebtOrderWrapper(debtOrder);
                return [2 /*return*/, this.signPayloadWithAddress(wrappedDebtOrder.getCreditorCommitmentHash(), debtOrder.creditor)];
            });
        });
    };
    /**
     * Given a debt order, produce ECDSA signature of the underwriter commitment hash using the underwriter's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the underwriter's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    SignerAPI.prototype.asUnderwriter = function (debtOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var wrappedDebtOrder;
            return __generator(this, function (_a) {
                wrappedDebtOrder = new debt_order_wrapper_1.DebtOrderWrapper(debtOrder);
                return [2 /*return*/, this.signPayloadWithAddress(wrappedDebtOrder.getUnderwriterCommitmentHash(), debtOrder.underwriter)];
            });
        });
    };
    /**
     * Generic internal function for producing an ECDSA signature for a given payload from
     * a given address.
     *
     * @param payload The payload we wish to sign
     * @param address The address with which we wish to sign it
     * @return The ECDSA signature of the payload as signed by the address
     */
    SignerAPI.prototype.signPayloadWithAddress = function (payload, address) {
        return __awaiter(this, void 0, void 0, function () {
            var signPromise, rawSignatureHex, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.account.notNull(address, exports.SignerAPIErrors.INVALID_SIGNING_KEY(address));
                        signPromise = promisify(this.web3.eth.sign);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, signPromise(address, payload, { from: address })];
                    case 2:
                        rawSignatureHex = _a.sent();
                        return [2 /*return*/, signature_utils_1.signatureUtils.parseSignatureHexAsRSV(rawSignatureHex)];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1.message.includes(constants_1.WEB3_ERROR_INVALID_ADDRESS) ||
                            e_1.message.includes(constants_1.WEB3_ERROR_ACCOUNT_NOT_FOUND) ||
                            e_1.message.includes(constants_1.WEB3_ERROR_NO_PRIVATE_KEY)) {
                            throw new Error(exports.SignerAPIErrors.INVALID_SIGNING_KEY(address));
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SignerAPI;
}());
exports.SignerAPI = SignerAPI;
var templateObject_1;
//# sourceMappingURL=signer_api.js.map