export const erc721CollateralizedSimpleInterestLoanOrder = {
    id: "/ERC721CollateralizedSimpleInterestLoanOrder",
    allOf: [
        { $ref: "/SimpleInterestLoanOrder" },
        {
            properties: {
                tokenReference: { $ref: "/WholeNumber" },
                isEnumerable: { type: "boolean" },
            },
            required: ["erc721Symbol", "tokenReference", "isEnumerable"],
        },
    ],
};
