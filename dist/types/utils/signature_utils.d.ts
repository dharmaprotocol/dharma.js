import { ECDSASignature } from "../src/types";
export declare class SignatureUtils {
    /**
     * Given a data payload, signature, and a signer's address, returns true
     * if the given signature is valid.
     *
     * @param data                     Data payload
     * @param signature                Signature
     * @param signerAddress            The Signer's address
     * @param addPersonalMessagePrefix In certain circumstances, the `eth_sign`
     *      API adds an Ethereum-specific prefix to message payloads.  This option
     *      specifies whether, in the `isValidSignature`, we want to add the
     *      Ethereum-specifc prefix to the message payload.
     * @return Whether or not the signature is valid.
     */
    static isValidSignature(data: string, signature: ECDSASignature, signerAddress: string, addPersonalMessagePrefix?: boolean): boolean;
    /**
     * Applies an Ethereum-specific prefix to the message payload we intend on signing,
     * as per the `eth_sign` specification in the JSON-RPC wiki:
     *
     * https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
     *
     * This must *sometimes* be manually done by our libraries because certain signing
     * clients (e.g. Metamask) do not adhere to the `eth_sign` specification described
     * above.
     *
     * @param messageHashHex The raw hex message payload
     * @return Message hashed as per how certain clients (i.e. Metamask)
     *  expect to ingest messages in `eth_sign`
     */
    static addPersonalMessagePrefix(messageHashHex: string): string;
    static parseSignatureHexAsVRS(signatureHex: string): ECDSASignature;
    static parseSignatureHexAsRSV(signatureHex: string): ECDSASignature;
    static convertToHexRSV(signature: ECDSASignature): string;
    static convertToHexVRS(signature: ECDSASignature): string;
}
