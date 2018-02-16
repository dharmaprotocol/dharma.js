/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class DebtRegistryContract extends BaseContract {
    getTermsContractParameters: {
        callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    unpause: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    addAuthorizedEditAgent: {
        sendTransactionAsync(agent: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agent: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agent: string, txData?: TxData): string;
    };
    modifyBeneficiary: {
        sendTransactionAsync(issuanceHash: string, newBeneficiary: string, txData?: TxData): Promise<string>;
        estimateGasAsync(issuanceHash: string, newBeneficiary: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(issuanceHash: string, newBeneficiary: string, txData?: TxData): string;
    };
    paused: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean>;
    };
    getAuthorizedInsertAgents: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]>;
    };
    getTerms: {
        callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<[string, string]>;
    };
    getIssuanceBlockNumber: {
        callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    pause: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    owner: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    get: {
        callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<[string, string, string, BigNumber, string, string, BigNumber]>;
    };
    revokeEditAgentAuthorization: {
        sendTransactionAsync(agent: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agent: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agent: string, txData?: TxData): string;
    };
    addAuthorizedInsertAgent: {
        sendTransactionAsync(agent: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agent: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agent: string, txData?: TxData): string;
    };
    getBeneficiary: {
        callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    revokeInsertAgentAuthorization: {
        sendTransactionAsync(agent: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agent: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agent: string, txData?: TxData): string;
    };
    insert: {
        sendTransactionAsync(_version: string, _beneficiary: string, _debtor: string, _underwriter: string, _underwriterRiskRating: BigNumber, _termsContract: string, _termsContractParameters: string, _salt: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(_version: string, _beneficiary: string, _debtor: string, _underwriter: string, _underwriterRiskRating: BigNumber, _termsContract: string, _termsContractParameters: string, _salt: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(_version: string, _beneficiary: string, _debtor: string, _underwriter: string, _underwriterRiskRating: BigNumber, _termsContract: string, _termsContractParameters: string, _salt: BigNumber, txData?: TxData): string;
    };
    transferOwnership: {
        sendTransactionAsync(newOwner: string, txData?: TxData): Promise<string>;
        estimateGasAsync(newOwner: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(newOwner: string, txData?: TxData): string;
    };
    getTermsContract: {
        callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getAuthorizedEditAgents: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<DebtRegistryContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<DebtRegistryContract>;
}
