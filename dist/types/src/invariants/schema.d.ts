import { ValidatorResult } from "../schemas";
export declare const SchemaAssertionsError: {
    DOES_NOT_CONFORM_TO_SCHEMA: (variableName: string, schemaId: string, value: any, validationResult: ValidatorResult) => any;
};
export declare class SchemaAssertions {
    private validator;
    constructor();
    address(variableName: string, value: any): void;
    bytes32(variableName: string, value: any): void;
    number(variableName: string, value: any): void;
    simpleInterestLoanOrder(variableName: string, value: any): void;
    debtOrder(variableName: string, value: any): void;
    debtOrderWithTermsSpecified(variableName: string, value: any): void;
    debtOrderWithTermsAndDebtorSpecified(variableName: string, value: any): void;
    debtOrderWithTermsDebtorAndCreditorSpecified(variableName: string, value: any): void;
    private assertConformsToSchema(variableName, value, schema);
}
