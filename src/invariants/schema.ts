import * as singleLineString from "single-line-string";
import { Schema, Schemas, SchemaValidator, ValidatorResult } from "../schemas";

export const SchemaAssertionsError = {
    DOES_NOT_CONFORM_TO_SCHEMA: (
        variableName: string,
        schemaId: string,
        value: any,
        validationResult: ValidatorResult,
    ) => singleLineString`
            Expected ${variableName} to conform to schema ${schemaId}

            Encountered: ${JSON.stringify(value, null, "\t")}

            Validation errors: ${validationResult.errors.join(", ")}
        `,
};

export class SchemaAssertions {
    private validator: SchemaValidator;

    constructor() {
        this.validator = new SchemaValidator();
    }

    public address(variableName: string, value: any) {
        this.assertConformsToSchema(variableName, value, Schemas.addressSchema);
    }

    public bytes32(variableName: string, value: any) {
        this.assertConformsToSchema(variableName, value, Schemas.bytes32Schema);
    }

    public bytes(variableName: string, value: any) {
        this.assertConformsToSchema(variableName, value, Schemas.bytesSchema);
    }

    public number(variableName: string, value: any) {
        this.assertConformsToSchema(variableName, value, Schemas.numberSchema);
    }

    public wholeNumber(variableName: string, value: any) {
        this.assertConformsToSchema(variableName, value, Schemas.wholeNumberSchema);
    }

    public simpleInterestLoanOrder(variableName: string, value: any) {
        this.assertConformsToSchema(variableName, value, Schemas.simpleInterestLoanOrderSchema);
    }

    public collateralizedSimpleInterestLoanOrder(variableName: string, value: any) {
        this.assertConformsToSchema(
            variableName,
            value,
            Schemas.collateralizedSimpleInterestLoanOrderSchema,
        );
    }

    public debtOrder(variableName: string, value: any) {
        this.assertConformsToSchema(variableName, value, Schemas.debtOrderSchema);
    }

    public debtOrderWithTermsSpecified(variableName: string, value: any) {
        this.assertConformsToSchema(variableName, value, Schemas.debtOrderWithTermsSpecifiedSchema);
    }

    public debtOrderWithTermsAndDebtorSpecified(variableName: string, value: any) {
        this.assertConformsToSchema(
            variableName,
            value,
            Schemas.debtOrderWithTermsAndDebtorSpecifiedSchema,
        );
    }

    public debtOrderWithTermsDebtorAndCreditorSpecified(variableName: string, value: any) {
        this.assertConformsToSchema(
            variableName,
            value,
            Schemas.debtOrderWithTermsDebtorAndCreditorSpecifiedSchema,
        );
    }

    private assertConformsToSchema(variableName: string, value: any, schema: Schema): void {
        const validationResult = this.validator.validate(value, schema);
        const hasValidationErrors = validationResult.errors.length > 0;

        if (hasValidationErrors) {
            throw new Error(
                SchemaAssertionsError.DOES_NOT_CONFORM_TO_SCHEMA(
                    variableName,
                    schema.id,
                    value,
                    validationResult,
                ),
            );
        }
    }
}
