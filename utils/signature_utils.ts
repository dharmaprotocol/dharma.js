import * as ethUtil from "ethereumjs-util";

import { ECDSASignature } from "../src/types";

/*
 * Ver batim copied, with slight modifications, from the wonderful 0x.js project codebase:
 * https://github.com/0xProject/0x.js
 */

export class SignatureUtils {
    public static isValidSignature(
        data: string,
        signature: ECDSASignature,
        signerAddress: string,
        addPersonalMessagePrefix: boolean = true,
    ): boolean {
        let messageHash = data;

        if (addPersonalMessagePrefix) {
            messageHash = SignatureUtils.addPersonalMessagePrefix(messageHash);
        }

        const messageHashBuff = ethUtil.toBuffer(messageHash);

        try {
            const pubKey = ethUtil.ecrecover(
                messageHashBuff,
                signature.v,
                ethUtil.toBuffer(signature.r),
                ethUtil.toBuffer(signature.s),
            );
            const retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey));
            return retrievedAddress === signerAddress;
        } catch (err) {
            return false;
        }
    }

    public static addPersonalMessagePrefix(messageHashHex: string): string {
        const messageHashBuffer = ethUtil.toBuffer(messageHashHex);
        const prefixedMessageHashBuffer = ethUtil.hashPersonalMessage(messageHashBuffer);

        return ethUtil.bufferToHex(prefixedMessageHashBuffer);
    }

    public static parseSignatureHexAsVRS(signatureHex: string): ECDSASignature {
        const signatureBuffer = ethUtil.toBuffer(signatureHex);
        let v = signatureBuffer[0];
        if (v < 27) {
            v += 27;
        }
        const r = signatureBuffer.slice(1, 33);
        const s = signatureBuffer.slice(33, 65);
        const ECDSASignature: ECDSASignature = {
            v,
            r: ethUtil.bufferToHex(r),
            s: ethUtil.bufferToHex(s),
        };
        return ECDSASignature;
    }

    public static parseSignatureHexAsRSV(signatureHex: string): ECDSASignature {
        const { v, r, s } = ethUtil.fromRpcSig(signatureHex);
        const ECDSASignature: ECDSASignature = {
            v,
            r: ethUtil.bufferToHex(r),
            s: ethUtil.bufferToHex(s),
        };
        return ECDSASignature;
    }

    public static convertToHexRSV(signature: ECDSASignature): string {
        const { r, s, v } = signature;
        return ["0x", r, s, v.toString(16)].join("");
    }

    public static convertToHexVRS(signature: ECDSASignature): string {
        const { v, r, s } = signature;
        return ["0x", v.toString(16), r, s].join("");
    }
}
