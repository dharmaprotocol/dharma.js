jest.unmock("@dharmaprotocol/contracts");

// For testing regular web3 instantiation.
import { Dharma, Web3 } from "../../../src";

import Web3ProviderEngine = require("web3-provider-engine");
import RpcSubprovider = require("web3-provider-engine/subproviders/rpc");

const NETWORK_URL = "http://localhost:8545";

import { ACCOUNTS } from "../../accounts";

const CURRENT_ACCOUNT = ACCOUNTS[0].address;

describe("Dharma Instantiation (Integration)", () => {
    describe("with basic web3 provider", () => {
        it("instantiates successfully", async () => {
            const provider = new Web3.providers.HttpProvider(NETWORK_URL);

            const dharma = new Dharma(provider);

            // We can make a basic blockchain request.
            const currentAccount = await dharma.blockchain.getCurrentAccount();

            expect(currentAccount).toEqual(CURRENT_ACCOUNT);
        });
    });

    describe("with web3-provider-engine", () => {
        it("instantiates successfully", async () => {
            const providerEngine = new Web3ProviderEngine();
            providerEngine.addProvider(new RpcSubprovider({ rpcUrl: NETWORK_URL }));
            providerEngine.start();

            const web3 = new Web3(providerEngine);

            const dharma = new Dharma(web3.currentProvider);

            // We can make a basic blockchain request.
            const currentAccount = await dharma.blockchain.getCurrentAccount();

            expect(currentAccount).toEqual(CURRENT_ACCOUNT);

            providerEngine.stop();
        });
    });
});
