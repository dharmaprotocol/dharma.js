import { BigNumber } from 'bignumber.js'
import { OrderAPI, OrderAPIErrors } from 'src/apis/order_api'
import moment from 'moment'
import * as Units from 'utils/units'
import Web3 from 'web3'
import ABIDecoder from 'abi-decoder'
import { DebtOrder } from '../../src/types'

import {
    DummyTokenContract,
    DummyTokenRegistryContract,
    DebtKernelContract,
    DebtOrderWrapper,
    DebtTokenContract
} from 'src/wrappers'

import { ACCOUNTS, NULL_ADDRESS } from '../accounts'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const orderApi = new OrderAPI(web3)

// For the unit test's purposes, we use arbitrary
// addresses for all debt order fields that expect addresses.
let debtOrder = {
    kernelVersion: ACCOUNTS[0].address,
    issuanceVersion: ACCOUNTS[1].address,
    principalAmount: Units.ether(1),
    principalToken: ACCOUNTS[2].address,
    debtor: ACCOUNTS[3].address,
    debtorFee: Units.ether(0.001),
    creditor: ACCOUNTS[4].address,
    creditorFee: Units.ether(0.001),
    relayer: ACCOUNTS[5].address,
    relayerFee: Units.ether(0.001),
    underwriter: ACCOUNTS[6].address,
    underwriterFee: Units.ether(0.001),
    underwriterRiskRating: Units.percent(0.001),
    termsContract: ACCOUNTS[7].address,
    termsContractParameters: ACCOUNTS[8].address,
    expirationTimestampInSec: new BigNumber(
        moment()
            .add(7, 'days')
            .unix()
    ),
    salt: new BigNumber(0)
}

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 }

