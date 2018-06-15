export declare const collateralizedSimpleInterestLoanOrderSchema: {
    id: string;
    allOf: ({
        $ref: string;
        properties?: undefined;
        required?: undefined;
    } | {
        properties: {
            collateralAmount: {
                $ref: string;
            };
            gracePeriodInDays: {
                $ref: string;
            };
        };
        required: string[];
        $ref?: undefined;
    })[];
};
