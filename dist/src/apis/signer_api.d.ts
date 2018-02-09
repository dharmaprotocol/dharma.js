import Web3 from "web3";
import { ECDSASignature, DebtOrder } from "../types";
export declare const SignerAPIErrors: {
    INVALID_SIGNING_KEY: (unavailableKey: string) => any;
};
export declare class SignerAPI {
    private web3;
    private assert;
    constructor(web3: Web3);
    /**
     * Given a debt order, produce ECDSA signature of the debtor commitment hash using the debtor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the debtor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    asDebtor(debtOrder: DebtOrder): Promise<ECDSASignature>;
    /**
     * Given a debt order, produce ECDSA signature of the creditor commitment hash using the creditor's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the creditor's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    asCreditor(debtOrder: DebtOrder): Promise<ECDSASignature>;
    /**
     * Given a debt order, produce ECDSA signature of the underwriter commitment hash using the underwriter's
     * private key.  If current web3 provider is unable to produce a cryptographic signature using
     * the underwriter's private key (for instance, if the account is not unlocked in Geth / Parity), it
     * throws.
     *
     * @param debtOrder The debt order for which we desire a signature
     * @return The ECDSA signature of the debt order's debtor commitment hash
     */
    asUnderwriter(debtOrder: DebtOrder): Promise<ECDSASignature>;
    /**
     * Generic internal function for producing an ECDSA signature for a given payload from
     * a given address.
     *
     * @param payload The payload we wish to sign
     * @param address The address with which we wish to sign it
     * @return The ECDSA signature of the payload as signed by the address
     */
    private signPayloadWithAddress(payload, address);
}
