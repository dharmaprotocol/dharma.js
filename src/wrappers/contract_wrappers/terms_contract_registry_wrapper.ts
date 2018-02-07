/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "src/types";
import promisify from "tiny-promisify";
import { classUtils } from "utils/class_utils";
import { BigNumber } from "bignumber.js";
import * as fs from "fs-extra";
import * as Web3 from "web3";
import { Web3Wrapper } from "@0xproject/web3-wrapper";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class TermsContractRegistryContract extends BaseContract {
    public setSimpleInterestTermsContractAddress = {
        async sendTransactionAsync(
            symbol: string,
            termsContract: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as TermsContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setSimpleInterestTermsContractAddress.estimateGasAsync.bind(
                    self,
                    symbol,
                    termsContract,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setSimpleInterestTermsContractAddress,
                self.web3ContractInstance,
            )(symbol, termsContract, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            symbol: string,
            termsContract: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as TermsContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.setSimpleInterestTermsContractAddress.estimateGas,
                self.web3ContractInstance,
            )(symbol, termsContract, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            symbol: string,
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
        async callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TermsContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getSimpleInterestTermsContractAddress.call,
                self.web3ContractInstance,
            )(symbol);
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
        const web3Wrapper = new Web3Wrapper(web3.currentProvider);

        const currentNetwork = await web3Wrapper.getNetworkIdAsync();
        const { abi, networks } = await this.getArtifactsData();

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Wrapper.doesContractExistAtAddressAsync(
                contractAddress,
            );

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
        const web3Wrapper = new Web3Wrapper(web3.currentProvider);

        const { abi } = await this.getArtifactsData();
        const contractExists = await web3Wrapper.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Wrapper.getNetworkIdAsync();

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

    private static async getArtifactsData(): Promise<any> {
        try {
            const artifact = await fs.readFile("src/artifacts/TermsContractRegistry.json", "utf8");
            const { abi, networks } = JSON.parse(artifact);
            return { abi, networks };
        } catch (e) {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TermsContractRegistry"),
            );
        }
    }
} // tslint:disable:max-file-line-count
