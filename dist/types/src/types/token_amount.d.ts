import { BigNumber } from "../../utils/bignumber";
export declare class TokenAmount {
    static fromRaw(rawAmount: BigNumber, symbol: string): TokenAmount;
    private static convertToRaw(decimalAmount, numDecimals);
    private static convertToDecimal(rawAmount, numDecimals);
    readonly rawAmount: BigNumber;
    private readonly token;
    constructor(amount: number, symbol: string);
    readonly tokenNumDecimals: number;
    readonly tokenName: string;
    readonly tokenSymbol: string;
    readonly decimalAmount: number;
    toString(): string;
}
