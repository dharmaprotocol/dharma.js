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
        // 1528842347 + 60  * 60 * 24 = 1528928747
        blockTimeAfterInterval: new BigNumber(1528928747),
    },
    {
        ...defaultParams,
        amount: 4,
        unit: "days",
        // 1528842347 + 60  * 60 * 24 * 4 = 1529187947
        blockTimeAfterInterval: new BigNumber(1529187947),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "week",
        // 1528842347 + 60  * 60 * 24 * 7 = 1529187947
        blockTimeAfterInterval: new BigNumber(1529447147),
    },
    {
        ...defaultParams,
        amount: 2,
        unit: "weeks",
        // 1528842347 + 60  * 60 * 24 * 14 = 1530051947
        blockTimeAfterInterval: new BigNumber(1530051947),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "month",
        // 1528842347 + 60  * 60 * 24 * 30 = 1531434347
        blockTimeAfterInterval: new BigNumber(1531434347),
    },
    {
        ...defaultParams,
        amount: 3,
        unit: "months",
        // 1528842347 + 60  * 60 * 24 * 92 = 1536791147
        blockTimeAfterInterval: new BigNumber(1536791147),
    },
    {
        ...defaultParams,
        amount: 1,
        unit: "year",
        // 1528842347 + 60  * 60 * 24 * 365 = 1560378347
        blockTimeAfterInterval: new BigNumber(1560378347),
    },
    {
        ...defaultParams,
        amount: 3,
        unit: "years",
        blockTimeAfterInterval: new BigNumber(1623536747),
    },
];
