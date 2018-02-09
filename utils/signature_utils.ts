import * as ethUtil from 'ethereumjs-util';

import { ECDSASignature } from '../src/types';

/*
 * Ver batim copied, with slight modifications, from the wonderful 0x.js project codebase:
 * https://github.com/0xProject/0x.js
 */

export const signatureUtils = {
    isValidSignature(data: string, signature: ECDSASignature, signerAddress: string): boolean {
        const dataBuff = ethUtil.toBuffer(data);
        const msgHashBuff = ethUtil.hashPersonalMessage(dataBuff);
        try {
            const pubKey = ethUtil.ecrecover(
                msgHashBuff,
                signature.v,
                ethUtil.toBuffer(signature.r),
                ethUtil.toBuffer(signature.s),
            );
            const retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey));
            return retrievedAddress === signerAddress;
        } catch (err) {
            return false;
        }
    },

    parseSignatureHexAsVRS(signatureHex: string): ECDSASignature {
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
    },

    parseSignatureHexAsRSV(signatureHex: string): ECDSASignature {
        const { v, r, s } = ethUtil.fromRpcSig(signatureHex);
        const ECDSASignature: ECDSASignature = {
            v,
            r: ethUtil.bufferToHex(r),
            s: ethUtil.bufferToHex(s),
        };
        return ECDSASignature;
    },

    convertToHexRSV(signature: ECDSASignature): string {
        const { r, s, v } = signature;
        return [
            "0x",
            r,
            s,
            v.toString(16),
        ].join("");
    },

    convertToHexVRS(signature: ECDSASignature): string {
        const { v, r, s } = signature;
        return [
            "0x",
            v.toString(16),
            r,
            s,
        ].join("");
    }
};
