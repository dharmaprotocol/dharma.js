import { Schema, ValidatorResult } from "jsonschema";
/**
 * Borrowed, with slight modification, from the wonderful 0x.js project codebase:
 * https://github.com/0xProject/0x.js/tree/development/packages/json-schemas
 */
export declare class SchemaValidator {
    private _validator;
    constructor();
    addSchema(schema: Schema): void;
    validate(instance: any, schema: Schema): ValidatorResult;
    isValid(instance: any, schema: Schema): boolean;
}
