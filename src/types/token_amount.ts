// Utils
import { BigNumber } from "../../utils/bignumber";

// Types
import { Token } from "../types";

export enum TokenAmountType {
    Raw,
    Decimal,
}

export interface TokenAmountParams {
    symbol: string;
    amount: BigNumber;
    type: TokenAmountType;
}

export class TokenAmount {
    private static convertToRaw(decimalAmount: BigNumber, numDecimals: BigNumber): BigNumber {
        return decimalAmount.mul(new BigNumber(10).pow(numDecimals.toNumber()));
    }

    private static convertToDecimal(rawAmount: BigNumber, numDecimals: BigNumber): BigNumber {
        return rawAmount.div(new BigNumber(10).pow(numDecimals.toNumber()));
    }

    public readonly rawAmount: BigNumber;
    private token: Token;

    constructor(params: TokenAmountParams) {
        this.token = new Token(params.symbol);

        switch (params.type) {
            case TokenAmountType.Decimal:
                this.rawAmount = TokenAmount.convertToRaw(params.amount, this.token.numDecimals);
                break;

            case TokenAmountType.Raw:
                this.rawAmount = params.amount;
                break;

            default:
                throw new Error("invalid token amount type");
        }
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
