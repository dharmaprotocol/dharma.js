import { Dharma } from "../dharma";

import { BigNumber } from "../../utils/bignumber";

import { EthereumAddress, TokenAmount } from "../types";

export interface TokenData {
    symbol: string;
    balance: number;
    allowance: number;
    hasUnlimitedAllowance: boolean;
}

const UNLIMITED_ALLOWANCE = new BigNumber(2).pow(256).sub(1);

export class Tokens {
    private readonly owner: EthereumAddress;

    constructor(private dharma: Dharma, owner: string) {
        this.owner = new EthereumAddress(owner);
    }

    public async get(): Promise<TokenData[]> {
        const tokens = await this.dharma.token.getSupportedTokens();

        return tokens.map(async (token) => {
            const { address, symbol } = token;

            const rawBalance = await this.dharma.token.getBalanceAsync(
                address,
                this.owner.toString(),
            );

            const rawAllowance = await this.dharma.token.getProxyAllowanceAsync(
                address,
                this.owner.toString(),
            );

            const balanceAmount = TokenAmount.fromRaw(rawBalance, symbol);
            const allowanceAmount = TokenAmount.fromRaw(rawAllowance, symbol);

            const hasUnlimitedAllowance = allowanceAmount.rawAmount.equals(UNLIMITED_ALLOWANCE);

            return {
                symbol,
                balance: balanceAmount.decimalAmount,
                allowance: allowanceAmount.decimalAmount,
                hasUnlimitedAllowance,
            };
        });
    }
}
