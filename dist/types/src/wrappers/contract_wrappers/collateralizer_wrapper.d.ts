/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class CollateralizerContract extends BaseContract {
    debtKernelAddress: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    tokenTransferProxy: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    debtRegistry: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    unpause: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    returnCollateral: {
        sendTransactionAsync(agreementId: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agreementId: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agreementId: string, txData?: TxData): string;
    };
    timestampAdjustedForGracePeriod: {
        callAsync(gracePeriodInDays: BigNumber, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    paused: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean>;
    };
    SECONDS_IN_DAY: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    collateralize: {
        sendTransactionAsync(agreementId: string, collateralizer: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agreementId: string, collateralizer: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agreementId: string, collateralizer: string, txData?: TxData): string;
    };
    pause: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(txData?: TxData): string;
    };
    owner: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    revokeCollateralizeAuthorization: {
        sendTransactionAsync(agent: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agent: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agent: string, txData?: TxData): string;
    };
    tokenRegistry: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    addAuthorizedCollateralizeAgent: {
        sendTransactionAsync(agent: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agent: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agent: string, txData?: TxData): string;
    };
    unpackCollateralParametersFromBytes: {
        callAsync(parameters: string, defaultBlock?: Web3.BlockParam): Promise<[BigNumber, BigNumber, BigNumber]>;
    };
    agreementToCollateralizer: {
        callAsync(index_0: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    seizeCollateral: {
        sendTransactionAsync(agreementId: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agreementId: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agreementId: string, txData?: TxData): string;
    };
    transferOwnership: {
        sendTransactionAsync(newOwner: string, txData?: TxData): Promise<string>;
        estimateGasAsync(newOwner: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(newOwner: string, txData?: TxData): string;
    };
    getAuthorizedCollateralizeAgents: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]>;
    };
    deploy(...args: any[]): Promise<any>;
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<CollateralizerContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<CollateralizerContract>;
}
