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
Object.defineProperty(exports, "__esModule", { value: true });
// External Libraries
var omit = require("lodash.omit");
var singleLineString = require("single-line-string");
var constants_1 = require("../../utils/constants");
var TransactionUtils = require("../../utils/transaction_utils");
// Types
var types_1 = require("../types");
var simple_interest_loan_terms_1 = require("./simple_interest_loan_terms");
var invariants_1 = require("../invariants");
var MAX_TERM_LENGTH_VALUE_HEX = "0xffff";
var MAX_INTEREST_RATE_PRECISION = 4;
exports.SimpleInterestAdapterErrors = {
    INVALID_TOKEN_INDEX: function (tokenIndex) {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Token Registry does not track a token at index\n                         ", "."], ["Token Registry does not track a token at index\n                         ", "."])), tokenIndex.toString());
    },
    INVALID_PRINCIPAL_AMOUNT: function () {
        return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Principal amount must be a whole number greater than 0\n                         and less than 2^96 - 1."], ["Principal amount must be a whole number greater than 0\n                         and less than 2^96 - 1."])));
    },
    INVALID_INTEREST_RATE: function () {
        return singleLineString(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Interest amount cannot be negative,\n                         greater than 1677.7216, or have more than\n                         ", " decimal places."], ["Interest amount cannot be negative,\n                         greater than 1677.7216, or have more than\n                         ", " decimal places."])), MAX_INTEREST_RATE_PRECISION);
    },
    INVALID_AMORTIZATION_UNIT_TYPE: function () {
        return singleLineString(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Amortization unit must be of type HOURS, DAYS,\n                         WEEKS, MONTHS, or YEARS."], ["Amortization unit must be of type HOURS, DAYS,\n                         WEEKS, MONTHS, or YEARS."])));
    },
    INVALID_TERM_LENGTH: function () {
        return singleLineString(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Term length value cannot be negative or greater\n                         than ", ""], ["Term length value cannot be negative or greater\n                         than ", ""])), parseInt(MAX_TERM_LENGTH_VALUE_HEX, 16));
    },
    MISMATCHED_TOKEN_SYMBOL: function (principalTokenIndex, symbol) {
        return singleLineString(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Terms contract parameters are invalid for the given debt order.\n                         Principal token at index ", ", specified\n                         in the terms contract, does not correspond to specified token\n                         with symbol ", ""], ["Terms contract parameters are invalid for the given debt order.\n                         Principal token at index ", ", specified\n                         in the terms contract, does not correspond to specified token\n                         with symbol ", ""])), principalTokenIndex.toString(), symbol);
    },
    MISMATCHED_TERMS_CONTRACT: function (termsContract) {
        return singleLineString(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Terms contract at address ", " is not\n                         a SimpleInterestTermsContract.  As such, this adapter will not\n                         interface with the terms contract as expected"], ["Terms contract at address ", " is not\n                         a SimpleInterestTermsContract.  As such, this adapter will not\n                         interface with the terms contract as expected"])), termsContract);
    },
};
var SimpleInterestLoanAdapter = /** @class */ (function () {
    function SimpleInterestLoanAdapter(web3, contracts) {
        this.assert = new invariants_1.Assertions(web3, contracts);
        this.contracts = contracts;
        this.termsContractInterface = new simple_interest_loan_terms_1.SimpleInterestLoanTerms(web3, contracts);
    }
    /**
     * Asynchronously generates a Dharma debt order given an instance of a
     * simple interest loan order.
     *
     * @param  simpleInterestLoanOrder a simple interest loan order instance.
     * @return the generated Dharma debt order.
     */
    SimpleInterestLoanAdapter.prototype.toDebtOrder = function (simpleInterestLoanOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var principalTokenSymbol, principalAmount, interestRate, amortizationUnit, termLength, principalToken, principalTokenIndex, simpleInterestTermsContract, debtOrderData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.simpleInterestLoanOrder("simpleInterestLoanOrder", simpleInterestLoanOrder);
                        principalTokenSymbol = simpleInterestLoanOrder.principalTokenSymbol, principalAmount = simpleInterestLoanOrder.principalAmount, interestRate = simpleInterestLoanOrder.interestRate, amortizationUnit = simpleInterestLoanOrder.amortizationUnit, termLength = simpleInterestLoanOrder.termLength;
                        return [4 /*yield*/, this.contracts.loadTokenBySymbolAsync(principalTokenSymbol)];
                    case 1:
                        principalToken = _a.sent();
                        return [4 /*yield*/, this.contracts.getTokenIndexBySymbolAsync(principalTokenSymbol)];
                    case 2:
                        principalTokenIndex = _a.sent();
                        return [4 /*yield*/, this.contracts.loadSimpleInterestTermsContract()];
                    case 3:
                        simpleInterestTermsContract = _a.sent();
                        debtOrderData = omit(simpleInterestLoanOrder, [
                            "principalTokenSymbol",
                            "interestRate",
                            "amortizationUnit",
                            "termLength",
                        ]);
                        debtOrderData = __assign({}, debtOrderData, { principalToken: principalToken.address, termsContract: simpleInterestTermsContract.address, termsContractParameters: this.termsContractInterface.packParameters({
                                principalTokenIndex: principalTokenIndex,
                                principalAmount: principalAmount,
                                interestRate: interestRate,
                                amortizationUnit: amortizationUnit,
                                termLength: termLength,
                            }) });
                        return [2 /*return*/, TransactionUtils.applyNetworkDefaults(debtOrderData, this.contracts)];
                }
            });
        });
    };
    /**
     * Asynchronously generates a simple interest loan order given a Dharma
     * debt order instance.
     *
     * @param  debtOrderData a Dharma debt order instance.
     * @return           the generated simple interest loan order.
     */
    SimpleInterestLoanAdapter.prototype.fromDebtOrder = function (debtOrderData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, principalTokenIndex, principalAmount, interestRate, termLength, amortizationUnit, principalTokenSymbol;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.assert.schema.debtOrderWithTermsSpecified("debtOrder", debtOrderData);
                        _a = this.unpackParameters(debtOrderData.termsContractParameters), principalTokenIndex = _a.principalTokenIndex, principalAmount = _a.principalAmount, interestRate = _a.interestRate, termLength = _a.termLength, amortizationUnit = _a.amortizationUnit;
                        return [4 /*yield*/, this.contracts.getTokenSymbolByIndexAsync(principalTokenIndex)];
                    case 1:
                        principalTokenSymbol = _b.sent();
                        return [2 /*return*/, __assign({}, debtOrderData, { principalAmount: principalAmount,
                                principalTokenSymbol: principalTokenSymbol,
                                interestRate: interestRate,
                                termLength: termLength,
                                amortizationUnit: amortizationUnit })];
                }
            });
        });
    };
    /**
     * Asynchronously translates a Dharma debt registry entry into a
     * simple interest loan order.
     *
     * @param entry a Dharma debt registry entry
     * @return      the translated simple interest loan order
     */
    SimpleInterestLoanAdapter.prototype.fromDebtRegistryEntry = function (entry) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, principalTokenIndex, principalAmount, interestRate, termLength, amortizationUnit, principalTokenSymbol;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.assertIsSimpleInterestTermsContract(entry.termsContract)];
                    case 1:
                        _b.sent();
                        _a = this.unpackParameters(entry.termsContractParameters), principalTokenIndex = _a.principalTokenIndex, principalAmount = _a.principalAmount, interestRate = _a.interestRate, termLength = _a.termLength, amortizationUnit = _a.amortizationUnit;
                        return [4 /*yield*/, this.contracts.getTokenSymbolByIndexAsync(principalTokenIndex)];
                    case 2:
                        principalTokenSymbol = _b.sent();
                        return [2 /*return*/, {
                                principalTokenSymbol: principalTokenSymbol,
                                principalAmount: principalAmount,
                                interestRate: interestRate,
                                termLength: termLength,
                                amortizationUnit: amortizationUnit,
                            }];
                }
            });
        });
    };
    SimpleInterestLoanAdapter.prototype.getRepaymentSchedule = function (debtEntry) {
        var termsContractParameters = debtEntry.termsContractParameters, issuanceBlockTimestamp = debtEntry.issuanceBlockTimestamp;
        var _a = this.termsContractInterface.unpackParameters(termsContractParameters), termLength = _a.termLength, amortizationUnit = _a.amortizationUnit;
        return new types_1.RepaymentSchedule(amortizationUnit, termLength, issuanceBlockTimestamp.toNumber()).toArray();
    };
    SimpleInterestLoanAdapter.prototype.unpackParameters = function (packedParams) {
        return this.termsContractInterface.unpackParameters(packedParams);
    };
    /**
     * Validates that the basic invariants have been met for a given SimpleInterestLoanOrder.
     *
     * @param {SimpleInterestLoanOrder} simpleInterestLoanOrder
     * @returns {Promise<void>}
     */
    SimpleInterestLoanAdapter.prototype.validateAsync = function (simpleInterestLoanOrder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.termsContractInterface.validate(simpleInterestLoanOrder.termsContractParameters);
                        return [4 /*yield*/, this.assertIsSimpleInterestTermsContract(simpleInterestLoanOrder.termsContract)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.assertPrincipalTokenValidAsync(simpleInterestLoanOrder)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SimpleInterestLoanAdapter.prototype.assertIsSimpleInterestTermsContract = function (termsContractAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var simpleInterestTermsContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadSimpleInterestTermsContract()];
                    case 1:
                        simpleInterestTermsContract = _a.sent();
                        if (termsContractAddress !== simpleInterestTermsContract.address) {
                            throw new Error(exports.SimpleInterestAdapterErrors.MISMATCHED_TERMS_CONTRACT(termsContractAddress));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Asserts that the address of the principal token specified in the loan order
     * matches the address of the principal token specified in the terms contract parameters.
     *
     * @param {SimpleInterestLoanOrder} loanOrder
     * @returns {Promise<void>}
     */
    SimpleInterestLoanAdapter.prototype.assertPrincipalTokenValidAsync = function (loanOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var principalTokenSymbol, unpackedTerms, tokenIndex, tokenRegistry, tokenAddress, expectedTokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        principalTokenSymbol = loanOrder.principalTokenSymbol;
                        unpackedTerms = this.unpackParameters(loanOrder.termsContractParameters);
                        tokenIndex = unpackedTerms.principalTokenIndex;
                        return [4 /*yield*/, this.contracts.loadTokenRegistry()];
                    case 1:
                        tokenRegistry = _a.sent();
                        return [4 /*yield*/, tokenRegistry.getTokenAddressBySymbol.callAsync(principalTokenSymbol)];
                    case 2:
                        tokenAddress = _a.sent();
                        return [4 /*yield*/, tokenRegistry.getTokenAddressByIndex.callAsync(tokenIndex)];
                    case 3:
                        expectedTokenAddress = _a.sent();
                        if (tokenAddress === constants_1.NULL_ADDRESS || tokenAddress !== expectedTokenAddress) {
                            throw new Error(exports.SimpleInterestAdapterErrors.MISMATCHED_TOKEN_SYMBOL(tokenIndex, principalTokenSymbol));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SimpleInterestLoanAdapter.Installments = {
        HOURLY: "hours",
        DAILY: "days",
        WEEKLY: "weeks",
        MONTHLY: "months",
        YEARLY: "years",
    };
    return SimpleInterestLoanAdapter;
}());
exports.SimpleInterestLoanAdapter = SimpleInterestLoanAdapter;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=simple_interest_loan_adapter.js.map