import { BigNumber } from "../../utils/bignumber";
export declare class Token {
    readonly numDecimals: BigNumber;
    readonly name: string;
    readonly symbol: string;
    constructor(symbol: string);
}
