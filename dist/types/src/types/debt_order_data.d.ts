import { BigNumber } from "../../utils/bignumber";
import { ECDSASignature } from "./ecdsa_signature";
export declare const DEBT_ORDER_DATA_DEFAULTS: {
    kernelVersion: string;
    issuanceVersion: string;
    principalAmount: BigNumber;
    principalToken: string;
    debtor: string;
    debtorFee: BigNumber;
    creditor: string;
    creditorFee: BigNumber;
    relayer: string;
    relayerFee: BigNumber;
    underwriter: string;
    underwriterFee: BigNumber;
    underwriterRiskRating: BigNumber;
    termsContract: string;
    termsContractParameters: string;
    expirationTimestampInSec: BigNumber;
    salt: BigNumber;
    debtorSignature: {
        r: string;
        s: string;
        v: number;
    };
    creditorSignature: {
        r: string;
        s: string;
        v: number;
    };
    underwriterSignature: {
        r: string;
        s: string;
        v: number;
    };
};
export interface DebtOrderData {
    kernelVersion?: string;
    issuanceVersion?: string;
    principalAmount?: BigNumber;
    principalToken?: string;
    debtor?: string;
    debtorFee?: BigNumber;
    creditor?: string;
    creditorFee?: BigNumber;
    relayer?: string;
    relayerFee?: BigNumber;
    underwriter?: string;
    underwriterFee?: BigNumber;
    underwriterRiskRating?: BigNumber;
    termsContract?: string;
    termsContractParameters?: string;
    expirationTimestampInSec?: BigNumber;
    salt?: BigNumber;
    debtorSignature?: ECDSASignature;
    creditorSignature?: ECDSASignature;
    underwriterSignature?: ECDSASignature;
}
