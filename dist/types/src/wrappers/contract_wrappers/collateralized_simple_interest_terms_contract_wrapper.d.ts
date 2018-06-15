import * as Web3 from "web3";
import { BigNumber } from "../../../utils/bignumber";
import { TxData } from "../../types";
import { BaseContract } from "./base_contract_wrapper";
export declare class CollateralizedSimpleInterestTermsContractContract extends BaseContract {
    debtKernelAddress: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    getValueRepaidToDate: {
        callAsync(agreementId: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    DAY_LENGTH_IN_SECONDS: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    debtKernel: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    MONTH_LENGTH_IN_SECONDS: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    getTermEndTimestamp: {
        callAsync(_agreementId: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    debtRegistry: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    WEEK_LENGTH_IN_SECONDS: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    returnCollateral: {
        sendTransactionAsync(agreementId: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agreementId: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agreementId: string, txData?: TxData): string;
    };
    timestampAdjustedForGracePeriod: {
        callAsync(gracePeriodInDays: BigNumber, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    registerRepayment: {
        sendTransactionAsync(agreementId: string, payer: string, beneficiary: string, unitsOfRepayment: BigNumber, tokenAddress: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agreementId: string, payer: string, beneficiary: string, unitsOfRepayment: BigNumber, tokenAddress: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agreementId: string, payer: string, beneficiary: string, unitsOfRepayment: BigNumber, tokenAddress: string, txData?: TxData): string;
    };
    SECONDS_IN_DAY: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    HOUR_LENGTH_IN_SECONDS: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    repaymentRouter: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    INTEREST_RATE_SCALING_FACTOR: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    NUM_AMORTIZATION_UNIT_TYPES: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    registerTermStart: {
        sendTransactionAsync(agreementId: string, debtor: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agreementId: string, debtor: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agreementId: string, debtor: string, txData?: TxData): string;
    };
    getExpectedRepaymentValue: {
        callAsync(agreementId: string, timestamp: BigNumber, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    tokenRegistry: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    unpackCollateralParametersFromBytes: {
        callAsync(parameters: string, defaultBlock?: Web3.BlockParam): Promise<[BigNumber, BigNumber, BigNumber]>;
    };
    agreementToCollateralizer: {
        callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<string>;
    };
    unpackParametersFromBytes: {
        callAsync(parameters: string, defaultBlock?: Web3.BlockParam): Promise<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>;
    };
    seizeCollateral: {
        sendTransactionAsync(agreementId: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agreementId: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agreementId: string, txData?: TxData): string;
    };
    YEAR_LENGTH_IN_SECONDS: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    valueRepaid: {
        callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static deployed(web3: Web3, defaults: Partial<TxData>): Promise<CollateralizedSimpleInterestTermsContractContract>;
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<CollateralizedSimpleInterestTermsContractContract>;
}
