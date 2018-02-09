"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schemas_1 = require("../schemas");
var outdent_1 = require("outdent");
exports.SchemaAssertionsError = {
    DOES_NOT_CONFORM_TO_SCHEMA: function (variableName, schemaId, value, validationResult) {
        return (_a = ["\n            Expected ", " to conform to schema ", "\n\n            Encountered: ", "\n\n            Validation errors: ", "\n        "], _a.raw = ["\n            Expected ", " to conform to schema ", "\n\n            Encountered: ", "\n\n            Validation errors: ", "\n        "], outdent_1.default(_a, variableName, schemaId, JSON.stringify(value, null, "\t"), validationResult.errors.join(", ")));
        var _a;
    },
};
var SchemaAssertions = (function () {
    function SchemaAssertions() {
        this.validator = new schemas_1.SchemaValidator();
    }
    SchemaAssertions.prototype.simpleInterestLoanOrder = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.simpleInterestLoanOrderSchema);
    };
    SchemaAssertions.prototype.debtOrder = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.debtOrderSchema);
    };
    SchemaAssertions.prototype.debtOrderWithTermsSpecified = function (variableName, value) {
        this.assertConformsToSchema(variableName, value, schemas_1.Schemas.debtOrderWithTermsSpecifiedSchema);
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
//# sourceMappingURL=schema.js.map