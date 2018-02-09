export declare const debtOrderSchema: {
    id: string;
    properties: {
        kernelVersion: {
            $ref: string;
        };
        issuanceVersion: {
            $ref: string;
        };
        principalAmount: {
            $ref: string;
        };
        principalToken: {
            $ref: string;
        };
        debtor: {
            $ref: string;
        };
        debtorFee: {
            $ref: string;
        };
        creditor: {
            $ref: string;
        };
        creditorFee: {
            $ref: string;
        };
        relayer: {
            $ref: string;
        };
        relayerFee: {
            $ref: string;
        };
        underwriter: {
            $ref: string;
        };
        underwriterFee: {
            $ref: string;
        };
        underwriterRiskRating: {
            $ref: string;
        };
        termsContract: {
            $ref: string;
        };
        termsContractParameters: {
            $ref: string;
        };
        expirationTimestampInSec: {
            $ref: string;
        };
        salt: {
            $ref: string;
        };
    };
    type: string;
};
export declare const debtOrderWithTermsSpecifiedSchema: {
    id: string;
    allOf: ({
        $ref: string;
    } | {
        required: string[];
    })[];
};
