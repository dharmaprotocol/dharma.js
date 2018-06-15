import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";
import { ContractsAPI } from "./";
import { TxData } from "../types";
export interface TokenAttributes {
    address: string;
    symbol: string;
    name: string;
    numDecimals: BigNumber;
}
export declare const TokenAPIErrors: {
    INSUFFICIENT_SENDER_BALANCE: (address: any) => any;
    INSUFFICIENT_SENDER_ALLOWANCE: (address: any) => any;
    TOKEN_DOES_NOT_EXIST: (tokenSymbol: any) => any;
};
export declare class TokenAPI {
    private web3;
    private contracts;
    private assert;
    constructor(web3: Web3, contracts: ContractsAPI);
    /**
     * Asynchronously transfer value denominated in the specified ERC20 token to
     * the address specified.
     *
     * @param  tokenAddress the address of the token being used.
     * @param  to           to whom the transfer is being made.
     * @param  value        the amount being transferred.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    transferAsync(tokenAddress: string, to: string, value: BigNumber, options?: TxData): Promise<string>;
    /**
     * Asynchronously transfer the value amount in the token specified so long
     * as the sender of the message has received sufficient allowance on behalf
     * of `from` to do so.
     *
     * @param  tokenAddress the address of the token being used.
     * @param  from         from whom are the funds being transferred.
     * @param  to           to whom are the funds being transferred.
     * @param  value        the amount to be transferred.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    transferFromAsync(tokenAddress: string, from: string, to: string, value: BigNumber, options?: TxData): Promise<string>;
    /**
     * Asynchronously retrieve the balance of tokens for the owner specified.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  ownerAddress address of the owner for whom the balance is being requested.
     * @return              the number of tokens the owner is holding.
     */
    getBalanceAsync(tokenAddress: string, ownerAddress: string): Promise<BigNumber>;
    /**
     * Asynchronously set an allowance to the `tokenTransferProxy`.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  allowance    the size of the allowance.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    setProxyAllowanceAsync(tokenAddress: string, allowance: BigNumber, options?: TxData): Promise<string>;
    /**
     * Asynchronously set an unlimited proxy allowance to the `tokenTransferProxy`.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    setUnlimitedProxyAllowanceAsync(tokenAddress: string, options?: TxData): Promise<string>;
    /**
     * Asynchronously determine the allowance afforded to the
     * `tokenTransferProxy` allotted by the specified owner.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  ownerAddress the owner who made the allowance allotment.
     * @return              the allowance allotted to the `tokenTransferProxy`.
     */
    getProxyAllowanceAsync(tokenAddress: string, ownerAddress: string): Promise<BigNumber>;
    /**
     * Returns an array of token attributes, including symbol and name, for tokens that are
     * listed in Dharma's token registry.
     *
     * @returns {Promise<TokenAttributes[]>}
     */
    getSupportedTokens(): Promise<TokenAttributes[]>;
    /**
     * Asynchronously retrieve the list of symbols of the tokens in the TokenRegistry.
     *
     * @returns {Promise<String[]>} the list of symbols of the tokens in the TokenRegistry.
     */
    getTokenSymbolList(): Promise<string[]>;
    /**
     * Asynchronously retrieve the number of decimal points used by the given token.
     *
     * @param  tokenSymbol symbol of the ERC20 token.
     * @return             the number of decimal points used by the given token.
     */
    getNumDecimals(tokenSymbol: string): Promise<BigNumber>;
}
