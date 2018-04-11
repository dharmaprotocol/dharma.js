import {
    addressSchema,
    numberSchema,
    bytes32Schema,
    bytesSchema,
    wholeNumberSchema,
} from "./basic_type_schemas";
import {
    debtOrderSchema,
    debtOrderWithTermsSpecifiedSchema,
    debtOrderWithTermsAndDebtorSpecifiedSchema,
    debtOrderWithTermsDebtorAndCreditorSpecifiedSchema,
} from "./debt_order_schemas";
import { simpleInterestLoanOrderSchema } from "./simple_interest_parameters_schema";
import { collateralizedSimpleInterestLoanOrderSchema } from "./collateralized_simple_interest_loan_order_schema";

export const Schemas = {
    addressSchema,
    numberSchema,
    bytes32Schema,
    bytesSchema,
    debtOrderSchema,
    debtOrderWithTermsSpecifiedSchema,
    debtOrderWithTermsAndDebtorSpecifiedSchema,
    debtOrderWithTermsDebtorAndCreditorSpecifiedSchema,
    simpleInterestLoanOrderSchema,
    collateralizedSimpleInterestLoanOrderSchema,
    wholeNumberSchema,
};
