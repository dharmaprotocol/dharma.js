// libraries
import { BigNumber } from "bignumber.js";

import { GetRepaymentScheduleScenario } from "./";

// Charta-based specifications for time.
const hourInSeconds = 60 * 60;
const dayInSeconds = 60 * 60 * 24;
const weekInSeconds = 60 * 60 * 24 * 7;
const monthInSeconds = 60 * 60 * 24 * 30;

export const GET_REPAYMENT_SCHEDULE: GetRepaymentScheduleScenario[] = [
    {
        description: "for a schedule over 1 hour",
        expected: (timestamp: number) => [timestamp + hourInSeconds],
        amortizationUnit: "hours",
        termLength: new BigNumber(1),
    },
    {
        description: "for a schedule over 2 days",
        expected: (timestamp: number) => [timestamp + dayInSeconds, timestamp + 2 * dayInSeconds],
        amortizationUnit: "days",
        termLength: new BigNumber(2),
    },
    {
        description: "for a schedule over 2 weeks",
        expected: (timestamp: number) => [timestamp + weekInSeconds, timestamp + 2 * weekInSeconds],
        amortizationUnit: "weeks",
        termLength: new BigNumber(2),
    },
    {
        description: "for a schedule over 3 months",
        expected: (timestamp: number) => [
            timestamp + monthInSeconds,
            timestamp + 2 * monthInSeconds,
            timestamp + 3 * monthInSeconds,
        ],
        amortizationUnit: "months",
        termLength: new BigNumber(3),
    },
];
