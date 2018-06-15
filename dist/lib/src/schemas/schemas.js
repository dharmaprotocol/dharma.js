"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basic_type_schemas_1 = require("./basic_type_schemas");
var collateralized_simple_interest_loan_order_schema_1 = require("./collateralized_simple_interest_loan_order_schema");
var debt_order_schemas_1 = require("./debt_order_schemas");
var simple_interest_parameters_schema_1 = require("./simple_interest_parameters_schema");
exports.Schemas = {
    addressSchema: basic_type_schemas_1.addressSchema,
    numberSchema: basic_type_schemas_1.numberSchema,
    bytes32Schema: basic_type_schemas_1.bytes32Schema,
    bytesSchema: basic_type_schemas_1.bytesSchema,
    debtOrderSchema: debt_order_schemas_1.debtOrderSchema,
    debtOrderWithTermsSpecifiedSchema: debt_order_schemas_1.debtOrderWithTermsSpecifiedSchema,
    debtOrderWithTermsAndDebtorSpecifiedSchema: debt_order_schemas_1.debtOrderWithTermsAndDebtorSpecifiedSchema,
    debtOrderWithTermsDebtorAndCreditorSpecifiedSchema: debt_order_schemas_1.debtOrderWithTermsDebtorAndCreditorSpecifiedSchema,
    simpleInterestLoanOrderSchema: simple_interest_parameters_schema_1.simpleInterestLoanOrderSchema,
    collateralizedSimpleInterestLoanOrderSchema: collateralized_simple_interest_loan_order_schema_1.collateralizedSimpleInterestLoanOrderSchema,
    wholeNumberSchema: basic_type_schemas_1.wholeNumberSchema,
};
//# sourceMappingURL=schemas.js.map