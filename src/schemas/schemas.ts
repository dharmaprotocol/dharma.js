import { addressSchema, numberSchema, bytes32Schema } from "./basic_type_schemas";
import {
    debtOrderSchema,
    debtOrderWithTermsSpecifiedSchema,
    debtOrderWithTermsAndDebtorSpecifiedSchema,
    debtOrderWithTermsDebtorAndCreditorSpecifiedSchema,
} from "./debt_order_schemas";
import { simpleInterestLoanOrderSchema } from "./simple_interest_parameters_schema";

export const Schemas = {
    addressSchema,
    numberSchema,
    bytes32Schema,
    debtOrderSchema,
    debtOrderWithTermsSpecifiedSchema,
    debtOrderWithTermsAndDebtorSpecifiedSchema,
    debtOrderWithTermsDebtorAndCreditorSpecifiedSchema,
    simpleInterestLoanOrderSchema,
};
