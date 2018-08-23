// Utils
import { BigNumber } from "../../utils/bignumber";

import { TOKEN_REGISTRY_TRACKED_TOKENS } from "../../utils/constants";

interface RegistryData {
    symbol: string;
    numDecimals: BigNumber;
    name: string;
}

function registryDataForSymbol(symbol: string): RegistryData {
    const registryData = TOKEN_REGISTRY_TRACKED_TOKENS.find(
        (tokenObject) => tokenObject.symbol === symbol,
    );

    if (!registryData) {
        throw new Error("Cannot find token with given symbol in token registry");
    }

    return {
        symbol,
        numDecimals: new BigNumber(registryData.decimals),
        name: registryData.name,
    };
}

export class TokenAmount {
    public static fromRaw(rawAmount: BigNumber, symbol: string) {
        const { numDecimals } = registryDataForSymbol(symbol);
        const decimalAmount = TokenAmount.convertToDecimal(rawAmount, numDecimals);
        return new TokenAmount(decimalAmount, symbol);
    }

    private static convertToRaw(decimalAmount: BigNumber, numDecimals: BigNumber): BigNumber {
        return decimalAmount.mul(new BigNumber(10).pow(numDecimals.toNumber()));
    }

    private static convertToDecimal(rawAmount: BigNumber, numDecimals: BigNumber): number {
        return rawAmount.div(new BigNumber(10).pow(numDecimals.toNumber())).toNumber();
    }

    public readonly rawAmount: BigNumber;
    private readonly data: RegistryData;

    constructor(amount: number, symbol: string) {
        this.data = registryDataForSymbol(symbol);
        this.rawAmount = TokenAmount.convertToRaw(
            new BigNumber(amount.toString()),
            this.data.numDecimals,
        );
    }

    get tokenNumDecimals(): number {
        return this.data.numDecimals.toNumber();
    }

    get tokenName(): string {
        return this.data.name;
    }

    get tokenSymbol(): string {
        return this.data.symbol;
    }

    get decimalAmount(): number {
        return TokenAmount.convertToDecimal(this.rawAmount, this.data.numDecimals);
    }

    public toString(): string {
        return `${this.decimalAmount} ${this.data.symbol}`;
    }
}
