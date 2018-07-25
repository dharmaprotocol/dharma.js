import * as Web3 from "web3";

import { ACCOUNTS } from "../accounts";

import { Dharma } from "../../src/dharma";
import { TokenAmount } from "../../src/types";
import { DummyTokenContract } from "../../src/wrappers";
import { BigNumber } from "../../utils/bignumber";
import { NULL_ADDRESS } from "../../utils/constants";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);

/**
 * Returns true if the given address string matches the format of an Ethereum address,
 * and is not the null address (i.e., 0x0000000000000000000000000000000000000000).
 *
 * @param {string} address
 * @returns {boolean}
 */
export function isNonNullAddress(address: string): boolean {
    const addressRegex = new RegExp("^0x[a-fA-F0-9]{40}$");

    return address.match(addressRegex) && address !== NULL_ADDRESS;
}

export async function setBalanceForSymbol(
    dharma: Dharma,
    balance: number,
    tokenSymbol: string,
    recipient: string,
): Promise<string> {
    const amount = new TokenAmount(balance, tokenSymbol);

    const tokenRegistry = await dharma.contracts.loadTokenRegistry();

    const tokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(amount.tokenSymbol);

    const token = await DummyTokenContract.at(tokenAddress, web3, TX_DEFAULTS);

    return token.setBalance.sendTransactionAsync(recipient, amount.rawAmount);
}

export async function revokeAllowanceForSymbol(
    dharma: Dharma,
    tokenSymbol: string,
    recipient: string,
): Promise<string> {
    const tokenRegistry = await dharma.contracts.loadTokenRegistry();

    const tokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(tokenSymbol);

    const tokenTransferProxy = await dharma.contracts.loadTokenTransferProxyAsync(TX_DEFAULTS);

    const token = await DummyTokenContract.at(tokenAddress, web3, TX_DEFAULTS);

    return token.approve.sendTransactionAsync(tokenTransferProxy.address, new BigNumber(0), {
        from: recipient,
    });
}

export async function revokeBalanceForSymbol(
    dharma: Dharma,
    tokenSymbol: string,
    recipient: string,
): Promise<string> {
    return setBalanceForSymbol(dharma, 0, tokenSymbol, recipient);
}
