import * as singleLineString from "single-line-string";
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

export const MAXIMUM_MAJOR_VERSION = 0;

export const DharmaInstantiationErrors = {
    WEB3_NOT_FOUND_ON_WINDOW: singleLineString`Web3 was not found on the window.
        Ensure it is present on the window or use a different constructor for Dharma.js`,
    WEB3_VERSION_INCOMPATIBLE: singleLineString`Dharma.js must be instantiated with
        a Web3 instance of version lower than ${MAXIMUM_MAJOR_VERSION}`,
};

class Dharma {
    public static Types = DharmaTypes;

    public static initialize(): Dharma {
        // If Web3 is available via the browser window, instantiate Web3 via the current provider.
        if (
            typeof window !== "undefined" &&
            typeof (window as any).web3 !== "undefined" &&
            (window as any).web3 !== null
        ) {
            const web3Provider = (window as any).web3.currentProvider;
            const web3 = new Web3(web3Provider);
            return new Dharma(web3);
        } else {
            throw new Error(DharmaInstantiationErrors.WEB3_NOT_FOUND_ON_WINDOW);
        }
    }

    public static initializeWithBlockchainNode(blockchainNode: string): Dharma {
        const web3Provider = new Web3.providers.HttpProvider(blockchainNode);
        const web3 = new Web3(web3Provider);

        // Verify that the node is reachable; if not, the line below will throw an error.
        const node = web3.version.node;

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

    constructor(web3: Web3, addressBook: DharmaTypes.AddressBook = {}) {
        this.verifyWeb3Version(web3);

        this.web3 = web3;

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
        // A hacky way of detecting Web3 version 1.0.0, as it has breaking API changes
        if (
            typeof web3.version === "string" &&
            this.getMajorVersion(web3.version) > MAXIMUM_MAJOR_VERSION
        ) {
            throw new Error(DharmaInstantiationErrors.WEB3_VERSION_INCOMPATIBLE);
        }
    }

    private getMajorVersion(version: string): number {
        return Number.parseInt(version.match(/^(\d+)\.?(\d+)\.?(\*|\d+)$/)[0]);
    }
}

export { Dharma };
