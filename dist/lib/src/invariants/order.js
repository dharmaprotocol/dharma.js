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
// Utils
var bignumber_1 = require("../../utils/bignumber");
var constants_1 = require("../../utils/constants");
var signature_utils_1 = require("../../utils/signature_utils");
var TransactionUtils = require("../../utils/transaction_utils");
var web3_utils_1 = require("../../utils/web3_utils");
// Wrappers
var wrappers_1 = require("../wrappers");
var applyNetworkDefaults = TransactionUtils.applyNetworkDefaults;
var BLOCK_TIME_ESTIMATE_SECONDS = 14;
var OrderAssertions = /** @class */ (function () {
    function OrderAssertions(web3, contracts) {
        this.web3Utils = new web3_utils_1.Web3Utils(web3);
        this.contracts = contracts;
    }
    /*
        Validity Invariants
    */
    // principal >= debtor fee
    OrderAssertions.prototype.validDebtorFee = function (debtOrderData, errorMessage) {
        if (debtOrderData.principalAmount.lt(debtOrderData.debtorFee)) {
            throw new Error(errorMessage);
        }
    };
    // If no underwriter is specified, underwriter fees must be 0
    OrderAssertions.prototype.validUnderwriterFee = function (debtOrderData, errorMessage) {
        if ((!debtOrderData.underwriter || debtOrderData.underwriter === constants_1.NULL_ADDRESS) &&
            debtOrderData.underwriterFee.gt(0)) {
            throw new Error(errorMessage);
        }
    };
    // If no relayer is specified, relayer fees must be 0
    OrderAssertions.prototype.validRelayerFee = function (debtOrderData, errorMessage) {
        if ((!debtOrderData.relayer || debtOrderData.relayer === constants_1.NULL_ADDRESS) &&
            debtOrderData.relayerFee.gt(0)) {
            throw new Error(errorMessage);
        }
    };
    // creditorFee + debtorFee == relayerFee + underwriterFee
    OrderAssertions.prototype.validFees = function (debtOrderData, errorMessage) {
        var feesContributed = debtOrderData.creditorFee.plus(debtOrderData.debtorFee);
        var feesDistributed = debtOrderData.relayerFee.plus(debtOrderData.underwriterFee);
        if (!feesContributed.eq(feesDistributed)) {
            throw new Error(errorMessage);
        }
    };
    // Debt order must not be expired
    OrderAssertions.prototype.notExpired = function (debtOrderData, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var latestBlockTime, approximateNextBlockTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3Utils.getCurrentBlockTime()];
                    case 1:
                        latestBlockTime = _a.sent();
                        approximateNextBlockTime = latestBlockTime + BLOCK_TIME_ESTIMATE_SECONDS;
                        if (debtOrderData.expirationTimestampInSec.lt(approximateNextBlockTime)) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Debt cannot already have been issued
    OrderAssertions.prototype.notAlreadyIssuedAsync = function (debtOrderData, debtToken, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderDataWrapped, orderIssued;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, applyNetworkDefaults(debtOrderData, this.contracts)];
                    case 1:
                        debtOrderData = _a.sent();
                        debtOrderDataWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                        return [4 /*yield*/, debtToken.exists.callAsync(new bignumber_1.BigNumber(debtOrderDataWrapped.getIssuanceCommitmentHash()))];
                    case 2:
                        orderIssued = _a.sent();
                        if (orderIssued) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * If the given DebtOrder is cancelled, throws the given errorMessage.
     *
     * @param {debtOrderData} DebtOrderData
     * @param {DebtKernelContract} debtKernel
     * @param {string} errorMessage
     * @returns {Promise<void>}
     */
    OrderAssertions.prototype.debtOrderNotCancelledAsync = function (debtOrderData, debtKernel, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var orderCancelled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isCancelled(debtOrderData, debtKernel)];
                    case 1:
                        orderCancelled = _a.sent();
                        if (orderCancelled) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Issuance cannot have been cancelled
    OrderAssertions.prototype.issuanceNotCancelledAsync = function (debtOrderData, debtKernel, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderDataWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, applyNetworkDefaults(debtOrderData, this.contracts)];
                    case 1:
                        debtOrderData = _a.sent();
                        debtOrderDataWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                        return [4 /*yield*/, debtKernel.issuanceCancelled.callAsync(debtOrderDataWrapped.getIssuanceCommitmentHash())];
                    case 2:
                        if (_a.sent()) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderAssertions.prototype.senderAuthorizedToCancelOrder = function (debtOrderData, transactionOptions, errorMessage) {
        if (debtOrderData.debtor !== transactionOptions.from) {
            throw new Error(errorMessage);
        }
    };
    OrderAssertions.prototype.senderAuthorizedToCancelIssuance = function (debtOrderData, transactionOptions, errorMessage) {
        if (debtOrderData.debtor !== transactionOptions.from &&
            debtOrderData.underwriter !== transactionOptions.from) {
            throw new Error(errorMessage);
        }
    };
    /*
        Consensuality Invariants
    */
    // If message sender not debtor, debtor signature must be valid
    OrderAssertions.prototype.validDebtorSignature = function (debtOrderData, transactionOptions, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderDataWrapped;
            return __generator(this, function (_a) {
                debtOrderDataWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                if (transactionOptions.from !== debtOrderData.debtor) {
                    if (!signature_utils_1.SignatureUtils.isValidSignature(debtOrderDataWrapped.getDebtorCommitmentHash(), debtOrderData.debtorSignature, debtOrderData.debtor)) {
                        throw new Error(errorMessage);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    // If message sender not creditor, creditor signature must be valid
    OrderAssertions.prototype.validCreditorSignature = function (debtOrderData, transactionOptions, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderDataWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, applyNetworkDefaults(debtOrderData, this.contracts)];
                    case 1:
                        debtOrderData = _a.sent();
                        debtOrderDataWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                        if (transactionOptions.from !== debtOrderData.creditor) {
                            if (!signature_utils_1.SignatureUtils.isValidSignature(debtOrderDataWrapped.getCreditorCommitmentHash(), debtOrderData.creditorSignature, debtOrderData.creditor)) {
                                throw new Error(errorMessage);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // If message sender not underwriter AND underwriter exists, underwriter signature must be valid
    OrderAssertions.prototype.validUnderwriterSignature = function (debtOrderData, transactionOptions, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderDataWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, applyNetworkDefaults(debtOrderData, this.contracts)];
                    case 1:
                        debtOrderData = _a.sent();
                        debtOrderDataWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                        if (transactionOptions.from !== debtOrderData.underwriter) {
                            if (!signature_utils_1.SignatureUtils.isValidSignature(debtOrderDataWrapped.getUnderwriterCommitmentHash(), debtOrderData.underwriterSignature, debtOrderData.underwriter)) {
                                throw new Error(errorMessage);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
        External invariants
    */
    // Creditor balance > principal + fee
    OrderAssertions.prototype.sufficientCreditorBalanceAsync = function (debtOrderData, principalToken, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var creditorBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, principalToken.balanceOf.callAsync(debtOrderData.creditor)];
                    case 1:
                        creditorBalance = _a.sent();
                        if (creditorBalance.lt(debtOrderData.principalAmount.plus(debtOrderData.creditorFee))) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Creditor Allowance to TokenTransferProxy >= principal + creditorFee
    OrderAssertions.prototype.sufficientCreditorAllowanceAsync = function (debtOrderData, principalToken, tokenTransferProxy, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var creditorAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, principalToken.allowance.callAsync(debtOrderData.creditor, tokenTransferProxy.address)];
                    case 1:
                        creditorAllowance = _a.sent();
                        if (creditorAllowance.lt(debtOrderData.principalAmount.plus(debtOrderData.creditorFee))) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
        For collateralized debt orders.
     */
    OrderAssertions.prototype.sufficientCollateralizerAllowanceAsync = function (debtOrderData, collateralToken, collateralAmount, tokenTransferProxy, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var collateralizerAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collateralToken.allowance.callAsync(debtOrderData.debtor, tokenTransferProxy.address)];
                    case 1:
                        collateralizerAllowance = _a.sent();
                        if (collateralizerAllowance.lt(collateralAmount)) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderAssertions.prototype.sufficientCollateralizerBalanceAsync = function (debtOrderData, collateralToken, collateralAmount, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var collateralizerBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collateralToken.balanceOf.callAsync(debtOrderData.debtor)];
                    case 1:
                        collateralizerBalance = _a.sent();
                        if (collateralizerBalance.lt(collateralAmount)) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Given a DebtOrder instance, eventually returns true if that DebtOrder has
     * been cancelled. Returns false otherwise.
     *
     * @example
     * await dharma.order.isCancelled(debtOrder, debtKernel);
     * => false
     *
     * @param {DebtOrderData} debtOrderData
     * @param {DebtKernelContract} debtKernel
     * @returns {Promise<boolean>}
     */
    OrderAssertions.prototype.isCancelled = function (debtOrderData, debtKernel) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, applyNetworkDefaults(debtOrderData, this.contracts)];
                    case 1:
                        debtOrderData = _a.sent();
                        debtOrderWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                        return [2 /*return*/, debtKernel.debtOrderCancelled.callAsync(debtOrderWrapped.getDebtorCommitmentHash())];
                }
            });
        });
    };
    return OrderAssertions;
}());
exports.OrderAssertions = OrderAssertions;
//# sourceMappingURL=order.js.map