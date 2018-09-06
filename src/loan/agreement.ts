import {
    DebtOrderData,
    ECDSASignature,
    EthereumAddress,
    InterestRate,
    TimeInterval,
    TokenAmount,
} from "../types";

import { DebtOrderDataWrapper } from "../wrappers";

import { Dharma } from "../types/dharma";

export interface BaseLoanConstructorParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    expiresAt: number;
    relayer?: EthereumAddress;
    relayerFee?: TokenAmount;
    creditorFee?: TokenAmount;
    debtorFee?: TokenAmount;
}

export interface LoanData {
    kernelVersion: string;
    issuanceVersion: string;
    principalAmount: string;
    principalToken: string;
    debtor: string;
    debtorFee: string;
    creditor: string;
    creditorFee: string;
    relayer: string;
    relayerFee: string;
    underwriter: string;
    underwriterFee: string;
    underwriterRiskRating: string;
    termsContract: string;
    termsContractParameters: string;
    expirationTimestampInSec: string;
    salt: string;
    debtorSignature: ECDSASignature;
    creditorSignature: ECDSASignature;
    underwriterSignature: ECDSASignature;
}

export abstract class Agreement {
    protected constructor(
        public dharma: Dharma,
        public params: BaseLoanConstructorParams,
        public data: DebtOrderData,
    ) {}

    public getAgreementId(): string {
        return new DebtOrderDataWrapper(this.data).getIssuanceCommitmentHash();
    }

    public toJSON(): LoanData {
        return {
            kernelVersion: this.data.kernelVersion!,
            issuanceVersion: this.data.issuanceVersion!,
            principalAmount: this.data.principalAmount.toString(),
            principalToken: this.data.principalToken!,
            debtor: this.data.debtor!,
            debtorFee: this.data.debtorFee.toString(),
            creditor: this.data.creditor!,
            creditorFee: this.data.creditorFee.toString(),
            relayer: this.data.relayer!,
            relayerFee: this.data.relayerFee.toString(),
            underwriter: this.data.underwriter!,
            underwriterFee: this.data.underwriterFee.toString(),
            underwriterRiskRating: this.data.underwriterRiskRating.toString(),
            termsContract: this.data.termsContract!,
            termsContractParameters: this.data.termsContractParameters!,
            expirationTimestampInSec: this.data.expirationTimestampInSec.toString(),
            salt: this.data.salt.toString(),
            debtorSignature: this.data.debtorSignature!,
            creditorSignature: this.data.creditorSignature!,
            underwriterSignature: this.data.underwriterSignature!,
        };
    }
}
