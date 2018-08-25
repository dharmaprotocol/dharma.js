/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "../common";
import { promisify } from "@0xproject/utils";
import { classUtils } from "../common";
import { BigNumber } from "bignumber.js";
import * as fs from "fs-extra";
import * as Web3 from "web3";

import { BaseContract } from "../base_contract";

export class ERC721TokenRegistryContract extends BaseContract {
    public getTokenAttributesByIndex = {
        async callAsync(
            _index: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[string, string, string]> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<[string, string, string]>(
                self.web3ContractInstance.getTokenAttributesByIndex.call,
                self.web3ContractInstance,
            )(_index);
            return result;
        },
    };
    public getTokenIndexBySymbol = {
        async callAsync(_symbol: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getTokenIndexBySymbol.call,
                self.web3ContractInstance,
            )(_symbol);
            return result;
        },
    };
    public getTokenAddressBySymbol = {
        async callAsync(_symbol: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenAddressBySymbol.call,
                self.web3ContractInstance,
            )(_symbol);
            return result;
        },
    };
    public symbolHashToTokenAttributes = {
        async callAsync(
            index_0: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[string, BigNumber, string]> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<[string, BigNumber, string]>(
                self.web3ContractInstance.symbolHashToTokenAttributes.call,
                self.web3ContractInstance,
            )(index_0);
            return result;
        },
    };
    public getTokenAddressByIndex = {
        async callAsync(_index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenAddressByIndex.call,
                self.web3ContractInstance,
            )(_index);
            return result;
        },
    };
    public getTokenSymbolByIndex = {
        async callAsync(_index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenSymbolByIndex.call,
                self.web3ContractInstance,
            )(_index);
            return result;
        },
    };
    public getTokenAttributesBySymbol = {
        async callAsync(
            _symbol: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[string, BigNumber, string]> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<[string, BigNumber, string]>(
                self.web3ContractInstance.getTokenAttributesBySymbol.call,
                self.web3ContractInstance,
            )(_symbol);
            return result;
        },
    };
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public tokenSymbolList = {
        async callAsync(index_0: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenSymbolList.call,
                self.web3ContractInstance,
            )(index_0);
            return result;
        },
    };
    public getTokenNameBySymbol = {
        async callAsync(_symbol: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenNameBySymbol.call,
                self.web3ContractInstance,
            )(_symbol);
            return result;
        },
    };
    public setTokenAttributes = {
        async sendTransactionAsync(
            _symbol: string,
            _tokenAddress: string,
            _tokenName: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setTokenAttributes.estimateGasAsync.bind(
                    self,
                    _symbol,
                    _tokenAddress,
                    _tokenName,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setTokenAttributes,
                self.web3ContractInstance,
            )(_symbol, _tokenAddress, _tokenName, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _symbol: string,
            _tokenAddress: string,
            _tokenName: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ERC721TokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.setTokenAttributes.estimateGas,
                self.web3ContractInstance,
            )(_symbol, _tokenAddress, _tokenName, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(
            _symbol: string,
            _tokenAddress: string,
            _tokenName: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.setTokenAttributes.getData,
                self.web3ContractInstance,
            )(_symbol, _tokenAddress, _tokenName, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public tokenSymbolListLength = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.tokenSymbolListLength.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
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
            const self = this as ERC721TokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.transferOwnership.getData,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public getTokenNameByIndex = {
        async callAsync(_index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenNameByIndex.call,
                self.web3ContractInstance,
            )(_index);
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
    static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ERC721TokenRegistryContract> {
        const currentNetwork = web3.version.network;
        const { abi, networks } = await this.getArtifactsData(web3);
        const web3ContractInstance = web3.eth.contract(abi).at(networks[currentNetwork].address);

        return new ERC721TokenRegistryContract(web3ContractInstance, defaults);
    }
    static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ERC721TokenRegistryContract> {
        const { abi } = await this.getArtifactsData(web3);
        const web3ContractInstance = web3.eth.contract(abi).at(address);

        return new ERC721TokenRegistryContract(web3ContractInstance, defaults);
    }
    private static async getArtifactsData(web3: Web3): Promise<any> {
        try {
            const artifact = await fs.readFile("build/contracts/ERC721TokenRegistry.json", "utf8");
            const { abi, networks } = JSON.parse(artifact);
            return { abi, networks };
        } catch (e) {
            console.error("Artifacts malformed or nonexistent: " + e.toString());
        }
    }
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }
} // tslint:disable:max-file-line-count
