"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonschema_1 = require("jsonschema");
var values = require("lodash.values");
var schemas_1 = require("./schemas");
var customFormats = require("./custom_formats");
/**
 * Borrowed, with slight modification, from the wonderful 0x.js project codebase:
 * https://github.com/0xProject/0x.js/tree/development/packages/json-schemas
 */
var SchemaValidator = /** @class */ (function () {
    function SchemaValidator() {
        this._validator = new jsonschema_1.Validator();
        this.addCustomValidators();
        for (var _i = 0, _a = values(schemas_1.Schemas); _i < _a.length; _i++) {
            var schema = _a[_i];
            this._validator.addSchema(schema, schema.id);
        }
    }
    SchemaValidator.prototype.addSchema = function (schema) {
        this._validator.addSchema(schema, schema.id);
    };
    SchemaValidator.prototype.validate = function (instance, schema) {
        return this._validator.validate(instance, schema);
    };
    SchemaValidator.prototype.isValid = function (instance, schema) {
        var isValid = this.validate(instance, schema).errors.length === 0;
        return isValid;
    };
    SchemaValidator.prototype.addCustomValidators = function () {
        this._validator.customFormats.BigNumber = customFormats.bigNumberFormat;
        this._validator.customFormats.wholeBigNumber = customFormats.wholeBigNumberFormat;
    };
    return SchemaValidator;
}());
exports.SchemaValidator = SchemaValidator;
//# sourceMappingURL=schema_validator.js.map