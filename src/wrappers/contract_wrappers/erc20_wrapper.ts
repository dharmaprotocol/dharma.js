/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "src/types";
import promisify from "tiny-promisify";
import { classUtils } from "utils/class_utils";
import { BigNumber } from "utils/bignumber";
import * as fs from "fs-extra";
import * as Web3 from "web3";
import { Web3Wrapper } from "@0xproject/web3-wrapper";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class ERC20Contract extends BaseContract {
    public approve = {
        async sendTransactionAsync(
            spender: string,
            value: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC20Contract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.approve.estimateGasAsync.bind(self, spender, value),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.approve,
                self.web3ContractInstance,
            )(spender, value, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            spender: string,
            value: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ERC20Contract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.approve.estimateGas,
                self.web3ContractInstance,
            )(spender, value, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            spender: string,
            value: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as ERC20Contract;
            const abiEncodedTransactionData = self.web3ContractInstance.approve.getData();
            return abiEncodedTransactionData;
        },
    };
    public totalSupply = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC20Contract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.totalSupply.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public transferFrom = {
        async sendTransactionAsync(
            from: string,
            to: string,
            value: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC20Contract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.transferFrom.estimateGasAsync.bind(self, from, to, value),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.transferFrom,
                self.web3ContractInstance,
            )(from, to, value, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            from: string,
            to: string,
            value: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ERC20Contract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferFrom.estimateGas,
                self.web3ContractInstance,
            )(from, to, value, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            from: string,
            to: string,
            value: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as ERC20Contract;
            const abiEncodedTransactionData = self.web3ContractInstance.transferFrom.getData();
            return abiEncodedTransactionData;
        },
    };
    public balanceOf = {
        async callAsync(who: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC20Contract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.balanceOf.call,
                self.web3ContractInstance,
            )(who);
            return result;
        },
    };
    public transfer = {
        async sendTransactionAsync(
            to: string,
            value: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC20Contract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.transfer.estimateGasAsync.bind(self, to, value),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.transfer,
                self.web3ContractInstance,
            )(to, value, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(to: string, value: BigNumber, txData: TxData = {}): Promise<number> {
            const self = this as ERC20Contract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transfer.estimateGas,
                self.web3ContractInstance,
            )(to, value, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(to: string, value: BigNumber, txData: TxData = {}): string {
            const self = this as ERC20Contract;
            const abiEncodedTransactionData = self.web3ContractInstance.transfer.getData();
            return abiEncodedTransactionData;
        },
    };
    public allowance = {
        async callAsync(
            owner: string,
            spender: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as ERC20Contract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.allowance.call,
                self.web3ContractInstance,
            )(owner, spender);
            return result;
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
    ): Promise<ERC20Contract> {
        const web3Wrapper = new Web3Wrapper(web3.currentProvider);

        const { abi } = await this.getArtifactsData();
        const contractExists = await web3Wrapper.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Wrapper.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new ERC20Contract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("ERC20", currentNetwork),
            );
        }
    }

    private static async getArtifactsData(): Promise<any> {
        try {
            const artifact = await fs.readFile("src/artifacts/ERC20.json", "utf8");
            const { abi, networks } = JSON.parse(artifact);
            return { abi, networks };
        } catch (e) {
            throw new Error(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("ERC20"));
        }
    }
} // tslint:disable:max-file-line-count
