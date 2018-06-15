import * as Web3 from "web3";
import { DebtOrderData, ECDSASignature } from "../types";
import { ContractsAPI } from "./";
export declare const SignerAPIErrors: {
    INVALID_SIGNING_KEY: (unavailableKey: string) => any;
};
export declare class SignerAPI {
    private readonly web3;
    private readonly contracts;
    private assert;
    constructor(web3: Web3, contracts: ContractsAPI);
    /**
     * Given a debt order, produce ECDSA signature of the debtor commitment hash using the debtor's
     * private key. If current web3 provider is unable to produce a cryptographic signature using
     * the debtor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrderData The debt order for which we desire a signature
     * @param shouldAddPersonalMessagePrefix Certain clients (i.e. Metamask) expect
     *              the `eth_sign` payload they ingest to have already prepended a given
     *              message with the "Ethereum Signed Message:" prefix.
     *              Others (i.e. Geth, Parity, Ganache) modify the `eth_sign`
     *              payload on the user's behalf.  This parameter
     *              allows users to specify which behavior they prefer.
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    asDebtor(debtOrderData: DebtOrderData, shouldAddPersonalMessagePrefix: boolean): Promise<ECDSASignature>;
    /**
     * Given a debt order, produce ECDSA signature of the creditor commitment hash using the creditor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the creditor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrderData The debt order for which we desire a signature
     * @param shouldAddPersonalMessagePrefix Certain clients (i.e. Metamask) expect
     *              the `eth_sign` payload they ingest to have already prepended a given
     *              message with the "Ethereum Signed Message:" prefix.
     *              Others (i.e. Geth, Parity, Ganache) modify the `eth_sign`
     *              payload on the user's behalf.  This parameter
     *              allows users to specify which behavior they prefer.
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    asCreditor(debtOrderData: DebtOrderData, shouldAddPersonalMessagePrefix: boolean): Promise<ECDSASignature>;
    /**
     * Given a debt order, produce ECDSA signature of the underwriter commitment hash using the underwriter's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the underwriter's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrderData The debt order for which we desire a signature
     * @param shouldAddPersonalMessagePrefix Certain clients (i.e. Metamask) expect
     *              the `eth_sign` payload they ingest to have already prepended a given
     *              message with the "Ethereum Signed Message:" prefix.
     *              Others (i.e. Geth, Parity, Ganache) modify the `eth_sign`
     *              payload on the user's behalf.  This parameter
     *              allows users to specify which behavior they prefer.
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    asUnderwriter(debtOrderData: DebtOrderData, shouldAddPersonalMessagePrefix: boolean): Promise<ECDSASignature>;
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
    private signPayloadWithAddress(payload, address, shouldAddPersonalMessagePrefix);
}
