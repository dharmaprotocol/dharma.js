"use strict";
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
var bignumber_1 = require("utils/bignumber");
var constants_1 = require("utils/constants");
var wrappers_1 = require("src/wrappers");
var signature_utils_1 = require("utils/signature_utils");
var moment_1 = require("moment");
var OrderAssertions = (function () {
    function OrderAssertions(web3) {
        this.web3 = web3;
    }
    /*
        Validity Invariants
    */
    // principal >= debtor fee
    OrderAssertions.prototype.validDebtorFee = function (debtOrder, errorMessage) {
        if (debtOrder.principalAmount.lt(debtOrder.debtorFee)) {
            throw new Error(errorMessage);
        }
    };
    // If no underwriter is specified, underwriter fees must be 0
    OrderAssertions.prototype.validUnderwriterFee = function (debtOrder, errorMessage) {
        if ((!debtOrder.underwriter || debtOrder.underwriter === constants_1.NULL_ADDRESS) &&
            debtOrder.underwriterFee.gt(0)) {
            throw new Error(errorMessage);
        }
    };
    // If no relayer is specified, relayer fees must be 0
    OrderAssertions.prototype.validRelayerFee = function (debtOrder, errorMessage) {
        if ((!debtOrder.relayer || debtOrder.relayer === constants_1.NULL_ADDRESS) &&
            debtOrder.relayerFee.gt(0)) {
            throw new Error(errorMessage);
        }
    };
    // creditorFee + debtorFee == relayerFee + underwriterFee
    OrderAssertions.prototype.validFees = function (debtOrder, errorMessage) {
        var feesContributed = debtOrder.creditorFee.add(debtOrder.debtorFee);
        var feesDistributed = debtOrder.relayerFee.add(debtOrder.underwriterFee);
        if (!feesContributed.eq(feesDistributed)) {
            throw new Error(errorMessage);
        }
    };
    // Debt order must not be expired
    OrderAssertions.prototype.notExpired = function (debtOrder, errorMessage) {
        if (debtOrder.expirationTimestampInSec.lt(moment_1.default().unix())) {
            throw new Error(errorMessage);
        }
    };
    // Debt cannot already have been issued
    OrderAssertions.prototype.notAlreadyIssuedAsync = function (debtOrder, debtToken, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderWrapped, getOwnerAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debtOrderWrapped = new wrappers_1.DebtOrderWrapper(debtOrder);
                        return [4 /*yield*/, debtToken.ownerOf.callAsync(new bignumber_1.BigNumber(debtOrderWrapped.getIssuanceCommitmentHash()))];
                    case 1:
                        getOwnerAddress = _a.sent();
                        if (getOwnerAddress !== constants_1.NULL_ADDRESS) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Debt order cannot have been cancelled
    OrderAssertions.prototype.debtOrderNotCancelledAsync = function (debtOrder, debtKernel, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debtOrderWrapped = new wrappers_1.DebtOrderWrapper(debtOrder);
                        return [4 /*yield*/, debtKernel.debtOrderCancelled.callAsync(debtOrderWrapped.getDebtorCommitmentHash())];
                    case 1:
                        if (_a.sent()) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Issuance cannot have been cancelled
    OrderAssertions.prototype.issuanceNotCancelledAsync = function (debtOrder, debtKernel, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debtOrderWrapped = new wrappers_1.DebtOrderWrapper(debtOrder);
                        return [4 /*yield*/, debtKernel.issuanceCancelled.callAsync(debtOrderWrapped.getIssuanceCommitmentHash())];
                    case 1:
                        if (_a.sent()) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
        Consensuality Invariants
    */
    // If message sender not debtor, debtor signature must be valid
    OrderAssertions.prototype.validDebtorSignature = function (debtOrder, transactionOptions, errorMessage) {
        var debtOrderWrapped = new wrappers_1.DebtOrderWrapper(debtOrder);
        if (transactionOptions.from !== debtOrder.debtor) {
            if (!signature_utils_1.signatureUtils.isValidSignature(debtOrderWrapped.getDebtorCommitmentHash(), debtOrder.debtorSignature, debtOrder.debtor)) {
                throw new Error(errorMessage);
            }
        }
    };
    // If message sender not creditor, creditor signature must be valid
    OrderAssertions.prototype.validCreditorSignature = function (debtOrder, transactionOptions, errorMessage) {
        var debtOrderWrapped = new wrappers_1.DebtOrderWrapper(debtOrder);
        if (transactionOptions.from !== debtOrder.creditor) {
            if (!signature_utils_1.signatureUtils.isValidSignature(debtOrderWrapped.getCreditorCommitmentHash(), debtOrder.creditorSignature, debtOrder.creditor)) {
                throw new Error(errorMessage);
            }
        }
    };
    // If message sender not underwriter AND underwriter exists, underwriter signature must be valid
    OrderAssertions.prototype.validUnderwriterSignature = function (debtOrder, transactionOptions, errorMessage) {
        var debtOrderWrapped = new wrappers_1.DebtOrderWrapper(debtOrder);
        if (transactionOptions.from !== debtOrder.underwriter) {
            if (!signature_utils_1.signatureUtils.isValidSignature(debtOrderWrapped.getUnderwriterCommitmentHash(), debtOrder.underwriterSignature, debtOrder.underwriter)) {
                throw new Error(errorMessage);
            }
        }
    };
    /*
        External invariants
    */
    // Creditor balance > principal + fee
    OrderAssertions.prototype.sufficientCreditorBalanceAsync = function (debtOrder, principalToken, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var creditorBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, principalToken.balanceOf.callAsync(debtOrder.creditor)];
                    case 1:
                        creditorBalance = _a.sent();
                        if (creditorBalance.lt(debtOrder.principalAmount.add(debtOrder.creditorFee))) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Creditor Allowance to TokenTransferProxy >= principal + creditorFee
    OrderAssertions.prototype.sufficientCreditorAllowanceAsync = function (debtOrder, principalToken, tokenTransferProxy, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var creditorAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, principalToken.allowance.callAsync(debtOrder.creditor, tokenTransferProxy.address)];
                    case 1:
                        creditorAllowance = _a.sent();
                        if (creditorAllowance.lt(debtOrder.principalAmount.add(debtOrder.creditorFee))) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrderAssertions;
}());
exports.OrderAssertions = OrderAssertions;
//# sourceMappingURL=order.js.map