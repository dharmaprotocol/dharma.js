// External Libraries
import * as _ from "lodash";

// Utils
import { BigNumber } from "../../utils/bignumber";
import { TOKEN_REGISTRY_TRACKED_TOKENS } from "../../utils/constants";

export class Token {
    private _address: string;
    private _decimals: BigNumber;
    private _name: string;
    private _symbol: string;

    constructor(symbol: string) {
        this._symbol = symbol;

        const token = _.find(
            TOKEN_REGISTRY_TRACKED_TOKENS,
            (tokenObject) => tokenObject.symbol === symbol,
        );

        if (!token) {
            throw new Error("Cannot find token with given symbol in token registry");
        }

        this._address = token.address;
        this._decimals = new BigNumber(token.decimals);
        this._name = token.name;
    }

    get address(): string {
        return this._address;
    }

    get decimals(): BigNumber {
        return this._decimals;
    }

    get name(): string {
        return this._name;
    }

    get symbol(): string {
        return this._symbol;
    }
}

export class TokenAmount {
    private _amount: BigNumber;
    private _token: Token;

    static fromAmount(symbol: string, amount: BigNumber): TokenAmount {
        const tokenAmount = new TokenAmount(symbol);
        tokenAmount.amount = amount;

        return tokenAmount;
    }

    static fromScaledAmount(symbol: string, scaledAmount: BigNumber) {
        const tokenAmount = new TokenAmount(symbol);
        const decimals = tokenAmount.decimals;
        tokenAmount.amount = scaledAmount.div(new BigNumber(10).pow(decimals.toNumber()));

        return tokenAmount;
    }

    constructor(symbol: string) {
        this._token = new Token(symbol);
    }

    get address(): string {
        return this._token.address;
    }

    get amount(): BigNumber {
        return this._amount;
    }

    set amount(amount: BigNumber) {
        this._amount = amount;
    }

    get decimals(): BigNumber {
        return this._token.decimals;
    }

    get name(): string {
        return this._token.name;
    }

    get scaledAmount(): BigNumber {
        const amount = this._amount;
        const decimals = this._token.decimals;

        return amount.times(new BigNumber(10).pow(decimals.toNumber()));
    }

    set scaledAmount(scaledAmount: BigNumber) {
        const decimals = this._token.decimals;
        this._amount = scaledAmount.div(new BigNumber(10).pow(decimals.toNumber()));
    }

    get symbol(): string {
        return this._token.symbol;
    }

    get token(): Token {
        return this._token;
    }

    public toString(): string {
        return `${this._amount} ${this._token.symbol}`;
    }
}
