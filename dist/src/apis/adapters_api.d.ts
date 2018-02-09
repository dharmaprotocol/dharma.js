import Web3 from "web3";
import { ContractsAPI } from "./";
import { SimpleInterestLoanAdapter } from "../adapters";
export declare class AdaptersAPI {
    simpleInterestLoan: SimpleInterestLoanAdapter;
    private contracts;
    private web3;
    constructor(web3: Web3, contractsApi: ContractsAPI);
}
