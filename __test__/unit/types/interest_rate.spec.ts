import { InterestRate } from "../../../src/types";

import { BigNumber } from "../../../utils/bignumber";

describe("InterestRate", () => {
    describe("instantiation", () => {
        const percent = 12.4;
        const rawAmount = new BigNumber(percent);

        describe("#fromPercent", () => {
            const interestRate = InterestRate.fromPercent(percent);

            test("should expose the interest rate in raw form", () => {
                expect(interestRate.raw).toEqual(rawAmount);
            });

            test("should expose the interest rate in percent form", () => {
                expect(interestRate.percent).toEqual(percent);
            });
        });

        describe("#fromRaw", () => {
            const interestRate = InterestRate.fromRaw(rawAmount);

            test("should expose the interest rate in raw form", () => {
                expect(interestRate.raw).toEqual(rawAmount);
            });

            test("should expose the interest rate in percent form", () => {
                expect(interestRate.percent).toEqual(percent);
            });
        });
    });
});
