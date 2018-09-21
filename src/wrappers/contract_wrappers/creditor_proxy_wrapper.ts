import { CreditorProxy as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as promisify from "tiny-promisify";
import * as Web3 from "web3";
import { BigNumber } from "../../../utils/bignumber";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { TxData, TxDataPayable } from "../../types";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class CreditorProxyContract extends BaseContract {
    public cancelDebtOffer = {
        async sendTransactionAsync(
            commitmentAddresses: string[],
            commitmentValues: BigNumber[],
            termsContractParameters: string[],
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.cancelDebtOffer.estimateGasAsync.bind(
                    self,
                    commitmentAddresses,
                    commitmentValues,
                    termsContractParameters,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.cancelDebtOffer, self.web3ContractInstance,
            )(
                commitmentAddresses,
                commitmentValues,
                termsContractParameters,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            commitmentAddresses: string[],
            commitmentValues: BigNumber[],
            termsContractParameters: string[],
            txData: TxData = {},
        ): Promise<number> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.cancelDebtOffer.estimateGas, self.web3ContractInstance,
            )(
                commitmentAddresses,
                commitmentValues,
                termsContractParameters,
                txDataWithDefaults,
            );
            return gas;
        },
        async getABIEncodedTransactionData(
            commitmentAddresses: string[],
            commitmentValues: BigNumber[],
            termsContractParameters: string[],
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.cancelDebtOffer.getData, self.web3ContractInstance,
            )(
                commitmentAddresses,
                commitmentValues,
                termsContractParameters,
                txDataWithDefaults,
            );
            return abiEncodedTransactionData;
        },
    };
    public unpause = {
        async sendTransactionAsync(
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.unpause.estimateGasAsync.bind(
                    self,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.unpause, self.web3ContractInstance,
            )(
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            txData: TxData = {},
        ): Promise<number> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.unpause.estimateGas, self.web3ContractInstance,
            )(
                txDataWithDefaults,
            );
            return gas;
        },
        async getABIEncodedTransactionData(
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.unpause.getData, self.web3ContractInstance,
            )(
                txDataWithDefaults,
            );
            return abiEncodedTransactionData;
        },
    };
    public fillDebtOffer = {
        async sendTransactionAsync(
            creditor: string,
            orderAddresses: string[],
            orderValues: BigNumber[],
            orderBytes32: string[],
            signaturesV: Array<number|BigNumber>,
            signaturesR: string[],
            signaturesS: string[],
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.fillDebtOffer.estimateGasAsync.bind(
                    self,
                    creditor,
                    orderAddresses,
                    orderValues,
                    orderBytes32,
                    signaturesV,
                    signaturesR,
                    signaturesS,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.fillDebtOffer, self.web3ContractInstance,
            )(
                creditor,
                orderAddresses,
                orderValues,
                orderBytes32,
                signaturesV,
                signaturesR,
                signaturesS,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            creditor: string,
            orderAddresses: string[],
            orderValues: BigNumber[],
            orderBytes32: string[],
            signaturesV: Array<number|BigNumber>,
            signaturesR: string[],
            signaturesS: string[],
            txData: TxData = {},
        ): Promise<number> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.fillDebtOffer.estimateGas, self.web3ContractInstance,
            )(
                creditor,
                orderAddresses,
                orderValues,
                orderBytes32,
                signaturesV,
                signaturesR,
                signaturesS,
                txDataWithDefaults,
            );
            return gas;
        },
        async getABIEncodedTransactionData(
            creditor: string,
            orderAddresses: string[],
            orderValues: BigNumber[],
            orderBytes32: string[],
            signaturesV: Array<number|BigNumber>,
            signaturesR: string[],
            signaturesS: string[],
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.fillDebtOffer.getData, self.web3ContractInstance,
            )(
                creditor,
                orderAddresses,
                orderValues,
                orderBytes32,
                signaturesV,
                signaturesR,
                signaturesS,
                txDataWithDefaults,
            );
            return abiEncodedTransactionData;
        },
    };
    public paused = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<boolean
    > {
            const self = this as CreditorProxyContract;
            const result = await promisify<boolean
    >(
                self.web3ContractInstance.paused.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public pause = {
        async sendTransactionAsync(
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.pause.estimateGasAsync.bind(
                    self,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.pause, self.web3ContractInstance,
            )(
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            txData: TxData = {},
        ): Promise<number> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.pause.estimateGas, self.web3ContractInstance,
            )(
                txDataWithDefaults,
            );
            return gas;
        },
        async getABIEncodedTransactionData(
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.pause.getData, self.web3ContractInstance,
            )(
                txDataWithDefaults,
            );
            return abiEncodedTransactionData;
        },
    };
    public owner = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<string
    > {
            const self = this as CreditorProxyContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public debtOfferCancelled = {
        async callAsync(
            index_0: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<boolean
    > {
            const self = this as CreditorProxyContract;
            const result = await promisify<boolean
    >(
                self.web3ContractInstance.debtOfferCancelled.call,
                self.web3ContractInstance,
            )(
                index_0,
            );
            return result;
        },
    };
    public contractRegistry = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<string
    > {
            const self = this as CreditorProxyContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.contractRegistry.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public debtOfferFilled = {
        async callAsync(
            index_0: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<boolean
    > {
            const self = this as CreditorProxyContract;
            const result = await promisify<boolean
    >(
                self.web3ContractInstance.debtOfferFilled.call,
                self.web3ContractInstance,
            )(
                index_0,
            );
            return result;
        },
    };
    public NULL_ISSUANCE_HASH = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<string
    > {
            const self = this as CreditorProxyContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.NULL_ISSUANCE_HASH.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public EXTERNAL_QUERY_GAS_LIMIT = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as CreditorProxyContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.EXTERNAL_QUERY_GAS_LIMIT.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(
            newOwner: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.transferOwnership.estimateGasAsync.bind(
                    self,
                    newOwner,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.transferOwnership, self.web3ContractInstance,
            )(
                newOwner,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            newOwner: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas, self.web3ContractInstance,
            )(
                newOwner,
                txDataWithDefaults,
            );
            return gas;
        },
        async getABIEncodedTransactionData(
            newOwner: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as CreditorProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.transferOwnership.getData, self.web3ContractInstance,
            )(
                newOwner,
                txDataWithDefaults,
            );
            return abiEncodedTransactionData;
        },
    };
    async deploy(...args: any[]): Promise<any> {
        const wrapper = this;
        const rejected = false;

        return new Promise((resolve, reject) => {
            wrapper.web3ContractInstance.new(wrapper.defaults, (err: string, contract: Web3.ContractInstance) => {
                if (err) {
                    reject(err);
                } else if (contract.address) {
                    wrapper.web3ContractInstance = wrapper.web3ContractInstance.at(contract.address);
                    wrapper.address = contract.address;
                    resolve();
                }
            })
        });
    }

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    public static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<CreditorProxyContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new CreditorProxyContract(
                    web3ContractInstance,
                    defaults,
                );
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "CreditorProxy",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "CreditorProxy",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<CreditorProxyContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new CreditorProxyContract(
                web3ContractInstance,
                defaults,
            );
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "CreditorProxy",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