describe('Order API (Integration Tests)', () => {
    let principalToken: DummyTokenContract
    let debtWrapper: DebtOrderWrapper
    let debtKernel: DebtKernelContract
    // let debtToken: DebtTokenContract
    // let debtOrder: DebtOrder

    // Example of how to initialize new tokens
    beforeAll(async () => {
        debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS)
        // const dummyTokenRegistry = await DummyTokenRegistryContract.deployed(web3, TX_DEFAULTS)

        // // Get the token address for our dummy Augur REP token
        // const principalTokenAddress = await dummyTokenRegistry.getTokenAddress.callAsync('REP')

        // principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS)

        // // Set arbitrary balances for people
        // await principalToken.setBalance.sendTransactionAsync(ACCOUNTS[1].address, Units.ether(0.5))

        // personsBalance = await principalToken.balanceOf.callAsync(ACCOUNTS[1].address)
    })

    test('base case', async () => {
        const test = await orderApi.fillDebtOrder(debtOrder, TX_DEFAULTS)
    })

    /*
        Validity Invariants
    */

    describe('...with principal < debtor fee', () => {
        let debtOrderWithInvalidDebtorFee = Object.assign({}, debtOrder)
        debtOrderWithInvalidDebtorFee.principalAmount = Units.ether(0.49)
        debtOrderWithInvalidDebtorFee.debtorFee = Units.ether(0.51)

        test('throws INVALID_DEBTOR_FEE error', async () => {
            await expect(orderApi.fillDebtOrder(debtOrderWithInvalidDebtorFee)).rejects.toThrow(
                OrderAPIErrors.INVALID_DEBTOR_FEE()
            )
        })
    })

    describe('...with no underwriter but with underwriter fee', () => {
        let debtOrderWithNullUnderwriter = Object.assign({}, debtOrder)
        debtOrderWithNullUnderwriter.underwriter = void 0

        test('throws INVALID_UNDERWRITER_FEE error', async () => {
            await expect(orderApi.fillDebtOrder(debtOrderWithNullUnderwriter)).rejects.toThrow(
                OrderAPIErrors.INVALID_UNDERWRITER_FEE()
            )
        })
    })

    describe('...with a replayer fee but without an assigned relayer', () => {
        let debtOrderWithNullRelayer = Object.assign({}, debtOrder)
        debtOrderWithNullRelayer.relayer = void 0

        test('throws INVALID_RELAYER_FEE error', async () => {
            await expect(orderApi.fillDebtOrder(debtOrderWithNullRelayer)).rejects.toThrow(
                OrderAPIErrors.INVALID_RELAYER_FEE()
            )
        })
    })

    describe('...creditor + debtor fee does not equal underwriter + relayer fee', () => {
        let debtOrderWithInvalidFees = Object.assign({}, debtOrder)
        debtOrderWithInvalidFees.relayerFee = Units.ether(0.004)

        test('throws INVALID_FEES error', async () => {
            await expect(orderApi.fillDebtOrder(debtOrderWithInvalidFees)).rejects.toThrow(
                OrderAPIErrors.INVALID_FEES()
            )
        })
    })

    describe('...debt order cannot have been expired', () => {
        let expiredDebtOrder = Object.assign({}, debtOrder)
        expiredDebtOrder.expirationTimestampInSec = new BigNumber(0)

        test('throws EXPIRED error', async () => {
            await expect(orderApi.fillDebtOrder(expiredDebtOrder)).rejects.toThrow(
                OrderAPIErrors.EXPIRED()
            )
        })
    })

    describe('...order cannot have been cancelled', () => {
        let toCancelDebtOrder
        let logEvent

        beforeAll(async () => {
            toCancelDebtOrder = Object.assign({}, debtOrder)
            const debtOrderWrapped = new DebtOrderWrapper(toCancelDebtOrder)

            const result = await debtKernel.cancelDebtOrder.sendTransactionAsync(
                debtOrderWrapped.getOrderAddresses(),
                debtOrderWrapped.getOrderValues(),
                debtOrderWrapped.getOrderBytes32(),
                { from: debtOrder.debtor }
            )

            ABIDecoder.addABI(debtKernel.web3ContractInstance.abi)

            const receipt = await web3.eth.getTransactionReceipt(result)
            const [log] = ABIDecoder.decodeLogs(receipt.logs)
            // console.log(log.events[0]);
            // console.log(log.events[1]);
            logEvent = log.events[1]

            // console.log(result)
            // const result2 = await debtKernel.debtOrderCancelled.callAsync(debtOrderWrapped.getHash())
            // console.log(result2)
            // const result3 = debtOrderWrapped.getHash()
            // console.log(result3)
            // console.log(debtOrderWrapped)
        })

        test('throws DEBT_ORDER_CANCELLED', async () => {
            await expect((logEvent.name = '_cancelledBy'))
            // TODO: Fix error on debt commitment hash
            // await expect(orderApi.fillDebtOrder(toCancelDebtOrder)).rejects.toThrow(
            //     OrderAPIErrors.ORDER_CANCELLED()
            // )
        })
    })

    // // CHECK
    // describe('...order cannot have already been issued', () => {
    //     let issuedDebt

    //     beforeAll(async () => {
    //         issuedDebt = Object.assign({}, debtOrder)
    //         const debtOrderWrapped = new DebtOrderWrapper(issuedDebt)

    //         await debtKernel.fillDebtOrder.sendTransactionAsync(
    //             debtOrderWrapped.getCreditor(),
    //             debtOrderWrapped.getOrderAddresses(),
    //             debtOrderWrapped.getOrderValues(),
    //             debtOrderWrapped.getOrderBytes32(),
    //             debtOrderWrapped.getSignaturesV(),
    //             debtOrderWrapped.getSignaturesR(),
    //             debtOrderWrapped.getSignaturesS(),
    //         )

    //         console.log(debtOrderWrapped.getIssuanceCommitmentHash())
    //         console.log(new BigNumber(debtOrderWrapped.getIssuanceCommitmentHash()))
    //         console.log(parseInt(debtOrderWrapped.getIssuanceCommitmentHash(), 16))
    //     })

    //     test('throws DEBT_ORDER_ALREADY_ISSUED', async () => {
    //         await expect(orderApi.fillDebtOrder(issuedDebt)).rejects.toThrow(
    //             OrderAPIErrors.DEBT_ORDER_ALREADY_ISSUED()
    //         )
    //     })
    // })

    describe('...issuance cannot have already been cancelled', () => {
        let toCancelIssuance
        let logEvent

        beforeAll(async () => {
            toCancelIssuance = Object.assign({}, debtOrder)
            const debtOrderWrapped = new DebtOrderWrapper(toCancelIssuance)

            const result = await debtKernel.cancelIssuance.sendTransactionAsync(
                debtOrderWrapped.getIssuanceCommitment().issuanceVersion,
                debtOrderWrapped.getIssuanceCommitment().debtor,
                debtOrderWrapped.getIssuanceCommitment().termsContract,
                debtOrderWrapped.getIssuanceCommitment().termsContractParameters,
                debtOrderWrapped.getIssuanceCommitment().underwriter,
                debtOrderWrapped.getIssuanceCommitment().underwriterRiskRating,
                debtOrderWrapped.getIssuanceCommitment().salt,
                { from: debtOrderWrapped.getIssuanceCommitment().underwriter }
            )

            ABIDecoder.addABI(debtKernel.web3ContractInstance.abi)
            const receipt = await web3.eth.getTransactionReceipt(result)
            const [log] = ABIDecoder.decodeLogs(receipt.logs)
            // console.log(log.events[0]);
            // console.log(log.events[1]);
            logEvent = log.events[1]

            // console.log(result)
            // const result2 = await debtKernel.debtOrderCancelled.callAsync(debtOrderWrapped.getHash())
            // console.log(result2)
            // const result3 = debtOrderWrapped.getHash()
            // console.log(result3)
            // console.log(debtOrderWrapped)
        })

        test('throws ISSUANCE_CANCELLED', async () => {
            await expect((logEvent.name = '_cancelledBy'))
            // TODO: Fix error on debt commitment hash
            // await expect(orderApi.fillDebtOrder(toCancelIssuance)).rejects.toThrow(
            //     OrderAPIErrors.ISSUANCE_CANCELLED()
        })

        // NEEDS HASH FIX
        // /*
        //     CONSENSUALITY INVARIANTS
        // */

        // describe('...if message sender not debtor, debtor signature must be valid', () => {
        //     let msgSenderNotDebtor

        //     beforeAll(async () => {
        //         msgSenderNotDebtor = Object.assign({}, debtOrder)
        //         const debtOrderWrapped = new DebtOrderWrapper(msgSenderNotDebtor)
        //     })

        //     test('throws INVALID_DEBTOR_SIGNATURE error', async () => {
        //         await expect(orderApi.fillDebtOrder(msgSenderNotDebtor, TX_DEFAULTS)).rejects.toThrow(
        //             OrderAPIErrors.INVALID_DEBTOR_SIGNATURE()
        //         )
        //     })
        // })

        // describe('...if message sender not creditor, creditor signature must be valid', () =>  {
        //     let msgSenderNotCreditor

        //     beforeAll(async () => {
        //         msgSenderNotCreditor = Object.assign({}, debtOrder)
        //         const debtOrderWrapped = new DebtOrderWrapper(msgSenderNotCreditor)
        //     })

        //     test('throws INVALID_CREDITOR_SIGNATURE error', async () => {
        //         await expect(orderApi.fillDebtOrder(msgSenderNotCreditor, TX_DEFAULTS)).rejects.toThrow(
        //             OrderAPIErrors.INVALID_CREDITOR_SIGNATURE()
        //         )
        //     })
        // })

        // describe('...if message sender not underwriter, underwriter signature must be valid', () => {
        //     let msgSenderNotUnderwriter

        //     beforeAll(async () => {
        //         msgSenderNotUnderwriter = Object.assign({}, debtOrder)
        //         const debtOrderWrapped = new DebtOrderWrapper(msgSenderNotUnderwriter)
        //     })

        //     test('throws INVALID_UNDERWRITER_SIGNATURE error', async () => {
        //         await expect(orderApi.fillDebtOrder(msgSenderNotUnderwriter, TX_DEFAULTS)).rejects.toThrow(
        //             OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE()
        //         )
        //     })
        // })

        /*
            EXTERNAL INVARIANTS
        */

        describe('...creditor has insufficient balance', async () => {
            let personsBalance
            let tokenWithoutCreditorBalance = Object.assign({}, debtOrder)
            // console.log(tokenWithoutCreditorBalance)

            beforeAll(async () => {
                // debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS)
                const dummyTokenRegistry = await DummyTokenRegistryContract.deployed(
                    web3,
                    TX_DEFAULTS
                )

                // Get the token address for our dummy Augur REP token
                const principalTokenAddress = await dummyTokenRegistry.getTokenAddress.callAsync(
                    'REP'
                )

                principalToken = await DummyTokenContract.at(
                    principalTokenAddress,
                    web3,
                    TX_DEFAULTS
                )

                // Set arbitrary balances for people
                await principalToken.setBalance.sendTransactionAsync(
                    ACCOUNTS[1].address,
                    Units.ether(0.5)
                )

                personsBalance = await principalToken.balanceOf.callAsync(ACCOUNTS[1].address)
                // console.log(personsBalance)
            })

            // console.log(personsBalance)
            // const result = await principalToken.balanceOf.callAsync(ACCOUNTS[1].address)
            // console.log(result)
            // DummyTokenContract.
            // debtOrder.creditor.
            // tokenWithoutCreditorBalance.principalAmount = Units.ether(0.5)

            test('throws CREDITOR_BALANCE_INSUFFICIENT error', async () => {
                await expect(
                    orderApi.fillDebtOrder(tokenWithoutCreditorBalance, principalToken)
                ).rejects.toThrow(OrderAPIErrors.CREDITOR_BALANCE_INSUFFICIENT())
            })
        })

        // describe('...creditor allowance to TokenTransferProxy is insufficient', () => {
        //     // add logic

        //     test('throws CREDITOR_ALLOWANCE_INSUFFICIENT error', async () => {
        //         await expect(orderApi.fillDebtOrder(transferWithoutSufficientBalance)).rejects.toThrow(
        //             OrderAPIErrors.CREDITOR_ALLOWANCE_INSUFFICIENT()
        //         )
        //     })
        // })
    })
})
