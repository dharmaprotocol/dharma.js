import { BigNumber } from "../../../../utils/bignumber";

import { DurationUnit } from "../../../../src/types/time_interval";

export interface TimeIntervalScenario {
    amount: number;
    unit: DurationUnit;
    currentBlockTime: BigNumber;
    blockTimeAfterInterval: BigNumber;
}

const defaultParams = {
    // We set some arbitrary UNIX timestamp, from which we can determine the expected
    // timestamp after the given scenario's interval.
    currentBlockTime: new BigNumber(1528842347),
};

export const timeIntervalScenarios: TimeIntervalScenario[] = [
    {
        ...defaultParams,
        amount: 1,
        unit: "day",
        blockTimeAfterInterval: new BigNumber(1528928747),
    },
    {
        ...defaultParams,
        amount: 4,
        unit: "days",
        blockTimeAfterInterval: new BigNumber(1529187947),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "week",
        blockTimeAfterInterval: new BigNumber(1529447147),
    },
    {
        ...defaultParams,
        amount: 2,
        unit: "weeks",
        blockTimeAfterInterval: new BigNumber(1530051947),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "month",
        blockTimeAfterInterval: new BigNumber(1531434347),
    },
    {
        ...defaultParams,
        amount: 3,
        unit: "months",
        blockTimeAfterInterval: new BigNumber(1536791147),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "year",
        blockTimeAfterInterval: new BigNumber(1560378347),
    },
    {
        ...defaultParams,
        amount: 3,
        unit: "years",
        blockTimeAfterInterval: new BigNumber(1623536747),
    },
];
