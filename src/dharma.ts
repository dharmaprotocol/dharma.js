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

    public static withBlockchainNode(blockchainNode: string) {
        const web3Provider = new Web3.providers.HttpProvider(blockchainNode);
        const web3 = new Web3(web3Provider);

        // Verify that the node is reachable
        web3.version.getNode((error, result) => {
            if (error) {
                throw error;
            }
        });

        return new Dharma(web3);
    }

    public sign: SignerAPI;
    public order: OrderAPI;
    public contracts: ContractsAPI;
    public adapters: AdaptersAPI;
    public servicing: ServicingAPI;
    public token: TokenAPI;
    public blockchain: BlockchainAPI;
    public logs: LogsAPI;

    public readonly web3: Web3;

    constructor(web3?: Web3, addressBook: DharmaTypes.AddressBook = {}) {
        /**
         * There are two ways we can access a Web3 instance:
         * 1. We pass in Web3
         * 3. Web3 has been injected into the browser window (e.g. via Metamask.)
         */
        if (web3) {
            this.verifyWeb3Version(web3);

            this.web3 = web3;
        } else if (
            typeof (window as any) !== "undefined" &&
            typeof (window as any).web3 !== "undefined"
        ) {
            // If Web3 is available via the browser window, instantiate Web3 via the current provider.
            this.web3 = new Web3((window as any).web3.currentProvider);
        } else {
            // Otherwise throw...
            throw new Error(
                "A Web3 instance was not specified as a parameter and Web3 was not found on the window.",
            );
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

    private verifyWeb3Version(web3: Web3) {
        // TODO: figure out a cleaner way to get the Web3 version used by Dharma
        const temporaryWeb3 = new Web3();

        const dharmaWeb3Version = temporaryWeb3.version.api;

        // A hacky way of detecting Web3 version 1.0.0, as it has breaking API changes
        if (
            (typeof web3.version === "string" &&
                web3.version.match(/^(\d+)\.?(\d+)\.?(\*|\d+)$/)[0] === "1") ||
            web3.version.api !== dharmaWeb3Version
        ) {
            throw new Error(
                `Dharma.js must be instantiated with a Web3 instance of version ${dharmaWeb3Version}`,
            );
        }
    }
}

export { Dharma };
