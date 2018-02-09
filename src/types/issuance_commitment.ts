import { BigNumber } from "../../utils/bignumber";

export interface IssuanceCommitment {
    issuanceVersion: string;
    debtor: string;
    underwriter: string;
    underwriterRiskRating: BigNumber;
    termsContract: string;
    termsContractParameters: string;
    salt: BigNumber;
}
