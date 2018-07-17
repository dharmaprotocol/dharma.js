// External Libraries
import * as ABIDecoder from "abi-decoder";
import * as _ from "lodash";
import * as compact from "lodash.compact";
import * as Web3 from "web3";

// Utils
import { BigNumber } from "../../utils/bignumber";
import {
    DISABLED_TOKEN_SYMBOLS,
    TOKEN_REGISTRY_TRACKED_TOKENS,
    UNLIMITED_PROXY_TOKEN_TRANSFER_ALLOWANCE,
} from "../../utils/constants";
import * as Units from "../../utils/units";
import { Web3Utils } from "../../utils/web3_utils";

// Test Utils
import { isNonNullAddress } from "../utils/utils";

import { ContractsAPI, TokenAPI } from "../../src/apis";
import { TokenAPIErrors } from "../../src/apis/token_api";
import { TokenAssertionErrors } from "../../src/invariants/token";
import { DummyTokenContract, TokenTransferProxyContract } from "../../src/wrappers";
import { CONTRACT_WRAPPER_ERRORS } from "../../src/wrappers/contract_wrappers/base_contract_wrapper";

import { ACCOUNTS } from "../accounts";

// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);
const contractsApi = new ContractsAPI(web3);
const tokenApi = new TokenAPI(web3, contractsApi);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 400000 };

const CONTRACT_OWNER = ACCOUNTS[0].address;

const SPENDER = ACCOUNTS[1].address;
const RECIPIENT = ACCOUNTS[2].address;
const OPERATOR = ACCOUNTS[3].address;

const TEST_ACCOUNTS = [SPENDER, RECIPIENT, OPERATOR];

const NON_CONTRACT_ADDRESS = ACCOUNTS[4].address;

const DEFAULT_STARTING_BALANCE = Units.ether(100);

