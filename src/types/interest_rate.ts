import { BigNumber } from "../../utils/bignumber";

export class InterestRate {
    public static fromRaw(value: BigNumber): InterestRate {
        return new InterestRate(value.toNumber());
    }

    public percent: number;
    public raw: BigNumber;

    constructor(value: number) {
        this.percent = value;
        this.raw = new BigNumber(value);
    }
}
