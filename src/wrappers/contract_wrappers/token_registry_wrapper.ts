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
import { BigNumber } from "bignumber.js";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class TokenRegistryContract extends BaseContract {
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
    public symbolToTokenAddress = {
        async callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as TokenRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.symbolToTokenAddress.call,
                self.web3ContractInstance,
            )(index);
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
