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
import { TokenTransferProxy as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class TokenTransferProxyContract extends BaseContract {
    public addAuthorizedTransferAgent = {
        async sendTransactionAsync(_agent: string, txData: TxData = {}): Promise<string> {
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.addAuthorizedTransferAgent.estimateGasAsync.bind(self, _agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.addAuthorizedTransferAgent,
                self.web3ContractInstance,
            )(_agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(_agent: string, txData: TxData = {}): Promise<number> {
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.addAuthorizedTransferAgent.estimateGas,
                self.web3ContractInstance,
            )(_agent, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(_agent: string, txData: TxData = {}): string {
            const self = this as TokenTransferProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.addAuthorizedTransferAgent.getData();
            return abiEncodedTransactionData;
        },
    };
    public transferFrom = {
        async sendTransactionAsync(
            _token: string,
            _from: string,
            _to: string,
            _amount: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.transferFrom.estimateGasAsync.bind(self, _token, _from, _to, _amount),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.transferFrom,
                self.web3ContractInstance,
            )(_token, _from, _to, _amount, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _token: string,
            _from: string,
            _to: string,
            _amount: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferFrom.estimateGas,
                self.web3ContractInstance,
            )(_token, _from, _to, _amount, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _token: string,
            _from: string,
            _to: string,
            _amount: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as TokenTransferProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.transferFrom.getData();
            return abiEncodedTransactionData;
        },
    };
    public unpause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as TokenTransferProxyContract;
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
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.unpause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as TokenTransferProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.unpause.getData();
            return abiEncodedTransactionData;
        },
    };
    public paused = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as TokenTransferProxyContract;
            const result = await promisify<boolean>(
                self.web3ContractInstance.paused.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public pause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as TokenTransferProxyContract;
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
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.pause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as TokenTransferProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.pause.getData();
            return abiEncodedTransactionData;
        },
    };
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TokenTransferProxyContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public revokeTransferAgentAuthorization = {
        async sendTransactionAsync(_agent: string, txData: TxData = {}): Promise<string> {
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.revokeTransferAgentAuthorization.estimateGasAsync.bind(self, _agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.revokeTransferAgentAuthorization,
                self.web3ContractInstance,
            )(_agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(_agent: string, txData: TxData = {}): Promise<number> {
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.revokeTransferAgentAuthorization.estimateGas,
                self.web3ContractInstance,
            )(_agent, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(_agent: string, txData: TxData = {}): string {
            const self = this as TokenTransferProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.revokeTransferAgentAuthorization.getData();
            return abiEncodedTransactionData;
        },
    };
    public getAuthorizedTransferAgents = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]> {
            const self = this as TokenTransferProxyContract;
            const result = await promisify<string[]>(
                self.web3ContractInstance.getAuthorizedTransferAgents.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as TokenTransferProxyContract;
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
            const self = this as TokenTransferProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): string {
            const self = this as TokenTransferProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.transferOwnership.getData();
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
    ): Promise<TokenTransferProxyContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new TokenTransferProxyContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TokenTransferProxy",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "TokenTransferProxy",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<TokenTransferProxyContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;

        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new TokenTransferProxyContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "TokenTransferProxy",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
