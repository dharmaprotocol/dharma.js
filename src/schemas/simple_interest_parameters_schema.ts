export const simpleInterestLoanOrderSchema = {
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
                termLength: { $ref: "/WholeNumber" },
            },
            required: [
                "principalAmount",
                "principalTokenSymbol",
                "interestRate",
                "amortizationUnit",
                "termLength",
            ],
        },
    ],
};
