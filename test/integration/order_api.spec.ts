import { BigNumber } from 'bignumber.js'
import { OrderAPI, OrderAPIErrors } from 'src/apis/order_api'
import { SignerAPI } from 'src/apis/signer_api'
import moment from 'moment'
import * as Units from 'utils/units'
import Web3 from 'web3'
import ABIDecoder from 'abi-decoder'
import { ECDSASignature, DebtOrder } from '../../src/types'
import { signatureUtils } from 'utils/signature_utils'
import * as crypto from 'crypto'
import ethUtil from 'ethereumjs-util'

import {
    DummyTokenContract,
    DummyTokenRegistryContract,
    DebtKernelContract,
    DebtOrderWrapper,
    DebtTokenContract
} from 'src/wrappers'

import { ACCOUNTS, NULL_ADDRESS } from '../accounts'

const generateSalt = () => {
    const saltBuffer = crypto.randomBytes(32)
    const saltBufferHex = ethUtil.bufferToHex(saltBuffer)
    return new BigNumber(saltBufferHex)
}

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const orderApi = new OrderAPI(web3)
const orderSigner = new SignerAPI(web3)

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
    termsContractParameters: web3.sha3('bytes32proxy'),
    expirationTimestampInSec: new BigNumber(
        moment()
            .add(7, 'days')
            .unix()
    ),
    salt: new BigNumber(0)
} as DebtOrder

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 }

