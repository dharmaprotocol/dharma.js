"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
/*
 * Ver batim copied, with slight modifications, from the wonderful 0x.js project codebase:
 * https://github.com/0xProject/0x.js
 */
var SignatureUtils = /** @class */ (function () {
    function SignatureUtils() {
    }
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
    SignatureUtils.isValidSignature = function (data, signature, signerAddress, addPersonalMessagePrefix) {
        if (addPersonalMessagePrefix === void 0) { addPersonalMessagePrefix = true; }
        var messageHash = data;
        if (addPersonalMessagePrefix) {
            messageHash = SignatureUtils.addPersonalMessagePrefix(messageHash);
        }
        var messageHashBuff = ethUtil.toBuffer(messageHash);
        try {
            var pubKey = ethUtil.ecrecover(messageHashBuff, signature.v, ethUtil.toBuffer(signature.r), ethUtil.toBuffer(signature.s));
            var retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey));
            return retrievedAddress === signerAddress;
        }
        catch (err) {
            return false;
        }
    };
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
    SignatureUtils.addPersonalMessagePrefix = function (messageHashHex) {
        var messageHashBuffer = ethUtil.toBuffer(messageHashHex);
        var prefixedMessageHashBuffer = ethUtil.hashPersonalMessage(messageHashBuffer);
        return ethUtil.bufferToHex(prefixedMessageHashBuffer);
    };
    SignatureUtils.parseSignatureHexAsVRS = function (signatureHex) {
        var signatureBuffer = ethUtil.toBuffer(signatureHex);
        var v = signatureBuffer[0];
        if (v < 27) {
            v += 27;
        }
        var r = signatureBuffer.slice(1, 33);
        var s = signatureBuffer.slice(33, 65);
        var ECDSASignature = {
            v: v,
            r: ethUtil.bufferToHex(r),
            s: ethUtil.bufferToHex(s),
        };
        return ECDSASignature;
    };
    SignatureUtils.parseSignatureHexAsRSV = function (signatureHex) {
        var _a = ethUtil.fromRpcSig(signatureHex), v = _a.v, r = _a.r, s = _a.s;
        var ECDSASignature = {
            v: v,
            r: ethUtil.bufferToHex(r),
            s: ethUtil.bufferToHex(s),
        };
        return ECDSASignature;
    };
    SignatureUtils.convertToHexRSV = function (signature) {
        var r = signature.r, s = signature.s, v = signature.v;
        return ["0x", r, s, v.toString(16)].join("");
    };
    SignatureUtils.convertToHexVRS = function (signature) {
        var v = signature.v, r = signature.r, s = signature.s;
        return ["0x", v.toString(16), r, s].join("");
    };
    return SignatureUtils;
}());
exports.SignatureUtils = SignatureUtils;
//# sourceMappingURL=signature_utils.js.map