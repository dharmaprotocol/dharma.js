import * as Web3 from "web3";
import { DebtTokenContract } from "../wrappers";
export declare class DebtAgreementAssertions {
    private web3;
    constructor(web3: Web3);
    exists(issuanceHash: string, debtToken: DebtTokenContract, errorMessage: string): Promise<void>;
}
