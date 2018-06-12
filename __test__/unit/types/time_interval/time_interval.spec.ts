import { TimeInterval } from "../../../../src/types";

import { timeIntervalScenarios } from "./scenarios";

describe("TimeInterval", () => {
    timeIntervalScenarios.forEach((scenario) => {
        let interval: TimeInterval;

        describe(`when instantiated with ${scenario.amount} as the amount, and '${
            scenario.unit
        }' as the unit`, () => {
            beforeEach(() => {
                interval = new TimeInterval(scenario.amount, scenario.unit);
            });

            it("returns a TimeInterval object with those attributes", () => {
                expect(interval.unit).toEqual(scenario.unit);
                expect(interval.amount).toEqual(scenario.amount);
            });

            describe("#fromTimestamp", () => {
                describe(`when given ${scenario.currentBlockTime} as an argument`, () => {
                    it(`returns ${scenario.blockTimeAfterInterval}`, () => {
                        expect(interval.fromTimestamp(scenario.currentBlockTime)).toEqual(
                            scenario.blockTimeAfterInterval,
                        );
                    });
                });
            });
        });
    });
});
