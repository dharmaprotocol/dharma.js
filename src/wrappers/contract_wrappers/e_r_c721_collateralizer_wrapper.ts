// tslint:disable-next-line:no-unused-variable
import { ERC721Collateralizer as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as promisify from "tiny-promisify";
import * as Web3 from "web3";
import { BigNumber } from "../../../utils/bignumber";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { TxData, TxDataPayable } from "../../types";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class ERC721CollateralizerContract extends BaseContract {
    public CONTEXT = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.CONTEXT.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public debtRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public retrieveCollateralParameters = {
        async callAsync(
            agreementId: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[string, BigNumber, string]> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<[string, BigNumber, string]>(
                self.web3ContractInstance.retrieveCollateralParameters.call,
                self.web3ContractInstance,
            )(agreementId);
            return result;
        },
    };
    public unpause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
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
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.unpause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.unpause.getData,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public returnCollateral = {
        async sendTransactionAsync(agreementId: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
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
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.returnCollateral.estimateGas,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(
            agreementId: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.returnCollateral.getData,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public paused = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<boolean>(
                self.web3ContractInstance.paused.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public SECONDS_IN_DAY = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.SECONDS_IN_DAY.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public collateralize = {
        async sendTransactionAsync(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.collateralize.estimateGasAsync.bind(self, agreementId, debtor),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.collateralize,
                self.web3ContractInstance,
            )(agreementId, debtor, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.collateralize.estimateGas,
                self.web3ContractInstance,
            )(agreementId, debtor, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.collateralize.getData,
                self.web3ContractInstance,
            )(agreementId, debtor, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public agreementToDebtor = {
        async callAsync(index_0: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.agreementToDebtor.call,
                self.web3ContractInstance,
            )(index_0);
            return result;
        },
    };
    public cryptoKittiesContract = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.cryptoKittiesContract.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public pause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
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
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.pause.estimateGas,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.pause.getData,
                self.web3ContractInstance,
            )(txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public revokeCollateralizeAuthorization = {
        async sendTransactionAsync(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.revokeCollateralizeAuthorization.estimateGasAsync.bind(self, agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.revokeCollateralizeAuthorization,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agent: string, txData: TxData = {}): Promise<number> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.revokeCollateralizeAuthorization.estimateGas,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.revokeCollateralizeAuthorization.getData,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public tokenRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public addAuthorizedCollateralizeAgent = {
        async sendTransactionAsync(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.addAuthorizedCollateralizeAgent.estimateGasAsync.bind(self, agent),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.addAuthorizedCollateralizeAgent,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(agent: string, txData: TxData = {}): Promise<number> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.addAuthorizedCollateralizeAgent.estimateGas,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(agent: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.addAuthorizedCollateralizeAgent.getData,
                self.web3ContractInstance,
            )(agent, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public unpackCollateralParametersFromBytes = {
        async callAsync(
            parameters: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[boolean, BigNumber, BigNumber]> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<[boolean, BigNumber, BigNumber]>(
                self.web3ContractInstance.unpackCollateralParametersFromBytes.call,
                self.web3ContractInstance,
            )(parameters);
            return result;
        },
    };
    public seizeCollateral = {
        async sendTransactionAsync(agreementId: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
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
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.seizeCollateral.estimateGas,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(
            agreementId: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.seizeCollateral.getData,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
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
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as ERC721CollateralizerContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.transferOwnership.getData,
                self.web3ContractInstance,
            )(newOwner, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public getAuthorizedCollateralizeAgents = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string[]> {
            const self = this as ERC721CollateralizerContract;
            const result = await promisify<string[]>(
                self.web3ContractInstance.getAuthorizedCollateralizeAgents.call,
                self.web3ContractInstance,
            )();
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

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ["web3ContractInstance", "defaults"]);
    }

    static async deployed(
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ERC721CollateralizerContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new ERC721CollateralizerContract(web3ContractInstance, defaults);
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC721Collateralizer",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ERC721Collateralizer",
                    currentNetwork,
                ),
            );
        }
    }

    static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ERC721CollateralizerContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new ERC721CollateralizerContract(web3ContractInstance, defaults);
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ERC721Collateralizer",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
