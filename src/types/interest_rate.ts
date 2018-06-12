import { BigNumber } from "../../utils/bignumber";

export class InterestRate {
    public static fromRaw(value: BigNumber): InterestRate {
        return new InterestRate(value);
    }

    public static fromPercent(value: number): InterestRate {
        return new InterestRate(value);
    }

    public percent: number;
    public raw: BigNumber;

    private constructor(value: number | BigNumber) {
        if (typeof value === "number") {
            this.percent = value;
            this.raw = new BigNumber(value);
        } else if (value instanceof BigNumber) {
            this.percent = value.toNumber();
            this.raw = value;
        }
    }
}
