// Utils
import { BigNumber } from "../../utils/bignumber";

import { Token } from "../types";

export class TokenAmount {
    public static fromAmount(symbol: string, amount: BigNumber): TokenAmount {
        const tokenAmount = new TokenAmount(symbol);
        tokenAmount.amount = amount;

        return tokenAmount;
    }

    public static fromScaledAmount(symbol: string, scaledAmount: BigNumber) {
        const tokenAmount = new TokenAmount(symbol);
        const decimals = tokenAmount.decimals;
        tokenAmount.amount = scaledAmount.div(new BigNumber(10).pow(decimals.toNumber()));

        return tokenAmount;
    }

    public amount: BigNumber;
    public readonly token: Token;

    constructor(symbol: string) {
        this.token = new Token(symbol);
    }

    get address(): string {
        return this.token.address;
    }

    get decimals(): BigNumber {
        return this.token.decimals;
    }

    get name(): string {
        return this.token.name;
    }

    get scaledAmount(): BigNumber {
        const decimals = this.token.decimals;
        return this.amount.times(new BigNumber(10).pow(decimals.toNumber()));
    }

    set scaledAmount(scaledAmount: BigNumber) {
        const decimals = this.token.decimals;
        this.amount = scaledAmount.div(new BigNumber(10).pow(decimals.toNumber()));
    }

    get symbol(): string {
        return this.token.symbol;
    }

    public toString(): string {
        return `${this.amount} ${this.token.symbol}`;
    }
}
