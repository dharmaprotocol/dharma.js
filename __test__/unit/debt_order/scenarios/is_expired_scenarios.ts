// Debt Order
import { DebtOrderParams } from "../../../../src/debt_order";

import { DurationUnit } from "../../../../src/types";

// Test utils
import { ACCOUNTS } from "../../../accounts";

const debtor = ACCOUNTS[1];

export interface IsExpiredScenario {
    description: string;
    params: DebtOrderParams;
    isExpired: boolean;
}

const defaultParams = {
    principalAmount: 5,
    principalToken: "REP",
    collateralAmount: 10,
    collateralToken: "MKR",
    interestRate: 12.3,
    termDuration: 6,
    termUnit: "months" as DurationUnit,
    debtorAddress: debtor.address,
    expiresInDuration: 5,
    expiresInUnit: "days" as DurationUnit,
};

export const IS_EXPIRED_SCENARIOS: IsExpiredScenario[] = [
    {
        description: "when given valid params and the expiration is 5 days in the future",
        params: {
            ...defaultParams,
        },
        isExpired: false,
    },
    {
        description: "when given valid params and the expiration is 5 days in the past",
        params: {
            ...defaultParams,
            expiresInDuration: -5,
        },
        isExpired: true,
    },
    {
        description: "when given valid params and the expiration is 1 day in the past",
        params: {
            ...defaultParams,
            expiresInDuration: -1,
        },
        isExpired: true,
    },
];
