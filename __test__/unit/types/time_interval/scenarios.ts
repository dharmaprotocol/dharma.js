import { BigNumber } from "../../../../utils/bignumber";

import { DurationUnit } from "../../../../src/types/time_interval";

export interface TimeIntervalScenario {
    amount: number;
    unit: DurationUnit;
    currentBlockTime: BigNumber;
    blockTimeAfterInterval: BigNumber;
}

// We set some arbitrary UNIX timestamp, from which we can determine the expected
// timestamp after the given scenario's interval.
const staticBlockTime = 1528842347;

const defaultParams = {
    currentBlockTime: new BigNumber(staticBlockTime),
};

export const timeIntervalScenarios: TimeIntervalScenario[] = [
    {
        ...defaultParams,
        amount: 1,
        unit: "day",
        blockTimeAfterInterval: new BigNumber(staticBlockTime + 60 * 60 * 24),
    },
    {
        ...defaultParams,
        amount: 4,
        unit: "days",
        blockTimeAfterInterval: new BigNumber(staticBlockTime + 60 * 60 * 24 * 4),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "week",
        blockTimeAfterInterval: new BigNumber(staticBlockTime + 60 * 60 * 24 * 7),
    },
    {
        ...defaultParams,
        amount: 2,
        unit: "weeks",
        blockTimeAfterInterval: new BigNumber(staticBlockTime + 60 * 60 * 24 * 14),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "month",
        blockTimeAfterInterval: new BigNumber(staticBlockTime + 60 * 60 * 24 * 30),
    },
    {
        ...defaultParams,
        amount: 3,
        unit: "months",
        blockTimeAfterInterval: new BigNumber(staticBlockTime + 60 * 60 * 24 * 92),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "year",
        blockTimeAfterInterval: new BigNumber(staticBlockTime + 60 * 60 * 24 * 365),
    },
    {
        ...defaultParams,
        amount: 3,
        unit: "years",
        blockTimeAfterInterval: new BigNumber(1623536747),
    },
];
