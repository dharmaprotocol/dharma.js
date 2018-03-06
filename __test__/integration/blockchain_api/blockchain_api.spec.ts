jest.useFakeTimers();

// libraries
import * as Web3 from "web3";

// utils
import * as Units from "utils/units";
import { Web3Utils } from "utils/web3_utils";

import { MockIntervalManager } from "./utils/mock_interval_manager";

import { BlockchainAPI, BlockchainAPIErrors } from "src/apis/blockchain_api";
import { DummyTokenContract } from "src/wrappers/contract_wrappers/dummy_token_wrapper";
import { ContractsAPI } from "src/apis/contracts_api";
import { TokenAPI } from "src/apis/token_api";

import { ACCOUNTS } from "../../accounts";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3Utils = new Web3Utils(web3);
const blockchainApi = new BlockchainAPI(web3);
const contractsApi = new ContractsAPI(web3);
const tokenApi = new TokenAPI(web3, contractsApi);

describe("Blockchain API (Integration Tests)", () => {
    describe("#awaitTransactionMinedAsync()", () => {
        let pollingInterval;
        let timeout;
        let txHash;

        describe("when called with a malformed transaction hash", () => {
            beforeAll(async () => {
                pollingInterval = 2;
                timeout = 1;
                txHash = "0x12345malformed";
            });

            test("it throws schema error", async () => {
                await expect(
                    blockchainApi.awaitTransactionMinedAsync(txHash, pollingInterval, timeout),
                ).rejects.toThrowError(/Expected txHash to conform to schema \/Bytes32/);
            });
        });

        describe("when the transaction does not get mined within the given time window", () => {
            beforeAll(async () => {
                pollingInterval = 2;
                timeout = 1;
                txHash = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";

                blockchainApi.intervalManager = new MockIntervalManager(true);
            });

            test("it throws AWAIT_MINE_TX_TIMED_OUT error", async () => {
                await expect(
                    blockchainApi.awaitTransactionMinedAsync(txHash, pollingInterval, timeout),
                ).rejects.toThrowError(BlockchainAPIErrors.AWAIT_MINE_TX_TIMED_OUT(txHash));
            });
        });

        describe("when a transaction has already been mined", () => {
            beforeAll(async () => {
                pollingInterval = 1;
                timeout = 2;

                const dummyTokenRegistry = await contractsApi.loadTokenRegistry();
                const dummyREPAddress = await dummyTokenRegistry.getTokenAddress.callAsync("REP");
                const dummyToken = await DummyTokenContract.at(dummyREPAddress, web3, {});

                txHash = await tokenApi.setProxyAllowanceAsync(dummyToken.address, Units.ether(1), {
                    from: ACCOUNTS[1].address,
                });

                // Inject an interval manager that doesn't timeout, due to testing env.
                blockchainApi.intervalManager = new MockIntervalManager(false);
            });

            test("it returns the transaction receipt", async () => {
                const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                const response = await blockchainApi.awaitTransactionMinedAsync(
                    txHash,
                    pollingInterval,
                    timeout,
                );

                expect(response).toEqual(receipt);
            });
        });
    });
});
