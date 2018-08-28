/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import * as promisify from "tiny-promisify";
import * as Web3 from "web3";
import { BigNumber } from "../../../utils/bignumber";
import { TxData } from "../../types";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";
import { ERC721CollateralizedSimpleInterestTermsContract as ContractArtifacts } from "@dharmaprotocol/contracts";
import { Web3Utils } from "../../../utils/web3_utils";

export class ERC721CollateralizedSimpleInterestTermsContractContract extends BaseContract {
    public getValueRepaidToDate = {
        async callAsync(agreementId: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getValueRepaidToDate.call,
                self.web3ContractInstance,
            )(agreementId);
            return result;
        },
    };
    public DAY_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.DAY_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public MONTH_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.MONTH_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public getTermEndTimestamp = {
        async callAsync(_agreementId: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getTermEndTimestamp.call,
                self.web3ContractInstance,
            )(_agreementId);
            return result;
        },
    };
    public WEEK_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.WEEK_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public registerRepayment = {
        async sendTransactionAsync(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.registerRepayment.estimateGasAsync.bind(
                    self,
                    agreementId,
                    payer,
                    beneficiary,
                    unitsOfRepayment,
                    tokenAddress,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.registerRepayment,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, unitsOfRepayment, tokenAddress, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.registerRepayment.estimateGas,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, unitsOfRepayment, tokenAddress, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.registerRepayment.getData,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, unitsOfRepayment, tokenAddress, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public HOUR_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.HOUR_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public erc721Collateralizer = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string>(
                self.web3ContractInstance.erc721Collateralizer.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public NUM_AMORTIZATION_UNIT_TYPES = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.NUM_AMORTIZATION_UNIT_TYPES.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public INTEREST_RATE_SCALING_FACTOR_PERCENT = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.INTEREST_RATE_SCALING_FACTOR_PERCENT.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public registerTermStart = {
        async sendTransactionAsync(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.registerTermStart.estimateGasAsync.bind(self, agreementId, debtor),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.registerTermStart,
                self.web3ContractInstance,
            )(agreementId, debtor, txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.registerTermStart.estimateGas,
                self.web3ContractInstance,
            )(agreementId, debtor, txDataWithDefaults);
            return gas;
        },
        async getABIEncodedTransactionData(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.registerTermStart.getData,
                self.web3ContractInstance,
            )(agreementId, debtor, txDataWithDefaults);
            return abiEncodedTransactionData;
        },
    };
    public getExpectedRepaymentValue = {
        async callAsync(
            agreementId: string,
            timestamp: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getExpectedRepaymentValue.call,
                self.web3ContractInstance,
            )(agreementId, timestamp);
            return result;
        },
    };
    public contractRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string>(
                self.web3ContractInstance.contractRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public INTEREST_RATE_SCALING_FACTOR_MULTIPLIER = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.INTEREST_RATE_SCALING_FACTOR_MULTIPLIER.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public unpackParametersFromBytes = {
        async callAsync(
            parameters: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>(
                self.web3ContractInstance.unpackParametersFromBytes.call,
                self.web3ContractInstance,
            )(parameters);
            return result;
        },
    };
    public YEAR_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.YEAR_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public valueRepaid = {
        async callAsync(index_0: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.valueRepaid.call,
                self.web3ContractInstance,
            )(index_0);
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
    ): Promise<ERC721CollateralizedSimpleInterestTermsContractContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new ERC721CollateralizedSimpleInterestTermsContractContract(
                    web3ContractInstance,
                    defaults,
                );
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC721CollateralizedSimpleInterestTermsContract",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ERC721CollateralizedSimpleInterestTermsContractContract",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<ERC721CollateralizedSimpleInterestTermsContractContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new ERC721CollateralizedSimpleInterestTermsContractContract(
                web3ContractInstance,
                defaults,
            );
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "ERC721CollateralizedSimpleInterestTermsContractContract",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
