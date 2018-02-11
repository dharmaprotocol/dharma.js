export declare const Schemas: {
    addressSchema: {
        id: string;
        type: string;
        pattern: string;
    };
    numberSchema: {
        id: string;
        type: string;
        pattern: string;
    };
    bytes32Schema: {
        id: string;
        type: string;
        pattern: string;
    };
    debtOrderSchema: {
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
    debtOrderWithTermsSpecifiedSchema: {
        id: string;
        allOf: ({
            $ref: string;
            required?: undefined;
        } | {
            required: string[];
            $ref?: undefined;
        })[];
    };
    simpleInterestLoanOrderSchema: {
        id: string;
        allOf: ({
            $ref: string;
            properties?: undefined;
            required?: undefined;
        } | {
            properties: {
                interestRate: {
                    $ref: string;
                };
                amortizationUnit: {
                    type: string;
                    pattern: string;
                };
                termLength: {
                    $ref: string;
                };
            };
            required: string[];
            $ref?: undefined;
        })[];
    };
};
