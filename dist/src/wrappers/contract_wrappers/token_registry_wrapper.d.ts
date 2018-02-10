/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class TokenRegistryContract extends BaseContract {
    setTokenAddress: {
        sendTransactionAsync(symbol: string, token: string, txData?: TxData): Promise<string>;
        estimateGasAsync(symbol: string, token: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(symbol: string, token: string, txData?: TxData): string;
    };
    symbolToTokenAddress: {
        callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getTokenAddress: {
        callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<TokenRegistryContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<TokenRegistryContract>;
    private static getArtifactsData();
}
