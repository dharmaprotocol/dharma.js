import { BigNumber } from "../../utils/bignumber";

export type IssuanceCommitmentData = [string, string, string, BigNumber, string, string, BigNumber];

export class IssuanceCommitment {
    public version: string;
    public beneficiary: string;
    public underwriter: string;
    public underwriterRiskRating: BigNumber;
    public termsContract: string;
    public termsContractParameters: string;
    public issuanceBlockTimestamp: BigNumber;

    constructor(
        version: string,
        beneficiary: string,
        underwriter: string,
        underwriterRiskRating: BigNumber,
        termsContract: string,
        termsContractParameters: string,
        issuanceBlockTimestamp: BigNumber,
    ) {
        this.version = version;
        this.beneficiary = beneficiary;
        this.underwriter = underwriter;
        this.underwriterRiskRating = underwriterRiskRating;
        this.termsContract = termsContract;
        this.termsContractParameters = termsContractParameters;
        this.issuanceBlockTimestamp = issuanceBlockTimestamp;
    }
    static fromData(data: IssuanceCommitmentData) {
        return new this(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    }
}
