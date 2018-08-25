export const erc721CollateralizedSimpleInterestLoanOrder = {
    id: "/CollateralizedSimpleInterestLoanOrder",
    allOf: [
        { $ref: "/SimpleInterestLoanOrder" },
        {
            properties: {
                erc721ContractIndex: { $ref: "/WholeNumber" },
                tokenReference: { $ref: "/WholeNumber" },
            },
            required: ["erc721ContractIndex", "tokenReference", "isEnumerable"],
        },
    ],
};
