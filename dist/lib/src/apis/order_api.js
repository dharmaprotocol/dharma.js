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
var web3_wrapper_1 = require("@0xproject/web3-wrapper");
var wrappers_1 = require("../wrappers");
var invariants_1 = require("../invariants");
var single_line_string_1 = require("single-line-string");
var ORDER_FILL_GAS_MAXIMUM = 500000;
exports.OrderAPIErrors = {
    EXPIRED: function () {
        return (_a = ["Unable to fill debt order because\n                        the order has expired"], _a.raw = ["Unable to fill debt order because\n                        the order has expired"], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_UNDERWRITER_FEE: function () {
        return (_a = ["Debt order has an underwriter\n                        fee but has no assigned underwriter "], _a.raw = ["Debt order has an underwriter\n                        fee but has no assigned underwriter "], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_RELAYER_FEE: function () {
        return (_a = ["Debt order has a relayer fee\n                        but has no assigned relayer"], _a.raw = ["Debt order has a relayer fee\n                        but has no assigned relayer"], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_DEBTOR_FEE: function () {
        return (_a = ["Debt order cannot have a debtor fee\n                        that is greater than the total principal"], _a.raw = ["Debt order cannot have a debtor fee\n                        that is greater than the total principal"], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_FEES: function () {
        return (_a = ["Debt order creditor + debtor fee\n                        does not equal underwriter + relayer fee"], _a.raw = ["Debt order creditor + debtor fee\n                        does not equal underwriter + relayer fee"], single_line_string_1.default(_a));
        var _a;
    },
    ORDER_CANCELLED: function () {
        return (_a = ["Debt order was cancelled"], _a.raw = ["Debt order was cancelled"], single_line_string_1.default(_a));
        var _a;
    },
    CREDITOR_BALANCE_INSUFFICIENT: function () {
        return (_a = ["Creditor balance is insufficient"], _a.raw = ["Creditor balance is insufficient"], single_line_string_1.default(_a));
        var _a;
    },
    CREDITOR_ALLOWANCE_INSUFFICIENT: function () {
        return (_a = ["Creditor allowance is insufficient"], _a.raw = ["Creditor allowance is insufficient"], single_line_string_1.default(_a));
        var _a;
    },
    ISSUANCE_CANCELLED: function () {
        return (_a = ["Issuance was cancelled"], _a.raw = ["Issuance was cancelled"], single_line_string_1.default(_a));
        var _a;
    },
    DEBT_ORDER_ALREADY_ISSUED: function () {
        return (_a = ["Debt order has already been filled"], _a.raw = ["Debt order has already been filled"], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_DEBTOR_SIGNATURE: function () {
        return (_a = ["Debtor signature is not valid for debt order"], _a.raw = ["Debtor signature is not valid for debt order"], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_CREDITOR_SIGNATURE: function () {
        return (_a = ["Creditor signature is not valid for debt order"], _a.raw = ["Creditor signature is not valid for debt order"], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_UNDERWRITER_SIGNATURE: function () {
        return (_a = ["Underwriter signature is not valid for debt order"], _a.raw = ["Underwriter signature is not valid for debt order"], single_line_string_1.default(_a));
        var _a;
    },
};
var OrderAPI = (function () {
    function OrderAPI(web3, contracts) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new invariants_1.Assertions(this.web3);
    }
    OrderAPI.prototype.fillAsync = function (debtOrder, options) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionOptions, _a, debtKernel, debtToken, tokenTransferProxy, debtOrderWrapped;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getTxDefaultOptions()];
                    case 1:
                        transactionOptions = _b.sent();
                        Object.assign(transactionOptions, options);
                        return [4 /*yield*/, this.contracts.loadDharmaContractsAsync(transactionOptions)];
                    case 2:
                        _a = _b.sent(), debtKernel = _a.debtKernel, debtToken = _a.debtToken, tokenTransferProxy = _a.tokenTransferProxy;
                        return [4 /*yield*/, this.assertValidityInvariantsAsync(debtOrder, debtKernel, debtToken)];
                    case 3:
                        _b.sent();
                        this.assertConsensualityInvariants(debtOrder, transactionOptions);
                        return [4 /*yield*/, this.assertExternalBalanceAndAllowanceInvariantsAsync(debtOrder, tokenTransferProxy, transactionOptions)];
                    case 4:
                        _b.sent();
                        debtOrderWrapped = new wrappers_1.DebtOrderWrapper(debtOrder);
                        return [2 /*return*/, debtKernel.fillDebtOrder.sendTransactionAsync(debtOrderWrapped.getCreditor(), debtOrderWrapped.getOrderAddresses(), debtOrderWrapped.getOrderValues(), debtOrderWrapped.getOrderBytes32(), debtOrderWrapped.getSignaturesV(), debtOrderWrapped.getSignaturesR(), debtOrderWrapped.getSignaturesS(), transactionOptions)];
                }
            });
        });
    };
    OrderAPI.prototype.assertValidityInvariantsAsync = function (debtOrder, debtKernel, debtToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.order.validDebtorFee(debtOrder, exports.OrderAPIErrors.INVALID_DEBTOR_FEE());
                        this.assert.order.validUnderwriterFee(debtOrder, exports.OrderAPIErrors.INVALID_UNDERWRITER_FEE());
                        this.assert.order.validRelayerFee(debtOrder, exports.OrderAPIErrors.INVALID_RELAYER_FEE());
                        this.assert.order.validFees(debtOrder, exports.OrderAPIErrors.INVALID_FEES());
                        this.assert.order.notExpired(debtOrder, exports.OrderAPIErrors.EXPIRED());
                        return [4 /*yield*/, this.assert.order.debtOrderNotCancelledAsync(debtOrder, debtKernel, exports.OrderAPIErrors.ORDER_CANCELLED())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.issuanceNotCancelledAsync(debtOrder, debtKernel, exports.OrderAPIErrors.ISSUANCE_CANCELLED())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.notAlreadyIssuedAsync(debtOrder, debtToken, exports.OrderAPIErrors.DEBT_ORDER_ALREADY_ISSUED())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderAPI.prototype.assertConsensualityInvariants = function (debtOrder, transactionOptions) {
        this.assert.order.validDebtorSignature(debtOrder, transactionOptions, exports.OrderAPIErrors.INVALID_DEBTOR_SIGNATURE());
        this.assert.order.validCreditorSignature(debtOrder, transactionOptions, exports.OrderAPIErrors.INVALID_CREDITOR_SIGNATURE());
        this.assert.order.validUnderwriterSignature(debtOrder, transactionOptions, exports.OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE());
    };
    OrderAPI.prototype.assertExternalBalanceAndAllowanceInvariantsAsync = function (debtOrder, tokenTransferProxy, transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var principalToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadERC20TokenAsync(debtOrder.principalToken, transactionOptions)];
                    case 1:
                        principalToken = _a.sent();
                        return [4 /*yield*/, this.assert.order.sufficientCreditorBalanceAsync(debtOrder, principalToken, exports.OrderAPIErrors.CREDITOR_BALANCE_INSUFFICIENT())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.sufficientCreditorAllowanceAsync(debtOrder, principalToken, tokenTransferProxy, exports.OrderAPIErrors.CREDITOR_ALLOWANCE_INSUFFICIENT())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderAPI.prototype.getTxDefaultOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var web3Wrapper, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(this.web3.currentProvider);
                        return [4 /*yield*/, web3Wrapper.getAvailableAddressesAsync()];
                    case 1:
                        accounts = _a.sent();
                        // TODO: Add fault tolerance to scenario in which not addresses are available
                        return [2 /*return*/, {
                                from: accounts[0],
                                gas: ORDER_FILL_GAS_MAXIMUM,
                            }];
                }
            });
        });
    };
    return OrderAPI;
}());
exports.OrderAPI = OrderAPI;
//# sourceMappingURL=order_api.js.map