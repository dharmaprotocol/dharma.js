import { ECDSASignature } from 'src/types';
export declare const signatureUtils: {
    isValidSignature(data: string, signature: ECDSASignature, signerAddress: string): boolean;
    parseSignatureHexAsVRS(signatureHex: string): ECDSASignature;
    parseSignatureHexAsRSV(signatureHex: string): ECDSASignature;
    convertToHexRSV(signature: ECDSASignature): string;
    convertToHexVRS(signature: ECDSASignature): string;
};
