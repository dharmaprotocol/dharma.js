jest.unmock("@dharmaprotocol/contracts");

// For testing regular web3 instantiation.
import { Dharma, Web3 } from "../../../src";

const NETWORK_URL = "http://localhost:8545";

describe("Dharma Instantiation (Integration)", () => {
    describe("with basic web3 provider", () => {
        it("instantiates successfully", async () => {
            const provider = new Web3.providers.HttpProvider(NETWORK_URL);

            const dharma = new Dharma(provider);

            // We can make a basic blockchain request.
            const currentAccount = await dharma.blockchain.getCurrentAccount();

            expect(currentAccount.length).toEqual(42);
        });
    });
});
