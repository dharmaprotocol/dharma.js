import { BigNumber } from "../../utils/bignumber";

const HOUR_LENGTH_IN_SECONDS = 60 * 60;
const DAY_LENGTH_IN_SECONDS = HOUR_LENGTH_IN_SECONDS * 24;
const WEEK_LENGTH_IN_SECONDS = DAY_LENGTH_IN_SECONDS * 7;
const MONTH_LENGTH_IN_SECONDS = DAY_LENGTH_IN_SECONDS * 30;
const YEAR_LENGTH_IN_SECONDS = DAY_LENGTH_IN_SECONDS * 365;

function numberOfSeconds(unit: AmortizationUnitType): number {
    switch (unit) {
        case AmortizationUnitType.Hours:
            return HOUR_LENGTH_IN_SECONDS;
        case AmortizationUnitType.Days:
            return DAY_LENGTH_IN_SECONDS;
        case AmortizationUnitType.Weeks:
            return WEEK_LENGTH_IN_SECONDS;
        case AmortizationUnitType.Months:
            return MONTH_LENGTH_IN_SECONDS;
        case AmortizationUnitType.Years:
            return YEAR_LENGTH_IN_SECONDS;
    }
}

export enum AmortizationUnitType {
    Hours,
    Days,
    Weeks,
    Months,
    Years,
}

export class Term {
    constructor(
        public duration: number,
        public unit: AmortizationUnitType,
        public installments: number,
    ) {}

    public length(): BigNumber {
        return new BigNumber(this.duration);
    }
}
