import * as Web3 from "web3";
import { ContractsAPI } from "./";
import { SimpleInterestLoanAdapter } from "../adapters";

export class AdaptersAPI {
    public simpleInterestLoan: SimpleInterestLoanAdapter;

    private contracts: ContractsAPI;
    private web3: Web3;

    constructor(web3: Web3, contractsApi: ContractsAPI) {
        this.web3 = web3;
        this.contracts = contractsApi;

        this.simpleInterestLoan = new SimpleInterestLoanAdapter(this.web3, this.contracts);
    }
}
