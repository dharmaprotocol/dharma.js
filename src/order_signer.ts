import Web3 from 'web3'
import { ECDSASignature, DebtOrder } from './types'
import promisify from 'tiny-promisify'
import { DebtOrderWrapper } from 'src/wrappers/debt_order_wrapper'
import { signatureUtils } from 'utils/signature_utils'
import { Assertions } from './invariants'
import singleLineString from 'single-line-string'
import {
    WEB3_ERROR_INVALID_ADDRESS,
    WEB3_ERROR_ACCOUNT_NOT_FOUND,
    WEB3_ERROR_NO_PRIVATE_KEY
} from 'utils/constants'

export const OrderSignerErrors = {
    INVALID_SIGNING_KEY: (unavailableKey: string) =>
        singleLineString`Unable to sign debt order because private key
                         associated with ${unavailableKey} is invalid
                         or unavailable`
}

export class OrderSigner {
    private web3: Web3
    private assert: Assertions

    constructor(web3: Web3) {
        this.web3 = web3
        this.assert = new Assertions(this.web3)
    }

    /**
     * Given a debt order, produce ECDSA signature of the debtor commitment hash using the debtor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the debtor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    async asDebtor(debtOrder: DebtOrder): Promise<ECDSASignature> {
        const wrappedDebtOrder = new DebtOrderWrapper(debtOrder)

        return this.signPayloadWithAddress(
            wrappedDebtOrder.getDebtorCommitmentHash(),
            debtOrder.debtor
        )
    }

    /**
     * Given a debt order, produce ECDSA signature of the creditor commitment hash using the creditor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the creditor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    async asCreditor(debtOrder: DebtOrder): Promise<ECDSASignature> {
        const wrappedDebtOrder = new DebtOrderWrapper(debtOrder)

        return this.signPayloadWithAddress(
            wrappedDebtOrder.getCreditorCommitmentHash(),
            debtOrder.creditor
        )
    }

    /**
     * Given a debt order, produce ECDSA signature of the underwriter commitment hash using the underwriter's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the underwriter's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    async asUnderwriter(debtOrder: DebtOrder): Promise<ECDSASignature> {
        const wrappedDebtOrder = new DebtOrderWrapper(debtOrder)

        return this.signPayloadWithAddress(
            wrappedDebtOrder.getUnderwriterCommitmentHash(),
            debtOrder.underwriter
        )
    }

    /**
     * Generic internal function for producing an ECDSA signature for a given payload from
     * a given address.
     *
     * @param payload The payload we wish to sign
     * @param address The address with which we wish to sign it
     * @return The ECDSA signature of the payload as signed by the address
     */
    private async signPayloadWithAddress(
        payload: string,
        address: string
    ): Promise<ECDSASignature> {
        this.assert.account.notNull(address, OrderSignerErrors.INVALID_SIGNING_KEY(address))

        const signPromise = promisify(this.web3.eth.sign)

        try {
            const rawSignatureHex = await signPromise(address, payload, { from: address })

            return signatureUtils.parseSignatureHexAsRSV(rawSignatureHex)
        } catch (e) {
            if (
                e.message.includes(WEB3_ERROR_INVALID_ADDRESS) ||
                e.message.includes(WEB3_ERROR_ACCOUNT_NOT_FOUND) ||
                e.message.includes(WEB3_ERROR_NO_PRIVATE_KEY)
            ) {
                throw new Error(OrderSignerErrors.INVALID_SIGNING_KEY(address))
            } else {
                throw e
            }
        }
    }
}
