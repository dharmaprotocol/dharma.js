import Web3 from 'web3'
import { DebtOrder, TxData } from '../types'
import { BigNumber } from 'bignumber.js'
import { NULL_ADDRESS } from 'utils/constants'
import {
    DebtTokenContract,
    DebtOrderWrapper,
    DebtKernelContract,
    DummyTokenContract,
    DummyTokenRegistryContract
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
        debtOrder: DebtOrder,
        debtToken: DebtTokenContract,
        errorMessage: string
    ) {
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)

        const getOwnerAddress = await debtToken.ownerOf.callAsync(
            new BigNumber(debtOrderWrapped.getIssuanceCommitmentHash())
        )
        if (getOwnerAddress !== NULL_ADDRESS) {
            throw new Error(errorMessage)
        }
    }

    // Debt order cannot have been cancelled
    public async debtOrderNotCancelled(
        debtOrder: DebtOrder,
        debtKernel: DebtKernelContract,
        errorMessage: string
    ) {
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)
        if (
            await debtKernel.debtOrderCancelled.callAsync(
                debtOrderWrapped.getDebtorCommitmentHash()
            )
        ) {
            throw new Error(errorMessage)
        }
    }

    // Issuance cannot have been cancelled
    public async issuanceNotCancelled(
        debtOrder: DebtOrder,
        debtKernel: DebtKernelContract,
        errorMessage: string
    ) {
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)
        if (
            await debtKernel.issuanceCancelled.callAsync(
                debtOrderWrapped.getIssuanceCommitmentHash()
            )
        ) {
            throw new Error(errorMessage)
        }
    }

    /*
        Consensuality Invariants
    */

    // If message sender not debtor, debtor signature must be valid
    public validDebtorSignature(debtOrder: DebtOrder, errorMessage: string, options?: TxData) {
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)
        if (options.from !== debtOrder.debtor) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrderWrapped.getDebtorCommitmentHash(),
                    debtOrder.debtorSignature,
                    debtOrder.debtor
                )
            ) {
                throw new Error(errorMessage)
            }
        }
    }

    // If message sender not creditor, creditor signature must be valid
    public validCreditorSignature(debtOrder: DebtOrder, errorMessage: string, options?: TxData) {
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)
        if (options.from !== debtOrder.creditor) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrderWrapped.getCreditorCommitmentHash(),
                    debtOrder.creditorSignature,
                    debtOrder.creditor
                )
            ) {
                throw new Error(errorMessage)
            }
        }
    }

    // If message sender not underwriter AND underwriter exists, underwriter signature must be valid
    public validUnderwriterSignature(debtOrder: DebtOrder, errorMessage: string, options?: TxData) {
        const debtOrderWrapped = new DebtOrderWrapper(debtOrder)
        if (options.from !== debtOrder.underwriter) {
            if (
                !signatureUtils.isValidSignature(
                    debtOrderWrapped.getUnderwriterCommitmentHash(),
                    debtOrder.underwriterSignature,
                    debtOrder.underwriter
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
        principalToken: DummyTokenContract,
        errorMessage: string
    ) {
        const creditorBalance = await principalToken.balanceOf.callAsync(debtOrder.issuanceVersion)
        if (creditorBalance.lt(debtOrder.principalAmount.add(debtOrder.creditorFee))) {
            throw new Error(errorMessage)
        }
    }

    // Creditor Allowance to TokenTransferProxy >= principal + creditorFee
    public async sufficientCreditorAllowance(
        debtOrder: DebtOrder,
        principalToken: DummyTokenContract,
        debtKernel: DebtKernelContract,
        errorMessage: string
    ) {
        const tokenTransferProxy = await debtKernel.TOKEN_TRANSFER_PROXY.callAsync()
        const creditorAllowance = await principalToken.allowance.callAsync(
            debtOrder.creditor,
            tokenTransferProxy
        )
        if (creditorAllowance.lt(debtOrder.principalAmount.add(debtOrder.creditorFee))) {
            throw new Error(errorMessage)
        }
    }
}
