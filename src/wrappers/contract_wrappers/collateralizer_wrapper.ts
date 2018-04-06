/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData } from "../../types";
import * as promisify from "tiny-promisify";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { BigNumber } from "bignumber.js";
import { Collateralizer as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";
import { TermsContract } from "./terms_contract_wrapper";

export class Collateralizer extends BaseContract {
    public debtKernelAddress = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as Collateralizer;
            const result = await promisify<string>(
                self.web3ContractInstance.debtKernelAddress.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public SECONDS_IN_DAY = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as Collateralizer;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.SECONDS_IN_DAY.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public returnCollateral = {
        async sendTransactionAsync(agreementId: string, txData: TxData = {}): Promise<string> {
            const self = this as Collateralizer;
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
            const self = this as Collateralizer;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.returnCollateral.estimateGas,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agreementId: string, txData: TxData = {}): string {
            const self = this as Collateralizer;
            const abiEncodedTransactionData = self.web3ContractInstance.returnCollateral.getData();
            return abiEncodedTransactionData;
        },
    };
    public timestampAdjustedForGracePeriod = {
        async callAsync(
            gracePeriodInDays: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as Collateralizer;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.timestampAdjustedForGracePeriod.call,
                self.web3ContractInstance,
            )(gracePeriodInDays);
            return result;
        },
    };
    public tokenRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as Collateralizer;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public debtRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as Collateralizer;
            const result = await promisify<string>(
                self.web3ContractInstance.debtRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public tokenTransferProxy = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as Collateralizer;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenTransferProxy.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public unpackCollateralParametersFromBytes = {
        async callAsync(
            parameters: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[BigNumber, BigNumber, BigNumber]> {
            const self = this as Collateralizer;
            const result = await promisify<[BigNumber, BigNumber, BigNumber]>(
                self.web3ContractInstance.unpackCollateralParametersFromBytes.call,
                self.web3ContractInstance,
            )(parameters);
            return result;
        },
    };
    public retrieveCollateralParameters = {
        async callAsync(
            agreementId: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[string, BigNumber, BigNumber, TermsContract]> {
            const self = this as Collateralizer;
            const result = await promisify<[string, BigNumber, BigNumber, TermsContract]>(
                self.web3ContractInstance.retrieveCollateralParameters.call,
                self.web3ContractInstance,
            )(agreementId);
            return result;
        },
    };
    public agreementToCollateralizer = {
        async callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as Collateralizer;
            const result = await promisify<string>(
                self.web3ContractInstance.agreementToCollateralizer.call,
                self.web3ContractInstance,
            )(index);
            return result;
        },
    };
    public seizeCollateral = {
        async sendTransactionAsync(agreementId: string, txData: TxData = {}): Promise<string> {
            const self = this as Collateralizer;
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
            const self = this as Collateralizer;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.seizeCollateral.estimateGas,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agreementId: string, txData: TxData = {}): string {
            const self = this as Collateralizer;
            const abiEncodedTransactionData = self.web3ContractInstance.seizeCollateral.getData();
            return abiEncodedTransactionData;
        },
    };

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<Collateralizer> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new Collateralizer(
                    web3ContractInstance,
                    defaults,
                );
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
    ): Promise<Collateralizer> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new Collateralizer(
                web3ContractInstance,
                defaults,
            );
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
