import * as promisify from "tiny-promisify";
import * as Web3 from "web3";

import { BigNumber } from "../../../utils/bignumber";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";

import { TxData } from "../../types";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

import { ContractRegistry as ContractArtifacts } from "@dharmaprotocol/contracts";

export class ContractRegistryContract extends BaseContract {
    public static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ContractRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new ContractRegistryContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ContractRegistry",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ContractRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ContractRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;

        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new ContractRegistryContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ContractRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    public debtKernel = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtKernel.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    public tokenTransferProxy = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenTransferProxy.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    public debtRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    public repaymentRouter = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.repaymentRouter.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    public collateralizer = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.collateralizer.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    public tokenRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    public updateAddress = {
        async sendTransactionAsync(
            contractType: number | BigNumber,
            newAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.updateAddress.estimateGasAsync.bind(self, contractType, newAddress),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.updateAddress,
                self.web3ContractInstance,
            )(contractType, newAddress, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            contractType: number | BigNumber,
            newAddress: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.updateAddress.estimateGas,
                self.web3ContractInstance,
            )(contractType, newAddress, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(
            contractType: number | BigNumber,
            newAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.updateAddress.getData,
                self.web3ContractInstance,
            )(contractType, newAddress, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };

    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as ContractRegistryContract;
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
            const self = this as ContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as ContractRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.transferOwnership.getData,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };

    public debtToken = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ContractRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtToken.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }
} // tslint:disable:max-file-line-count
