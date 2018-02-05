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

export class DummyTokenContract extends BaseContract {
    public mintingFinished = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as DummyTokenContract;
            const result = await promisify<boolean>(
                self.web3ContractInstance.mintingFinished.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public name = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DummyTokenContract;
            const result = await promisify<string>(
                self.web3ContractInstance.name.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public approve = {
        async sendTransactionAsync(
            _spender: string,
            _value: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.approve.estimateGasAsync.bind(self, _spender, _value),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.approve,
                self.web3ContractInstance,
            )(_spender, _value, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _spender: string,
            _value: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.approve.estimateGas,
                self.web3ContractInstance,
            )(_spender, _value, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _spender: string,
            _value: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.approve.getData();
            return abiEncodedTransactionData;
        },
    };
    public totalSupply = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as DummyTokenContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.totalSupply.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public transferFrom = {
        async sendTransactionAsync(
            _from: string,
            _to: string,
            _value: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.transferFrom.estimateGasAsync.bind(self, _from, _to, _value),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.transferFrom,
                self.web3ContractInstance,
            )(_from, _to, _value, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _from: string,
            _to: string,
            _value: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferFrom.estimateGas,
                self.web3ContractInstance,
            )(_from, _to, _value, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _from: string,
            _to: string,
            _value: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.transferFrom.getData();
            return abiEncodedTransactionData;
        },
    };
    public decimals = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as DummyTokenContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.decimals.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public mint = {
        async sendTransactionAsync(
            _to: string,
            _amount: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.mint.estimateGasAsync.bind(self, _to, _amount),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.mint,
                self.web3ContractInstance,
            )(_to, _amount, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _to: string,
            _amount: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.mint.estimateGas,
                self.web3ContractInstance,
            )(_to, _amount, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(_to: string, _amount: BigNumber, txData: TxData = {}): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.mint.getData();
            return abiEncodedTransactionData;
        },
    };
    public decreaseApproval = {
        async sendTransactionAsync(
            _spender: string,
            _subtractedValue: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.decreaseApproval.estimateGasAsync.bind(self, _spender, _subtractedValue),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.decreaseApproval,
                self.web3ContractInstance,
            )(_spender, _subtractedValue, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _spender: string,
            _subtractedValue: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.decreaseApproval.estimateGas,
                self.web3ContractInstance,
            )(_spender, _subtractedValue, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _spender: string,
            _subtractedValue: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.decreaseApproval.getData();
            return abiEncodedTransactionData;
        },
    };
    public balanceOf = {
        async callAsync(_owner: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as DummyTokenContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.balanceOf.call,
                self.web3ContractInstance,
            )(_owner);
            return result;
        },
    };
    public finishMinting = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.finishMinting.estimateGasAsync.bind(self),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.finishMinting,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(txData: TxData = {}): Promise<number> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.finishMinting.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.finishMinting.getData();
            return abiEncodedTransactionData;
        },
    };
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DummyTokenContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public symbol = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DummyTokenContract;
            const result = await promisify<string>(
                self.web3ContractInstance.symbol.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public transfer = {
        async sendTransactionAsync(
            _to: string,
            _value: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.transfer.estimateGasAsync.bind(self, _to, _value),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.transfer,
                self.web3ContractInstance,
            )(_to, _value, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _to: string,
            _value: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transfer.estimateGas,
                self.web3ContractInstance,
            )(_to, _value, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(_to: string, _value: BigNumber, txData: TxData = {}): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.transfer.getData();
            return abiEncodedTransactionData;
        },
    };
    public increaseApproval = {
        async sendTransactionAsync(
            _spender: string,
            _addedValue: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.increaseApproval.estimateGasAsync.bind(self, _spender, _addedValue),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.increaseApproval,
                self.web3ContractInstance,
            )(_spender, _addedValue, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _spender: string,
            _addedValue: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.increaseApproval.estimateGas,
                self.web3ContractInstance,
            )(_spender, _addedValue, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _spender: string,
            _addedValue: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.increaseApproval.getData();
            return abiEncodedTransactionData;
        },
    };
    public allowance = {
        async callAsync(
            _owner: string,
            _spender: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as DummyTokenContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.allowance.call,
                self.web3ContractInstance,
            )(_owner, _spender);
            return result;
        },
    };
    public setBalance = {
        async sendTransactionAsync(
            _target: string,
            _value: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setBalance.estimateGasAsync.bind(self, _target, _value),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setBalance,
                self.web3ContractInstance,
            )(_target, _value, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _target: string,
            _value: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.setBalance.estimateGas,
                self.web3ContractInstance,
            )(_target, _value, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _target: string,
            _value: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.setBalance.getData();
            return abiEncodedTransactionData;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as DummyTokenContract;
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
            const self = this as DummyTokenContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): string {
            const self = this as DummyTokenContract;
            const abiEncodedTransactionData = self.web3ContractInstance.transferOwnership.getData();
            return abiEncodedTransactionData;
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
    ): Promise<DummyTokenContract> {
        const web3Wrapper = new Web3Wrapper(web3.currentProvider);

        const { abi } = await this.getArtifactsData();
        const contractExists = await web3Wrapper.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Wrapper.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new DummyTokenContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DummyToken", currentNetwork),
            );
        }
    }

    private static async getArtifactsData(): Promise<any> {
        try {
            const artifact = await fs.readFile("src/artifacts/DummyToken.json", "utf8");
            const { abi, networks } = JSON.parse(artifact);
            return { abi, networks };
        } catch (e) {
            throw new Error(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("DummyToken"));
        }
    }
} // tslint:disable:max-file-line-count
