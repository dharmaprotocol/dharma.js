import Web3 from 'web3'
import { DebtOrder, DharmaConfig, TxData } from '../types'
import { ACCOUNTS } from '../../test/accounts'
import {
    DebtKernelContract,
    DebtOrderWrapper,
    DebtTokenContract,
    DummyTokenContract,
    DummyTokenRegistryContract
} from '../wrappers'
import { Assertions } from '../invariants'
import promisify from 'tiny-promisify'
import singleLineString from 'single-line-string'
import * as Units from 'utils/units'
import { BigNumber } from 'web3-typescript-typings/node_modules/bignumber.js'

const ORDER_FILL_GAS_MAXIMUM = 500000

export const OrderAPIErrors = {
    EXPIRED: () =>
        singleLineString`Unable to fill debt order because
                        the order has expired`,

    INVALID_UNDERWRITER_FEE: () =>
        singleLineString`Debt order has an underwriter
                        fee but has no assigned underwriter `,

    INVALID_RELAYER_FEE: () =>
        singleLineString`Debt order has a relayer fee
                        but has no assigned relayer`,

    INVALID_DEBTOR_FEE: () =>
        singleLineString`Debt order has a debtor fee
                        that is more than the principal`,

    INVALID_FEES: () =>
        singleLineString`Debt order creditor + debtor fee
                        does not equal underwriter + relayer fee`,

    ORDER_CANCELLED: () => singleLineString`Debt order was cancelled`,

    CREDITOR_BALANCE_INSUFFICIENT: () => singleLineString`Creditor balance is insufficient`,

    CREDITOR_ALLOWANCE_INSUFFICIENT: () => singleLineString`Creditor allowance is insufficient`,

    ISSUANCE_CANCELLED: () => singleLineString`Issuance was cancelled`,

    DEBT_ORDER_ALREADY_ISSUED: () => singleLineString`Debt order has already been issued`,

    INVALID_DEBTOR_SIGNATURE: () => singleLineString`Debtor signature is not valid for debt order`,

    INVALID_CREDITOR_SIGNATURE: () =>
        singleLineString`Creditor signature is not valid for debt order`,

    INVALID_UNDERWRITER_SIGNATURE: () =>
        singleLineString`Underwriter signature is not valid for debt order`
}

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 }

export class OrderAPI {
    private web3: Web3
    private config: DharmaConfig
    private assert: Assertions

    public constructor(web3: Web3, config?: DharmaConfig) {
        this.web3 = web3
        this.assert = new Assertions(this.web3)
        this.config = config || {}
    }

    // TODO: Add validations
    public async fillDebtOrder(
        debtOrder: DebtOrder,
        dummyToken?: DummyTokenContract,
        options?: TxData
    ): Promise<string> {
        const debtKernel = await this.loadDebtKernel()
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)
        const debtToken = await DebtTokenContract.deployed(this.web3, TX_DEFAULTS)

        this.assert.order.invalidDebtorFee(debtOrder, OrderAPIErrors.INVALID_DEBTOR_FEE())
        this.assert.order.invalidUnderwriterFee(debtOrder, OrderAPIErrors.INVALID_UNDERWRITER_FEE())
        this.assert.order.invalidRelayerFee(debtOrder, OrderAPIErrors.INVALID_RELAYER_FEE())
        this.assert.order.invalidFees(debtOrder, OrderAPIErrors.INVALID_FEES())
        this.assert.order.notExpired(debtOrder, OrderAPIErrors.EXPIRED())

        this.assert.order.notAlreadyIssued(
            debtToken,
            debtOrderWrapped,
            OrderAPIErrors.DEBT_ORDER_ALREADY_ISSUED()
        )

        // const dummyTokenRegistry = await DummyTokenRegistryContract.deployed(this.web3, TX_DEFAULTS)

        // const dummyToken = await DummyTokenContract.deployed(this.web3, TX_DEFAULTS)
        this.assert.order.insufficientCreditorBalance(
            dummyToken,
            debtOrder,
            OrderAPIErrors.CREDITOR_BALANCE_INSUFFICIENT()
        )
        // this.assert.order.insufficientCreditorAllowance(debtOrder, OrderAPIErrors.CREDITOR_ALLOWANCE_INSUFFICIENT())

        // // TODO: Fix hash issue
        // this.assert.order.validDebtorSignature(debtOrder, debtOrderWrapped, options, OrderAPIErrors.INVALID_DEBTOR_SIGNATURE())
        // this.assert.order.validCreditorSignature(debtOrder, debtOrderWrapped, options, OrderAPIErrors.INVALID_CREDITOR_SIGNATURE())
        // this.assert.order.validUnderwriterSignature(debtOrder, debtOrderWrapped, options, OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE())

        // // TODO: Fix error on debt order cancellation commitment hash (temp assertion by order_api.spec.ts logs)
        // await this.assert.order.debtOrderNotCancelled(
        //     debtKernel,
        //     debtOrderWrapped,
        //     OrderAPIErrors.ORDER_CANCELLED()
        // )

        // await this.assert.order.issuanceNotCancelled(
        //     debtKernel,
        //     debtOrderWrapped,
        //     OrderAPIErrors.ISSUANCE_CANCELLED()
        // )

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
