import { BigNumber } from "../../utils/bignumber";

export class InterestRate {
    private raw: BigNumber;

    constructor(public percent: number) {
        this.raw = new BigNumber(percent);
    }
}
