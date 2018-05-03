/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { CollateralizedSimpleInterestTermsContract as ContractArtifacts } from "@dharmaprotocol/contracts";
import * as promisify from "tiny-promisify";
import * as Web3 from "web3";
import { BigNumber } from "../../../utils/bignumber";
import { classUtils } from "../../../utils/class_utils";
import { Web3Utils } from "../../../utils/web3_utils";
import { TxData, TxDataPayable } from "../../types";

import { BaseContract, CONTRACT_WRAPPER_ERRORS } from "./base_contract_wrapper";

export class CollateralizedSimpleInterestTermsContractContract extends BaseContract {
    public debtKernelAddress = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtKernelAddress.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public getValueRepaidToDate = {
        async callAsync(agreementId: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getValueRepaidToDate.call,
                self.web3ContractInstance,
            )(agreementId);
            return result;
        },
    };
    public DAY_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.DAY_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public debtKernel = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtKernel.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public MONTH_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.MONTH_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public getTermEndTimestamp = {
        async callAsync(_agreementId: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getTermEndTimestamp.call,
                self.web3ContractInstance,
            )(_agreementId);
            return result;
        },
    };
    public debtRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string>(
                self.web3ContractInstance.debtRegistry.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public WEEK_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.WEEK_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public returnCollateral = {
        async sendTransactionAsync(agreementId: string, txData: TxData = {}): Promise<string> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
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
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.returnCollateralAsync.estimateGas,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agreementId: string, txData: TxData = {}): string {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const abiEncodedTransactionData = self.web3ContractInstance.returnCollateralAsync.getData();
            return abiEncodedTransactionData;
        },
    };
    public timestampAdjustedForGracePeriod = {
        async callAsync(
            gracePeriodInDays: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.timestampAdjustedForGracePeriod.call,
                self.web3ContractInstance,
            )(gracePeriodInDays);
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
            const self = this as CollateralizedSimpleInterestTermsContractContract;
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
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.registerRepayment.estimateGas,
                self.web3ContractInstance,
            )(agreementId, payer, beneficiary, unitsOfRepayment, tokenAddress, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            agreementId: string,
            payer: string,
            beneficiary: string,
            unitsOfRepayment: BigNumber,
            tokenAddress: string,
            txData: TxData = {},
        ): string {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const abiEncodedTransactionData = self.web3ContractInstance.registerRepayment.getData();
            return abiEncodedTransactionData;
        },
    };
    public SECONDS_IN_DAY = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.SECONDS_IN_DAY.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public HOUR_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.HOUR_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public repaymentRouter = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string>(
                self.web3ContractInstance.repaymentRouter.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public INTEREST_RATE_SCALING_FACTOR = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.INTEREST_RATE_SCALING_FACTOR.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public NUM_AMORTIZATION_UNIT_TYPES = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.NUM_AMORTIZATION_UNIT_TYPES.call,
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
            const self = this as CollateralizedSimpleInterestTermsContractContract;
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
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.registerTermStart.estimateGas,
                self.web3ContractInstance,
            )(agreementId, debtor, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            agreementId: string,
            debtor: string,
            txData: TxData = {},
        ): string {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const abiEncodedTransactionData = self.web3ContractInstance.registerTermStart.getData();
            return abiEncodedTransactionData;
        },
    };
    public getExpectedRepaymentValue = {
        async callAsync(
            agreementId: string,
            timestamp: BigNumber,
            defaultBlock?: Web3.BlockParam,
        ): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.getExpectedRepaymentValue.call,
                self.web3ContractInstance,
            )(agreementId, timestamp);
            return result;
        },
    };
    public tokenRegistry = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string>(
                self.web3ContractInstance.tokenRegistry.call,
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
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<[BigNumber, BigNumber, BigNumber]>(
                self.web3ContractInstance.unpackCollateralParametersFromBytes.call,
                self.web3ContractInstance,
            )(parameters);
            return result;
        },
    };
    public agreementToCollateralizer = {
        async callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<string>(
                self.web3ContractInstance.agreementToCollateralizer.call,
                self.web3ContractInstance,
            )(index);
            return result;
        },
    };
    public unpackParametersFromBytes = {
        async callAsync(
            parameters: string,
            defaultBlock?: Web3.BlockParam,
        ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>(
                self.web3ContractInstance.unpackParametersFromBytes.call,
                self.web3ContractInstance,
            )(parameters);
            return result;
        },
    };
    public seizeCollateral = {
        async sendTransactionAsync(agreementId: string, txData: TxData = {}): Promise<string> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
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
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData);
            const gas = await promisify<number>(
                self.web3ContractInstance.seizeCollateralAsync.estimateGas,
                self.web3ContractInstance,
            )(agreementId, txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(agreementId: string, txData: TxData = {}): string {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const abiEncodedTransactionData = self.web3ContractInstance.seizeCollateralAsync.getData();
            return abiEncodedTransactionData;
        },
    };
    public YEAR_LENGTH_IN_SECONDS = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.YEAR_LENGTH_IN_SECONDS.call,
                self.web3ContractInstance,
            )();
            return result;
        },
    };
    public valueRepaid = {
        async callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as CollateralizedSimpleInterestTermsContractContract;
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.valueRepaid.call,
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
    ): Promise<CollateralizedSimpleInterestTermsContractContract> {
        const web3Utils = new Web3Utils(web3);

        const currentNetwork = await web3Utils.getNetworkIdAsync();
        const { abi, networks }: { abi: any; networks: any } = ContractArtifacts;

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork];

            const contractExists = await web3Utils.doesContractExistAtAddressAsync(contractAddress);

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                return new CollateralizedSimpleInterestTermsContractContract(
                    web3ContractInstance,
                    defaults,
                );
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "CollateralizedSimpleInterestTermsContract",
                        currentNetwork,
                    ),
                );
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "CollateralizedSimpleInterestTermsContract",
                    currentNetwork,
                ),
            );
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>,
    ): Promise<CollateralizedSimpleInterestTermsContractContract> {
        const web3Utils = new Web3Utils(web3);

        const { abi }: { abi: any } = ContractArtifacts;
        const contractExists = await web3Utils.doesContractExistAtAddressAsync(address);
        const currentNetwork = await web3Utils.getNetworkIdAsync();

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address);

            return new CollateralizedSimpleInterestTermsContractContract(
                web3ContractInstance,
                defaults,
            );
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                    "CollateralizedSimpleInterestTermsContract",
                    currentNetwork,
                ),
            );
        }
    }
} // tslint:disable:max-file-line-count
