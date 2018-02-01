import Web3 from 'web3'
import { DebtOrder, TxData } from '../types'
import { BigNumber } from 'bignumber.js'
import { NULL_ADDRESS } from 'utils/constants'
import {
    DebtTokenContract,
    DebtOrderWrapper,
    DebtKernelContract,
    DummyTokenContract
} from 'src/wrappers'
import { signatureUtils } from 'utils/signature_utils'
import ABIDecoder from 'abi-decoder'

export class OrderAssertions {
    private web3: Web3

    public constructor(web3: Web3) {
        this.web3 = web3
    }

    /*
        Validity Invariants
    */

    // principal > debtor fee
    public validDebtorFee(debtOrder: DebtOrder, errorMessage: string) {
        if (debtOrder.principalAmount.lt(debtOrder.debtorFee)) {
            throw new Error(errorMessage)
        }
    }

    // If no underwriter is specified, underwriter fees must be 0
    public validUnderwriterFee(debtOrder: DebtOrder, errorMessage: string) {
        if (debtOrder.underwriter === undefined && debtOrder.underwriterFee.gt(0)) {
            throw new Error(errorMessage)
        }
    }

    // If no relayer is specified, relayer fees must be 0
    public validRelayerFee(debtOrder: DebtOrder, errorMessage: string) {
        if (debtOrder.relayer === undefined && debtOrder.relayerFee.gt(0)) {
            throw new Error(errorMessage)
        }
    }

    // creditorFee + debtorFee == relayerFee + underwriterFee
    public validFees(debtOrder: DebtOrder, errorMessage: string) {
        const totalFees = debtOrder.creditorFee.add(debtOrder.debtorFee)
        const otherFees = debtOrder.relayerFee.add(debtOrder.underwriterFee)
        if (!totalFees.eq(debtOrder.relayerFee.add(debtOrder.underwriterFee))) {
            throw new Error(errorMessage)
        }
    }

    // Debt order must not be expired
    // TODO: change to timestamp
    public notExpired(debtOrder: DebtOrder, errorMessage: string) {
        if (debtOrder.expirationTimestampInSec.eq(0)) {
            throw new Error(errorMessage)
        }
    }

    // Debt cannot already have been issued
    public async notAlreadyIssued(
        debtToken: DebtTokenContract,
        debtOrderWrapper: DebtOrderWrapper,
        errorMessage: string
    ) {
        const getOwnerAddress = await debtToken.ownerOf.callAsync(
            new BigNumber(debtOrderWrapper.getIssuanceCommitmentHash())
        )
        if (getOwnerAddress !== NULL_ADDRESS) {
            throw new Error(errorMessage)
        }
    }

    // // TODO: Fix error on debt order cancellation commitment hash
    // // Debt order cannot have been cancelled
    // public async debtOrderNotCancelled(debtKernel: DebtKernelContract, debtOrderWrapped: DebtOrderWrapper, errorMessage: string) {
    //     if (await debtKernel.debtOrderCancelled.callAsync(debtOrderWrapped.getDebtorCommitmentHash())
    //     {
    //         throw new Error(errorMessage)
    //     }
    // }
    // // Issuance cannot have been cancelled
    // public async issuanceNotCancelled(debtKernel: DebtKernelContract, debtOrderWrapped: DebtOrderWrapper, errorMessage: string) {
    //     // const debtOrderWrapped = new DebtOrderWrapper(debtOrder)
    //     if (await debtKernel.issuanceCancelled.callAsync(debtOrderWrapped.getIssuanceCommitmentHash())) {
    //         throw new Error(errorMessage)
    //     }
    // }

    /*
        Consensuality Invariants
    */

    // If message sender not debtor, debtor signature must be valid
    public validDebtorSignature(debtOrder: DebtOrder, errorMessage: string, options?: TxData) {
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)
        if (options.from !== debtOrder.debtor) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrder.debtor,
                    debtOrder.debtorSignature,
                    debtOrderWrapped.getDebtorCommitmentHash()
                )
            ) {
                throw new Error(errorMessage)
            }
        }
    }

    // If message sender not creditor, creditor signature must be valid
    public validCreditorSignature(
        debtOrder: DebtOrder,
        debtOrderWrapped: DebtOrderWrapper,
        errorMessage: string,
        options?: TxData
    ) {
        console.log(options.from)
        console.log(debtOrder.creditor)
        console.log(debtOrder.creditorSignature)
        console.log(debtOrderWrapped.getCreditorCommitmentHash())
        // console.log(debtOrder.debtorSignature)
        if (options.from !== debtOrder.creditor) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrder.creditor,
                    debtOrder.creditorSignature,
                    debtOrderWrapped.getCreditorCommitmentHash()
                )
            ) {
                throw new Error(errorMessage)
            }
        }
    }

    // If message sender not underwriter AND underwriter exists, underwriter signature must be valid
    public validUnderwriterSignature(
        debtOrder: DebtOrder,
        debtOrderWrapped: DebtOrderWrapper,
        options: TxData,
        errorMessage: string
    ) {
        if (options.from !== debtOrder.underwriter) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrder.underwriter,
                    debtOrder.underwriterSignature,
                    debtOrderWrapped.getUnderwriterCommitmentHash()
                )
            ) {
                throw new Error(errorMessage)
            }
        }
    }

    /*
        External invariants
    */

    // Creditor balance > principal + fee
    public async sufficientCreditorBalance(
        debtOrder: DebtOrder,
        dummyToken: DummyTokenContract,
        errorMessage: string
    ) {
        const creditorBalance = await dummyToken.balanceOf.callAsync(debtOrder.issuanceVersion)

        if (creditorBalance.lt(debtOrder.principalAmount.add(debtOrder.creditorFee))) {
            throw new Error(errorMessage)
        }
    }

    // // Creditor Allowance to TokenTransferProxy >= principal + creditorFee
    // public async sufficientCreditorAllowance(dummyToken: DummyTokenContract, debtKernel: DebtKernelContract, debtOrder: DebtOrder, errorMessage: string) {

    //     const temp = await debtKernel.TOKEN_TRANSFER_PROXY.callAsync()

    //     const tokenTransferProxy = await debtKernel.TOKEN_TRANSFER_PROXY

    //     const creditorAllowance = await dummyToken.allowance.callAsync(debtOrder.creditor)

    //     const totalCreditorPayment = debtOrder.principalAmount.add(debtOrder.creditorFee)

    //     const creditorBalance = dummyToken.balanceOf.callAsync(debtOrder.creditor)
    //     const creditor

    //     if(creditorAllowance.gte(debtOrder.principalAmount.add(debtOrder.creditorFee))) {
    //         throw new Error(errorMessage)
    //     }
    // }
}
