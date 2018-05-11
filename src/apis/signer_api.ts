// External libraries
import * as singleLineString from "single-line-string";
import * as promisify from "tiny-promisify";
import * as Web3 from "web3";

// Utils
import {
    WEB3_ERROR_ACCOUNT_NOT_FOUND,
    WEB3_ERROR_INVALID_ADDRESS,
    WEB3_ERROR_NO_PRIVATE_KEY,
} from "../../utils/constants";
import { SignatureUtils } from "../../utils/signature_utils";
import { TransactionUtils } from "../../utils/transaction_utils";

// Invariants
import { Assertions } from "../invariants";

// Types
import { DebtOrder, ECDSASignature } from "../types";

// Wrappers
import { DebtOrderWrapper } from "../wrappers/debt_order_wrapper";

import { ContractsAPI } from "./";

import applyNetworkDefaults = TransactionUtils.applyNetworkDefaults;

export const SignerAPIErrors = {
    INVALID_SIGNING_KEY: (unavailableKey: string) =>
        singleLineString`Unable to sign debt order because private key
                         associated with ${unavailableKey} is invalid
                         or unavailable`,
};

export class SignerAPI {
    private readonly web3: Web3;
    private readonly contracts: ContractsAPI;
    private assert: Assertions;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new Assertions(this.web3, this.contracts);
    }

    /**
     * Given a debt order, produce ECDSA signature of the debtor commitment hash using the debtor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the debtor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @param shouldAddPersonalMessagePrefix Certain clients (i.e. Metamask) expect
     *              the `eth_sign` payload they ingest to have already prepended a given
     *              message with the "Ethereum Signed Message:" prefix.
     *              Others (i.e. Geth, Parity, Ganache) modify the `eth_sign`
     *              payload on the user's behalf.  This parameter
     *              allows users to specify which behavior they prefer.
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    public async asDebtor(
        debtOrder: DebtOrder,
        shouldAddPersonalMessagePrefix: boolean,
    ): Promise<ECDSASignature> {
        this.assert.schema.debtOrderWithTermsAndDebtorSpecified("debtOrder", debtOrder);

        debtOrder = await applyNetworkDefaults(debtOrder, this.contracts);

        const wrappedDebtOrder = new DebtOrderWrapper(debtOrder);

        return this.signPayloadWithAddress(
            wrappedDebtOrder.getDebtorCommitmentHash(),
            debtOrder.debtor,
            shouldAddPersonalMessagePrefix,
        );
    }

    /**
     * Given a debt order, produce ECDSA signature of the creditor commitment hash using the creditor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the creditor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @param shouldAddPersonalMessagePrefix Certain clients (i.e. Metamask) expect
     *              the `eth_sign` payload they ingest to have already prepended a given
     *              message with the "Ethereum Signed Message:" prefix.
     *              Others (i.e. Geth, Parity, Ganache) modify the `eth_sign`
     *              payload on the user's behalf.  This parameter
     *              allows users to specify which behavior they prefer.
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    public async asCreditor(
        debtOrder: DebtOrder,
        shouldAddPersonalMessagePrefix: boolean,
    ): Promise<ECDSASignature> {
        this.assert.schema.debtOrderWithTermsDebtorAndCreditorSpecified("debtOrder", debtOrder);

        debtOrder = await applyNetworkDefaults(debtOrder, this.contracts);

        const wrappedDebtOrder = new DebtOrderWrapper(debtOrder);

        return this.signPayloadWithAddress(
            wrappedDebtOrder.getCreditorCommitmentHash(),
            debtOrder.creditor,
            shouldAddPersonalMessagePrefix,
        );
    }

    /**
     * Given a debt order, produce ECDSA signature of the underwriter commitment hash using the underwriter's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the underwriter's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @param shouldAddPersonalMessagePrefix Certain clients (i.e. Metamask) expect
     *              the `eth_sign` payload they ingest to have already prepended a given
     *              message with the "Ethereum Signed Message:" prefix.
     *              Others (i.e. Geth, Parity, Ganache) modify the `eth_sign`
     *              payload on the user's behalf.  This parameter
     *              allows users to specify which behavior they prefer.
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    public async asUnderwriter(
        debtOrder: DebtOrder,
        shouldAddPersonalMessagePrefix: boolean,
    ): Promise<ECDSASignature> {
        this.assert.schema.debtOrderWithTermsAndDebtorSpecified("debtOrder", debtOrder);

        debtOrder = await applyNetworkDefaults(debtOrder, this.contracts);

        const wrappedDebtOrder = new DebtOrderWrapper(debtOrder);

        return this.signPayloadWithAddress(
            wrappedDebtOrder.getUnderwriterCommitmentHash(),
            debtOrder.underwriter,
            shouldAddPersonalMessagePrefix,
        );
    }

    /**
     * Generic internal function for producing an ECDSA signature for a given payload from
     * a given address.
     *
     * @param payload The payload we wish to sign
     * @param address The address with which we wish to sign it
     * @param shouldAddPersonalMessagePrefix Certain clients (i.e. Metamask) expect
     *              the `eth_sign` payload they ingest to have already prepended a given
     *              message with the "Ethereum Signed Message:" prefix.
     *              Others (i.e. Geth, Parity, Ganache) modify the `eth_sign`
     *              payload on the user's behalf.  This parameter
     *              allows users to specify which behavior they prefer.
     * @return The ECDSA signature of the payload as signed by the address
     */
    private async signPayloadWithAddress(
        payload: string,
        address: string,
        shouldAddPersonalMessagePrefix: boolean,
    ): Promise<ECDSASignature> {
        this.assert.account.notNull(address, SignerAPIErrors.INVALID_SIGNING_KEY(address));

        const signPromise = promisify(this.web3.eth.sign);

        if (shouldAddPersonalMessagePrefix) {
            payload = SignatureUtils.addPersonalMessagePrefix(payload);
        }

        try {
            const rawSignatureHex = await signPromise(address, payload, { from: address });

            return SignatureUtils.parseSignatureHexAsRSV(rawSignatureHex);
        } catch (e) {
            if (
                e.message.includes(WEB3_ERROR_INVALID_ADDRESS) ||
                e.message.includes(WEB3_ERROR_ACCOUNT_NOT_FOUND) ||
                e.message.includes(WEB3_ERROR_NO_PRIVATE_KEY)
            ) {
                throw new Error(SignerAPIErrors.INVALID_SIGNING_KEY(address));
            } else {
                throw e;
            }
        }
    }
}
