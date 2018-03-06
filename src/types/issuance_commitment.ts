import { BigNumber } from "../../utils/bignumber";
import { Web3Utils } from "../../utils/web3_utils";

export type IssuanceCommitmentData = [string, string, string, BigNumber, string, string, BigNumber];

export class IssuanceCommitment {
    constructor(
        public version: string,
        public beneficiary: string,
        public underwriter: string,
        public underwriterRiskRating: BigNumber,
        public termsContract: string,
        public termsContractParameters: string,
        public issuanceBlockTimestamp: BigNumber,
    ) {
        this.version = version;
        this.beneficiary = beneficiary;
        this.underwriter = underwriter;
        this.underwriterRiskRating = underwriterRiskRating;
        this.termsContract = termsContract;
        this.termsContractParameters = termsContractParameters;
        this.issuanceBlockTimestamp = issuanceBlockTimestamp;
    }

    public getHash(): string {
        return Web3Utils.soliditySHA3(
            this.version,
            this.beneficiary,
            this.underwriter,
            this.underwriterRiskRating,
            this.termsContract,
            this.termsContractParameters,
            this.issuanceBlockTimestamp,
        );
    }

    static fromData(data: IssuanceCommitmentData) {
        return new this(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    }
}
