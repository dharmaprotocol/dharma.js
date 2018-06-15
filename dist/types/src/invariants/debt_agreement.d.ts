import { DebtTokenContract } from "../wrappers";
export declare class DebtAgreementAssertions {
    exists(issuanceHash: string, debtToken: DebtTokenContract, errorMessage: string): Promise<void>;
}
