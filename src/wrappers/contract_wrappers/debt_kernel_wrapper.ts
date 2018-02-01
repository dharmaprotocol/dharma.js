import { BaseContract, CONTRACT_WRAPPER_ERRORS, TxData } from './base_contract_wrapper'
import promisify from 'tiny-promisify'
import { classUtils } from 'utils/class_utils'
import { BigNumber } from 'bignumber.js'
import * as fs from 'fs-extra'
import * as Web3 from 'web3'
import { Web3Wrapper } from '@0xproject/web3-wrapper'

export class DebtKernelContract extends BaseContract {
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults)
        classUtils.bindAll(this, ['web3ContractInstance', 'defaults'])
    }

    static async deployed(web3: Web3, defaults: Partial<TxData>): Promise<DebtKernelContract> {
        const currentNetwork = web3.version.network
        const { abi, networks } = await this.getArtifactsData(web3)
        const web3ContractInstance = web3.eth.contract(abi).at(networks[currentNetwork].address)

        return new DebtKernelContract(web3ContractInstance, defaults)
    }
    static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>
    ): Promise<DebtKernelContract> {
        const { abi } = await this.getArtifactsData(web3)
        const web3ContractInstance = web3.eth.contract(abi).at(address)

        return new DebtKernelContract(web3ContractInstance, defaults)
    }
    private static async getArtifactsData(web3: Web3): Promise<any> {
        try {
            const artifact = await fs.readFile('src/artifacts/DebtKernel.json', 'utf8')
            const { abi, networks } = JSON.parse(artifact)
            return { abi, networks }
        } catch (e) {
            console.error('Artifacts malformed or nonexistent: ' + e.toString())
        }
    }

    public cancelDebtOrder = {
        async sendTransactionAsync(
            orderAddresses: (string)[],
            orderValues: (BigNumber)[],
            orderBytes32: (string)[],
            txData: TxData = {}
        ): Promise<string> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.cancelDebtOrder.estimateGasAsync.bind(
                    self,
                    orderAddresses,
                    orderValues,
                    orderBytes32
                )
            )
            const txHash = await promisify<string>(
                self.web3ContractInstance.cancelDebtOrder,
                self.web3ContractInstance
            )(orderAddresses, orderValues, orderBytes32, txDataWithDefaults)
            return txHash
        },
        async estimateGasAsync(
            orderAddresses: (string)[],
            orderValues: (BigNumber)[],
            orderBytes32: (string)[],
            txData: TxData = {}
        ): Promise<number> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData)
            const gas = await promisify<number>(
                self.web3ContractInstance.cancelDebtOrder.estimateGas,
                self.web3ContractInstance
            )(orderAddresses, orderValues, orderBytes32, txDataWithDefaults)
            return gas
        },
        getABIEncodedTransactionData(
            orderAddresses: (string)[],
            orderValues: (BigNumber)[],
            orderBytes32: (string)[],
            txData: TxData = {}
        ): string {
            const self = this as DebtKernelContract
            const abiEncodedTransactionData = self.web3ContractInstance.cancelDebtOrder.getData()
            return abiEncodedTransactionData
        }
    }
    public unpause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.unpause.estimateGasAsync.bind(self)
            )
            const txHash = await promisify<string>(
                self.web3ContractInstance.unpause,
                self.web3ContractInstance
            )(txDataWithDefaults)
            return txHash
        },
        async estimateGasAsync(txData: TxData = {}): Promise<number> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData)
            const gas = await promisify<number>(
                self.web3ContractInstance.unpause.estimateGas,
                self.web3ContractInstance
            )(txDataWithDefaults)
            return gas
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as DebtKernelContract
            const abiEncodedTransactionData = self.web3ContractInstance.unpause.getData()
            return abiEncodedTransactionData
        }
    }
    public debtOrderCancelled = {
        async callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as DebtKernelContract
            const result = await promisify<boolean>(
                self.web3ContractInstance.debtOrderCancelled.call,
                self.web3ContractInstance
            )(index)
            return result
        }
    }
    public paused = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as DebtKernelContract
            const result = await promisify<boolean>(
                self.web3ContractInstance.paused.call,
                self.web3ContractInstance
            )()
            return result
        }
    }
    public pause = {
        async sendTransactionAsync(txData: TxData = {}): Promise<string> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.pause.estimateGasAsync.bind(self)
            )
            const txHash = await promisify<string>(
                self.web3ContractInstance.pause,
                self.web3ContractInstance
            )(txDataWithDefaults)
            return txHash
        },
        async estimateGasAsync(txData: TxData = {}): Promise<number> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData)
            const gas = await promisify<number>(
                self.web3ContractInstance.pause.estimateGas,
                self.web3ContractInstance
            )(txDataWithDefaults)
            return gas
        },
        getABIEncodedTransactionData(txData: TxData = {}): string {
            const self = this as DebtKernelContract
            const abiEncodedTransactionData = self.web3ContractInstance.pause.getData()
            return abiEncodedTransactionData
        }
    }
    public issuanceCancelled = {
        async callAsync(index: string, defaultBlock?: Web3.BlockParam): Promise<boolean> {
            const self = this as DebtKernelContract
            const result = await promisify<boolean>(
                self.web3ContractInstance.issuanceCancelled.call,
                self.web3ContractInstance
            )(index)
            return result
        }
    }
    public owner = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DebtKernelContract
            const result = await promisify<string>(
                self.web3ContractInstance.owner.call,
                self.web3ContractInstance
            )()
            return result
        }
    }
    public TOKEN_TRANSFER_PROXY = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DebtKernelContract
            const result = await promisify<string>(
                self.web3ContractInstance.TOKEN_TRANSFER_PROXY.call,
                self.web3ContractInstance
            )()
            return result
        }
    }
    public setDebtToken = {
        async sendTransactionAsync(debtTokenAddress: string, txData: TxData = {}): Promise<string> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setDebtToken.estimateGasAsync.bind(self, debtTokenAddress)
            )
            const txHash = await promisify<string>(
                self.web3ContractInstance.setDebtToken,
                self.web3ContractInstance
            )(debtTokenAddress, txDataWithDefaults)
            return txHash
        },
        async estimateGasAsync(debtTokenAddress: string, txData: TxData = {}): Promise<number> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData)
            const gas = await promisify<number>(
                self.web3ContractInstance.setDebtToken.estimateGas,
                self.web3ContractInstance
            )(debtTokenAddress, txDataWithDefaults)
            return gas
        },
        getABIEncodedTransactionData(debtTokenAddress: string, txData: TxData = {}): string {
            const self = this as DebtKernelContract
            const abiEncodedTransactionData = self.web3ContractInstance.setDebtToken.getData()
            return abiEncodedTransactionData
        }
    }
    public cancelIssuance = {
        async sendTransactionAsync(
            version: string,
            debtor: string,
            termsContract: string,
            termsContractParameters: string,
            underwriter: string,
            underwriterRiskRating: BigNumber,
            salt: BigNumber,
            txData: TxData = {}
        ): Promise<string> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.cancelIssuance.estimateGasAsync.bind(
                    self,
                    version,
                    debtor,
                    termsContract,
                    termsContractParameters,
                    underwriter,
                    underwriterRiskRating,
                    salt
                )
            )
            const txHash = await promisify<string>(
                self.web3ContractInstance.cancelIssuance,
                self.web3ContractInstance
            )(
                version,
                debtor,
                termsContract,
                termsContractParameters,
                underwriter,
                underwriterRiskRating,
                salt,
                txDataWithDefaults
            )
            return txHash
        },
        async estimateGasAsync(
            version: string,
            debtor: string,
            termsContract: string,
            termsContractParameters: string,
            underwriter: string,
            underwriterRiskRating: BigNumber,
            salt: BigNumber,
            txData: TxData = {}
        ): Promise<number> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData)
            const gas = await promisify<number>(
                self.web3ContractInstance.cancelIssuance.estimateGas,
                self.web3ContractInstance
            )(
                version,
                debtor,
                termsContract,
                termsContractParameters,
                underwriter,
                underwriterRiskRating,
                salt,
                txDataWithDefaults
            )
            return gas
        },
        getABIEncodedTransactionData(
            version: string,
            debtor: string,
            termsContract: string,
            termsContractParameters: string,
            underwriter: string,
            underwriterRiskRating: BigNumber,
            salt: BigNumber,
            txData: TxData = {}
        ): string {
            const self = this as DebtKernelContract
            const abiEncodedTransactionData = self.web3ContractInstance.cancelIssuance.getData()
            return abiEncodedTransactionData
        }
    }
    public NULL_ISSUANCE_HASH = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DebtKernelContract
            const result = await promisify<string>(
                self.web3ContractInstance.NULL_ISSUANCE_HASH.call,
                self.web3ContractInstance
            )()
            return result
        }
    }
    public fillDebtOrder = {
        async sendTransactionAsync(
            creditor: string,
            orderAddresses: (string)[],
            orderValues: (BigNumber)[],
            orderBytes32: (string)[],
            signaturesV: (number | BigNumber)[],
            signaturesR: (string)[],
            signaturesS: (string)[],
            txData: TxData = {}
        ): Promise<string> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.fillDebtOrder.estimateGasAsync.bind(
                    self,
                    creditor,
                    orderAddresses,
                    orderValues,
                    orderBytes32,
                    signaturesV,
                    signaturesR,
                    signaturesS
                )
            )
            const txHash = await promisify<string>(
                self.web3ContractInstance.fillDebtOrder,
                self.web3ContractInstance
            )(
                creditor,
                orderAddresses,
                orderValues,
                orderBytes32,
                signaturesV,
                signaturesR,
                signaturesS,
                txDataWithDefaults
            )
            return txHash
        },
        async estimateGasAsync(
            creditor: string,
            orderAddresses: (string)[],
            orderValues: (BigNumber)[],
            orderBytes32: (string)[],
            signaturesV: (number | BigNumber)[],
            signaturesR: (string)[],
            signaturesS: (string)[],
            txData: TxData = {}
        ): Promise<number> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData)
            const gas = await promisify<number>(
                self.web3ContractInstance.fillDebtOrder.estimateGas,
                self.web3ContractInstance
            )(
                creditor,
                orderAddresses,
                orderValues,
                orderBytes32,
                signaturesV,
                signaturesR,
                signaturesS,
                txDataWithDefaults
            )
            return gas
        },
        getABIEncodedTransactionData(
            creditor: string,
            orderAddresses: (string)[],
            orderValues: (BigNumber)[],
            orderBytes32: (string)[],
            signaturesV: (number | BigNumber)[],
            signaturesR: (string)[],
            signaturesS: (string)[],
            txData: TxData = {}
        ): string {
            const self = this as DebtKernelContract
            const abiEncodedTransactionData = self.web3ContractInstance.fillDebtOrder.getData()
            return abiEncodedTransactionData
        }
    }
    public EXTERNAL_QUERY_GAS_LIMIT = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<BigNumber> {
            const self = this as DebtKernelContract
            const result = await promisify<BigNumber>(
                self.web3ContractInstance.EXTERNAL_QUERY_GAS_LIMIT.call,
                self.web3ContractInstance
            )()
            return result
        }
    }
    public transferOwnership = {
        async sendTransactionAsync(newOwner: string, txData: TxData = {}): Promise<string> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.transferOwnership.estimateGasAsync.bind(self, newOwner)
            )
            const txHash = await promisify<string>(
                self.web3ContractInstance.transferOwnership,
                self.web3ContractInstance
            )(newOwner, txDataWithDefaults)
            return txHash
        },
        async estimateGasAsync(newOwner: string, txData: TxData = {}): Promise<number> {
            const self = this as DebtKernelContract
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(txData)
            const gas = await promisify<number>(
                self.web3ContractInstance.transferOwnership.estimateGas,
                self.web3ContractInstance
            )(newOwner, txDataWithDefaults)
            return gas
        },
        getABIEncodedTransactionData(newOwner: string, txData: TxData = {}): string {
            const self = this as DebtKernelContract
            const abiEncodedTransactionData = self.web3ContractInstance.transferOwnership.getData()
            return abiEncodedTransactionData
        }
    }
    public debtToken = {
        async callAsync(defaultBlock?: Web3.BlockParam): Promise<string> {
            const self = this as DebtKernelContract
            const result = await promisify<string>(
                self.web3ContractInstance.debtToken.call,
                self.web3ContractInstance
            )()
            return result
        }
    }

    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults)
        classUtils.bindAll(this, ['web3ContractInstance', 'defaults'])
    }

    public static async deployed(
        web3: Web3,
        defaults: Partial<TxData>
    ): Promise<DebtKernelContract> {
        const web3Wrapper = new Web3Wrapper(web3.currentProvider)

        const currentNetwork = await web3Wrapper.getNetworkIdAsync()
        const { abi, networks } = await this.getArtifactsData()

        if (networks[currentNetwork]) {
            const { address: contractAddress } = networks[currentNetwork]

            const contractExists = await web3Wrapper.doesContractExistAtAddressAsync(
                contractAddress
            )

            if (contractExists) {
                const web3ContractInstance = web3.eth.contract(abi).at(contractAddress)
                return new DebtKernelContract(web3ContractInstance, defaults)
            } else {
                throw new Error(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        'DebtKernel',
                        currentNetwork
                    )
                )
            }
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK('DebtKernel', currentNetwork)
            )
        }
    }

    public static async at(
        address: string,
        web3: Web3,
        defaults: Partial<TxData>
    ): Promise<DebtKernelContract> {
        const web3Wrapper = new Web3Wrapper(web3.currentProvider)

        const { abi } = await this.getArtifactsData()
        const contractExists = await web3Wrapper.doesContractExistAtAddressAsync(address)
        const currentNetwork = await web3Wrapper.getNetworkIdAsync()

        if (contractExists) {
            const web3ContractInstance = web3.eth.contract(abi).at(address)

            return new DebtKernelContract(web3ContractInstance, defaults)
        } else {
            throw new Error(
                CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK('DebtKernel', currentNetwork)
            )
        }
    }

    private static async getArtifactsData(): Promise<any> {
        try {
            const artifact = await fs.readFile('src/artifacts/DebtKernel.json', 'utf8')
            const { abi, networks } = JSON.parse(artifact)
            return { abi, networks }
        } catch (e) {
            throw new Error(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE('DebtKernel'))
        }
    }
} // tslint:disable:max-file-line-count
