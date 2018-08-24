/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import {TxData, TxDataPayable} from '../common';
import {promisify} from '@0xproject/utils';
import {classUtils} from '../common';
import {BigNumber} from 'bignumber.js';
import * as fs from "fs-extra";
import * as Web3 from 'web3';

import {BaseContract} from '../base_contract';

export class ERC721CollateralizedSimpleInterestTermsContractContract extends BaseContract {
    public getValueRepaidToDate = {
        async callAsync(
            agreementId: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.getValueRepaidToDate.call,
                self.web3ContractInstance,
            )(
                agreementId,
            );
            return result;
        },
    };
    public DAY_LENGTH_IN_SECONDS = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.DAY_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public MONTH_LENGTH_IN_SECONDS = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.MONTH_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public getTermEndTimestamp = {
        async callAsync(
            _agreementId: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.getTermEndTimestamp.call,
                self.web3ContractInstance,
            )(
                _agreementId,
            );
            return result;
        },
    };
    public WEEK_LENGTH_IN_SECONDS = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.WEEK_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )(
            );
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
                self.web3ContractInstance.registerRepayment, self.web3ContractInstance,
            )(
                agreementId,
                payer,
                beneficiary,
                unitsOfRepayment,
                tokenAddress,
                txDataWithDefaults,
            );
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
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.registerRepayment.estimateGas, self.web3ContractInstance,
            )(
                agreementId,
                payer,
                beneficiary,
                unitsOfRepayment,
                tokenAddress,
                txDataWithDefaults,
            );
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
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.registerRepayment.getData, self.web3ContractInstance,
            )(
                agreementId,
                payer,
                beneficiary,
                unitsOfRepayment,
                tokenAddress,
                txDataWithDefaults,
            );
            return abiEncodedTransactionData;
        },
    };
    public HOUR_LENGTH_IN_SECONDS = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.HOUR_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public erc721Collateralizer = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<string
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.erc721Collateralizer.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public NUM_AMORTIZATION_UNIT_TYPES = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.NUM_AMORTIZATION_UNIT_TYPES.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public INTEREST_RATE_SCALING_FACTOR_PERCENT = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.INTEREST_RATE_SCALING_FACTOR_PERCENT.call,
                self.web3ContractInstance,
            )(
            );
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
                self.registerTermStart.estimateGasAsync.bind(
                    self,
                    agreementId,
                    debtor,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.registerTermStart, self.web3ContractInstance,
            )(
                agreementId,
                debtor,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.registerTermStart.estimateGas, self.web3ContractInstance,
            )(
                agreementId,
                debtor,
                txDataWithDefaults,
            );
            return gas;
        },
        async getABIEncodedTransactionData(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const abiEncodedTransactionData = await promisify<string>(
                self.web3ContractInstance.registerTermStart.getData, self.web3ContractInstance,
            )(
                agreementId,
                debtor,
                txDataWithDefaults,
            );
            return abiEncodedTransactionData;
        },
    };
    public getExpectedRepaymentValue = {
        async callAsync(
            agreementId: string,
            timestamp: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.getExpectedRepaymentValue.call,
                self.web3ContractInstance,
            )(
                agreementId,
                timestamp,
            );
            return result;
        },
    };
    public contractRegistry = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<string
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.contractRegistry.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public INTEREST_RATE_SCALING_FACTOR_MULTIPLIER = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.INTEREST_RATE_SCALING_FACTOR_MULTIPLIER.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public unpackParametersFromBytes = {
        async callAsync(
            parameters: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
    >(
                self.web3ContractInstance.unpackParametersFromBytes.call,
                self.web3ContractInstance,
            )(
                parameters,
            );
            return result;
        },
    };
    public YEAR_LENGTH_IN_SECONDS = {
        async callAsync(
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.YEAR_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )(
            );
            return result;
        },
    };
    public valueRepaid = {
        async callAsync(
            index_0: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber
    > {
            const self = this as ERC721CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.valueRepaid.call,
                self.web3ContractInstance,
            )(
                index_0,
            );
            return result;
        },
    };
    async deploy(...args: any[]): Promise<any> {
        const wrapper = this;
        const rejected = false;

        return new Promise((resolve, reject) => {
            wrapper.web3ContractInstance.new(wrapper.defaults, (err: string, contract: Web3.ContractInstance) => {
                if (err) {
                    reject(err);
                } else if (contract.address) {
                    wrapper.web3ContractInstance = wrapper.web3ContractInstance.at(contract.address);
                    wrapper.address = contract.address;
                    resolve();
                }
            })
        });
    }
    static async deployed(web3: Web3, defaults: Partial<TxData>): Promise<ERC721CollateralizedSimpleInterestTermsContractContract> {
        const currentNetwork = web3.version.network;
        const { abi, networks } = await this.getArtifactsData(web3);
        const web3ContractInstance = web3.eth.contract(abi).at(networks[currentNetwork].address);

        return new ERC721CollateralizedSimpleInterestTermsContractContract(web3ContractInstance, defaults);
    }
    static async at(address: string, web3: Web3, defaults: Partial<TxData>): Promise<ERC721CollateralizedSimpleInterestTermsContractContract> {
        const { abi } = await this.getArtifactsData(web3);
        const web3ContractInstance = web3.eth.contract(abi).at(address);

        return new ERC721CollateralizedSimpleInterestTermsContractContract(web3ContractInstance, defaults);
    }
    private static async getArtifactsData(web3: Web3):
        Promise<any>
    {
        try {
            const artifact = await fs.readFile("build/contracts/ERC721CollateralizedSimpleInterestTermsContract.json", "utf8");
            const { abi, networks } = JSON.parse(artifact);
            return { abi, networks };
        } catch (e) {
            console.error("Artifacts malformed or nonexistent: " + e.toString());
        }
    }
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ['web3ContractInstance', 'defaults']);
    }
} // tslint:disable:max-file-line-count
