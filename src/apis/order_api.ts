import Web3 from 'web3'
import { DebtOrder, DharmaConfig, TxData } from '../types'
import { DebtKernelContract, DebtOrderWrapper } from '../wrappers'
import promisify from 'tiny-promisify'
import * as Units from 'utils/units'

const ORDER_FILL_GAS_MAXIMUM = 500000

export class OrderAPI {
    private web3: Web3
    private config: DharmaConfig

    public constructor(web3: Web3, config?: DharmaConfig) {
        this.web3 = web3
        this.config = config || {}
    }

    // TODO: Add validations
    public async fillDebtOrder(debtOrder: DebtOrder, options?: TxData): Promise<string> {
        const debtKernel = await this.loadDebtKernel()
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)

        return debtKernel.fillDebtOrder.sendTransactionAsync(
            debtOrderWrapped.getCreditor(),
            debtOrderWrapped.getOrderAddresses(),
            debtOrderWrapped.getOrderValues(),
            debtOrderWrapped.getOrderBytes32(),
            debtOrderWrapped.getSignaturesV(),
            debtOrderWrapped.getSignaturesR(),
            debtOrderWrapped.getSignaturesS(),
            options
        )
    }

    // TODO: Add error messages for when debt kernel contract is unavailable (e.g. not deployed on chain)
    // TODO: Provide mechanism for user to specify what debt kernel contract they want to interact
    //  with, probably best done in the initialization of dharma.js
    private async loadDebtKernel(): Promise<DebtKernelContract> {
        const accounts = await promisify(this.web3.eth.getAccounts)()
        const transactionDefaults = {
            from: accounts[0],
            gas: ORDER_FILL_GAS_MAXIMUM
        }

        if (this.config.kernelAddress) {
            return DebtKernelContract.at(this.config.kernelAddress, this.web3, transactionDefaults)
        }

        return DebtKernelContract.deployed(this.web3, transactionDefaults)
    }
}
