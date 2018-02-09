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
var _ = require("lodash");
var bignumber_1 = require("../../utils/bignumber");
var constants_1 = require("../../utils/constants");
var invariants_1 = require("../invariants");
var single_line_string_1 = require("single-line-string");
var AmortizationUnitCodes = ["hours", "days", "weeks", "months", "years"];
var AmortizationUnitCode;
(function (AmortizationUnitCode) {
    AmortizationUnitCode[AmortizationUnitCode["HOURS"] = 0] = "HOURS";
    AmortizationUnitCode[AmortizationUnitCode["DAYS"] = 1] = "DAYS";
    AmortizationUnitCode[AmortizationUnitCode["WEEKS"] = 2] = "WEEKS";
    AmortizationUnitCode[AmortizationUnitCode["MONTHS"] = 3] = "MONTHS";
    AmortizationUnitCode[AmortizationUnitCode["YEARS"] = 4] = "YEARS";
})(AmortizationUnitCode || (AmortizationUnitCode = {}));
exports.SimpleInterestAdapterErrors = {
    INVALID_EXPECTED_REPAYMENT_VALUE: function () {
        return (_a = ["Total expected repayment value cannot be negative or\n                         greater than 2^128 - 1."], _a.raw = ["Total expected repayment value cannot be negative or\n                         greater than 2^128 - 1."], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_AMORTIZATION_UNIT_TYPE: function () {
        return (_a = ["Amortization unit must be of type HOURS, DAYS,\n                         WEEKS, MONTHS, or YEARS."], _a.raw = ["Amortization unit must be of type HOURS, DAYS,\n                         WEEKS, MONTHS, or YEARS."], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_TERM_LENGTH: function () {
        return (_a = ["Term length value cannot be negative or greater\n                         than 2^120 - 1"], _a.raw = ["Term length value cannot be negative or greater\n                         than 2^120 - 1"], single_line_string_1.default(_a));
        var _a;
    },
    INVALID_TERMS_CONTRACT: function (principalToken, termsContract) {
        return (_a = ["Terms Contract at address ", " does not\n                         correspond to the SimpleInterestTermsContract associated\n                         with the principal token at address ", ""], _a.raw = ["Terms Contract at address ", " does not\n                         correspond to the SimpleInterestTermsContract associated\n                         with the principal token at address ", ""], single_line_string_1.default(_a, termsContract, principalToken));
        var _a;
    },
};
var TX_DEFAULTS = { from: constants_1.NULL_ADDRESS, gas: 0 };
var MAX_EXPECTED_REPAYMENT_VALUE_HEX = "0xffffffffffffffffffffffffffffffff";
var MAX_TERM_LENGTH_VALUE_HEX = "0xffffffffffffffffffffffffffffff";
var SimpleInterestLoanTerms = (function () {
    function SimpleInterestLoanTerms() {
    }
    SimpleInterestLoanTerms.prototype.packParameters = function (termsContractParameters) {
        var totalExpectedRepayment = termsContractParameters.totalExpectedRepayment, amortizationUnit = termsContractParameters.amortizationUnit, termLength = termsContractParameters.termLength;
        this.assertTotalExpectedRepaymentWithinBounds(totalExpectedRepayment);
        this.assertValidAmortizationUnit(amortizationUnit);
        this.assertTermLengthWithinBounds(termLength);
        var totalExpectedRepaymentHex = totalExpectedRepayment.toString(16);
        var amortizationUnitTypeHex = AmortizationUnitCode[amortizationUnit.toUpperCase()].toString(16);
        var termLengthHex = termLength.toString(16);
        return ("0x" +
            totalExpectedRepaymentHex.padStart(32, "0") +
            amortizationUnitTypeHex.padStart(2, "0") +
            termLengthHex.padStart(30, "0"));
    };
    SimpleInterestLoanTerms.prototype.unpackParameters = function (termsContractParametersPacked) {
        // TODO: Assert 32 bytes length
        var totalExpectedRepaymentHex = termsContractParametersPacked.substr(0, 34);
        var amortizationUnitTypeHex = "0x" + termsContractParametersPacked.substr(34, 2);
        var termLengthHex = "0x" + termsContractParametersPacked.substr(36);
        var totalExpectedRepayment = new bignumber_1.BigNumber(totalExpectedRepaymentHex);
        var termLength = new bignumber_1.BigNumber(termLengthHex);
        // Since the amortization unit type is stored in 1 byte, it can't exceed
        // a value of 255.  As such, we're not concerned about using BigNumber's
        // to represent amortization units.
        var unitCode = parseInt(amortizationUnitTypeHex, 16);
        // We only need to assert that the amortization unit type is valid,
        // given that it's impossible for the parsed totalExpectedRepayment
        // and termLength to exceed their bounds.
        this.assertValidAmortizationUnitCode(unitCode);
        var amortizationUnit = AmortizationUnitCode[unitCode].toLowerCase();
        return {
            totalExpectedRepayment: totalExpectedRepayment,
            termLength: termLength,
            amortizationUnit: amortizationUnit,
        };
    };
    SimpleInterestLoanTerms.prototype.assertTotalExpectedRepaymentWithinBounds = function (totalExpectedRepayment) {
        if (totalExpectedRepayment.lt(0) ||
            totalExpectedRepayment.gt(MAX_EXPECTED_REPAYMENT_VALUE_HEX)) {
            throw new Error(exports.SimpleInterestAdapterErrors.INVALID_EXPECTED_REPAYMENT_VALUE());
        }
    };
    SimpleInterestLoanTerms.prototype.assertValidAmortizationUnitCode = function (amortizationUnitCode) {
        if (amortizationUnitCode > AmortizationUnitCodes.length - 1) {
            throw new Error(exports.SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
        }
    };
    SimpleInterestLoanTerms.prototype.assertValidAmortizationUnit = function (amortizationUnitType) {
        if (!AmortizationUnitCodes.includes(amortizationUnitType)) {
            throw new Error(exports.SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
        }
    };
    SimpleInterestLoanTerms.prototype.assertTermLengthWithinBounds = function (termLengthInAmortizationUnits) {
        if (termLengthInAmortizationUnits.lt(0) ||
            termLengthInAmortizationUnits.gt(MAX_TERM_LENGTH_VALUE_HEX)) {
            throw new Error(exports.SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
        }
    };
    return SimpleInterestLoanTerms;
}());
exports.SimpleInterestLoanTerms = SimpleInterestLoanTerms;
var SimpleInterestLoanAdapter = (function () {
    function SimpleInterestLoanAdapter(web3, contracts) {
        this.assert = new invariants_1.Assertions(web3);
        this.contracts = contracts;
        this.termsContractInterface = new SimpleInterestLoanTerms();
    }
    SimpleInterestLoanAdapter.prototype.toDebtOrder = function (simpleInterestLoanOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var principalToken, principalAmount, interestRate, amortizationUnit, termLength, debtOrder, simpleInterestTermsContract, totalExpectedRepayment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.simpleInterestLoanOrder("simpleInterestLoanOrder", simpleInterestLoanOrder);
                        principalToken = simpleInterestLoanOrder.principalToken, principalAmount = simpleInterestLoanOrder.principalAmount, interestRate = simpleInterestLoanOrder.interestRate, amortizationUnit = simpleInterestLoanOrder.amortizationUnit, termLength = simpleInterestLoanOrder.termLength;
                        debtOrder = _.omit(simpleInterestLoanOrder, [
                            "interestRate",
                            "amortizationUnit",
                            "termLength",
                        ]);
                        return [4 /*yield*/, this.contracts.loadSimpleInterestTermsContract(principalToken, TX_DEFAULTS)];
                    case 1:
                        simpleInterestTermsContract = _a.sent();
                        totalExpectedRepayment = principalAmount.times(interestRate.plus(1)).trunc();
                        debtOrder.termsContract = simpleInterestTermsContract.address;
                        debtOrder.termsContractParameters = this.termsContractInterface.packParameters({
                            totalExpectedRepayment: totalExpectedRepayment,
                            amortizationUnit: amortizationUnit,
                            termLength: termLength,
                        });
                        return [2 /*return*/, debtOrder];
                }
            });
        });
    };
    SimpleInterestLoanAdapter.prototype.fromDebtOrder = function (debtOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, totalExpectedRepayment, termLength, amortizationUnit, principalAmount, principalToken, interestRate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.assert.schema.debtOrderWithTermsSpecified("debtOrder", debtOrder);
                        return [4 /*yield*/, this.assertTermsContractCorrespondsToPrincipalToken(debtOrder.principalToken, debtOrder.termsContract)];
                    case 1:
                        _b.sent();
                        _a = this.termsContractInterface.unpackParameters(debtOrder.termsContractParameters), totalExpectedRepayment = _a.totalExpectedRepayment, termLength = _a.termLength, amortizationUnit = _a.amortizationUnit;
                        principalAmount = debtOrder.principalAmount, principalToken = debtOrder.principalToken;
                        interestRate = totalExpectedRepayment.div(principalAmount).sub(1);
                        return [2 /*return*/, __assign({}, debtOrder, { principalAmount: principalAmount,
                                principalToken: principalToken,
                                interestRate: interestRate,
                                termLength: termLength,
                                amortizationUnit: amortizationUnit })];
                }
            });
        });
    };
    SimpleInterestLoanAdapter.prototype.assertTermsContractCorrespondsToPrincipalToken = function (principalToken, termsContract) {
        return __awaiter(this, void 0, void 0, function () {
            var termsContractRegistry, termsContractCorrespondingToPrincipalToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadTermsContractRegistry(TX_DEFAULTS)];
                    case 1:
                        termsContractRegistry = _a.sent();
                        return [4 /*yield*/, termsContractRegistry.getSimpleInterestTermsContractAddress.callAsync(principalToken)];
                    case 2:
                        termsContractCorrespondingToPrincipalToken = _a.sent();
                        if (termsContractCorrespondingToPrincipalToken !== termsContract) {
                            throw new Error(exports.SimpleInterestAdapterErrors.INVALID_TERMS_CONTRACT(principalToken, termsContract));
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
//# sourceMappingURL=simple_interest_loan_adapter.js.map