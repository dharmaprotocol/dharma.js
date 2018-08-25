import {
    addressSchema,
    bytes32Schema,
    bytesSchema,
    numberSchema,
    wholeNumberSchema,
} from "./basic_type_schemas";
import { collateralizedSimpleInterestLoanOrderSchema } from "./collateralized_simple_interest_loan_order_schema";
import { erc721CollateralizedSimpleInterestLoanOrder } from "./erc721_collateralized_simple_interest_loan_order_schema";
import {
    debtOrderSchema,
    debtOrderWithTermsAndDebtorSpecifiedSchema,
    debtOrderWithTermsDebtorAndCreditorSpecifiedSchema,
    debtOrderWithTermsSpecifiedSchema,
} from "./debt_order_schemas";
import { simpleInterestLoanOrderSchema } from "./simple_interest_parameters_schema";

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
    erc721CollateralizedSimpleInterestLoanOrder,
    wholeNumberSchema,
};
