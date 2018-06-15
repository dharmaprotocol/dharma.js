"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// External libraries
var _ = require("lodash");
var omit = require("lodash.omit");
var singleLineString = require("single-line-string");
// Utils
var bignumber_1 = require("../../utils/bignumber");
var constants_1 = require("../../utils/constants");
var TransactionUtils = require("../../utils/transaction_utils");
var web3_utils_1 = require("../../utils/web3_utils");
// Invariants
var invariants_1 = require("../invariants");
// Types
var types_1 = require("../types");
var collateralized_simple_interest_loan_terms_1 = require("./collateralized_simple_interest_loan_terms");
var simple_interest_loan_terms_1 = require("./simple_interest_loan_terms");
var SECONDS_IN_DAY = 60 * 60 * 24;
var TRANSFER_GAS_MAXIMUM = 200000;
exports.CollateralizerAdapterErrors = {
    INVALID_TOKEN_INDEX: function (tokenIndex) {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Token Registry does not track a token at index\n                         ", "."], ["Token Registry does not track a token at index\n                         ", "."])), tokenIndex.toString());
    },
    COLLATERAL_AMOUNT_MUST_BE_POSITIVE: function () {
        return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Collateral amount must be greater than zero."], ["Collateral amount must be greater than zero."])));
    },
    COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM: function () {
        return singleLineString(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Collateral amount exceeds maximum value of 2^92 - 1."], ["Collateral amount exceeds maximum value of 2^92 - 1."])));
    },
    INSUFFICIENT_COLLATERAL_TOKEN_ALLOWANCE: function () {
        return "Debtor has not granted sufficient allowance for collateral transfer.";
    },
    INSUFFICIENT_COLLATERAL_TOKEN_BALANCE: function () {
        return "Debtor does not have sufficient allowance required for collateral transfer.";
    },
    GRACE_PERIOD_IS_NEGATIVE: function () { return singleLineString(templateObject_4 || (templateObject_4 = __makeTemplateObject(["The grace period cannot be negative."], ["The grace period cannot be negative."]))); },
    GRACE_PERIOD_EXCEEDS_MAXIMUM: function () {
        return singleLineString(templateObject_5 || (templateObject_5 = __makeTemplateObject(["The grace period exceeds the maximum value of 2^8 - 1"], ["The grace period exceeds the maximum value of 2^8 - 1"])));
    },
    INVALID_DECIMAL_VALUE: function () { return singleLineString(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Values cannot be expressed as decimals."], ["Values cannot be expressed as decimals."]))); },
    MISMATCHED_TOKEN_SYMBOL: function (tokenAddress, symbol) {
        return singleLineString(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Terms contract parameters are invalid for the given debt order.\n                         Token at address ", " does not\n                         correspond to specified token with symbol ", ""], ["Terms contract parameters are invalid for the given debt order.\n                         Token at address ", " does not\n                         correspond to specified token with symbol ", ""])), tokenAddress, symbol);
    },
    MISMATCHED_TERMS_CONTRACT: function (termsContractAddress) {
        return singleLineString(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Terms contract at address ", " is not\n                         a CollateralizedSimpleInterestTermsContract.  As such, this adapter will\n                         not interface with the terms contract as expected"], ["Terms contract at address ", " is not\n                         a CollateralizedSimpleInterestTermsContract.  As such, this adapter will\n                         not interface with the terms contract as expected"])), termsContractAddress);
    },
    COLLATERAL_NOT_FOUND: function (agreementId) {
        return singleLineString(templateObject_9 || (templateObject_9 = __makeTemplateObject(["Collateral was not found for given agreement ID ", ". Make sure\n                         that the agreement ID is correct, and that the collateral has not already\n                         been withdrawn."], ["Collateral was not found for given agreement ID ", ". Make sure\n                         that the agreement ID is correct, and that the collateral has not already\n                         been withdrawn."])), agreementId);
    },
    DEBT_NOT_YET_REPAID: function (agreementId) {
        return singleLineString(templateObject_10 || (templateObject_10 = __makeTemplateObject(["Debt has not been fully repaid for loan with agreement ID ", ""], ["Debt has not been fully repaid for loan with agreement ID ", ""])), agreementId);
    },
    LOAN_NOT_IN_DEFAULT_FOR_GRACE_PERIOD: function (agreementId) {
        return singleLineString(templateObject_11 || (templateObject_11 = __makeTemplateObject(["Loan with agreement ID ", " is not currently in a state of\n                        default when adjusted for grace period"], ["Loan with agreement ID ", " is not currently in a state of\n                        default when adjusted for grace period"])), agreementId);
    },
};
var CollateralizedSimpleInterestLoanAdapter = /** @class */ (function () {
    function CollateralizedSimpleInterestLoanAdapter(web3, contractsAPI) {
        this.assert = new invariants_1.Assertions(web3, contractsAPI);
        this.web3Utils = new web3_utils_1.Web3Utils(web3);
        this.contractsAPI = contractsAPI;
        this.simpleInterestLoanTerms = new simple_interest_loan_terms_1.SimpleInterestLoanTerms(web3, contractsAPI);
        this.collateralizedLoanTerms = new collateralized_simple_interest_loan_terms_1.CollateralizedLoanTerms(web3, contractsAPI);
    }
    CollateralizedSimpleInterestLoanAdapter.prototype.toDebtOrder = function (collateralizedSimpleInterestLoanOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var 
            // destructure simple interest loan order params.
            principalTokenSymbol, principalAmount, interestRate, amortizationUnit, termLength, 
            // destructure collateralized loan order params.
            collateralTokenSymbol, collateralAmount, gracePeriodInDays, principalToken, principalTokenIndex, collateralTokenIndex, collateralizedContract, debtOrderData, packedParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.collateralizedSimpleInterestLoanOrder("collateralizedSimpleInterestLoanOrder", collateralizedSimpleInterestLoanOrder);
                        principalTokenSymbol = collateralizedSimpleInterestLoanOrder.principalTokenSymbol, principalAmount = collateralizedSimpleInterestLoanOrder.principalAmount, interestRate = collateralizedSimpleInterestLoanOrder.interestRate, amortizationUnit = collateralizedSimpleInterestLoanOrder.amortizationUnit, termLength = collateralizedSimpleInterestLoanOrder.termLength, collateralTokenSymbol = collateralizedSimpleInterestLoanOrder.collateralTokenSymbol, collateralAmount = collateralizedSimpleInterestLoanOrder.collateralAmount, gracePeriodInDays = collateralizedSimpleInterestLoanOrder.gracePeriodInDays;
                        return [4 /*yield*/, this.contractsAPI.loadTokenBySymbolAsync(principalTokenSymbol)];
                    case 1:
                        principalToken = _a.sent();
                        return [4 /*yield*/, this.contractsAPI.getTokenIndexBySymbolAsync(principalTokenSymbol)];
                    case 2:
                        principalTokenIndex = _a.sent();
                        return [4 /*yield*/, this.contractsAPI.getTokenIndexBySymbolAsync(collateralTokenSymbol)];
                    case 3:
                        collateralTokenIndex = _a.sent();
                        return [4 /*yield*/, this.contractsAPI.loadCollateralizedSimpleInterestTermsContract()];
                    case 4:
                        collateralizedContract = _a.sent();
                        debtOrderData = omit(collateralizedSimpleInterestLoanOrder, [
                            // omit the simple interest parameters that will be packed
                            // into the `termsContractParameters`.
                            "principalTokenSymbol",
                            "interestRate",
                            "amortizationUnit",
                            "termLength",
                            // omit the collateralized parameters that will be packed into
                            // the `termsContractParameters`.
                            "collateralTokenSymbol",
                            "collateralAmount",
                            "gracePeriodInDays",
                        ]);
                        packedParams = this.packParameters({
                            principalTokenIndex: principalTokenIndex,
                            principalAmount: principalAmount,
                            interestRate: interestRate,
                            amortizationUnit: amortizationUnit,
                            termLength: termLength,
                        }, {
                            collateralTokenIndex: collateralTokenIndex,
                            collateralAmount: collateralAmount,
                            gracePeriodInDays: gracePeriodInDays,
                        });
                        debtOrderData = __assign({}, debtOrderData, { principalToken: principalToken.address, termsContract: collateralizedContract.address, termsContractParameters: packedParams });
                        return [2 /*return*/, TransactionUtils.applyNetworkDefaults(debtOrderData, this.contractsAPI)];
                }
            });
        });
    };
    /**
     * Validates that the basic invariants have been met for a given
     * CollateralizedSimpleInterestLoanOrder.
     *
     * @param {CollateralizedSimpleInterestLoanOrder} loanOrder
     * @returns {Promise<void>}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.validateAsync = function (loanOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var unpackedParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unpackedParams = this.unpackParameters(loanOrder.termsContractParameters);
                        this.collateralizedLoanTerms.assertValidParams(unpackedParams);
                        return [4 /*yield*/, this.assertCollateralBalanceAndAllowanceInvariantsAsync(loanOrder)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Given a valid debt order, returns a promise for a CollateralizedSimpleInterestLoanOrder,
     * which includes the DebtOrder information as well as as the contract terms (see documentation
     * on the `CollateralizedSimpleInterestLoanOrder` interface for more information.)
     *
     * @param {DebtOrderData} debtOrderData
     * @returns {Promise<CollateralizedSimpleInterestLoanOrder>}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.fromDebtOrder = function (debtOrderData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, principalTokenIndex, collateralTokenIndex, params, principalTokenSymbol, collateralTokenSymbol;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.assert.schema.debtOrderWithTermsSpecified("debtOrder", debtOrderData);
                        _a = this.unpackParameters(debtOrderData.termsContractParameters), principalTokenIndex = _a.principalTokenIndex, collateralTokenIndex = _a.collateralTokenIndex, params = __rest(_a, ["principalTokenIndex", "collateralTokenIndex"]);
                        return [4 /*yield*/, this.contractsAPI.getTokenSymbolByIndexAsync(principalTokenIndex)];
                    case 1:
                        principalTokenSymbol = _b.sent();
                        return [4 /*yield*/, this.contractsAPI.getTokenSymbolByIndexAsync(collateralTokenIndex)];
                    case 2:
                        collateralTokenSymbol = _b.sent();
                        // Assert that the principal token corresponds to the symbol we've unpacked.
                        return [4 /*yield*/, this.assertTokenCorrespondsToSymbol(debtOrderData.principalToken, principalTokenSymbol)];
                    case 3:
                        // Assert that the principal token corresponds to the symbol we've unpacked.
                        _b.sent();
                        return [2 /*return*/, __assign({}, debtOrderData, { principalTokenSymbol: principalTokenSymbol,
                                collateralTokenSymbol: collateralTokenSymbol }, params)];
                }
            });
        });
    };
    /**
     * Given a valid DebtRegistryEntry, returns a CollateralizedSimpleInterestLoanOrder.
     *
     * @param {DebtRegistryEntry} entry
     * @returns {Promise<CollateralizedSimpleInterestLoanOrder>}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.fromDebtRegistryEntry = function (entry) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, principalTokenIndex, collateralTokenIndex, params, principalTokenSymbol, collateralTokenSymbol, loanOrder;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.assertIsCollateralizedSimpleInterestTermsContract(entry.termsContract)];
                    case 1:
                        _b.sent();
                        _a = this.unpackParameters(entry.termsContractParameters), principalTokenIndex = _a.principalTokenIndex, collateralTokenIndex = _a.collateralTokenIndex, params = __rest(_a, ["principalTokenIndex", "collateralTokenIndex"]);
                        return [4 /*yield*/, this.contractsAPI.getTokenSymbolByIndexAsync(principalTokenIndex)];
                    case 2:
                        principalTokenSymbol = _b.sent();
                        return [4 /*yield*/, this.contractsAPI.getTokenSymbolByIndexAsync(collateralTokenIndex)];
                    case 3:
                        collateralTokenSymbol = _b.sent();
                        loanOrder = __assign({ principalTokenSymbol: principalTokenSymbol,
                            collateralTokenSymbol: collateralTokenSymbol }, params);
                        return [2 /*return*/, loanOrder];
                }
            });
        });
    };
    /**
     * Given a valid DebtRegistryEntry, returns an array of repayment dates (as unix timestamps.)
     *
     * @example
     *   adapter.getRepaymentSchedule(debtEntry);
     *   => [1521506879]
     *
     * @param {DebtRegistryEntry} debtEntry
     * @returns {number[]}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.getRepaymentSchedule = function (debtEntry) {
        var termsContractParameters = debtEntry.termsContractParameters, issuanceBlockTimestamp = debtEntry.issuanceBlockTimestamp;
        var _a = this.unpackParameters(termsContractParameters), termLength = _a.termLength, amortizationUnit = _a.amortizationUnit;
        return new types_1.RepaymentSchedule(amortizationUnit, termLength, issuanceBlockTimestamp.toNumber()).toArray();
    };
    /**
     * Seizes the collateral from the given debt agreement and
     * transfers it to the debt agreement's beneficiary.
     *
     * @param {string} agreementId
     * @param {TxData} options
     * @returns {Promise<string>} The transaction's hash.
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.seizeCollateralAsync = function (agreementId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultOptions, transactionOptions, collateralizerContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.bytes32("agreementId", agreementId);
                        return [4 /*yield*/, this.getTxDefaultOptions()];
                    case 1:
                        defaultOptions = _a.sent();
                        transactionOptions = _.assign(defaultOptions, options);
                        return [4 /*yield*/, this.assertDebtAgreementExists(agreementId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.assertCollateralSeizeable(agreementId)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.contractsAPI.loadCollateralizerAsync()];
                    case 4:
                        collateralizerContract = _a.sent();
                        return [2 /*return*/, collateralizerContract.seizeCollateral.sendTransactionAsync(agreementId, transactionOptions)];
                }
            });
        });
    };
    /**
     * Returns collateral to the debt agreement's original collateralizer
     * if and only if the debt agreement's term has lapsed and
     * the total expected repayment value has been repaid.
     *
     * @param {string} agreementId
     * @param {TxData} options
     * @returns {Promise<string>} The transaction's hash.
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.returnCollateralAsync = function (agreementId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultOptions, transactionOptions, collateralizerContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.bytes32("agreementId", agreementId);
                        return [4 /*yield*/, this.assertDebtAgreementExists(agreementId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.assertCollateralReturnable(agreementId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getTxDefaultOptions()];
                    case 3:
                        defaultOptions = _a.sent();
                        transactionOptions = _.assign(defaultOptions, options);
                        return [4 /*yield*/, this.contractsAPI.loadCollateralizerAsync()];
                    case 4:
                        collateralizerContract = _a.sent();
                        return [2 /*return*/, collateralizerContract.returnCollateral.sendTransactionAsync(agreementId, transactionOptions)];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.unpackParameters = function (termsContractParameters) {
        var simpleInterestParams = this.simpleInterestLoanTerms.unpackParameters(termsContractParameters);
        var collateralizedParams = this.collateralizedLoanTerms.unpackParameters(termsContractParameters);
        return __assign({}, simpleInterestParams, collateralizedParams);
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.packParameters = function (simpleTermsParams, collateralTermsParams) {
        var packedSimpleInterestParams = this.simpleInterestLoanTerms.packParameters(simpleTermsParams);
        var packedCollateralizedParams = this.collateralizedLoanTerms.packParameters(collateralTermsParams);
        // Our final output is the perfect union of the packed simple interest params and the packed
        // collateralized params.
        return packedSimpleInterestParams.substr(0, 39) + packedCollateralizedParams.substr(39, 27);
    };
    /**
     * Given an agreement ID for a valid collateralized debt agreement, returns true if the
     * collateral is returnable according to the terms of the agreement - I.E. the debt
     * has been repaid, and the collateral has not already been withdrawn.
     *
     * @example
     *  await adapter.canReturnCollateral(
     *     "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.canReturnCollateral = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.assertCollateralReturnable(agreementId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Given an agreement ID for a valid collateralized debt agreement, returns true if the
     * collateral can be seized by the creditor, according to the terms of the agreement. Collateral
     * is seizable if the collateral has not been withdrawn yet, and the loan has been in a state
     * of default for a duration of time greater than the grace period.
     *
     * @example
     *  await adapter.canSeizeCollateral(
     *     "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.canSeizeCollateral = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.assertCollateralSeizeable(agreementId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns true if the collateral associated with the given agreement ID
     * has already been seized or returned.
     *
     * @example
     *  await adapter.isCollateralWithdrawn(
     *    "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.isCollateralWithdrawn = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var collateralizerContract, collateralizerAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractsAPI.loadCollateralizerAsync()];
                    case 1:
                        collateralizerContract = _a.sent();
                        return [4 /*yield*/, collateralizerContract.agreementToCollateralizer.callAsync(agreementId)];
                    case 2:
                        collateralizerAddress = _a.sent();
                        return [2 /*return*/, collateralizerAddress === constants_1.NULL_ADDRESS];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.assertTokenCorrespondsToSymbol = function (tokenAddress, symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var doesTokenCorrespondToSymbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractsAPI.doesTokenCorrespondToSymbol(tokenAddress, symbol)];
                    case 1:
                        doesTokenCorrespondToSymbol = _a.sent();
                        if (!doesTokenCorrespondToSymbol) {
                            throw new Error(exports.CollateralizerAdapterErrors.MISMATCHED_TOKEN_SYMBOL(tokenAddress, symbol));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.assertIsCollateralizedSimpleInterestTermsContract = function (termsContractAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var collateralizedSimpleInterestTermsContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractsAPI.loadCollateralizedSimpleInterestTermsContract()];
                    case 1:
                        collateralizedSimpleInterestTermsContract = _a.sent();
                        if (termsContractAddress !== collateralizedSimpleInterestTermsContract.address) {
                            throw new Error(exports.CollateralizerAdapterErrors.MISMATCHED_TERMS_CONTRACT(termsContractAddress));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.assertDebtAgreementExists = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractsAPI.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        return [2 /*return*/, this.assert.debtAgreement.exists(agreementId, debtTokenContract, exports.CollateralizerAdapterErrors.COLLATERAL_NOT_FOUND(agreementId))];
                }
            });
        });
    };
    /**
     * Collateral is seizable if the collateral has not been withdrawn yet, and the
     * loan has been in a state of default for a duration of time greater than the grace period.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.assertCollateralSeizeable = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var debtRegistry, _a, termsContract, termsContractParameters, unpackedParams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.contractsAPI.loadDebtRegistryAsync()];
                    case 1:
                        debtRegistry = _b.sent();
                        return [4 /*yield*/, debtRegistry.getTerms.callAsync(agreementId)];
                    case 2:
                        _a = _b.sent(), termsContract = _a[0], termsContractParameters = _a[1];
                        unpackedParams = this.unpackParameters(termsContractParameters);
                        this.collateralizedLoanTerms.assertValidParams(unpackedParams);
                        return [4 /*yield*/, this.assertCollateralNotWithdrawn(agreementId)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.assertDefaultedForGracePeriod(agreementId, unpackedParams.gracePeriodInDays)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Collateral is returnable if the debt is repaid, and the collateral has not yet
     * been withdrawn.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    CollateralizedSimpleInterestLoanAdapter.prototype.assertCollateralReturnable = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var debtRegistry, _a, termsContract, termsContractParameters, unpackedParams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.contractsAPI.loadDebtRegistryAsync()];
                    case 1:
                        debtRegistry = _b.sent();
                        return [4 /*yield*/, debtRegistry.getTerms.callAsync(agreementId)];
                    case 2:
                        _a = _b.sent(), termsContract = _a[0], termsContractParameters = _a[1];
                        unpackedParams = this.unpackParameters(termsContractParameters);
                        this.collateralizedLoanTerms.assertValidParams(unpackedParams);
                        return [4 /*yield*/, this.assertCollateralNotWithdrawn(agreementId)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.assertDebtRepaid(agreementId)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.assertDebtRepaid = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var debtRepaid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.debtRepaid(agreementId)];
                    case 1:
                        debtRepaid = _a.sent();
                        if (!debtRepaid) {
                            throw new Error(exports.CollateralizerAdapterErrors.DEBT_NOT_YET_REPAID(agreementId));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.assertDefaultedForGracePeriod = function (agreementId, gracePeriod) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultedForGracePeriod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.defaultedForGracePeriod(agreementId, gracePeriod)];
                    case 1:
                        defaultedForGracePeriod = _a.sent();
                        if (!defaultedForGracePeriod) {
                            throw new Error(exports.CollateralizerAdapterErrors.LOAN_NOT_IN_DEFAULT_FOR_GRACE_PERIOD(agreementId));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.defaultedForGracePeriod = function (agreementId, gracePeriod) {
        return __awaiter(this, void 0, void 0, function () {
            var termsContract, repaymentToDate, currentTime, timeAdjustedForGracePeriod, minimumRepayment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractsAPI.loadCollateralizedSimpleInterestTermsContract()];
                    case 1:
                        termsContract = _a.sent();
                        return [4 /*yield*/, termsContract.getValueRepaidToDate.callAsync(agreementId)];
                    case 2:
                        repaymentToDate = _a.sent();
                        return [4 /*yield*/, this.web3Utils.getCurrentBlockTime()];
                    case 3:
                        currentTime = _a.sent();
                        timeAdjustedForGracePeriod = new bignumber_1.BigNumber(currentTime).sub(gracePeriod.mul(SECONDS_IN_DAY));
                        return [4 /*yield*/, termsContract.getExpectedRepaymentValue.callAsync(agreementId, timeAdjustedForGracePeriod)];
                    case 4:
                        minimumRepayment = _a.sent();
                        return [2 /*return*/, repaymentToDate.lt(minimumRepayment)];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.assertCollateralNotWithdrawn = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var collateralWithdrawn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isCollateralWithdrawn(agreementId)];
                    case 1:
                        collateralWithdrawn = _a.sent();
                        if (collateralWithdrawn) {
                            throw new Error(exports.CollateralizerAdapterErrors.COLLATERAL_NOT_FOUND(agreementId));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.assertCollateralBalanceAndAllowanceInvariantsAsync = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var collateralAmount, collateralTokenSymbol, collateralToken, tokenTransferProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collateralAmount = order.collateralAmount, collateralTokenSymbol = order.collateralTokenSymbol;
                        return [4 /*yield*/, this.contractsAPI.loadTokenBySymbolAsync(collateralTokenSymbol)];
                    case 1:
                        collateralToken = _a.sent();
                        return [4 /*yield*/, this.contractsAPI.loadTokenTransferProxyAsync()];
                    case 2:
                        tokenTransferProxy = _a.sent();
                        return [4 /*yield*/, this.assert.order.sufficientCollateralizerAllowanceAsync(order, collateralToken, collateralAmount, tokenTransferProxy, exports.CollateralizerAdapterErrors.INSUFFICIENT_COLLATERAL_TOKEN_ALLOWANCE())];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.assert.order.sufficientCollateralizerBalanceAsync(order, collateralToken, collateralAmount, exports.CollateralizerAdapterErrors.INSUFFICIENT_COLLATERAL_TOKEN_BALANCE())];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.debtRepaid = function (agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            var termsContract, repaymentToDate, termEnd, expectedTotalRepayment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractsAPI.loadCollateralizedSimpleInterestTermsContract()];
                    case 1:
                        termsContract = _a.sent();
                        return [4 /*yield*/, termsContract.getValueRepaidToDate.callAsync(agreementId)];
                    case 2:
                        repaymentToDate = _a.sent();
                        return [4 /*yield*/, termsContract.getTermEndTimestamp.callAsync(agreementId)];
                    case 3:
                        termEnd = _a.sent();
                        return [4 /*yield*/, termsContract.getExpectedRepaymentValue.callAsync(agreementId, termEnd)];
                    case 4:
                        expectedTotalRepayment = _a.sent();
                        return [2 /*return*/, repaymentToDate.gte(expectedTotalRepayment)];
                }
            });
        });
    };
    CollateralizedSimpleInterestLoanAdapter.prototype.getTxDefaultOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3Utils.getAvailableAddressesAsync()];
                    case 1:
                        accounts = _a.sent();
                        // TODO: Add fault tolerance to scenario in which not addresses are available
                        return [2 /*return*/, {
                                from: accounts[0],
                                gas: TRANSFER_GAS_MAXIMUM,
                            }];
                }
            });
        });
    };
    return CollateralizedSimpleInterestLoanAdapter;
}());
exports.CollateralizedSimpleInterestLoanAdapter = CollateralizedSimpleInterestLoanAdapter;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
//# sourceMappingURL=collateralized_simple_interest_loan_adapter.js.map