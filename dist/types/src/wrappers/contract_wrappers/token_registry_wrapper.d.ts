import * as Web3 from "web3";
import { BigNumber } from "../../../utils/bignumber";
import { TxData } from "../../types";
import { BaseContract } from "./base_contract_wrapper";
export declare class TokenRegistryContract extends BaseContract {
    symbolHashToTokenIndex: {
        callAsync(index_0: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    setTokenAddress: {
        sendTransactionAsync(symbol: string, token: string, txData?: TxData): Promise<string>;
        estimateGasAsync(symbol: string, token: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(symbol: string, token: string, txData?: TxData): string;
    };
    getTokenIndexBySymbol: {
        callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    getTokenAddressBySymbol: {
        callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getTokenAddressByIndex: {
        callAsync(index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getTokenSymbolByIndex: {
        callAsync(index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    owner: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    tokenSymbolList: {
        callAsync(index_0: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    tokenSymbolListLength: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    symbolHashToTokenAddress: {
        callAsync(index_0: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getTokenAttributesByIndex: {
        callAsync(index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<any[]>;
    };
    getTokenAttributesBySymbol: {
        callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<any[]>;
    };
    getTokenNameBySymbol: {
        callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getTokenNameByIndex: {
        callAsync(index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getNumDecimalsFromSymbol: {
        callAsync(tokenSymbol: string): Promise<BigNumber>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<TokenRegistryContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<TokenRegistryContract>;
}
