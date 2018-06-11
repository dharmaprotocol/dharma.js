import { BigNumber } from "../../utils/bignumber";

const HOUR_LENGTH_IN_SECONDS = 60 * 60;
const DAY_LENGTH_IN_SECONDS = HOUR_LENGTH_IN_SECONDS * 24;
const WEEK_LENGTH_IN_SECONDS = DAY_LENGTH_IN_SECONDS * 7;
const MONTH_LENGTH_IN_SECONDS = DAY_LENGTH_IN_SECONDS * 30;
const YEAR_LENGTH_IN_SECONDS = DAY_LENGTH_IN_SECONDS * 365;

function numberOfSeconds(unit: AmortizationUnitCode): number {
    switch (unit) {
        case AmortizationUnitCode.Hours:
            return HOUR_LENGTH_IN_SECONDS;
        case AmortizationUnitCode.Days:
            return DAY_LENGTH_IN_SECONDS;
        case AmortizationUnitCode.Weeks:
            return WEEK_LENGTH_IN_SECONDS;
        case AmortizationUnitCode.Months:
            return MONTH_LENGTH_IN_SECONDS;
        case AmortizationUnitCode.Years:
            return YEAR_LENGTH_IN_SECONDS;
    }
}

export enum AmortizationUnitCode {
    Hours = "hours",
    Days = "days",
    Weeks = "weeks",
    Months = "months",
    Years = "years",
}

export class Term {
    constructor(
        public duration: number,
        public unit: AmortizationUnitCode,
        public installments: number,
    ) {}

    public getLength(): BigNumber {
        return new BigNumber(this.duration);
    }
}
