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
import { MockERC721Receiver as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class MockERC721ReceiverContract extends BaseContract {
    public getMockReturnValue = {
        async callAsync(
            functionName: string,
            argsSignature: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<string> {
            const self = this as MockERC721ReceiverContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getMockReturnValue.call,
                self.web3ContractInstance,
            )(functionName, argsSignature);
            return result;
        },
    };
    public setReturnValueForERC721ReceivedHook = {
        async sendTransactionAsync(_returnValue: string, txData: TxData = {}): Promise<string> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setReturnValueForERC721ReceivedHook.estimateGasAsync.bind(self, _returnValue),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setReturnValueForERC721ReceivedHook,
                self.web3ContractInstance,
            )(_returnValue, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(_returnValue: string, txData: TxData = {}): Promise<number> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.setReturnValueForERC721ReceivedHook.estimateGas,
                self.web3ContractInstance,
            )(_returnValue, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(_returnValue: string, txData: TxData = {}): string {
            const self = this as MockERC721ReceiverContract;
            const abiEncodedTransactionData = self.web3ContractInstance.setReturnValueForERC721ReceivedHook.getData();
            return abiEncodedTransactionData;
        },
    };
    public setShouldRevert = {
        async sendTransactionAsync(_shouldRevert: boolean, txData: TxData = {}): Promise<string> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setShouldRevert.estimateGasAsync.bind(self, _shouldRevert),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setShouldRevert,
                self.web3ContractInstance,
            )(_shouldRevert, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(_shouldRevert: boolean, txData: TxData = {}): Promise<number> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.setShouldRevert.estimateGas,
                self.web3ContractInstance,
            )(_shouldRevert, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(_shouldRevert: boolean, txData: TxData = {}): string {
            const self = this as MockERC721ReceiverContract;
            const abiEncodedTransactionData = self.web3ContractInstance.setShouldRevert.getData();
            return abiEncodedTransactionData;
        },
    };
    public mockReturnValue = {
        async sendTransactionAsync(
            functionName: string,
            argsSignature: string,
            returnValue: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.mockReturnValue.estimateGasAsync.bind(
                    self,
                    functionName,
                    argsSignature,
                    returnValue,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.mockReturnValue,
                self.web3ContractInstance,
            )(functionName, argsSignature, returnValue, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            functionName: string,
            argsSignature: string,
            returnValue: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.mockReturnValue.estimateGas,
                self.web3ContractInstance,
            )(functionName, argsSignature, returnValue, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            functionName: string,
            argsSignature: string,
            returnValue: string,
            txData: TxData = {},
        ): string {
            const self = this as MockERC721ReceiverContract;
            const abiEncodedTransactionData = self.web3ContractInstance.mockReturnValue.getData();
            return abiEncodedTransactionData;
        },
    };
    public wasOnERC721ReceivedCalledWith = {
        async callAsync(
            _address: string,
            _tokenId: BigNumber,
            _data: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<boolean> {
            const self = this as MockERC721ReceiverContract;
            const result = await promisify<boolean>(
                self.web3ContractInstance.wasOnERC721ReceivedCalledWith.call,
                self.web3ContractInstance,
            )(_address, _tokenId, _data);
            return result;
        },
    };
    public reset = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.reset.estimateGasAsync.bind(self),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.reset,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(txData: TxData = {}): Promise<number> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.reset.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as MockERC721ReceiverContract;
            const abiEncodedTransactionData = self.web3ContractInstance.reset.getData();
            return abiEncodedTransactionData;
        },
    };
    public onERC721Received = {
        async sendTransactionAsync(
            _address: string,
            _tokenId: BigNumber,
            _data: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.onERC721Received.estimateGasAsync.bind(self, _address, _tokenId, _data),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.onERC721Received,
                self.web3ContractInstance,
            )(_address, _tokenId, _data, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _address: string,
            _tokenId: BigNumber,
            _data: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as MockERC721ReceiverContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.onERC721Received.estimateGas,
                self.web3ContractInstance,
            )(_address, _tokenId, _data, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _address: string,
            _tokenId: BigNumber,
            _data: string,
            txData: TxData = {},
        ): string {
            const self = this as MockERC721ReceiverContract;
            const abiEncodedTransactionData = self.web3ContractInstance.onERC721Received.getData();
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
    ): Promise<MockERC721ReceiverContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new MockERC721ReceiverContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "DebtKernel",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "MockERC721Receiver",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<MockERC721ReceiverContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;

        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new MockERC721ReceiverContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "MockERC721Receiver",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
