/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "../../types";
import * as promisify from "tiny-promisify";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { BigNumber } from "../../../utils/bignumber";
import { TermsContract as ContractArtifacts } from "../../artifacts/ts/TermsContract";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class TermsContract extends BaseContract {
    public registerNFTRepayment = {
        async sendTransactionAsync(
            agreementId: string,
            payer: string,
            beneficiary: string,
            tokenId: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as TermsContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.registerNFTRepayment.estimateGasAsync.bind(
                    self,
                    agreementId,
                    payer,
                    beneficiary,
                    tokenId,
                    tokenAddress,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.registerNFTRepayment,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, tokenId, tokenAddress, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            payer: string,
            beneficiary: string,
            tokenId: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as TermsContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.registerNFTRepayment.estimateGas,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, tokenId, tokenAddress, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            agreementId: string,
            payer: string,
            beneficiary: string,
            tokenId: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): string {
            const self = this as TermsContract;
            const abiEncodedTransactionData = self.web3ContractInstance.registerNFTRepayment.getData();
            return abiEncodedTransactionData;
        },
    };
    public registerRepayment = {
        async sendTransactionAsync(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as TermsContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.registerRepayment.estimateGasAsync.bind(
                    self,
                    agreementId,
                    payer,
                    beneficiary,
                    unitsOfRepayment,
                    tokenAddress,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.registerRepayment,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, unitsOfRepayment, tokenAddress, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as TermsContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.registerRepayment.estimateGas,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, unitsOfRepayment, tokenAddress, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): string {
            const self = this as TermsContract;
            const abiEncodedTransactionData = self.web3ContractInstance.registerRepayment.getData();
            return abiEncodedTransactionData;
        },
    };
    public getExpectedRepaymentValue = {
        async callAsync(
            agreementId: string,
            timestamp: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as TermsContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getExpectedRepaymentValue.call,
                self.web3ContractInstance,
            )(agreementId, timestamp);
            return result;
        },
    };
    public getValueRepaidToDate = {
        async callAsync(agreementId: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as TermsContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getValueRepaidToDate.call,
                self.web3ContractInstance,
            )(agreementId);
            return result;
        },
    };

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<TermsContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new TermsContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "TermsContract",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
