// Utils
import { BigNumber } from "../../utils/bignumber";

// Types
import { Token } from "../types";

export class TokenAmount {
    public static fromRawAmount(rawAmount: BigNumber, symbol: string): TokenAmount {
        return new TokenAmount(rawAmount, new Token(symbol));
    }

    public static fromDecimalAmount(decimalAmount: BigNumber, symbol: string) {
        const token = new Token(symbol);
        const rawAmount = TokenAmount.convertToRaw(decimalAmount, token.numDecimals);

        return new TokenAmount(rawAmount, token);
    }

    private static convertToRaw(decimalAmount: BigNumber, numDecimals: BigNumber): BigNumber {
        return decimalAmount.mul(new BigNumber(10).pow(numDecimals.toNumber()));
    }

    private static convertToDecimal(rawAmount: BigNumber, numDecimals: BigNumber): BigNumber {
        return rawAmount.div(new BigNumber(10).pow(numDecimals.toNumber()));
    }

    public readonly rawAmount: BigNumber;
    private token: Token;

    private constructor(rawAmount: BigNumber, token: Token) {
        this.rawAmount = rawAmount;
        this.token = token;
    }

    get tokenNumDecimals(): BigNumber {
        return this.token.numDecimals;
    }

    get tokenName(): string {
        return this.token.name;
    }

    get tokenSymbol(): string {
        return this.token.symbol;
    }

    get decimalAmount(): BigNumber {
        return TokenAmount.convertToDecimal(this.rawAmount, this.token.numDecimals);
    }

    public toString(): string {
        return `${this.decimalAmount} ${this.token.symbol}`;
    }
}
