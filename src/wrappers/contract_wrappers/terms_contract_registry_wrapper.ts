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
import { TermsContractRegistry as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class TermsContractRegistryContract extends BaseContract {
    public setSimpleInterestTermsContractAddress = {
        async sendTransactionAsync(
            tokenAddress: string,
            termsContract: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as TermsContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setSimpleInterestTermsContractAddress.estimateGasAsync.bind(
                    self,
                    tokenAddress,
                    termsContract,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setSimpleInterestTermsContractAddress,
                self.web3ContractInstance,
            )(tokenAddress, termsContract, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokenAddress: string,
            termsContract: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as TermsContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.setSimpleInterestTermsContractAddress.estimateGas,
                self.web3ContractInstance,
            )(tokenAddress, termsContract, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            tokenAddress: string,
            termsContract: string,
            txData: TxData = {},
        ): string {
            const self = this as TermsContractRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.setSimpleInterestTermsContractAddress.getData();
            return abiEncodedTransactionData;
        },
    };
    public symbolToTermsContractAddress = {
        async callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TermsContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.symbolToTermsContractAddress.call,
                self.web3ContractInstance,
            )(index);
            return result;
        },
    };
    public getSimpleInterestTermsContractAddress = {
        async callAsync(tokenAddress: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TermsContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getSimpleInterestTermsContractAddress.call,
                self.web3ContractInstance,
            )(tokenAddress);
            return result;
        },
    };

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    public static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<TermsContractRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new TermsContractRegistryContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TermsContractRegistry",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "TermsContractRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<TermsContractRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new TermsContractRegistryContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "TermsContractRegistry",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