describe("Token API (Integration Tests)", () => {
    let dummyREPToken: DummyTokenContract;
    let dummyZRXToken: DummyTokenContract;
    let dummyMKRToken: DummyTokenContract;

    let tokenTransferProxy: TokenTransferProxyContract;

    let currentNetworkId: number;
    let currentSnapshotId: number;

    beforeEach(async () => {
        currentSnapshotId = await web3Utils.saveTestSnapshot();

        const dummyTokenRegistry = await contractsApi.loadTokenRegistry();
        const dummyREPAddress = await dummyTokenRegistry.getTokenAddressBySymbol.callAsync("REP");
        const dummyZRXAddress = await dummyTokenRegistry.getTokenAddressBySymbol.callAsync("ZRX");
        const dummyMKRAddress = await dummyTokenRegistry.getTokenAddressBySymbol.callAsync("MKR");

        dummyREPToken = await DummyTokenContract.at(dummyREPAddress, web3, TX_DEFAULTS);
        dummyZRXToken = await DummyTokenContract.at(dummyZRXAddress, web3, TX_DEFAULTS);
        dummyMKRToken = await DummyTokenContract.at(dummyMKRAddress, web3, TX_DEFAULTS);

        const dummyTokens = [dummyREPToken, dummyZRXToken, dummyMKRToken];

        for (const testAccount of TEST_ACCOUNTS) {
            for (const dummyToken of dummyTokens) {
                await dummyToken.setBalance.sendTransactionAsync(
                    testAccount,
                    DEFAULT_STARTING_BALANCE,
                    { from: CONTRACT_OWNER },
                );
            }
        }

        tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();

        ABIDecoder.addABI(dummyREPToken.abi);
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(currentSnapshotId);
        ABIDecoder.removeABI(dummyREPToken.abi);
    });

    beforeAll(async () => {
        currentNetworkId = await web3Utils.getNetworkIdAsync();
    });

    describe("#transferAsync", () => {
        describe("no contract at token address", () => {
            test("should throw CONTRACT_NOT_FOUND_ON_NETWORK", async () => {
                await expect(
                    tokenApi.transferAsync(NON_CONTRACT_ADDRESS, RECIPIENT, new BigNumber(10), {
                        from: SPENDER,
                    }),
                ).rejects.toThrow(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC20",
                        currentNetworkId,
                    ),
                );
            });
        });

        describe("contract exists at token address", () => {
            describe("the sender has insufficient balance", async () => {
                beforeEach(async () => {
                    await dummyREPToken.setBalance.sendTransactionAsync(SPENDER, Units.ether(0), {
                        from: CONTRACT_OWNER,
                    });
                });

                test("should throw INSUFFICIENT_SENDER_BALANCE", async () => {
                    await expect(
                        tokenApi.transferAsync(
                            dummyREPToken.address,
                            RECIPIENT,
                            new BigNumber(10),
                            { from: SPENDER },
                        ),
                    ).rejects.toThrow(TokenAPIErrors.INSUFFICIENT_SENDER_BALANCE(SPENDER));
                });
            });

            describe("sender transfers 10 tokens to recipient", () => {
                let txHash: string;
                let spenderBalanceBefore: BigNumber;
                let recipientBalanceBefore: BigNumber;

                beforeEach(async () => {
                    spenderBalanceBefore = await dummyREPToken.balanceOf.callAsync(SPENDER);
                    recipientBalanceBefore = await dummyREPToken.balanceOf.callAsync(RECIPIENT);

                    txHash = await tokenApi.transferAsync(
                        dummyREPToken.address,
                        RECIPIENT,
                        new BigNumber(10),
                        { from: SPENDER },
                    );
                });

                test("should emit log indicating transfer success", async () => {
                    const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                    const [transferLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(transferLog.name).toBe("Transfer");
                });

                test("should debit sender 10 tokens", async () => {
                    await expect(dummyREPToken.balanceOf.callAsync(SPENDER)).resolves.toEqual(
                        spenderBalanceBefore.minus(10),
                    );
                });

                test("should credit recipient 10 tokens", async () => {
                    await expect(dummyREPToken.balanceOf.callAsync(RECIPIENT)).resolves.toEqual(
                        recipientBalanceBefore.plus(10),
                    );
                });

                // TODO: Add fault tolerance to cases in which
                //  sender does not have sufficient balance, or in which
                //  contract does not implement ERC20 interface
            });
        });
    });

    describe("#transferFromAsync", () => {
        describe("no contract at token address", () => {
            test("should throw CONTRACT_NOT_FOUND_ON_NETWORK", async () => {
                await expect(
                    tokenApi.transferFromAsync(
                        NON_CONTRACT_ADDRESS,
                        SPENDER,
                        RECIPIENT,
                        new BigNumber(10),
                        { from: OPERATOR },
                    ),
                ).rejects.toThrow(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC20",
                        currentNetworkId,
                    ),
                );
            });
        });

        describe("contract exists at token address", () => {
            describe("sender has insufficient balance", () => {
                beforeEach(async () => {
                    await dummyZRXToken.approve.sendTransactionAsync(OPERATOR, new BigNumber(10), {
                        from: SPENDER,
                    });

                    await dummyZRXToken.setBalance.sendTransactionAsync(SPENDER, Units.ether(0), {
                        from: CONTRACT_OWNER,
                    });
                });

                test("should throw INSUFFICIENT_SENDER_BALANCE", async () => {
                    await expect(
                        tokenApi.transferFromAsync(
                            dummyZRXToken.address,
                            SPENDER,
                            RECIPIENT,
                            new BigNumber(10),
                            { from: OPERATOR },
                        ),
                    ).rejects.toThrow(TokenAPIErrors.INSUFFICIENT_SENDER_BALANCE(SPENDER));
                });
            });

            describe("spender has given operator insufficient allowance", async () => {
                test("should throw INSUFFICIENT_SENDER_ALLOWANCE", async () => {
                    await expect(
                        tokenApi.transferFromAsync(
                            dummyZRXToken.address,
                            SPENDER,
                            RECIPIENT,
                            new BigNumber(10),
                            { from: OPERATOR },
                        ),
                    ).rejects.toThrow(TokenAPIErrors.INSUFFICIENT_SENDER_ALLOWANCE(SPENDER));
                });
            });

            describe("sender transfers 10 tokens to recipient", () => {
                let txHash: string;
                let spenderBalanceBefore: BigNumber;
                let recipientBalanceBefore: BigNumber;

                beforeEach(async () => {
                    spenderBalanceBefore = await dummyZRXToken.balanceOf.callAsync(SPENDER);
                    recipientBalanceBefore = await dummyZRXToken.balanceOf.callAsync(RECIPIENT);

                    await dummyZRXToken.approve.sendTransactionAsync(OPERATOR, new BigNumber(10), {
                        from: SPENDER,
                    });

                    txHash = await tokenApi.transferFromAsync(
                        dummyZRXToken.address,
                        SPENDER,
                        RECIPIENT,
                        new BigNumber(10),
                        { from: OPERATOR },
                    );
                });

                test("should emit log indicating transferFrom success", async () => {
                    const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                    const [transferLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(transferLog.name).toBe("Transfer");
                });

                test("should debit sender 10 tokens", async () => {
                    await expect(dummyZRXToken.balanceOf.callAsync(SPENDER)).resolves.toEqual(
                        spenderBalanceBefore.minus(10),
                    );
                });

                test("should credit recipient 10 tokens", async () => {
                    await expect(dummyZRXToken.balanceOf.callAsync(RECIPIENT)).resolves.toEqual(
                        recipientBalanceBefore.plus(10),
                    );
                });

                // TODO: Add fault tolerance to cases in which
                //  sender does not have sufficient balance, or in which
                //  contract does not implement ERC20 interface
            });
        });
    });

    describe("#getBalanceAsync", () => {
        describe("no contract at token address", () => {
            test("should throw CONTRACT_NOT_FOUND_ON_NETWORK", async () => {
                await expect(
                    tokenApi.getBalanceAsync(NON_CONTRACT_ADDRESS, SPENDER),
                ).rejects.toThrow(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC20",
                        currentNetworkId,
                    ),
                );
            });
        });

        describe("contract exists at token address", () => {
            beforeEach(async () => {
                await dummyMKRToken.setBalance.sendTransactionAsync(SPENDER, Units.ether(99), {
                    from: CONTRACT_OWNER,
                });
                await dummyMKRToken.setBalance.sendTransactionAsync(RECIPIENT, Units.ether(70), {
                    from: CONTRACT_OWNER,
                });
                await dummyMKRToken.setBalance.sendTransactionAsync(OPERATOR, Units.ether(200), {
                    from: CONTRACT_OWNER,
                });
            });

            describe("token does not implement ERC20", () => {
                let nonERC20;

                beforeEach(async () => {
                    nonERC20 = await contractsApi.loadRepaymentRouterAsync();
                });

                test("should throw MISSING_ERC20_METHOD", async () => {
                    await expect(
                        tokenApi.getBalanceAsync(nonERC20.address, SPENDER),
                    ).rejects.toThrow(TokenAssertionErrors.MISSING_ERC20_METHOD(nonERC20.address));
                });
            });

            describe("Account #1", () => {
                test("should return correct balance for account", async () => {
                    await expect(
                        tokenApi.getBalanceAsync(dummyMKRToken.address, SPENDER),
                    ).resolves.toEqual(Units.ether(99));
                });
            });

            describe("Account #2", () => {
                test("should return correct balance for account", async () => {
                    await expect(
                        tokenApi.getBalanceAsync(dummyMKRToken.address, RECIPIENT),
                    ).resolves.toEqual(Units.ether(70));
                });
            });

            describe("Account #3", () => {
                test("should return correct balance for account", async () => {
                    await expect(
                        tokenApi.getBalanceAsync(dummyMKRToken.address, OPERATOR),
                    ).resolves.toEqual(Units.ether(200));
                });
            });

            // TODO: Add fault tolerance to cases in which
            //  contract does not implement ERC20 interface
        });
    });

    describe("#setProxyAllowanceAsync", () => {
        describe("no contract at token address", () => {
            test("should throw CONTRACT_NOT_FOUND_ON_NETWORK", async () => {
                await expect(
                    tokenApi.setProxyAllowanceAsync(NON_CONTRACT_ADDRESS, Units.ether(100)),
                ).rejects.toThrow(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC20",
                        currentNetworkId,
                    ),
                );
            });
        });

        describe("contract exists at token address", () => {
            describe("sender is owner of account", () => {
                let txHash: string;

                beforeEach(async () => {
                    txHash = await tokenApi.setProxyAllowanceAsync(
                        dummyREPToken.address,
                        Units.ether(100),
                        { from: SPENDER },
                    );
                });

                test("should emit log indicating successful", async () => {
                    const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                    const [approveLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(approveLog.name).toBe("Approval");
                });

                test("should return specified allowance to proxy", async () => {
                    await expect(
                        dummyREPToken.allowance.callAsync(SPENDER, tokenTransferProxy.address),
                    ).resolves.toEqual(Units.ether(100));
                });

                // TODO: Add fault tolerance
            });
        });
    });

    describe("#setUnlimitedProxyAllowanceAsync", () => {
        describe("no contract at token address", () => {
            test("should throw CONTRACT_NOT_FOUND_ON_NETWORK", async () => {
                await expect(
                    tokenApi.setUnlimitedProxyAllowanceAsync(NON_CONTRACT_ADDRESS),
                ).rejects.toThrow(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC20",
                        currentNetworkId,
                    ),
                );
            });
        });

        describe("contract exists at token address", () => {
            describe("sender is owner of account", () => {
                let txHash: string;

                beforeEach(async () => {
                    txHash = await tokenApi.setUnlimitedProxyAllowanceAsync(dummyZRXToken.address, {
                        from: RECIPIENT,
                    });
                });

                test("should emit log indicating successful", async () => {
                    const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
                    const [approveLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

                    expect(approveLog.name).toBe("Approval");
                });

                test("should return specified allowance to proxy", async () => {
                    await expect(
                        dummyZRXToken.allowance.callAsync(RECIPIENT, tokenTransferProxy.address),
                    ).resolves.toEqual(UNLIMITED_PROXY_TOKEN_TRANSFER_ALLOWANCE);
                });

                // TODO: Add fault tolerance
            });
        });
    });

    describe("#getProxyAllowanceAsync", () => {
        describe("no contract at token address", () => {
            test("should throw CONTRACT_NOT_FOUND_ON_NETWORK", async () => {
                await expect(
                    tokenApi.getProxyAllowanceAsync(NON_CONTRACT_ADDRESS, SPENDER),
                ).rejects.toThrow(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC20",
                        currentNetworkId,
                    ),
                );
            });
        });

        describe("contract exists at token address", () => {
            beforeEach(async () => {
                await dummyMKRToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    Units.ether(99),
                    { from: SPENDER },
                );
                await dummyMKRToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    Units.ether(70),
                    { from: RECIPIENT },
                );
                await dummyMKRToken.approve.sendTransactionAsync(
                    tokenTransferProxy.address,
                    Units.ether(200),
                    { from: OPERATOR },
                );
            });

            describe("Account #1", () => {
                test("should return correct balance for account", async () => {
                    await expect(
                        tokenApi.getProxyAllowanceAsync(dummyMKRToken.address, SPENDER),
                    ).resolves.toEqual(Units.ether(99));
                });
            });

            describe("Account #2", () => {
                test("should return correct balance for account", async () => {
                    await expect(
                        tokenApi.getProxyAllowanceAsync(dummyMKRToken.address, RECIPIENT),
                    ).resolves.toEqual(Units.ether(70));
                });
            });

            describe("Account #3", () => {
                test("should return correct balance for account", async () => {
                    await expect(
                        tokenApi.getProxyAllowanceAsync(dummyMKRToken.address, OPERATOR),
                    ).resolves.toEqual(Units.ether(200));
                });
            });
        });
    });

    describe("#getSupportedTokens", () => {
        describe("token registry has tokens", () => {
            test("should return the list of token symbols and names", async () => {
                // Get the result of the function we are testing.
                const tokenSymbolList = await tokenApi.getSupportedTokens();

                // Get a reference from an unsorted array of data we know is correct.
                const expectedTokenSymbolList = _.chain(TOKEN_REGISTRY_TRACKED_TOKENS)
                    .map((token) => {
                        return {
                            symbol: token.symbol,
                            name: token.name,
                            numDecimals: token.decimals,
                        };
                    })
                    .filter((token) => {
                        return !DISABLED_TOKEN_SYMBOLS.includes(token.symbol);
                    })
                    .value();

                // Sort both arrays for comparison.
                const sortedResult = _.sortBy(tokenSymbolList, "symbol");
                const sortedReference = _.sortBy(expectedTokenSymbolList, "symbol");

                // For each set of token attributes, assert expectations.
                sortedResult.forEach((tokenAttributes, index) => {
                    const reference = sortedReference[index];

                    expect(isNonNullAddress(tokenAttributes.address)).toEqual(true);
                    expect(tokenAttributes.name).toEqual(reference.name);
                    expect(tokenAttributes.symbol).toEqual(reference.symbol);
                    expect(tokenAttributes.numDecimals.toNumber()).toEqual(reference.numDecimals);
                });
            });
        });
    });

    describe("#getTokenSymbolList", () => {
        describe("token registry has tokens", () => {
            test("should return the list of token symbols", async () => {
                const tokenSymbolList = await tokenApi.getTokenSymbolList();
                const expectedTokenSymbolList = _.chain(TOKEN_REGISTRY_TRACKED_TOKENS)
                    .map((token) => token.symbol)
                    .filter((tokenSymbol) => {
                        return !DISABLED_TOKEN_SYMBOLS.includes(tokenSymbol);
                    })
                    .value();

                expect(tokenSymbolList.sort()).toEqual(expectedTokenSymbolList.sort());
            });
        });
    });

    describe("#getNumDecimals", () => {
        test("should return the number of decimal places that the token uses", async () => {
            const numDecimals = await tokenApi.getNumDecimals("REP");

            expect(numDecimals).toEqual(new BigNumber(18));
        });

        test("should throw an error if the token does not exist on the registry", async () => {
            const tokenSymbol = "MIN";

            await expect(tokenApi.getNumDecimals(tokenSymbol)).rejects.toThrow(
                TokenAPIErrors.TOKEN_DOES_NOT_EXIST(tokenSymbol),
            );
        });
    });
});
