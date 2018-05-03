/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData } from "../../types";
import * as promisify from "tiny-promisify";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { BigNumber } from "../../../utils/bignumber";
import { Collateralizer as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class CollateralizerContract extends BaseContract {
    public debtKernelAddress = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtKernelAddress.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public tokenTransferProxy = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenTransferProxy.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public debtRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public unpause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as CollateralizerContract;
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
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.unpause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as CollateralizerContract;
            const abiEncodedTransactionData = self.web3ContractInstance.unpause.getData();
            return abiEncodedTransactionData;
        },
    };
    public returnCollateral = {
        async sendTransactionAsync(agreementId: string, txData: TxData = {}): Promise<string> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.returnCollateral.estimateGasAsync.bind(self, agreementId),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.returnCollateral,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agreementId: string, txData: TxData = {}): Promise<number> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.returnCollateralAsync.estimateGas,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agreementId: string, txData: TxData = {}): string {
            const self = this as CollateralizerContract;
            const abiEncodedTransactionData = self.web3ContractInstance.returnCollateralAsync.getData();
            return abiEncodedTransactionData;
        },
    };
    public timestampAdjustedForGracePeriod = {
        async callAsync(
            gracePeriodInDays: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as CollateralizerContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.timestampAdjustedForGracePeriod.call,
                self.web3ContractInstance,
            )(gracePeriodInDays);
            return result;
        },
    };
    public paused = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as CollateralizerContract;
            const result = await promisify<boolean>(
                self.web3ContractInstance.paused.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public SECONDS_IN_DAY = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizerContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.SECONDS_IN_DAY.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public collateralize = {
        async sendTransactionAsync(
            agreementId: string,
            collateralizer: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.collateralize.estimateGasAsync.bind(self, agreementId, collateralizer),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.collateralize,
                self.web3ContractInstance,
            )(agreementId, collateralizer, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            collateralizer: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.collateralize.estimateGas,
                self.web3ContractInstance,
            )(agreementId, collateralizer, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            agreementId: string,
            collateralizer: string,
            txData: TxData = {},
        ): string {
            const self = this as CollateralizerContract;
            const abiEncodedTransactionData = self.web3ContractInstance.collateralize.getData();
            return abiEncodedTransactionData;
        },
    };
    public pause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as CollateralizerContract;
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
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.pause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as CollateralizerContract;
            const abiEncodedTransactionData = self.web3ContractInstance.pause.getData();
            return abiEncodedTransactionData;
        },
    };
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public revokeCollateralizeAuthorization = {
        async sendTransactionAsync(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.revokeCollateralizeAuthorization.estimateGasAsync.bind(self, agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.revokeCollateralizeAuthorization,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agent: string, txData: TxData = {}): Promise<number> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.revokeCollateralizeAuthorization.estimateGas,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agent: string, txData: TxData = {}): string {
            const self = this as CollateralizerContract;
            const abiEncodedTransactionData = self.web3ContractInstance.revokeCollateralizeAuthorization.getData();
            return abiEncodedTransactionData;
        },
    };
    public tokenRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public addAuthorizedCollateralizeAgent = {
        async sendTransactionAsync(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.addAuthorizedCollateralizeAgent.estimateGasAsync.bind(self, agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.addAuthorizedCollateralizeAgent,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agent: string, txData: TxData = {}): Promise<number> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.addAuthorizedCollateralizeAgent.estimateGas,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agent: string, txData: TxData = {}): string {
            const self = this as CollateralizerContract;
            const abiEncodedTransactionData = self.web3ContractInstance.addAuthorizedCollateralizeAgent.getData();
            return abiEncodedTransactionData;
        },
    };
    public unpackCollateralParametersFromBytes = {
        async callAsync(
            parameters: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[BigNumber, BigNumber, BigNumber]> {
            const self = this as CollateralizerContract;
            const result = await promisify<[BigNumber, BigNumber, BigNumber]>(
                self.web3ContractInstance.unpackCollateralParametersFromBytes.call,
                self.web3ContractInstance,
            )(parameters);
            return result;
        },
    };
    public agreementToCollateralizer = {
        async callAsync(index_0: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.agreementToCollateralizer.call,
                self.web3ContractInstance,
            )(index_0);
            return result;
        },
    };
    public seizeCollateral = {
        async sendTransactionAsync(agreementId: string, txData: TxData = {}): Promise<string> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.seizeCollateral.estimateGasAsync.bind(self, agreementId),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.seizeCollateral,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agreementId: string, txData: TxData = {}): Promise<number> {
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.seizeCollateralAsync.estimateGas,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agreementId: string, txData: TxData = {}): string {
            const self = this as CollateralizerContract;
            const abiEncodedTransactionData = self.web3ContractInstance.seizeCollateralAsync.getData();
            return abiEncodedTransactionData;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as CollateralizerContract;
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
            const self = this as CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): string {
            const self = this as CollateralizerContract;
            const abiEncodedTransactionData = self.web3ContractInstance.transferOwnership.getData();
            return abiEncodedTransactionData;
        },
    };
    public getAuthorizedCollateralizeAgents = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]> {
            const self = this as CollateralizerContract;
            const result = await promisify<string[]>(
                self.web3ContractInstance.getAuthorizedCollateralizeAgents.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };

    async deploy(...args: any[]): Promise<any> {
        const wrapper = this;
        const rejected = false;

        return new Promise((resolve, reject) => {
            wrapper.web3ContractInstance.new(
                wrapper.defaults,
                (err: string, contract: Web3.ContractInstance) => {
                    if (err) {
                        reject(err);
                    } else if (contract.address) {
                        wrapper.web3ContractInstance = wrapper.web3ContractInstance.at(
                            contract.address,
                        );
                        wrapper.address = contract.address;
                        resolve();
                    }
                },
            );
        });
    }

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    static async deployed(web3: Web3, defaults: Partial<TxData>): Promise<CollateralizerContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new CollateralizerContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "Collateralizer",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "Collateralizer",
                    currentNetwork,
                ),
            );
        }
    }

    static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<CollateralizerContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new CollateralizerContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "Collateralizer",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
