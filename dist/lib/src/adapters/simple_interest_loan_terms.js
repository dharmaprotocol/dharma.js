"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
var bignumber_1 = require("../../utils/bignumber");
var invariants_1 = require("../invariants");
var simple_interest_loan_adapter_1 = require("./simple_interest_loan_adapter");
var AmortizationUnitCodes = ["hours", "days", "weeks", "months", "years"];
var AmortizationUnitCode;
(function (AmortizationUnitCode) {
    AmortizationUnitCode[AmortizationUnitCode["HOURS"] = 0] = "HOURS";
    AmortizationUnitCode[AmortizationUnitCode["DAYS"] = 1] = "DAYS";
    AmortizationUnitCode[AmortizationUnitCode["WEEKS"] = 2] = "WEEKS";
    AmortizationUnitCode[AmortizationUnitCode["MONTHS"] = 3] = "MONTHS";
    AmortizationUnitCode[AmortizationUnitCode["YEARS"] = 4] = "YEARS";
})(AmortizationUnitCode || (AmortizationUnitCode = {}));
var MAX_PRINCIPAL_TOKEN_INDEX_HEX = "0xff";
var MAX_PRINCIPAL_AMOUNT_HEX = "0xffffffffffffffffffffffff";
var MAX_TERM_LENGTH_VALUE_HEX = "0xffff";
var MAX_INTEREST_RATE_PRECISION = 4;
var FIXED_POINT_SCALING_FACTOR = Math.pow(10, MAX_INTEREST_RATE_PRECISION);
var MAX_INTEREST_RATE = Math.pow(2, 24) / FIXED_POINT_SCALING_FACTOR;
var SimpleInterestLoanTerms = /** @class */ (function () {
    function SimpleInterestLoanTerms(web3, contracts) {
        this.assert = new invariants_1.Assertions(web3, contracts);
    }
    SimpleInterestLoanTerms.prototype.packParameters = function (termsContractParameters) {
        var principalTokenIndex = termsContractParameters.principalTokenIndex, principalAmount = termsContractParameters.principalAmount, interestRate = termsContractParameters.interestRate, amortizationUnit = termsContractParameters.amortizationUnit, termLength = termsContractParameters.termLength;
        this.assertPrincipalTokenIndexWithinBounds(principalTokenIndex);
        this.assertPrincipalAmountWithinBounds(principalAmount);
        this.assertInterestRateValid(interestRate);
        this.assertValidAmortizationUnit(amortizationUnit);
        this.assertTermLengthWholeAndWithinBounds(termLength);
        var interestRateFixedPoint = interestRate.mul(FIXED_POINT_SCALING_FACTOR);
        var principalTokenIndexHex = principalTokenIndex.toString(16);
        var principalAmountHex = principalAmount.toString(16);
        var interestRateFixedPointHex = interestRateFixedPoint.toString(16);
        var amortizationUnitTypeHex = AmortizationUnitCode[amortizationUnit.toUpperCase()].toString(16);
        var termLengthHex = termLength.toString(16);
        return ("0x" +
            principalTokenIndexHex.padStart(2, "0") +
            principalAmountHex.padStart(24, "0") +
            interestRateFixedPointHex.padStart(6, "0") +
            amortizationUnitTypeHex.padStart(1, "0") +
            termLengthHex.padStart(4, "0") +
            "0".repeat(27));
    };
    SimpleInterestLoanTerms.prototype.unpackParameters = function (termsContractParametersPacked) {
        this.assert.schema.bytes32("termsContractParametersPacked", termsContractParametersPacked);
        var principalTokenIndexHex = termsContractParametersPacked.substr(0, 4);
        var principalAmountHex = "0x" + termsContractParametersPacked.substr(4, 24);
        var interestRateFixedPointHex = "0x" + termsContractParametersPacked.substr(28, 6);
        var amortizationUnitTypeHex = "0x" + termsContractParametersPacked.substr(34, 1);
        var termLengthHex = "0x" + termsContractParametersPacked.substr(35, 4);
        var principalTokenIndex = new bignumber_1.BigNumber(principalTokenIndexHex);
        var principalAmount = new bignumber_1.BigNumber(principalAmountHex);
        var interestRateFixedPoint = new bignumber_1.BigNumber(interestRateFixedPointHex);
        var termLength = new bignumber_1.BigNumber(termLengthHex);
        // Given that our fixed point representation of the interest rate
        // is scaled up by our chosen scaling factor, we scale it down
        // for computations.
        var interestRate = interestRateFixedPoint.div(FIXED_POINT_SCALING_FACTOR);
        // Since the amortization unit type is stored in 1 byte, it can't exceed
        // a value of 255.  As such, we're not concerned about using BigNumber's
        // to represent amortization units.
        var unitCode = parseInt(amortizationUnitTypeHex, 16);
        // We only need to assert that the amortization unit type is valid,
        // given that it's impossible for the parsed totalExpectedRepayment,
        // principalTokenIndex, and termLength to exceed their bounds.
        this.assertValidAmortizationUnitCode(unitCode);
        var amortizationUnit = AmortizationUnitCode[unitCode].toLowerCase();
        return {
            principalTokenIndex: principalTokenIndex,
            principalAmount: principalAmount,
            interestRate: interestRate,
            termLength: termLength,
            amortizationUnit: amortizationUnit,
        };
    };
    /**
     * Asserts that invariants are met for a given packed parameters string.
     *
     * @param {string} packedParameters
     */
    SimpleInterestLoanTerms.prototype.validate = function (packedParameters) {
        var unpackedParameters = this.unpackParameters(packedParameters);
        this.packParameters(unpackedParameters);
    };
    SimpleInterestLoanTerms.prototype.assertPrincipalTokenIndexWithinBounds = function (principalTokenIndex) {
        if (principalTokenIndex.lt(0) || principalTokenIndex.gt(MAX_PRINCIPAL_TOKEN_INDEX_HEX)) {
            throw new Error(simple_interest_loan_adapter_1.SimpleInterestAdapterErrors.INVALID_TOKEN_INDEX(principalTokenIndex));
        }
    };
    SimpleInterestLoanTerms.prototype.assertPrincipalAmountWithinBounds = function (principalAmount) {
        if (principalAmount.lt(0) || principalAmount.gt(MAX_PRINCIPAL_AMOUNT_HEX)) {
            throw new Error(simple_interest_loan_adapter_1.SimpleInterestAdapterErrors.INVALID_PRINCIPAL_AMOUNT());
        }
    };
    SimpleInterestLoanTerms.prototype.assertInterestRateValid = function (interestRate) {
        var _a = interestRate.toString().split("."), rightOfDecimal = _a[1];
        var numDecimals = typeof rightOfDecimal !== "undefined" ? rightOfDecimal.length : 0;
        if (interestRate.lt(0) ||
            interestRate.gt(MAX_INTEREST_RATE) ||
            numDecimals > MAX_INTEREST_RATE_PRECISION) {
            throw new Error(simple_interest_loan_adapter_1.SimpleInterestAdapterErrors.INVALID_INTEREST_RATE());
        }
    };
    SimpleInterestLoanTerms.prototype.assertValidAmortizationUnitCode = function (amortizationUnitCode) {
        if (amortizationUnitCode > AmortizationUnitCodes.length - 1) {
            throw new Error(simple_interest_loan_adapter_1.SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
        }
    };
    SimpleInterestLoanTerms.prototype.assertValidAmortizationUnit = function (amortizationUnitType) {
        if (!AmortizationUnitCodes.includes(amortizationUnitType)) {
            throw new Error(simple_interest_loan_adapter_1.SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
        }
    };
    SimpleInterestLoanTerms.prototype.assertTermLengthWholeAndWithinBounds = function (termLengthInAmortizationUnits) {
        if (termLengthInAmortizationUnits.lt(0) ||
            termLengthInAmortizationUnits.gt(MAX_TERM_LENGTH_VALUE_HEX)) {
            throw new Error(simple_interest_loan_adapter_1.SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
        }
        else {
            this.assert.schema.wholeNumber("termLength", termLengthInAmortizationUnits);
        }
    };
    return SimpleInterestLoanTerms;
}());
exports.SimpleInterestLoanTerms = SimpleInterestLoanTerms;
//# sourceMappingURL=simple_interest_loan_terms.js.map