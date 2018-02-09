export declare const simpleInterestLoanOrderSchema: {
    id: string;
    allOf: ({
        $ref: string;
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
    })[];
};
