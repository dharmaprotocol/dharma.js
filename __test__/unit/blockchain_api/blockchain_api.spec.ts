jest.useFakeTimers();

// We must explicitly unmock the dharma protocol contract artifacts
// in instances where we need our deployed artifacts in our test environment.
jest.unmock("@dharmaprotocol/contracts");

// libraries
import * as Web3 from "web3";

// utils
import * as Units from "utils/units";
import { Web3Utils } from "utils/web3_utils";
import { NULL_ADDRESS, NULL_BYTES32 } from "utils/constants";

import { MockIntervalManager } from "./utils/mock_interval_manager";

import { BlockchainAPIErrors } from "src/apis/blockchain_api";
import { DummyTokenContract } from "src/wrappers/contract_wrappers/dummy_token_wrapper";
import { BlockchainAPI, ContractsAPI, OrderAPI, TokenAPI } from "src/apis/";
import { Logging, DebtKernelError, DebtOrder } from "src/types";
import { ACCOUNTS } from "../../accounts";
import * as moment from "moment";
import { BigNumber } from "bignumber.js";

import { DebtOrderWrapper } from "src/wrappers";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3Utils = new Web3Utils(web3);
const contractsApi = new ContractsAPI(web3);
const blockchainApi = new BlockchainAPI(web3, contractsApi);
const tokenApi = new TokenAPI(web3, contractsApi);
const orderAPI = new OrderAPI(web3, contractsApi);

describe("Blockchain API (Unit Tests)", () => {
    describe("#getErrorLogs", () => {
        let txHash: string;

        beforeAll(async () => {
            const dummyTokenRegistry = await contractsApi.loadTokenRegistry();
            const dummyREPAddress = await dummyTokenRegistry.getTokenAddress.callAsync("REP");
            const principalToken = await DummyTokenContract.at(dummyREPAddress, web3, {});

            const {
                debtKernel,
                debtRegistry,
                debtToken,
                repaymentRouter,
                tokenTransferProxy,
            } = await contractsApi.loadDharmaContractsAsync();

            const termsContract = await contractsApi.loadSimpleInterestTermsContract(
                principalToken.address,
            );

            // principal < debtor fee
            let order: DebtOrder = {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(0.49),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                debtorFee: Units.ether(0.51),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.001),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.001),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.511),
                underwriterRiskRating: Units.percent(0.001),
                termsContract: termsContract.address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };

            const debtOrderWrapped = await DebtOrderWrapper.applyNetworkDefaults(
                order,
                contractsApi,
            );

            txHash = await debtKernel.fillDebtOrder.sendTransactionAsync(
                debtOrderWrapped.getCreditor(),
                debtOrderWrapped.getOrderAddresses(),
                debtOrderWrapped.getOrderValues(),
                debtOrderWrapped.getOrderBytes32(),
                debtOrderWrapped.getSignaturesV(),
                debtOrderWrapped.getSignaturesR(),
                debtOrderWrapped.getSignaturesS(),
                { from: debtOrderWrapped.getCreditor() },
            );
        });

        test("it returns the correct error message", async () => {
            const errors = await blockchainApi.getErrorLogs(txHash);
            expect(errors.length).toEqual(1);
            expect(errors[0]).toEqual(DebtKernelError.messageForError(4));
        });
    });

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
