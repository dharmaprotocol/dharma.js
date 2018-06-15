/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class ERC20Contract extends BaseContract {
    approve: {
        sendTransactionAsync(spender: string, value: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(spender: string, value: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(spender: string, value: BigNumber, txData?: TxData): string;
    };
    totalSupply: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    transferFrom: {
        sendTransactionAsync(from: string, to: string, value: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(from: string, to: string, value: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(from: string, to: string, value: BigNumber, txData?: TxData): string;
    };
    balanceOf: {
        callAsync(who: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    transfer: {
        sendTransactionAsync(to: string, value: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(to: string, value: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(to: string, value: BigNumber, txData?: TxData): string;
    };
    allowance: {
        callAsync(owner: string, spender: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<ERC20Contract>;
}
