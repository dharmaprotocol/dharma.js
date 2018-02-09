/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "src/types";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class TermsContractRegistryContract extends BaseContract {
    setSimpleInterestTermsContractAddress: {
        sendTransactionAsync(tokenAddress: string, termsContract: string, txData?: TxData): Promise<string>;
        estimateGasAsync(tokenAddress: string, termsContract: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(tokenAddress: string, termsContract: string, txData?: TxData): string;
    };
    symbolToTermsContractAddress: {
        callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getSimpleInterestTermsContractAddress: {
        callAsync(tokenAddress: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<TermsContractRegistryContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<TermsContractRegistryContract>;
    private static getArtifactsData();
}
