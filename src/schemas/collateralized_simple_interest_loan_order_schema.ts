export const collateralizedSimpleInterestLoanOrderSchema = {
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
