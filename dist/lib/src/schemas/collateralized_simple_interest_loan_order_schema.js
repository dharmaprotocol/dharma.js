"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collateralizedSimpleInterestLoanOrderSchema = {
    id: "/CollateralizedSimpleInterestLoanOrder",
    allOf: [
        { $ref: "/SimpleInterestLoanOrder" },
        {
            properties: {
                collateralAmount: { $ref: "/WholeNumber" },
                gracePeriodInDays: { $ref: "/WholeNumber" },
            },
            required: ["collateralTokenSymbol", "collateralAmount", "gracePeriodInDays"],
        },
    ],
};
//# sourceMappingURL=collateralized_simple_interest_loan_order_schema.js.map