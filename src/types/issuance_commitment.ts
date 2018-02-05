import { BigNumber } from "bignumber.js";

export interface IssuanceCommitment {
    issuanceVersion: string;
    debtor: string;
    underwriter: string;
    underwriterRiskRating: BigNumber;
    termsContract: string;
    termsContractParameters: string;
    salt: BigNumber;
}
