import { BigNumber } from "../../utils/bignumber";

export const UNDERWRITER_RISK_RATING_SCALING_FACTOR = new BigNumber(10 ** 7);

export class UnderwriterRiskRating {
    public readonly unscaled: number;
    public readonly scaled: BigNumber;

    constructor(value: number | BigNumber) {
        if (typeof value === "number") {
            this.scaled = new BigNumber(value).times(UNDERWRITER_RISK_RATING_SCALING_FACTOR);
            this.unscaled = value;
        } else {
            this.scaled = value;
            this.unscaled = value.div(UNDERWRITER_RISK_RATING_SCALING_FACTOR).toNumber();
        }
    }
}
