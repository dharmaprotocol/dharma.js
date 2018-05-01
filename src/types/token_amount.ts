// Utils
import { BigNumber } from "../../utils/bignumber";

// Types
import { Token } from "../types";

export interface BaseTokenAmountParams {
    symbol: string;
}

export interface DecimalTokenAmount extends BaseTokenAmountParams {
    kind: "decimalTokenAmount";
    decimalAmount: BigNumber;
}

export interface RawTokenAmount extends BaseTokenAmountParams {
    kind: "rawTokenAmount";
    rawAmount: BigNumber;
}

type TokenParams = DecimalTokenAmount | RawTokenAmount;

export class TokenAmount {
    private static convertToRaw(decimalAmount: BigNumber, numDecimals: BigNumber): BigNumber {
        return decimalAmount.mul(new BigNumber(10).pow(numDecimals.toNumber()));
    }

    private static convertToDecimal(rawAmount: BigNumber, numDecimals: BigNumber): BigNumber {
        return rawAmount.div(new BigNumber(10).pow(numDecimals.toNumber()));
    }

    public readonly rawAmount: BigNumber;
    private token: Token;

    private constructor(params: TokenParams) {
        switch (params.kind) {
            case "decimalTokenAmount":
                this.token = new Token(params.symbol);
                this.rawAmount = TokenAmount.convertToRaw(
                    params.decimalAmount,
                    this.token.numDecimals,
                );
                break;

            case "rawTokenAmount":
                this.token = new Token(params.symbol);
                this.rawAmount = params.rawAmount;
                break;

            default:
                throw new Error("invalid params");
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
