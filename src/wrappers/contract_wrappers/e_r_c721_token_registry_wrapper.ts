// tslint:disable-next-line:no-unused-variable
import { ERC721TokenRegistry as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as promisify from "tiny-promisify";
import * as Web3 from "web3";
import { BigNumber } from "../../../utils/bignumber";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { TxData, TxDataPayable } from "../../types";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

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

    public static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ERC721TokenRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new ERC721TokenRegistryContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC721TokenRegistry",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ERC721TokenRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ERC721TokenRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new ERC721TokenRegistryContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ERC721TokenRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }
} // tslint:disable:max-file-line-count
