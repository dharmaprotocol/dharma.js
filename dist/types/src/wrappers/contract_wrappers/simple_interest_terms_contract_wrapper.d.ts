/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from "../../types";
import { BigNumber } from "../../../utils/bignumber";
import * as Web3 from "web3";
import { BaseContract } from "./base_contract_wrapper";
export declare class SimpleInterestTermsContractContract extends BaseContract {
    unpackParameters: {
        callAsync(parameters: string, defaultBlock?: Web3.BlockParam): Promise<[BigNumber, BigNumber, BigNumber]>;
    };
    HOUR_BLOCK_LENGTH: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    getAmortizationUnitLengthInBlocks: {
        callAsync(amortizationUnitType: number | BigNumber, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    registerRepayment: {
        sendTransactionAsync(agreementId: string, payer: string, beneficiary: string, unitsOfRepayment: BigNumber, tokenAddress: string, txData?: TxData): Promise<string>;
        estimateGasAsync(agreementId: string, payer: string, beneficiary: string, unitsOfRepayment: BigNumber, tokenAddress: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(agreementId: string, payer: string, beneficiary: string, unitsOfRepayment: BigNumber, tokenAddress: string, txData?: TxData): string;
    };
    getExpectedRepaymentValue: {
        callAsync(agreementId: string, blockNumber: BigNumber, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    MONTH_BLOCK_LENGTH: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    YEAR_BLOCK_LENGTH: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    DAY_BLOCK_LENGTH: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    WEEK_BLOCK_LENGTH: {
        callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    getValueRepaid: {
        callAsync(agreementId: string, blockNumber: BigNumber, defaultBlock?: Web3.BlockParam): Promise<BigNumber>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
    static at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<SimpleInterestTermsContractContract>;
}
