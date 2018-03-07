/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { IssuanceCommitment, IssuanceCommitmentData, TxData } from "../../types";
import * as promisify from "tiny-promisify";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { BigNumber } from "../../../utils/bignumber";
import { DebtRegistry as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as Web3 from "web3";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class DebtRegistryContract extends BaseContract {
    public getTermsContractParameters = {
        async callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DebtRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTermsContractParameters.call,
                self.web3ContractInstance,
            )(issuanceHash);
            return result;
        },
    };
    public unpause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as DebtRegistryContract;
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
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.unpause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.unpause.getData();
            return abiEncodedTransactionData;
        },
    };
    public addAuthorizedEditAgent = {
        async sendTransactionAsync(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.addAuthorizedEditAgent.estimateGasAsync.bind(self, agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.addAuthorizedEditAgent,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agent: string, txData: TxData = {}): Promise<number> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.addAuthorizedEditAgent.estimateGas,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agent: string, txData: TxData = {}): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.addAuthorizedEditAgent.getData();
            return abiEncodedTransactionData;
        },
    };
    public modifyBeneficiary = {
        async sendTransactionAsync(
            issuanceHash: string,
            newBeneficiary: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.modifyBeneficiary.estimateGasAsync.bind(self, issuanceHash, newBeneficiary),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.modifyBeneficiary,
                self.web3ContractInstance,
            )(issuanceHash, newBeneficiary, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            issuanceHash: string,
            newBeneficiary: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.modifyBeneficiary.estimateGas,
                self.web3ContractInstance,
            )(issuanceHash, newBeneficiary, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            issuanceHash: string,
            newBeneficiary: string,
            txData: TxData = {},
        ): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.modifyBeneficiary.getData();
            return abiEncodedTransactionData;
        },
    };
    public paused = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as DebtRegistryContract;
            const result = await promisify<boolean>(
                self.web3ContractInstance.paused.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public getAuthorizedInsertAgents = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]> {
            const self = this as DebtRegistryContract;
            const result = await promisify<string[]>(
                self.web3ContractInstance.getAuthorizedInsertAgents.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public getTerms = {
        async callAsync(
            issuanceHash: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[string, string]> {
            const self = this as DebtRegistryContract;
            const result = await promisify<[string, string]>(
                self.web3ContractInstance.getTerms.call,
                self.web3ContractInstance,
            )(issuanceHash);
            return result;
        },
    };
    public getIssuanceBlockNumber = {
        async callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as DebtRegistryContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getIssuanceBlockNumber.call,
                self.web3ContractInstance,
            )(issuanceHash);
            return result;
        },
    };
    public pause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as DebtRegistryContract;
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
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.pause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.pause.getData();
            return abiEncodedTransactionData;
        },
    };
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DebtRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public get = {
        async callAsync(
            issuanceHash: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<IssuanceCommitment> {
            const self = this as DebtRegistryContract;
            const result = await promisify<IssuanceCommitmentData>(
                self.web3ContractInstance.get.call,
                self.web3ContractInstance,
            )(issuanceHash);
            return IssuanceCommitment.fromData(result);
        },
    };
    public revokeEditAgentAuthorization = {
        async sendTransactionAsync(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.revokeEditAgentAuthorization.estimateGasAsync.bind(self, agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.revokeEditAgentAuthorization,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agent: string, txData: TxData = {}): Promise<number> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.revokeEditAgentAuthorization.estimateGas,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agent: string, txData: TxData = {}): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.revokeEditAgentAuthorization.getData();
            return abiEncodedTransactionData;
        },
    };
    public addAuthorizedInsertAgent = {
        async sendTransactionAsync(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.addAuthorizedInsertAgent.estimateGasAsync.bind(self, agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.addAuthorizedInsertAgent,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agent: string, txData: TxData = {}): Promise<number> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.addAuthorizedInsertAgent.estimateGas,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agent: string, txData: TxData = {}): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.addAuthorizedInsertAgent.getData();
            return abiEncodedTransactionData;
        },
    };
    public getBeneficiary = {
        async callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DebtRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getBeneficiary.call,
                self.web3ContractInstance,
            )(issuanceHash);
            return result;
        },
    };
    public revokeInsertAgentAuthorization = {
        async sendTransactionAsync(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.revokeInsertAgentAuthorization.estimateGasAsync.bind(self, agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.revokeInsertAgentAuthorization,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agent: string, txData: TxData = {}): Promise<number> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.revokeInsertAgentAuthorization.estimateGas,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agent: string, txData: TxData = {}): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.revokeInsertAgentAuthorization.getData();
            return abiEncodedTransactionData;
        },
    };
    public insert = {
        async sendTransactionAsync(
            _version: string,
            _beneficiary: string,
            _debtor: string,
            _underwriter: string,
            _underwriterRiskRating: BigNumber,
            _termsContract: string,
            _termsContractParameters: string,
            _salt: BigNumber,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.insert.estimateGasAsync.bind(
                    self,
                    _version,
                    _beneficiary,
                    _debtor,
                    _underwriter,
                    _underwriterRiskRating,
                    _termsContract,
                    _termsContractParameters,
                    _salt,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.insert,
                self.web3ContractInstance,
            )(
                _version,
                _beneficiary,
                _debtor,
                _underwriter,
                _underwriterRiskRating,
                _termsContract,
                _termsContractParameters,
                _salt,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            _version: string,
            _beneficiary: string,
            _debtor: string,
            _underwriter: string,
            _underwriterRiskRating: BigNumber,
            _termsContract: string,
            _termsContractParameters: string,
            _salt: BigNumber,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.insert.estimateGas,
                self.web3ContractInstance,
            )(
                _version,
                _beneficiary,
                _debtor,
                _underwriter,
                _underwriterRiskRating,
                _termsContract,
                _termsContractParameters,
                _salt,
                txDataWithDefaults,
            );
            return gas;
        },
        getABIEncodedTransactionData(
            _version: string,
            _beneficiary: string,
            _debtor: string,
            _underwriter: string,
            _underwriterRiskRating: BigNumber,
            _termsContract: string,
            _termsContractParameters: string,
            _salt: BigNumber,
            txData: TxData = {},
        ): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.insert.getData();
            return abiEncodedTransactionData;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as DebtRegistryContract;
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
            const self = this as DebtRegistryContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): string {
            const self = this as DebtRegistryContract;
            const abiEncodedTransactionData = self.web3ContractInstance.transferOwnership.getData();
            return abiEncodedTransactionData;
        },
    };
    public getTermsContract = {
        async callAsync(issuanceHash: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DebtRegistryContract;
            const result = await promisify<string>(
                self.web3ContractInstance.getTermsContract.call,
                self.web3ContractInstance,
            )(issuanceHash);
            return result;
        },
    };
    public getAuthorizedEditAgents = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]> {
            const self = this as DebtRegistryContract;
            const result = await promisify<string[]>(
                self.web3ContractInstance.getAuthorizedEditAgents.call,
                self.web3ContractInstance,
            )();
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
    ): Promise<DebtRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new DebtRegistryContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "DebtRegistry",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "DebtRegistry",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<DebtRegistryContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new DebtRegistryContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "DebtRegistry",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
