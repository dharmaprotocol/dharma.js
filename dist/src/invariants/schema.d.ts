import { ValidatorResult } from "src/schemas";
export declare const SchemaAssertionsError: {
    DOES_NOT_CONFORM_TO_SCHEMA: (variableName: string, schemaId: string, value: any, validationResult: ValidatorResult) => string;
};
export declare class SchemaAssertions {
    private validator;
    constructor();
    simpleInterestLoanOrder(variableName: string, value: any): void;
    debtOrder(variableName: string, value: any): void;
    debtOrderWithTermsSpecified(variableName: string, value: any): void;
    private assertConformsToSchema(variableName, value, schema);
}
