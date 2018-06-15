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
// External
var singleLineString = require("single-line-string");
var bignumber_1 = require("../../utils/bignumber");
// Wrappers
var wrappers_1 = require("../wrappers");
// Types
var types_1 = require("../types");
// Utils
var constants_1 = require("../../utils/constants");
var TransactionUtils = require("../../utils/transaction_utils");
var invariants_1 = require("../invariants");
var applyNetworkDefaults = TransactionUtils.applyNetworkDefaults;
var ORDER_FILL_GAS_MAXIMUM = 600000;
exports.OrderAPIErrors = {
    EXPIRED: function () {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Unable to fill debt order because\n                        the order has expired"], ["Unable to fill debt order because\n                        the order has expired"])));
    },
    INVALID_UNDERWRITER_FEE: function () {
        return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Debt order has an underwriter\n                        fee but has no assigned underwriter "], ["Debt order has an underwriter\n                        fee but has no assigned underwriter "])));
    },
    INVALID_RELAYER_FEE: function () {
        return singleLineString(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Debt order has a relayer fee\n                        but has no assigned relayer"], ["Debt order has a relayer fee\n                        but has no assigned relayer"])));
    },
    INVALID_DEBTOR_FEE: function () {
        return singleLineString(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Debt order cannot have a debtor fee\n                        that is greater than the total principal"], ["Debt order cannot have a debtor fee\n                        that is greater than the total principal"])));
    },
    INVALID_FEES: function () {
        return singleLineString(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Debt order creditor + debtor fee\n                        does not equal underwriter + relayer fee"], ["Debt order creditor + debtor fee\n                        does not equal underwriter + relayer fee"])));
    },
    ORDER_CANCELLED: function () { return singleLineString(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Debt order was cancelled"], ["Debt order was cancelled"]))); },
    ORDER_ALREADY_CANCELLED: function () { return singleLineString(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Debt order has already been cancelled"], ["Debt order has already been cancelled"]))); },
    UNAUTHORIZED_ORDER_CANCELLATION: function () { return singleLineString(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Debt order can only be cancelled\n                                                            by the specified order's debtor"], ["Debt order can only be cancelled\n                                                            by the specified order's debtor"]))); },
    UNAUTHORIZED_ISSUANCE_CANCELLATION: function () { return singleLineString(templateObject_9 || (templateObject_9 = __makeTemplateObject(["Debt issuance can only be cancelled\n                                                               by either the specified issuance's debtor,\n                                                               or by the underwriter attesting to the\n                                                               issuance's default risk"], ["Debt issuance can only be cancelled\n                                                               by either the specified issuance's debtor,\n                                                               or by the underwriter attesting to the\n                                                               issuance's default risk"]))); },
    CREDITOR_BALANCE_INSUFFICIENT: function () { return singleLineString(templateObject_10 || (templateObject_10 = __makeTemplateObject(["Creditor balance is insufficient"], ["Creditor balance is insufficient"]))); },
    CREDITOR_ALLOWANCE_INSUFFICIENT: function () { return singleLineString(templateObject_11 || (templateObject_11 = __makeTemplateObject(["Creditor allowance is insufficient"], ["Creditor allowance is insufficient"]))); },
    ISSUANCE_CANCELLED: function () { return singleLineString(templateObject_12 || (templateObject_12 = __makeTemplateObject(["Issuance was cancelled"], ["Issuance was cancelled"]))); },
    ISSUANCE_ALREADY_CANCELLED: function () { return singleLineString(templateObject_13 || (templateObject_13 = __makeTemplateObject(["Issuance has already been cancelled"], ["Issuance has already been cancelled"]))); },
    DEBT_ORDER_ALREADY_FILLED: function () { return singleLineString(templateObject_14 || (templateObject_14 = __makeTemplateObject(["Debt order has already been filled"], ["Debt order has already been filled"]))); },
    INVALID_DEBTOR_SIGNATURE: function () { return singleLineString(templateObject_15 || (templateObject_15 = __makeTemplateObject(["Debtor signature is not valid for debt order"], ["Debtor signature is not valid for debt order"]))); },
    INVALID_CREDITOR_SIGNATURE: function () {
        return singleLineString(templateObject_16 || (templateObject_16 = __makeTemplateObject(["Creditor signature is not valid for debt order"], ["Creditor signature is not valid for debt order"])));
    },
    INVALID_UNDERWRITER_SIGNATURE: function () {
        return singleLineString(templateObject_17 || (templateObject_17 = __makeTemplateObject(["Underwriter signature is not valid for debt order"], ["Underwriter signature is not valid for debt order"])));
    },
    ADAPTER_DOES_NOT_CONFORM_TO_INTERFACE: function () {
        return singleLineString(templateObject_18 || (templateObject_18 = __makeTemplateObject(["Supplied adapter does not conform to the\n                         base adapter interface."], ["Supplied adapter does not conform to the\n                         base adapter interface."])));
    },
    INSUFFICIENT_COLLATERALIZER_ALLOWANCE: function () {
        return singleLineString(templateObject_19 || (templateObject_19 = __makeTemplateObject(["Debtor has not granted sufficient allowance for collateral transfer."], ["Debtor has not granted sufficient allowance for collateral transfer."])));
    },
    INSUFFICIENT_COLLATERALIZER_BALANCE: function () {
        return singleLineString(templateObject_20 || (templateObject_20 = __makeTemplateObject(["Debtor does not have sufficient allowance required for collateral transfer."], ["Debtor does not have sufficient allowance required for collateral transfer."])));
    },
};
var OrderAPI = /** @class */ (function () {
    function OrderAPI(web3, contracts, adapters) {
        this.web3 = web3;
        this.contracts = contracts;
        this.adapters = adapters;
        this.assert = new invariants_1.Assertions(web3, this.contracts);
    }
    /**
     * Asynchronously fills a signed debt order.
     *
     * If the order fills successfully, the creditor will be debited the
     * principal amount, the debtor will receive the principal, and the
     * underwriter and the relayer will receive their transaction fees
     * (if applicable).
     *
     * The debt order must be signed by all relevant parties and the associated
     * data must be valid in order for the order to be fulfilled.
     *
     * @param  debtOrderData a valid, signed debt order.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           the hash of the ethereum transaction that fulfilled the debt order.
     */
    OrderAPI.prototype.fillAsync = function (debtOrderData, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txOptions, debtKernel, debtOrderDataWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, ORDER_FILL_GAS_MAXIMUM, options)];
                    case 1:
                        txOptions = _a.sent();
                        return [4 /*yield*/, applyNetworkDefaults(debtOrderData, this.contracts)];
                    case 2:
                        debtOrderData = _a.sent();
                        return [4 /*yield*/, this.assertFillableAsync(debtOrderData, options)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.contracts.loadDharmaContractsAsync(txOptions)];
                    case 4:
                        debtKernel = (_a.sent()).debtKernel;
                        debtOrderDataWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                        return [2 /*return*/, debtKernel.fillDebtOrder.sendTransactionAsync(debtOrderDataWrapped.getCreditor(), debtOrderDataWrapped.getOrderAddresses(), debtOrderDataWrapped.getOrderValues(), debtOrderDataWrapped.getOrderBytes32(), debtOrderDataWrapped.getSignaturesV(), debtOrderDataWrapped.getSignaturesR(), debtOrderDataWrapped.getSignaturesS(), txOptions)];
                }
            });
        });
    };
    /**
     * Throws with error message if a given order is not able to be filled.
     *
     * @param {DebtOrderData} debtOrderData
     * @param {TxData} txOptions
     * @returns {Promise<void>}
     */
    OrderAPI.prototype.assertFillableAsync = function (debtOrderData, txOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, debtKernel, debtToken, tokenTransferProxy;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadDharmaContractsAsync(txOptions)];
                    case 1:
                        _a = _b.sent(), debtKernel = _a.debtKernel, debtToken = _a.debtToken, tokenTransferProxy = _a.tokenTransferProxy;
                        return [4 /*yield*/, this.assertValidityInvariantsAsync(debtOrderData, debtKernel, debtToken)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.assertConsensualityInvariants(debtOrderData, txOptions)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.assertCreditorBalanceAndAllowanceInvariantsAsync(debtOrderData, tokenTransferProxy, txOptions)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.assertValidLoanTerms(debtOrderData)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Asynchronously cancel a debt order if it has yet to be fulfilled.
     *
     * @param  debtOrderData the debt order to be canceled.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           the hash of the resulting Ethereum transaction.
     */
    OrderAPI.prototype.cancelOrderAsync = function (debtOrderData, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txOptions, debtKernel, debtOrderDataWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, ORDER_FILL_GAS_MAXIMUM, options)];
                    case 1:
                        txOptions = _a.sent();
                        return [4 /*yield*/, this.contracts.loadDharmaContractsAsync(txOptions)];
                    case 2:
                        debtKernel = (_a.sent()).debtKernel;
                        return [4 /*yield*/, applyNetworkDefaults(debtOrderData, this.contracts)];
                    case 3:
                        debtOrderData = _a.sent();
                        debtOrderDataWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                        return [4 /*yield*/, this.assert.order.debtOrderNotCancelledAsync(debtOrderData, debtKernel, exports.OrderAPIErrors.ORDER_ALREADY_CANCELLED())];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.issuanceNotCancelledAsync(debtOrderDataWrapped.getIssuanceCommitment(), debtKernel, exports.OrderAPIErrors.ISSUANCE_ALREADY_CANCELLED())];
                    case 5:
                        _a.sent();
                        this.assert.order.senderAuthorizedToCancelOrder(debtOrderData, txOptions, exports.OrderAPIErrors.UNAUTHORIZED_ORDER_CANCELLATION());
                        return [2 /*return*/, debtKernel.cancelDebtOrder.sendTransactionAsync(debtOrderDataWrapped.getOrderAddresses(), debtOrderDataWrapped.getOrderValues(), debtOrderDataWrapped.getOrderBytes32(), txOptions)];
                }
            });
        });
    };
    /**
     * Given a DebtOrder instance, eventually returns true if that DebtOrder has
     * been cancelled. Returns false otherwise.
     *
     * @example
     * await dharma.order.isCancelled(debtOrder);
     * => false
     *
     * @param {DebtOrder} debtOrder
     * @param {TxData} txOptions
     * @returns {Promise<boolean>}
     */
    OrderAPI.prototype.isCancelled = function (debtOrder, txOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var debtKernel, debtOrderWrapped, commitmentHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadDharmaContractsAsync(txOptions)];
                    case 1:
                        debtKernel = (_a.sent()).debtKernel;
                        debtOrderWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrder);
                        commitmentHash = debtOrderWrapped.getDebtorCommitmentHash();
                        return [2 /*return*/, debtKernel.debtOrderCancelled.callAsync(commitmentHash)];
                }
            });
        });
    };
    /**
     * Asynchronously checks whether the order is filled.
     *
     * @param  debtOrderData a debt order.
     * @param  options   any params needed to modify the Ethereum transaction.
     * @return           boolean representing whether the debt order is filled or not.
     */
    OrderAPI.prototype.checkOrderFilledAsync = function (debtOrderData, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txOptions, debtToken, issuanceHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, ORDER_FILL_GAS_MAXIMUM, options)];
                    case 1:
                        txOptions = _a.sent();
                        return [4 /*yield*/, this.contracts.loadDharmaContractsAsync(txOptions)];
                    case 2:
                        debtToken = (_a.sent()).debtToken;
                        return [4 /*yield*/, this.getIssuanceHash(debtOrderData)];
                    case 3:
                        issuanceHash = _a.sent();
                        return [2 /*return*/, debtToken.exists.callAsync(new bignumber_1.BigNumber(issuanceHash))];
                }
            });
        });
    };
    /**
     * Given a complete debt order, asynchronously computes the issuanceHash
     * (alias of debtAgreementId) of the debt order.
     *
     * Note: If the kernelVersion or issuanceVersion are not specified, the
     * current DebtKernel and RepaymentRouter's addresses will be used
     * respectively.
     *
     * @param debtOrderData Debt order for which we'd like to compute the issuance hash
     * @return The debt order's issuanceHash (alias of debtAgreementId).
     */
    OrderAPI.prototype.getIssuanceHash = function (debtOrderData) {
        return __awaiter(this, void 0, void 0, function () {
            var debtOrderDataWrapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, applyNetworkDefaults(debtOrderData, this.contracts)];
                    case 1:
                        debtOrderData = _a.sent();
                        debtOrderDataWrapped = new wrappers_1.DebtOrderDataWrapper(debtOrderData);
                        return [2 /*return*/, debtOrderDataWrapped.getIssuanceCommitmentHash()];
                }
            });
        });
    };
    /**
     * Given an issuanceHash, returns a DebtOrder instance.
     *
     * @param {string} issuanceHash
     * @returns {Promise<DebtOrderData>}
     */
    OrderAPI.prototype.getDebtOrder = function (issuanceHash) {
        return __awaiter(this, void 0, void 0, function () {
            var debtRegistry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadDebtRegistryAsync()];
                    case 1:
                        debtRegistry = _a.sent();
                        return [2 /*return*/, debtRegistry.get.callAsync(issuanceHash)];
                }
            });
        });
    };
    OrderAPI.prototype.deserialize = function (debtOrderDataAsString) {
        var debtOrderData = JSON.parse(debtOrderDataAsString);
        var bigNumberKeys = [
            "creditorFee",
            "debtorFee",
            "expirationTimestampInSec",
            "principalAmount",
            "relayerFee",
            "underwriterFee",
            "underwriterRiskRating",
            "salt",
        ];
        bigNumberKeys.forEach(function (key) {
            debtOrderData[key] = new bignumber_1.BigNumber(debtOrderData[key]);
        });
        return debtOrderData;
    };
    OrderAPI.prototype.serialize = function (debtOrderData) {
        return JSON.stringify(debtOrderData);
    };
    /**
     * Generate a Dharma debt order, given the specified adapter and its associated
     * parameters object.
     *
     * @param adapter The adapter to be leveraged in generating this particular debt
     *                order.
     * @param params  The parameters that will be used by the aforementioned adapter
     *                to generate the debt order.
     * @return Newly generated debt order.
     */
    OrderAPI.prototype.generate = function (adapter, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.assert.adapter.conformsToInterface(adapter, exports.OrderAPIErrors.ADAPTER_DOES_NOT_CONFORM_TO_INTERFACE());
                return [2 /*return*/, adapter.toDebtOrder(params)];
            });
        });
    };
    /**
     * Decode tightly-packed representation of debt agreement's terms in a
     * given debt order into an object with human-interpretable keys and values.
     *
     * NOTE: If the terms contract in the given debt order does not correspond
     *       to any of the built-in adapters bundled into dharma.js, this method
     *       will throw.
     *
     * @param debtOrderData A Dharma debt order
     * @return An object containing human-interpretable terms for the loan
     */
    OrderAPI.prototype.unpackTerms = function (debtOrderData) {
        return __awaiter(this, void 0, void 0, function () {
            var termsContract, termsContractParameters, adapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        termsContract = debtOrderData.termsContract, termsContractParameters = debtOrderData.termsContractParameters;
                        return [4 /*yield*/, this.adapters.getAdapterByTermsContractAddress(termsContract)];
                    case 1:
                        adapter = _a.sent();
                        return [2 /*return*/, adapter.unpackParameters(termsContractParameters)];
                }
            });
        });
    };
    OrderAPI.prototype.cancelIssuanceAsync = function (issuanceCommitment, txOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var debtKernel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadDharmaContractsAsync(txOptions)];
                    case 1:
                        debtKernel = (_a.sent()).debtKernel;
                        return [4 /*yield*/, this.assert.order.issuanceNotCancelledAsync(issuanceCommitment, debtKernel, exports.OrderAPIErrors.ISSUANCE_ALREADY_CANCELLED())];
                    case 2:
                        _a.sent();
                        this.assert.order.senderAuthorizedToCancelIssuance(issuanceCommitment, txOptions, exports.OrderAPIErrors.UNAUTHORIZED_ISSUANCE_CANCELLATION());
                        return [2 /*return*/, debtKernel.cancelIssuance.sendTransactionAsync(issuanceCommitment.issuanceVersion, issuanceCommitment.debtor, issuanceCommitment.termsContract, issuanceCommitment.termsContractParameters, issuanceCommitment.underwriter, issuanceCommitment.underwriterRiskRating, issuanceCommitment.salt, txOptions)];
                }
            });
        });
    };
    /**
     * Validates a given debt order's terms against the appropriate loan order adapter.
     *
     * @param {DebtOrderData} debtOrderData
     * @returns {Promise<void>}
     */
    OrderAPI.prototype.assertValidLoanTerms = function (debtOrderData) {
        return __awaiter(this, void 0, void 0, function () {
            var adapter, loanOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adapters.getAdapterByTermsContractAddress(debtOrderData.termsContract)];
                    case 1:
                        adapter = _a.sent();
                        return [4 /*yield*/, adapter.fromDebtOrder(debtOrderData)];
                    case 2:
                        loanOrder = _a.sent();
                        return [4 /*yield*/, adapter.validateAsync(loanOrder)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderAPI.prototype.assertValidityInvariantsAsync = function (debtOrderData, debtKernel, debtToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.order.validDebtorFee(debtOrderData, exports.OrderAPIErrors.INVALID_DEBTOR_FEE());
                        this.assert.order.validUnderwriterFee(debtOrderData, exports.OrderAPIErrors.INVALID_UNDERWRITER_FEE());
                        this.assert.order.validRelayerFee(debtOrderData, exports.OrderAPIErrors.INVALID_RELAYER_FEE());
                        this.assert.order.validFees(debtOrderData, exports.OrderAPIErrors.INVALID_FEES());
                        return [4 /*yield*/, this.assert.order.notExpired(debtOrderData, exports.OrderAPIErrors.EXPIRED())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.debtOrderNotCancelledAsync(debtOrderData, debtKernel, exports.OrderAPIErrors.ORDER_CANCELLED())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.issuanceNotCancelledAsync(debtOrderData, debtKernel, exports.OrderAPIErrors.ISSUANCE_CANCELLED())];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.notAlreadyIssuedAsync(debtOrderData, debtToken, exports.OrderAPIErrors.DEBT_ORDER_ALREADY_FILLED())];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderAPI.prototype.assertConsensualityInvariants = function (debtOrderData, txOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assert.order.validDebtorSignature(debtOrderData, txOptions, exports.OrderAPIErrors.INVALID_DEBTOR_SIGNATURE())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.validCreditorSignature(debtOrderData, txOptions, exports.OrderAPIErrors.INVALID_CREDITOR_SIGNATURE())];
                    case 2:
                        _a.sent();
                        if (!(debtOrderData.underwriter && debtOrderData.underwriter !== constants_1.NULL_ADDRESS)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.assert.order.validUnderwriterSignature(debtOrderData, txOptions, exports.OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE())];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderAPI.prototype.assertCreditorBalanceAndAllowanceInvariantsAsync = function (debtOrderData, tokenTransferProxy, txOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var principalToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadERC20TokenAsync(debtOrderData.principalToken, txOptions)];
                    case 1:
                        principalToken = _a.sent();
                        return [4 /*yield*/, this.assert.order.sufficientCreditorBalanceAsync(debtOrderData, principalToken, exports.OrderAPIErrors.CREDITOR_BALANCE_INSUFFICIENT())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.sufficientCreditorAllowanceAsync(debtOrderData, principalToken, tokenTransferProxy, exports.OrderAPIErrors.CREDITOR_ALLOWANCE_INSUFFICIENT())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrderAPI;
}());
exports.OrderAPI = OrderAPI;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20;
//# sourceMappingURL=order_api.js.map