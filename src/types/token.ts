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

    constructor(amount: BigNumber, symbol: string, raw?: boolean) {
        this._token = new Token(symbol);

        if (raw) {
            const decimals = this._token.decimals;
            this._amount = amount.div(new BigNumber(10).pow(decimals.toNumber()));
        } else {
            this._amount = amount;
        }
    }

    get address(): string {
        return this._token.address;
    }

    get amount(): BigNumber {
        return this._amount;
    }

    get decimals(): BigNumber {
        return this._token.decimals;
    }

    get name(): string {
        return this._token.name;
    }

    get symbol(): string {
        return this._token.symbol;
    }

    get token(): Token {
        return this._token;
    }

    public getRawAmount(): BigNumber {
        const amount = this._amount;
        const decimals = this._token.decimals;

        return amount.times(new BigNumber(10).pow(decimals.toNumber()));
    }

    public toString(): string {
        return `${this._amount} ${this._token.symbol}`;
    }
}
