// libraries
import * as moment from "moment";

// utils
import { BigNumber } from "utils/bignumber";

// types
import { RepaymentSchedule } from "src/types/repayment_schedule";

let amortizationUnit;
let termLength;
let issuanceDate;

describe("RepaymentSchedule", () => {
    describe("when the schedule is across 3 months, starting from March 19, 2018", () => {
        beforeAll(() => {
            termLength = 3;
            amortizationUnit = "months";
            issuanceDate = "2018-03-19";
        });

        describe("#toArray", () => {
            test("should return an array of 3 timestamps in intervals of 30 days from March 19, 2018", () => {
                const issuanceTime = moment(issuanceDate);

                const schedule = new RepaymentSchedule(
                    amortizationUnit,
                    new BigNumber(termLength),
                    issuanceTime.unix(),
                );

                expect(schedule.toArray()).toEqual([
                    // A month is assumed to be 30 days by Charta, so the repayment dates
                    // are expected to be exactly 30 days apart, starting from issuance time.
                    issuanceTime.add(30, "days").unix(),
                    issuanceTime.add(30, "days").unix(),
                    issuanceTime.add(30, "days").unix(),
                ]);
            });
        });

        describe("when the schedule is across 1 month, starting from March 19, 2018", () => {
            beforeAll(() => {
                termLength = 1;
                amortizationUnit = "months";
                issuanceDate = "2018-03-19";
            });

            describe("#toArray", () => {
                test("should return an array of 1 timestamp, 30 days from issuance time", () => {
                    const issuanceTime = moment(issuanceDate);
                    const schedule = new RepaymentSchedule(
                        amortizationUnit,
                        new BigNumber(termLength),
                        issuanceTime.unix(),
                    );

                    expect(schedule.toArray()).toEqual([issuanceTime.add(30, "days").unix()]);
                });
            });
        });
    });

    describe("when the schedule is across 2 years, starting from March 19, 2018", () => {
        beforeAll(() => {
            termLength = 2;
            amortizationUnit = "years";
            issuanceDate = "2018-02-28";
        });

        describe("#toArray", () => {
            test("should return an array of 2 timestamps in intervals of 365 days from issuance time", () => {
                const issuanceTime = moment(issuanceDate);
                const schedule = new RepaymentSchedule(
                    amortizationUnit,
                    new BigNumber(termLength),
                    issuanceTime.unix(),
                );

                expect(schedule.toArray()).toEqual([
                    issuanceTime.add(365, "days").unix(),
                    issuanceTime.add(365, "days").unix(),
                ]);
            });
        });
    });
});
