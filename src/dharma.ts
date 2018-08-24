import * as Web3 from "web3";

import {
    AdaptersAPI,
    BlockchainAPI,
    ContractsAPI,
    LogsAPI,
    OrderAPI,
    ServicingAPI,
    SignerAPI,
    TokenAPI,
} from "./apis";

import * as DharmaTypes from "./types";

class Dharma {
    public static Types = DharmaTypes;

    public sign: SignerAPI;
    public order: OrderAPI;
    public contracts: ContractsAPI;
    public adapters: AdaptersAPI;
    public servicing: ServicingAPI;
    public token: TokenAPI;
    public blockchain: BlockchainAPI;
    public logs: LogsAPI;

    public readonly web3: Web3;

    constructor(blockchainHost?: string, addressBook: DharmaTypes.AddressBook = {}) {
        /**
         * There are two ways we can access a web3 provider:
         * 1. We pass in the address of an Eth node, e.g. https://localhost:8545
         * 2. Web3 has been injected into the browser window (e.g. via Metamask.)
         */
        if (blockchainHost) {
            // If a host is specified, instantiate web3 with it as the provider.
            const web3Provider = new Web3.providers.HttpProvider(blockchainHost);
            this.web3 = new Web3(web3Provider);
        } else if (
            typeof (window as any) !== "undefined" &&
            typeof (window as any).web3 !== "undefined"
        ) {
            // If web3 is available via the browser window, instantiate web3 via the current provider.
            this.web3 = new Web3((window as any).web3.currentProvider);
        } else {
            // Otherwise throw...
            throw new Error("Pass in the address of your blockchain node.");
        }

        this.contracts = new ContractsAPI(this.web3, addressBook);

        this.servicing = new ServicingAPI(this.web3, this.contracts);
        this.sign = new SignerAPI(this.web3, this.contracts);
        this.adapters = new AdaptersAPI(this.web3, this.contracts);
        this.order = new OrderAPI(this.web3, this.contracts, this.adapters);
        this.token = new TokenAPI(this.web3, this.contracts);
        this.blockchain = new BlockchainAPI(this.web3, this.contracts);
        this.logs = new LogsAPI(this.web3, this.contracts);
    }
}

export { Dharma };
