import * as map from "lodash.map";
import { BigNumber } from "../../utils/bignumber";

// The repayment schedule is calculated on basis of how charta computes it,
// which simplifies the "months" unit as equal to 30 days.
const AMORTIZATION_UNIT_TO_SECONDS = {
    hours: 60 * 60,
    days: 60 * 60 * 24,
    weeks: 60 * 60 * 24 * 7,
    months: 60 * 60 * 24 * 30,
    years: 60 * 60 * 24 * 365,
};

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
export class RepaymentSchedule {
    private repaymentDates: number[];

    constructor(
        private amortizationUnit: "hours" | "days" | "weeks" | "months" | "years",
        private termLength: BigNumber,
        private issuanceBlockTimestamp: number,
    ) {
        const repayments = new Array<number>(this.numRepaymentsToReturn());
        const unitSeconds = this.unitInSeconds();

        let timestamp = this.issuanceBlockTimestamp;

        this.repaymentDates = map(repayments, () => (timestamp += unitSeconds));
    }

    /**
     * Returns an array of dates (as unix timestamps) comprising the repayment schedule.
     *
     * @returns {Array<number>}
     */
    public toArray(): number[] {
        return this.repaymentDates;
    }

    private numRepaymentsToReturn(): number {
        return this.termLength.toNumber();
    }

    private unitInSeconds(): number {
        return AMORTIZATION_UNIT_TO_SECONDS[this.amortizationUnit];
    }
}
