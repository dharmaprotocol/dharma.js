/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class MockERC721ReceiverContract extends BaseContract {
    getMockReturnValue: {
        callAsync(functionName: string, argsSignature: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    setReturnValueForERC721ReceivedHook: {
        sendTransactionAsync(_returnValue: string, txData?: TxData): Promise<string>;
        estimateGasAsync(_returnValue: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_returnValue: string, txData?: TxData): string;
    };
    setShouldRevert: {
        sendTransactionAsync(_shouldRevert: boolean, txData?: TxData): Promise<string>;
        estimateGasAsync(_shouldRevert: boolean, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_shouldRevert: boolean, txData?: TxData): string;
    };
    mockReturnValue: {
        sendTransactionAsync(functionName: string, argsSignature: string, returnValue: string, txData?: TxData): Promise<string>;
        estimateGasAsync(functionName: string, argsSignature: string, returnValue: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(functionName: string, argsSignature: string, returnValue: string, txData?: TxData): string;
    };
    wasOnERC721ReceivedCalledWith: {
        callAsync(_address: string, _tokenId: BigNumber, _data: string, defaultBlock?: Web3.BlockParam): Promise<boolean>;
    };
    reset: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    onERC721Received: {
        sendTransactionAsync(_address: string, _tokenId: BigNumber, _data: string, txData?: TxData): Promise<string>;
        estimateGasAsync(_address: string, _tokenId: BigNumber, _data: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_address: string, _tokenId: BigNumber, _data: string, txData?: TxData): string;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<MockERC721ReceiverContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<MockERC721ReceiverContract>;
}
