import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { DurationUnit } from "../../../../src/types";

export interface IsExpiredScenario {
    description: string;
    params: DebtOrderParams;
    isExpired: boolean;
}

const DEFAULT: DebtOrderParams = {
    principalAmount: 5,
    principalToken: "REP",
    collateralAmount: 10,
    collateralToken: "MKR",
    interestRate: 12.3,
    termDuration: 6,
    termUnit: "months" as DurationUnit,
    expiresInDuration: 5,
    expiresInUnit: "days" as DurationUnit,
};

export const IS_EXPIRED_SCENARIOS: IsExpiredScenario[] = [
    {
        description: "when given valid params and the expiration is 5 days in the future",
        params: {
            ...DEFAULT,
        },
        isExpired: false,
    },
    {
        description: "when given valid params and the expiration is 5 days in the past",
        params: {
            ...DEFAULT,
            expiresInDuration: -5,
        },
        isExpired: true,
    },
    {
        description: "when given valid params and the expiration is 1 day in the past",
        params: {
            ...DEFAULT,
            expiresInDuration: -1,
        },
        isExpired: true,
    },
];
