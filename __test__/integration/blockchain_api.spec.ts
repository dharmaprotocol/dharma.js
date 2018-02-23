import * as Web3 from "web3";

import { BlockchainAPI, BlockchainAPIErrors } from "src/apis/blockchain_api";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const blockchainApi = new BlockchainAPI(web3);

describe("Blockchain API (Integration Tests)", () => {
    describe("#awaitTransactionMinedAsync()", () => {
        const pollingInterval = 1;
        const timeout = 0;
        const txHash = "";

        describe("when the transaction does not get mined within the given time window", () => {
            test("it throws AWAIT_MINE_TX_TIMED_OUT error", async () => {
                await expect(
                    blockchainApi.awaitTransactionMinedAsync(txHash, pollingInterval, timeout),
                ).rejects.toThrowError(BlockchainAPIErrors.AWAIT_MINE_TX_TIMED_OUT(txHash));
            });
        });
    });
});
