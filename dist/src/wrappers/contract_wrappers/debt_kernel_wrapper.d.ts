import { BaseContract, TxData } from "./base_contract_wrapper";
import { BigNumber } from "utils/bignumber";
import * as Web3 from "web3";
export declare class DebtKernelContract extends BaseContract {
    cancelDebtOrder: {
        sendTransactionAsync(orderAddresses: string[], orderValues: BigNumber[], orderBytes32: string[], txData?: TxData): Promise<string>;
        estimateGasAsync(orderAddresses: string[], orderValues: BigNumber[], orderBytes32: string[], txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(orderAddresses: string[], orderValues: BigNumber[], orderBytes32: string[], txData?: TxData): string;
    };
    unpause: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    debtOrderCancelled: {
        callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<boolean>;
    };
    paused: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean>;
    };
    pause: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    issuanceCancelled: {
        callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<boolean>;
    };
    owner: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    TOKEN_TRANSFER_PROXY: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    setDebtToken: {
        sendTransactionAsync(debtTokenAddress: string, txData?: TxData): Promise<string>;
        estimateGasAsync(debtTokenAddress: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(debtTokenAddress: string, txData?: TxData): string;
    };
    cancelIssuance: {
        sendTransactionAsync(version: string, debtor: string, termsContract: string, termsContractParameters: string, underwriter: string, underwriterRiskRating: BigNumber, salt: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(version: string, debtor: string, termsContract: string, termsContractParameters: string, underwriter: string, underwriterRiskRating: BigNumber, salt: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(version: string, debtor: string, termsContract: string, termsContractParameters: string, underwriter: string, underwriterRiskRating: BigNumber, salt: BigNumber, txData?: TxData): string;
    };
    NULL_ISSUANCE_HASH: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    fillDebtOrder: {
        sendTransactionAsync(creditor: string, orderAddresses: string[], orderValues: BigNumber[], orderBytes32: string[], signaturesV: (number | BigNumber)[], signaturesR: string[], signaturesS: string[], txData?: TxData): Promise<string>;
        estimateGasAsync(creditor: string, orderAddresses: string[], orderValues: BigNumber[], orderBytes32: string[], signaturesV: (number | BigNumber)[], signaturesR: string[], signaturesS: string[], txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(creditor: string, orderAddresses: string[], orderValues: BigNumber[], orderBytes32: string[], signaturesV: (number | BigNumber)[], signaturesR: string[], signaturesS: string[], txData?: TxData): string;
    };
    EXTERNAL_QUERY_GAS_LIMIT: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    transferOwnership: {
        sendTransactionAsync(newOwner: string, txData?: TxData): Promise<string>;
        estimateGasAsync(newOwner: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(newOwner: string, txData?: TxData): string;
    };
    debtToken: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<DebtKernelContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<DebtKernelContract>;
    private static getArtifactsData();
}
