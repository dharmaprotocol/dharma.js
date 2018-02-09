"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basic_type_schemas_1 = require("./basic_type_schemas");
var debt_order_schemas_1 = require("./debt_order_schemas");
var simple_interest_parameters_schema_1 = require("./simple_interest_parameters_schema");
exports.Schemas = {
    addressSchema: basic_type_schemas_1.addressSchema,
    numberSchema: basic_type_schemas_1.numberSchema,
    bytes32Schema: basic_type_schemas_1.bytes32Schema,
    debtOrderSchema: debt_order_schemas_1.debtOrderSchema,
    debtOrderWithTermsSpecifiedSchema: debt_order_schemas_1.debtOrderWithTermsSpecifiedSchema,
    simpleInterestLoanOrderSchema: simple_interest_parameters_schema_1.simpleInterestLoanOrderSchema,
};
//# sourceMappingURL=schemas.js.map