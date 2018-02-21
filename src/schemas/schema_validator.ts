import { Schema, Validator, ValidatorResult } from "jsonschema";
import * as values from "lodash.values";

import { Schemas } from "./schemas";

/**
 * Borrowed, with slight modification, from the wonderful 0x.js project codebase:
 * https://github.com/0xProject/0x.js/tree/development/packages/json-schemas
 */
export class SchemaValidator {
    private _validator: Validator;

    constructor() {
        this._validator = new Validator();

        for (const schema of values(Schemas)) {
            this._validator.addSchema(schema, schema.id);
        }
    }

    public addSchema(schema: Schema) {
        this._validator.addSchema(schema, schema.id);
    }

    public validate(instance: any, schema: Schema): ValidatorResult {
        Validator.prototype.customFormats.BigNumber = function(input) {
            const regex = RegExp("^\\d+(\\.\\d+)?$");
            // This allows undefined inputs, e.g. salt is not present sometimes.
            return !input || (input.isBigNumber && regex.test(input.toString()));
        };

        Validator.prototype.customFormats.wholeBigNumber = function(input) {
            const regex = RegExp("^\\d+$");
            return input && input.isBigNumber && regex.test(input.toString());
        };

        return this._validator.validate(instance, schema);
    }

    public isValid(instance: any, schema: Schema): boolean {
        const isValid = this.validate(instance, schema).errors.length === 0;
        return isValid;
    }
}
