import { addressSchema, numberSchema, bytes32Schema } from "./basic_type_schemas";
import { debtOrderSchema, debtOrderWithTermsSpecifiedSchema } from "./debt_order_schemas";
import { simpleInterestLoanOrderSchema } from "./simple_interest_parameters_schema";

export const Schemas = {
    addressSchema,
    numberSchema,
    bytes32Schema,
    debtOrderSchema,
    debtOrderWithTermsSpecifiedSchema,
    simpleInterestLoanOrderSchema,
};
