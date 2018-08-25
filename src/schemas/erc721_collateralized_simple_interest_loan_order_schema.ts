export const erc721CollateralizedSimpleInterestLoanOrder = {
    id: "/CollateralizedSimpleInterestLoanOrder",
    allOf: [
        { $ref: "/SimpleInterestLoanOrder" },
        {
            properties: {
                tokenReference: { $ref: "/WholeNumber" },
            },
            required: ["erc721Symbol", "tokenReference", "isEnumerable"],
        },
    ],
};
