"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonschema_1 = require("jsonschema");
var _ = require("lodash");
var schemas_1 = require("./schemas");
/**
 * Borrowed, with slight modification, from the wonderful 0x.js project codebase:
 * https://github.com/0xProject/0x.js/tree/development/packages/json-schemas
 */
var SchemaValidator = (function () {
    function SchemaValidator() {
        this._validator = new jsonschema_1.Validator();
        for (var _i = 0, _a = _.values(schemas_1.Schemas); _i < _a.length; _i++) {
            var schema = _a[_i];
            this._validator.addSchema(schema, schema.id);
        }
    }
    SchemaValidator.prototype.addSchema = function (schema) {
        this._validator.addSchema(schema, schema.id);
    };
    // In order to validate a complex JS object using jsonschema, we must replace any complex
    // sub-types (e.g BigNumber) with a simpler string representation. Since BigNumber and other
    // complex types implement the `toString` method, we can stringify the object and
    // then parse it. The resultant object can then be checked using jsonschema.
    SchemaValidator.prototype.validate = function (instance, schema) {
        var jsonSchemaCompatibleObject = JSON.parse(JSON.stringify(instance));
        return this._validator.validate(jsonSchemaCompatibleObject, schema);
    };
    SchemaValidator.prototype.isValid = function (instance, schema) {
        var isValid = this.validate(instance, schema).errors.length === 0;
        return isValid;
    };
    return SchemaValidator;
}());
exports.SchemaValidator = SchemaValidator;
//# sourceMappingURL=schema_validator.js.map