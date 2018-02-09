import { BigNumber } from "utils/bignumber";
import { ECDSASignature } from "./ecdsa_signature";

export interface DebtOrder {
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

    // Signatures
    debtorSignature?: ECDSASignature;
    creditorSignature?: ECDSASignature;
    underwriterSignature?: ECDSASignature;
}
