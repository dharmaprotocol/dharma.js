/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class DummyTokenContract extends BaseContract {
    mintingFinished: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean>;
    };
    name: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    approve: {
        sendTransactionAsync(_spender: string, _value: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_spender: string, _value: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_spender: string, _value: BigNumber, txData?: TxData): string;
    };
    totalSupply: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    transferFrom: {
        sendTransactionAsync(_from: string, _to: string, _value: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_from: string, _to: string, _value: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_from: string, _to: string, _value: BigNumber, txData?: TxData): string;
    };
    decimals: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    mint: {
        sendTransactionAsync(_to: string, _amount: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_to: string, _amount: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_to: string, _amount: BigNumber, txData?: TxData): string;
    };
    decreaseApproval: {
        sendTransactionAsync(_spender: string, _subtractedValue: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_spender: string, _subtractedValue: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_spender: string, _subtractedValue: BigNumber, txData?: TxData): string;
    };
    balanceOf: {
        callAsync(_owner: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    finishMinting: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    owner: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    symbol: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    transfer: {
        sendTransactionAsync(_to: string, _value: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_to: string, _value: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_to: string, _value: BigNumber, txData?: TxData): string;
    };
    increaseApproval: {
        sendTransactionAsync(_spender: string, _addedValue: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_spender: string, _addedValue: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_spender: string, _addedValue: BigNumber, txData?: TxData): string;
    };
    allowance: {
        callAsync(_owner: string, _spender: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    setBalance: {
        sendTransactionAsync(_target: string, _value: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_target: string, _value: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_target: string, _value: BigNumber, txData?: TxData): string;
    };
    transferOwnership: {
        sendTransactionAsync(newOwner: string, txData?: TxData): Promise<string>;
        estimateGasAsync(newOwner: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(newOwner: string, txData?: TxData): string;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<DummyTokenContract>;
    private static getArtifactsData();
}
