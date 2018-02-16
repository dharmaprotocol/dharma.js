"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var schemas_1 = require("../schemas");
var single_line_string_1 = require("single-line-string");
exports.SchemaAssertionsError = {
    DOES_NOT_CONFORM_TO_SCHEMA: function (variableName, schemaId, value, validationResult) { return single_line_string_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            Expected ", " to conform to schema ", "\n\n            Encountered: ", "\n\n            Validation errors: ", "\n        "], ["\n            Expected ", " to conform to schema ", "\n\n            Encountered: ", "\n\n            Validation errors: ", "\n        "])), variableName, schemaId, JSON.stringify(value, null, "\t"), validationResult.errors.join(", ")); },
};
var SchemaAssertions = /** @class */ (function () {
    function SchemaAssertions() {
        this.validator = new schemas_1.SchemaValidator();
    }
    SchemaAssertions.prototype.address = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.addressSchema);
    };
    SchemaAssertions.prototype.bytes32 = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.bytes32Schema);
    };
    SchemaAssertions.prototype.number = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.numberSchema);
    };
    SchemaAssertions.prototype.simpleInterestLoanOrder = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.simpleInterestLoanOrderSchema);
    };
    SchemaAssertions.prototype.debtOrder = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.debtOrderSchema);
    };
    SchemaAssertions.prototype.debtOrderWithTermsSpecified = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.debtOrderWithTermsSpecifiedSchema);
    };
    SchemaAssertions.prototype.debtOrderWithTermsAndDebtorSpecified = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.debtOrderWithTermsAndDebtorSpecifiedSchema);
    };
    SchemaAssertions.prototype.debtOrderWithTermsDebtorAndCreditorSpecified = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.debtOrderWithTermsDebtorAndCreditorSpecifiedSchema);
    };
    SchemaAssertions.prototype.assertConformsToSchema = function (variableName, value, schema) {
        var validationResult = this.validator.validate(value, schema);
        var hasValidationErrors = validationResult.errors.length > 0;
        if (hasValidationErrors) {
            throw new Error(exports.SchemaAssertionsError.DOES_NOT_CONFORM_TO_SCHEMA(variableName, schema.id, value, validationResult));
        }
    };
    return SchemaAssertions;
}());
exports.SchemaAssertions = SchemaAssertions;
var templateObject_1;
//# sourceMappingURL=schema.js.map