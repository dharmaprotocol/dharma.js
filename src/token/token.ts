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

export async function all(dharma: Dharma, owner: string): Promise<TokenData[]> {
    EthereumAddress.assertValid(owner);

    const tokens = await dharma.token.getSupportedTokens();

    return Promise.all(
        tokens.map((attributes) => {
            return getDataPromise(dharma, attributes, owner);
        }),
    );
}

export async function getDataForSymbol(
    dharma: Dharma,
    symbol: string,
    owner: string,
): Promise<TokenData> {
    EthereumAddress.assertValid(owner);

    const attributes = await dharma.token.getTokenAttributesBySymbol(symbol);

    return getDataPromise(dharma, attributes, owner);
}

function getDataPromise(
    dharma: Dharma,
    tokenAttributes: TokenAttributes,
    owner: string,
): Promise<TokenData> {
    return new Promise((resolve) => {
        const { address, symbol, name, numDecimals } = tokenAttributes;

        const balancePromise = dharma.token.getBalanceAsync(address, owner);

        const allowancePromise = dharma.token.getProxyAllowanceAsync(address, owner);

        Promise.all([balancePromise, allowancePromise]).then((values) => {
            const [rawBalance, rawAllowance] = values;

            const balanceAmount = TokenAmount.fromRaw(rawBalance, symbol);

            const allowanceAmount = TokenAmount.fromRaw(rawAllowance, symbol);

            const hasUnlimitedAllowance = TokenAPI.isUnlimitedAllowance(allowanceAmount.rawAmount);

            resolve({
                symbol,
                name,
                address,
                numDecimals: numDecimals.toNumber(),
                balance: balanceAmount.decimalAmount,
                allowance: allowanceAmount.decimalAmount,
                hasUnlimitedAllowance,
            });
        });
    });
}
