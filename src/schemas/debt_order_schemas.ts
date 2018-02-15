export const debtOrderSchema = {
    id: "/DebtOrder",
    properties: {
        kernelVersion: { $ref: "/Address" },
        issuanceVersion: { $ref: "/Address" },
        principalAmount: { $ref: "/Number" },
        principalToken: { $ref: "/Address" },
        debtor: { $ref: "/Address" },
        debtorFee: { $ref: "/Number" },
        creditor: { $ref: "/Address" },
        creditorFee: { $ref: "/Number" },
        relayer: { $ref: "/Address" },
        relayerFee: { $ref: "/Number" },
        underwriter: { $ref: "/Address" },
        underwriterFee: { $ref: "/Number" },
        underwriterRiskRating: { $ref: "/Number" },
        termsContract: { $ref: "/Address" },
        termsContractParameters: { $ref: "/Bytes32" },
        expirationTimestampInSec: { $ref: "/Number" },
        salt: { $ref: "/Number" },
    },
    type: "object",
};

export const debtOrderWithTermsSpecifiedSchema = {
    id: "/DebtOrderWithTermsSpecified",
    allOf: [
        { $ref: "/DebtOrder" },
        {
            required: [
                "principalAmount",
                "principalToken",
                "termsContract",
                "termsContractParameters",
            ],
        },
    ],
};

export const debtOrderWithTermsAndDebtorSpecifiedSchema = {
    id: "/DebtOrderWithTermsAndDebtorSpecified",
    allOf: [
        { $ref: "/DebtOrderWithTermsSpecified" },
        {
            required: ["debtor"],
        },
    ],
};

export const debtOrderWithTermsDebtorAndCreditorSpecifiedSchema = {
    id: "/DebtOrderWithTermsDebtorAndCreditorSpecified",
    allOf: [
        { $ref: "/DebtOrderWithTermsAndDebtorSpecified" },
        {
            required: ["creditor"],
        },
    ],
};
