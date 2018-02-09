/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "../../types";
import promisify from "tiny-promisify";
import { classUtils } from "../../../utils/class_utils";
import * as fs from "fs-extra";
import * as Web3 from "web3";
import { Web3Wrapper } from "@0xproject/web3-wrapper";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class DummyTokenRegistryContract extends BaseContract {
    public setTokenAddress = {
        async sendTransactionAsync(
            symbol: string,
            token: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DummyTokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setTokenAddress.estimateGasAsync.bind(self, symbol, token),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setTokenAddress,
                self.web3ContractInstance,
            )(symbol, token, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            symbol: string,
            token: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DummyTokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.setTokenAddress.estimateGas,
                self.web3ContractInstance,
            )(symbol, token, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(symbol: string, token: string, txData: TxData = {}): string {
            const self = this as DummyTokenRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.setTokenAddress.getData();
            return abiEncodedTransactionData;
        },
    };
    public symbolToTokenAddress = {
        async callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DummyTokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.symbolToTokenAddress.call,
                self.web3ContractInstance,
            )(index);
            return result;
        },
    };
    public getTokenAddress = {
        async callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DummyTokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenAddress.call,
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
    ): Promise<DummyTokenRegistryContract> {
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
                return new DummyTokenRegistryContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "DummyTokenRegistry",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "DummyTokenRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<DummyTokenRegistryContract> {
        const web3Wrapper = new Web3Wrapper(web3.currentProvider);

        const { abi } = await this.getArtifactsData();
        const contractExists = await web3Wrapper.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Wrapper.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new DummyTokenRegistryContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "DummyTokenRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    private static async getArtifactsData(): Promise<any> {
        try {
            const artifact = await fs.readFile("src/artifacts/DummyTokenRegistry.json", "utf8");
            const { abi, networks } = JSON.parse(artifact);
            return { abi, networks };
        } catch (e) {
            throw new Error(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("DummyTokenRegistry"));
        }
    }
} // tslint:disable:max-file-line-count
