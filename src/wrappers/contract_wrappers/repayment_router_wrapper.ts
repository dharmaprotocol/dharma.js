/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "../../types";
import promisify from "tiny-promisify";
import { classUtils } from "../../../utils/class_utils";
import { BigNumber } from "../../../utils/bignumber";
import * as fs from "fs-extra";
import * as Web3 from "web3";
import { Web3Wrapper } from "@0xproject/web3-wrapper";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class RepaymentRouterContract extends BaseContract {
    public tokenTransferProxy = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as RepaymentRouterContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenTransferProxy.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public debtRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as RepaymentRouterContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public unpause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.unpause.estimateGasAsync.bind(self),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.unpause,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(txData: TxData = {}): Promise<number> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.unpause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as RepaymentRouterContract;
            const abiEncodedTransactionData = self.web3ContractInstance.unpause.getData();
            return abiEncodedTransactionData;
        },
    };
    public paused = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as RepaymentRouterContract;
            const result = await promisify<boolean>(
                self.web3ContractInstance.paused.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public pause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.pause.estimateGasAsync.bind(self),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.pause,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(txData: TxData = {}): Promise<number> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.pause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as RepaymentRouterContract;
            const abiEncodedTransactionData = self.web3ContractInstance.pause.getData();
            return abiEncodedTransactionData;
        },
    };
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as RepaymentRouterContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public repayNFT = {
        async sendTransactionAsync(
            agreementId: string,
            tokenId: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.repayNFT.estimateGasAsync.bind(self, agreementId, tokenId, tokenAddress),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.repayNFT,
                self.web3ContractInstance,
            )(agreementId, tokenId, tokenAddress, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            tokenId: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.repayNFT.estimateGas,
                self.web3ContractInstance,
            )(agreementId, tokenId, tokenAddress, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            agreementId: string,
            tokenId: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): string {
            const self = this as RepaymentRouterContract;
            const abiEncodedTransactionData = self.web3ContractInstance.repayNFT.getData();
            return abiEncodedTransactionData;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.transferOwnership.estimateGasAsync.bind(self, newOwner),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.transferOwnership,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(newOwner: string, txData: TxData = {}): Promise<number> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): string {
            const self = this as RepaymentRouterContract;
            const abiEncodedTransactionData = self.web3ContractInstance.transferOwnership.getData();
            return abiEncodedTransactionData;
        },
    };
    public repay = {
        async sendTransactionAsync(
            agreementId: string,
            amount: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.repay.estimateGasAsync.bind(self, agreementId, amount, tokenAddress),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.repay,
                self.web3ContractInstance,
            )(agreementId, amount, tokenAddress, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            amount: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as RepaymentRouterContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.repay.estimateGas,
                self.web3ContractInstance,
            )(agreementId, amount, tokenAddress, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            agreementId: string,
            amount: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): string {
            const self = this as RepaymentRouterContract;
            const abiEncodedTransactionData = self.web3ContractInstance.repay.getData();
            return abiEncodedTransactionData;
        },
    };

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    public static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<RepaymentRouterContract> {
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
                return new RepaymentRouterContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "RepaymentRouter",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "RepaymentRouter",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<RepaymentRouterContract> {
        const web3Wrapper = new Web3Wrapper(web3.currentProvider);

        const { abi } = await this.getArtifactsData();
        const contractExists = await web3Wrapper.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Wrapper.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new RepaymentRouterContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "RepaymentRouter",
                    currentNetwork,
                ),
            );
        }
    }

    private static async getArtifactsData(): Promise<any> {
        try {
            const artifact = await fs.readFile("src/artifacts/RepaymentRouter.json", "utf8");
            const { abi, networks } = JSON.parse(artifact);
            return { abi, networks };
        } catch (e) {
            throw new Error(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("RepaymentRouter"));
        }
    }
} // tslint:disable:max-file-line-count
