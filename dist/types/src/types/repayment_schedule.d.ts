import { BigNumber } from "../../utils/bignumber";
/**
 * Given an amortization unit, term length, and issuance date
 * an instance of RepaymentSchedule can compute return a list of the dates for repayment.
 *
 * @example
 *  const currentTime = new BigNumber(Math.round(Date.now()/1000))
 *  const termLength = new BigNumber(1)
 *  const schedule = new RepaymentSchedule("months", termLength, currentTime)
 *
 *  // Usage
 *  schedule.toArray()
 *  => [1521506879]
 */
export declare class RepaymentSchedule {
    private amortizationUnit;
    private termLength;
    private issuanceBlockTimestamp;
    private repaymentDates;
    constructor(amortizationUnit: "hours" | "days" | "weeks" | "months" | "years", termLength: BigNumber, issuanceBlockTimestamp: number);
    /**
     * Returns an array of dates (as unix timestamps) comprising the repayment schedule.
     *
     * @returns {Array<number>}
     */
    toArray(): number[];
    private numRepaymentsToReturn();
    private unitInSeconds();
}
