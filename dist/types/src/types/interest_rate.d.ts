import { BigNumber } from "../../utils/bignumber";
export declare class InterestRate {
    static fromRaw(value: BigNumber): InterestRate;
    readonly percent: number;
    readonly raw: BigNumber;
    constructor(value: number);
}
