/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class TokenTransferProxyContract extends BaseContract {
    addAuthorizedTransferAgent: {
        sendTransactionAsync(_agent: string, txData?: TxData): Promise<string>;
        estimateGasAsync(_agent: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_agent: string, txData?: TxData): string;
    };
    transferFrom: {
        sendTransactionAsync(_token: string, _from: string, _to: string, _amount: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_token: string, _from: string, _to: string, _amount: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_token: string, _from: string, _to: string, _amount: BigNumber, txData?: TxData): string;
    };
    unpause: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    paused: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean>;
    };
    pause: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    owner: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    revokeTransferAgentAuthorization: {
        sendTransactionAsync(_agent: string, txData?: TxData): Promise<string>;
        estimateGasAsync(_agent: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_agent: string, txData?: TxData): string;
    };
    getAuthorizedTransferAgents: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]>;
    };
    transferOwnership: {
        sendTransactionAsync(newOwner: string, txData?: TxData): Promise<string>;
        estimateGasAsync(newOwner: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(newOwner: string, txData?: TxData): string;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<TokenTransferProxyContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<TokenTransferProxyContract>;
}
