import Web3 from "web3";
import { ContractsAPI, OrderAPI, SignerAPI } from "./apis";
import { DharmaConfig } from "src/types";
import { SimpleInterestLoanAdapter } from "src/adapters/simple_interest_loan_adapter";
import Adapters from "src/adapters";

export default class Dharma {
    public static adapters = Adapters;

    public sign: SignerAPI;
    public order: OrderAPI;
    public contracts: ContractsAPI;

    private web3: Web3;

    constructor(web3Provider: Web3.Provider, config: DharmaConfig) {
        this.web3 = new Web3(web3Provider);

        this.sign = new SignerAPI(this.web3);
        this.contracts = new ContractsAPI(this.web3, config);

        this.order = new OrderAPI(this.web3, this.contracts);
    }
}
