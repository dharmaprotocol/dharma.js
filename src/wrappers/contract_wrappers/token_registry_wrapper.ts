/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from "../../types";
import * as promisify from "tiny-promisify";
import { Web3Utils } from "../../../utils/web3_utils";
import { classUtils } from "../../../utils/class_utils";
import { TokenRegistry as ContractArtifacts } from "@dharmaprotocol/contracts";
import { BigNumber } from "utils/bignumber";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class TokenRegistryContract extends BaseContract {
    public symbolHashToTokenIndex = {
        async callAsync(index_0: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as TokenRegistryContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.symbolHashToTokenIndex.call,
                self.web3ContractInstance,
            )(index_0);
            return result;
        },
    };
    public setTokenAddress = {
        async sendTransactionAsync(
            symbol: string,
            token: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as TokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setTokenAddress.estimateGasAsync.bind(self, symbol, token),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setTokenAddress,
                self.web3ContractInstance,
            )(symbol, token, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            symbol: string,
            token: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as TokenRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.setTokenAddress.estimateGas,
                self.web3ContractInstance,
            )(symbol, token, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(symbol: string, token: string, txData: TxData = {}): string {
            const self = this as TokenRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.setTokenAddress.getData();
            return abiEncodedTransactionData;
        },
    };
    public getTokenIndexBySymbol = {
        async callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as TokenRegistryContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getTokenIndexBySymbol.call,
                self.web3ContractInstance,
            )(symbol);
            return result;
        },
    };
    public getTokenAddressBySymbol = {
        async callAsync(symbol: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenAddressBySymbol.call,
                self.web3ContractInstance,
            )(symbol);
            return result;
        },
    };
    public getTokenAddressByIndex = {
        async callAsync(index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenAddressByIndex.call,
                self.web3ContractInstance,
            )(index);
            return result;
        },
    };
    public getTokenSymbolByIndex = {
        async callAsync(index: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTokenSymbolByIndex.call,
                self.web3ContractInstance,
            )(index);
            return result;
        },
    };
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public tokenSymbolList = {
        async callAsync(index_0: BigNumber, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenSymbolList.call,
                self.web3ContractInstance,
            )(index_0);
            return result;
        },
    };
    public tokenSymbolListLength = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as TokenRegistryContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.tokenSymbolListLength.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public symbolHashToTokenAddress = {
        async callAsync(index_0: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.symbolHashToTokenAddress.call,
                self.web3ContractInstance,
            )(index_0);
            return result;
        },
    };

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    public static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<TokenRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new TokenRegistryContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TokenRegistry",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "TokenRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<TokenRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new TokenRegistryContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "TokenRegistry",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
