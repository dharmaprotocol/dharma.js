"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("../../utils/bignumber");
// Utils
var invariants_1 = require("../invariants");
var terms_contract_parameters_1 = require("./terms_contract_parameters");
// Constants
var constants_1 = require("../../utils/constants");
var collateralized_simple_interest_loan_adapter_1 = require("./collateralized_simple_interest_loan_adapter");
var MAX_COLLATERAL_TOKEN_INDEX_HEX = (constants_1.TOKEN_REGISTRY_TRACKED_TOKENS.length - 1).toString(16);
var MAX_COLLATERAL_AMOUNT_HEX = terms_contract_parameters_1.TermsContractParameters.generateHexValueOfLength(23);
var MAX_GRACE_PERIOD_IN_DAYS_HEX = terms_contract_parameters_1.TermsContractParameters.generateHexValueOfLength(2);
var CollateralizedLoanTerms = /** @class */ (function () {
    function CollateralizedLoanTerms(web3, contractsAPI) {
        this.assert = new invariants_1.Assertions(web3, contractsAPI);
    }
    CollateralizedLoanTerms.prototype.packParameters = function (params) {
        this.assertValidParams(params);
        var collateralTokenIndex = params.collateralTokenIndex, collateralAmount = params.collateralAmount, gracePeriodInDays = params.gracePeriodInDays;
        var collateralTokenIndexShifted = terms_contract_parameters_1.TermsContractParameters.bitShiftLeft(collateralTokenIndex, 100);
        var collateralAmountShifted = terms_contract_parameters_1.TermsContractParameters.bitShiftLeft(collateralAmount, 8);
        var gracePeriodInDaysShifted = terms_contract_parameters_1.TermsContractParameters.bitShiftLeft(gracePeriodInDays, 0);
        var baseTenParameters = collateralTokenIndexShifted
            .plus(collateralAmountShifted)
            .plus(gracePeriodInDaysShifted);
        return "0x" + baseTenParameters.toString(16).padStart(64, "0");
    };
    CollateralizedLoanTerms.prototype.unpackParameters = function (packedParams) {
        this.assert.schema.bytes32("packedParams", packedParams);
        var collateralTokenIndexHex = "0x" + packedParams.substr(39, 2);
        var collateralAmountHex = "0x" + packedParams.substr(41, 23);
        var gracePeriodInDaysHex = "0x" + packedParams.substr(64, 2);
        return {
            collateralTokenIndex: new bignumber_1.BigNumber(collateralTokenIndexHex),
            collateralAmount: new bignumber_1.BigNumber(collateralAmountHex),
            gracePeriodInDays: new bignumber_1.BigNumber(gracePeriodInDaysHex),
        };
    };
    CollateralizedLoanTerms.prototype.assertValidParams = function (params) {
        var collateralTokenIndex = params.collateralTokenIndex, collateralAmount = params.collateralAmount, gracePeriodInDays = params.gracePeriodInDays;
        this.assertCollateralTokenIndexWithinBounds(collateralTokenIndex);
        this.assertCollateralAmountWithinBounds(collateralAmount);
        this.assertGracePeriodInDaysWithinBounds(gracePeriodInDays);
    };
    CollateralizedLoanTerms.prototype.assertCollateralTokenIndexWithinBounds = function (collateralTokenIndex) {
        // Collateral token index cannot be a decimal value.
        if (terms_contract_parameters_1.TermsContractParameters.isDecimalValue(collateralTokenIndex)) {
            throw new Error(collateralized_simple_interest_loan_adapter_1.CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
        }
        if (collateralTokenIndex.lt(0) || collateralTokenIndex.gt(MAX_COLLATERAL_TOKEN_INDEX_HEX)) {
            throw new Error(collateralized_simple_interest_loan_adapter_1.CollateralizerAdapterErrors.INVALID_TOKEN_INDEX(collateralTokenIndex));
        }
    };
    CollateralizedLoanTerms.prototype.assertCollateralAmountWithinBounds = function (collateralAmount) {
        // Collateral amount cannot be a decimal value.
        if (terms_contract_parameters_1.TermsContractParameters.isDecimalValue(collateralAmount)) {
            throw new Error(collateralized_simple_interest_loan_adapter_1.CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
        }
        if (collateralAmount.isNegative() || collateralAmount.isZero()) {
            throw new Error(collateralized_simple_interest_loan_adapter_1.CollateralizerAdapterErrors.COLLATERAL_AMOUNT_MUST_BE_POSITIVE());
        }
        if (collateralAmount.gt(MAX_COLLATERAL_AMOUNT_HEX)) {
            throw new Error(collateralized_simple_interest_loan_adapter_1.CollateralizerAdapterErrors.COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM());
        }
    };
    CollateralizedLoanTerms.prototype.assertGracePeriodInDaysWithinBounds = function (gracePeriodInDays) {
        // Grace period cannot be a decimal value.
        if (terms_contract_parameters_1.TermsContractParameters.isDecimalValue(gracePeriodInDays)) {
            throw new Error(collateralized_simple_interest_loan_adapter_1.CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
        }
        // Grace period can't be negative.
        if (gracePeriodInDays.lt(0)) {
            throw new Error(collateralized_simple_interest_loan_adapter_1.CollateralizerAdapterErrors.GRACE_PERIOD_IS_NEGATIVE());
        }
        // Grace period has a maximum value that cannot be exceeded due to how we pack params.
        if (gracePeriodInDays.gt(MAX_GRACE_PERIOD_IN_DAYS_HEX)) {
            throw new Error(collateralized_simple_interest_loan_adapter_1.CollateralizerAdapterErrors.GRACE_PERIOD_EXCEEDS_MAXIMUM());
        }
    };
    return CollateralizedLoanTerms;
}());
exports.CollateralizedLoanTerms = CollateralizedLoanTerms;
//# sourceMappingURL=collateralized_simple_interest_loan_terms.js.map