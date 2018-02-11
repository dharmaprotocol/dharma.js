export declare const simpleInterestLoanOrderSchema: {
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
