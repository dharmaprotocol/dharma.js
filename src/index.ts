import * as Web3 from "web3";
import {
    AdaptersAPI,
    BlockchainAPI,
    ContractsAPI,
    OrderAPI,
    ServicingAPI,
    SignerAPI,
    TokenAPI,
} from "./apis";
import * as DharmaTypes from "./types";

export { DharmaTypes };

export default class Dharma {
    public sign: SignerAPI;
    public order: OrderAPI;
    public contracts: ContractsAPI;
    public adapters: AdaptersAPI;
    public servicing: ServicingAPI;
    public token: TokenAPI;
    public blockchain: BlockchainAPI;

    private web3: Web3;

    constructor(web3Provider: Web3.Provider, config: DharmaTypes.DharmaConfig = {}) {
        this.web3 = new Web3(web3Provider);

        this.contracts = new ContractsAPI(this.web3, config);

        this.servicing = new ServicingAPI(this.web3, this.contracts);
        this.sign = new SignerAPI(this.web3, this.contracts);
        this.adapters = new AdaptersAPI(this.web3, this.contracts);
        this.order = new OrderAPI(this.web3, this.contracts, this.adapters);
        this.token = new TokenAPI(this.web3, this.contracts);
        this.blockchain = new BlockchainAPI(this.web3, this.contracts);
    }
}
