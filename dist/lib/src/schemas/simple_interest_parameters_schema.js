"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleInterestLoanOrderSchema = {
    id: "/SimpleInterestLoanOrder",
    allOf: [
        { $ref: "/DebtOrder" },
        {
            properties: {
                // Additional adapter-specific data points
                interestRate: { $ref: "/Number" },
                amortizationUnit: {
                    type: "string",
                    pattern: "^((hours)|(days)|(weeks)|(months)|(years))$",
                },
                termLength: { $ref: "/Number" },
            },
            required: [
                "principalAmount",
                "principalToken",
                "interestRate",
                "amortizationUnit",
                "termLength",
            ],
        },
    ],
};
//# sourceMappingURL=simple_interest_parameters_schema.js.map