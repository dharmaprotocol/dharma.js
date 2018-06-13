// Utils
import { BigNumber } from "../../utils/bignumber";

// Types
import { Token } from "../types";

export class TokenAmount {
    public static fromRaw(rawAmount: BigNumber, symbol: string) {
        const token = new Token(symbol);
        const decimalAmount = TokenAmount.convertToDecimal(rawAmount, token.numDecimals);
        return new TokenAmount(decimalAmount, symbol);
    }

    private static convertToRaw(decimalAmount: BigNumber, numDecimals: BigNumber): BigNumber {
        return decimalAmount.mul(new BigNumber(10).pow(numDecimals.toNumber()));
    }

    private static convertToDecimal(rawAmount: BigNumber, numDecimals: BigNumber): number {
        return rawAmount.div(new BigNumber(10).pow(numDecimals.toNumber())).toNumber();
    }

    public readonly rawAmount: BigNumber;
    private readonly token: Token;

    constructor(amount: number, symbol: string) {
        this.token = new Token(symbol);
        this.rawAmount = TokenAmount.convertToRaw(new BigNumber(amount), this.token.numDecimals);
    }

    get tokenNumDecimals(): number {
        return this.token.numDecimals.toNumber();
    }

    get tokenName(): string {
        return this.token.name;
    }

    get tokenSymbol(): string {
        return this.token.symbol;
    }

    get decimalAmount(): number {
        return TokenAmount.convertToDecimal(this.rawAmount, this.token.numDecimals);
    }

    public toString(): string {
        return `${this.decimalAmount} ${this.token.symbol}`;
    }
}
