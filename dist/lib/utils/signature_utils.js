"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
/*
 * Ver batim copied, with slight modifications, from the wonderful 0x.js project codebase:
 * https://github.com/0xProject/0x.js
 */
exports.signatureUtils = {
    isValidSignature: function (data, signature, signerAddress) {
        var dataBuff = ethUtil.toBuffer(data);
        var msgHashBuff = ethUtil.hashPersonalMessage(dataBuff);
        try {
            var pubKey = ethUtil.ecrecover(msgHashBuff, signature.v, ethUtil.toBuffer(signature.r), ethUtil.toBuffer(signature.s));
            var retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey));
            return retrievedAddress === signerAddress;
        }
        catch (err) {
            return false;
        }
    },
    parseSignatureHexAsVRS: function (signatureHex) {
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
    },
    parseSignatureHexAsRSV: function (signatureHex) {
        var _a = ethUtil.fromRpcSig(signatureHex), v = _a.v, r = _a.r, s = _a.s;
        var ECDSASignature = {
            v: v,
            r: ethUtil.bufferToHex(r),
            s: ethUtil.bufferToHex(s),
        };
        return ECDSASignature;
    },
    convertToHexRSV: function (signature) {
        var r = signature.r, s = signature.s, v = signature.v;
        return [
            "0x",
            r,
            s,
            v.toString(16),
        ].join("");
    },
    convertToHexVRS: function (signature) {
        var v = signature.v, r = signature.r, s = signature.s;
        return [
            "0x",
            v.toString(16),
            r,
            s,
        ].join("");
    }
};
//# sourceMappingURL=signature_utils.js.map