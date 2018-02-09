import Web3 from "web3";
import { ContractsAPI, OrderAPI, SignerAPI } from "./apis";
import { DharmaConfig } from "./types";
import { SimpleInterestLoanAdapter } from "./adapters/simple_interest_loan_adapter";
export default class Dharma {
    static adapters: {
        SimpleInterestLoanAdapter: typeof SimpleInterestLoanAdapter;
    };
    sign: SignerAPI;
    order: OrderAPI;
    contracts: ContractsAPI;
    private web3;
    constructor(web3Provider: Web3.Provider, config: DharmaConfig);
}