describe('Order API (Integration Tests)', () => {
    let principalToken: DummyTokenContract
    let debtWrapper: DebtOrderWrapper
    let debtKernel: DebtKernelContract

    // Example of how to initialize new tokens
    beforeAll(async () => {
        debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS)
        debtOrder.kernelVersion = debtKernel.address
        const dummyTokenRegistry = await DummyTokenRegistryContract.deployed(web3, TX_DEFAULTS)

        debtOrder.salt = generateSalt()
        const debtorSignature = await orderSigner.asDebtor(debtOrder)
        debtOrder.debtorSignature = debtorSignature
        const creditorSignature = await orderSigner.asCreditor(debtOrder)
        debtOrder.creditorSignature = creditorSignature
        const underWriterSignature = await orderSigner.asUnderwriter(debtOrder)
        debtOrder.underwriterSignature = underWriterSignature

        // // Get the token address for our dummy Augur REP token
        const principalTokenAddress = await dummyTokenRegistry.getTokenAddress.callAsync('REP')
        principalToken = await DummyTokenContract.at(principalTokenAddress, web3, TX_DEFAULTS)

        // // Set arbitrary balances for people
        await principalToken.setBalance.sendTransactionAsync(ACCOUNTS[1].address, Units.ether(2))
        await principalToken.balanceOf.callAsync(ACCOUNTS[1].address)
    })

    test('base case', async () => {
        await principalToken.setBalance.sendTransactionAsync(ACCOUNTS[1].address, Units.ether(5))

        const tokenTransferProxy = await debtKernel.TOKEN_TRANSFER_PROXY.callAsync()
        const result = await principalToken.approve.sendTransactionAsync(
            tokenTransferProxy,
            Units.ether(2),
            { from: debtOrder.creditor }
        )

        const test = await orderApi.fillDebtOrder(debtOrder, principalToken, TX_DEFAULTS)
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

    describe('...order cannot have been cancelled', async () => {
        let toCancelDebtOrder
        let logEvent

        beforeAll(async () => {
            toCancelDebtOrder = Object.assign({}, debtOrder)
            const debtOrderWrapped = new DebtOrderWrapper(toCancelDebtOrder)

            await principalToken.setBalance.sendTransactionAsync(
                ACCOUNTS[1].address,
                Units.ether(5)
            )
            const tokenTransferProxy = await debtKernel.TOKEN_TRANSFER_PROXY.callAsync()
            await principalToken.approve.sendTransactionAsync(tokenTransferProxy, Units.ether(2), {
                from: debtOrder.creditor
            })

            const result = await debtKernel.cancelDebtOrder.sendTransactionAsync(
                debtOrderWrapped.getOrderAddresses(),
                debtOrderWrapped.getOrderValues(),
                debtOrderWrapped.getOrderBytes32(),
                { from: debtOrder.debtor }
            )
            // ABIDecoder.addABI(debtKernel.web3ContractInstance.abi)
            // const receipt = await web3.eth.getTransactionReceipt(result)
            // const [log] = ABIDecoder.decodeLogs(receipt.logs)
            // // console.log(log.events[0]);
            // // console.log(log.events[1]);
            // logEvent = log.events[1]
        })

        test('throws DEBT_ORDER_CANCELLED', async () => {
            await expect(
                orderApi.fillDebtOrder(toCancelDebtOrder, principalToken, TX_DEFAULTS)
            ).rejects.toThrow(OrderAPIErrors.ORDER_CANCELLED())
        })
    })

    describe('...order cannot have already been issued', () => {
        let issuedDebt

        beforeAll(async () => {
            issuedDebt = Object.assign({}, debtOrder)
            const debtOrderWrapped = new DebtOrderWrapper(issuedDebt)

            const debtorSignature = await orderSigner.asDebtor(debtOrder)
            debtOrder.debtorSignature = debtorSignature

            await debtKernel.fillDebtOrder.sendTransactionAsync(
                debtOrderWrapped.getCreditor(),
                debtOrderWrapped.getOrderAddresses(),
                debtOrderWrapped.getOrderValues(),
                debtOrderWrapped.getOrderBytes32(),
                debtOrderWrapped.getSignaturesV(),
                debtOrderWrapped.getSignaturesR(),
                debtOrderWrapped.getSignaturesS()
            )
        })

        test('throws DEBT_ORDER_ALREADY_ISSUED', async () => {
            await expect(
                orderApi.fillDebtOrder(issuedDebt, principalToken, TX_DEFAULTS)
            ).rejects.toThrow(OrderAPIErrors.DEBT_ORDER_ALREADY_ISSUED())
        })
    })

    describe('...issuance cannot have already been cancelled', async () => {
        let toCancelIssuance
        let logEvent

        beforeAll(async () => {
            debtOrder.salt = generateSalt()
            const signature = await orderSigner.asDebtor(debtOrder)
            debtOrder.debtorSignature = signature
            toCancelIssuance = Object.assign({}, debtOrder)

            const debtOrderWrapped = new DebtOrderWrapper(toCancelIssuance)

            const creditorSignature = await orderSigner.asCreditor(debtOrder)
            debtOrder.creditorSignature = creditorSignature

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
        })

        test('throws ISSUANCE_CANCELLED', async () => {
            await expect(
                orderApi.fillDebtOrder(toCancelIssuance, principalToken, TX_DEFAULTS)
            ).rejects.toThrow(OrderAPIErrors.ISSUANCE_CANCELLED())
        })
    })

    /*
        CONSENSUALITY INVARIANTS
    */

    describe('...if message sender not debtor, debtor signature must be valid', async () => {
        let msgSenderNotDebtor
        let debtOrderWrapped

        beforeAll(async () => {
            msgSenderNotDebtor = Object.assign({}, debtOrder)
            debtOrderWrapped = new DebtOrderWrapper(msgSenderNotDebtor)
        })

        const misSignature = await orderSigner.asCreditor(debtOrder)
        debtOrder.debtorSignature = misSignature
        msgSenderNotDebtor = Object.assign({}, debtOrder)

        test('throws INVALID_DEBTOR_SIGNATURE error', async () => {
            const result = await expect(
                orderApi.fillDebtOrder(msgSenderNotDebtor, principalToken, TX_DEFAULTS)
            ).rejects.toThrow(OrderAPIErrors.INVALID_DEBTOR_SIGNATURE())
        })
    })

    describe('...if message sender not creditor, creditor signature must be valid', async () => {
        let msgSenderNotCreditor
        let debtOrderWrapped

        beforeAll(async () => {
            debtOrderWrapped = new DebtOrderWrapper(msgSenderNotCreditor)
        })

        const misSignature = await orderSigner.asDebtor(debtOrder)
        debtOrder.creditorSignature = misSignature
        msgSenderNotCreditor = Object.assign({}, debtOrder)

        test('throws INVALID_CREDITOR_SIGNATURE error', async () => {
            await expect(
                orderApi.fillDebtOrder(msgSenderNotCreditor, debtOrderWrapped, TX_DEFAULTS)
            ).rejects.toThrow(OrderAPIErrors.INVALID_CREDITOR_SIGNATURE())
        })
    })

    describe('...if message sender not underwriter, underwriter signature must be valid', async () => {
        let msgSenderNotUnderwriter
        let debtOrderWrapped

        beforeAll(async () => {
            const debtOrderWrapped = new DebtOrderWrapper(msgSenderNotUnderwriter)
        })

        const misSignature = await orderSigner.asDebtor(debtOrder)
        debtOrder.underwriterSignature = misSignature
        msgSenderNotUnderwriter = Object.assign({}, debtOrder)

        test('throws INVALID_UNDERWRITER_SIGNATURE error', async () => {
            await expect(
                orderApi.fillDebtOrder(msgSenderNotUnderwriter, debtOrderWrapped, TX_DEFAULTS)
            ).rejects.toThrow(OrderAPIErrors.INVALID_UNDERWRITER_SIGNATURE())
        })
    })

    /*
        EXTERNAL INVARIANTS
    */

    describe('...creditor has insufficient balance', async () => {
        let tokenWithoutCreditorBalance = Object.assign({}, debtOrder)

        beforeAll(async () => {
            const result = await principalToken.setBalance.sendTransactionAsync(
                ACCOUNTS[1].address,
                Units.ether(0.5)
            )
            const personsBalance = await principalToken.balanceOf.callAsync(ACCOUNTS[1].address)
        })

        const signature = await orderSigner.asDebtor(debtOrder)
        tokenWithoutCreditorBalance.debtorSignature = signature

        test('throws CREDITOR_BALANCE_INSUFFICIENT error', async () => {
            await expect(
                orderApi.fillDebtOrder(tokenWithoutCreditorBalance, principalToken, TX_DEFAULTS)
            ).rejects.toThrow(OrderAPIErrors.CREDITOR_BALANCE_INSUFFICIENT())
        })
    })

    describe('...creditor allowance to TokenTransferProxy is insufficient', () => {
        let tokenWithoutCreditorsAllowance = Object.assign({}, debtOrder)

        beforeAll(async () => {
            await principalToken.setBalance.sendTransactionAsync(
                ACCOUNTS[1].address,
                Units.ether(5)
            )
            const tokenTransferProxy = await debtKernel.TOKEN_TRANSFER_PROXY.callAsync()
            const result = await principalToken.approve.sendTransactionAsync(
                tokenTransferProxy,
                Units.ether(0.2),
                { from: debtOrder.creditor }
            )
        })

        test('throws CREDITOR_ALLOWANCE_INSUFFICIENT error', async () => {
            await expect(
                orderApi.fillDebtOrder(tokenWithoutCreditorsAllowance, principalToken)
            ).rejects.toThrow(OrderAPIErrors.CREDITOR_ALLOWANCE_INSUFFICIENT())
        })
    })
})
