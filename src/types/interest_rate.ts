import { BigNumber } from "../../utils/bignumber";

export class InterestRate {
    public raw: BigNumber;

    constructor(public percent: number) {
        this.raw = new BigNumber(percent);
    }
}
