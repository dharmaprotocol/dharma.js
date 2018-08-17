import { Dharma } from "../dharma";

import { EthereumAddress, TokenAmount } from "../types";

import { TokenAPI, TokenAttributes } from "../apis/token_api";

export interface TokenData {
    symbol: string;
    balance: number;
    allowance: number;
    hasUnlimitedAllowance: boolean;
    name: string;
    numDecimals: number;
    address: string;
}

export class Tokens {
    private readonly owner: EthereumAddress;

    public constructor(private dharma: Dharma, owner: string) {
        this.owner = new EthereumAddress(owner);

        this.getDataPromise = this.getDataPromise.bind(this);
    }

    public async get(): Promise<TokenData[]> {
        const tokens = await this.dharma.token.getSupportedTokens();

        return Promise.all(tokens.map(this.getDataPromise));
    }

    public async getTokenDataForSymbol(symbol: string): Promise<TokenData> {
        const attributes = await this.dharma.token.getTokenAttributesBySymbol(symbol);

        return this.getDataPromise(attributes);
    }

    private async getDataPromise(tokenAttributes: TokenAttributes): Promise<TokenData> {
        const { address, symbol, name, numDecimals } = tokenAttributes;

        const rawBalance = await this.dharma.token.getBalanceAsync(address, this.owner.toString());

        const rawAllowance = await this.dharma.token.getProxyAllowanceAsync(
            address,
            this.owner.toString(),
        );

        const balanceAmount = TokenAmount.fromRaw(rawBalance, symbol);

        const allowanceAmount = TokenAmount.fromRaw(rawAllowance, symbol);

        const hasUnlimitedAllowance = TokenAPI.isUnlimitedAllowance(allowanceAmount.rawAmount);

        return {
            symbol,
            name,
            address,
            numDecimals: numDecimals.toNumber(),
            balance: balanceAmount.decimalAmount,
            allowance: allowanceAmount.decimalAmount,
            hasUnlimitedAllowance,
        };
    }
}
