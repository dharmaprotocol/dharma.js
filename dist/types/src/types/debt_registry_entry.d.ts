import { BigNumber } from "../../utils/bignumber";
export declare type DebtRegistryEntryData = [string, string, string, BigNumber, string, string, BigNumber];
export declare class DebtRegistryEntry {
    version: string;
    beneficiary: string;
    underwriter: string;
    underwriterRiskRating: BigNumber;
    termsContract: string;
    termsContractParameters: string;
    issuanceBlockTimestamp: BigNumber;
    constructor(version: string, beneficiary: string, underwriter: string, underwriterRiskRating: BigNumber, termsContract: string, termsContractParameters: string, issuanceBlockTimestamp: BigNumber);
    static fromData(data: DebtRegistryEntryData): DebtRegistryEntry;
}
