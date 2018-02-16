import { ContractsAPI } from "./";
import { BigNumber } from "bignumber.js";
import * as Web3 from "web3";
import { TxData } from "../types";
export declare const ServicingAPIErrors: {
    DEBT_AGREEMENT_NONEXISTENT: (issuanceHash: string) => any;
    INSUFFICIENT_REPAYMENT_BALANCE: () => any;
    INSUFFICIENT_REPAYMENT_ALLOWANCE: () => any;
};
export declare class ServicingAPI {
    private web3;
    private contracts;
    private assert;
    constructor(web3: Web3, contracts: ContractsAPI);
    makeRepayment(issuanceHash: string, amount: BigNumber, tokenAddress: string, options?: TxData): Promise<string>;
    getValueRepaid(issuanceHash: string): Promise<BigNumber>;
    getExpectedValueRepaid(issuanceHash: string, timestamp: number): Promise<BigNumber>;
    private getTxDefaultOptions();
}
