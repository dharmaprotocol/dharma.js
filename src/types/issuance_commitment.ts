import { BigNumber } from "../../utils/bignumber";

export interface IssuanceCommitment {
    version: string;
    beneficiary: string;
    underwriter: string;
    underwriterRiskRating: BigNumber;
    termsContract: string;
    termsContractParameters: string;
    issuanceBlockTimestamp: BigNumber;
}
