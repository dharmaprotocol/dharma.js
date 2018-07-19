import * as Web3 from "web3";

import { ACCOUNTS } from "../../accounts";

import { ether } from "../../../utils/units";
import { BigNumber } from "../../../utils/bignumber";
import { Web3Utils } from "../../../utils/web3_utils";

import { Dharma } from "../../../src/dharma";
import { TokenData } from "../../../src/tokens/tokens";

import { Tokens } from "../../../src/types";

import { DummyTokenContract, TokenTransferProxyContract } from "../../../src/wrappers";

import { ContractsAPI } from "../../../src/apis";

jest.unmock("@dharmaprotocol/contracts");

const dharma = new Dharma("http://localhost:8545");

const OWNER = ACCOUNTS[0].address;

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const contractsApi = new ContractsAPI(web3);

const TX_DEFAULTS = { from: OWNER, gas: 400000 };

const DEFAULT_STARTING_BALANCE = ether(13);

const UNLIMITED_ALLOWANCE = new BigNumber(2).pow(256).sub(1);

describe("Tokens (Integration)", () => {
    describe("#getTokenDataForSymbol", () => {
        let dummyREPToken: DummyTokenContract;
        let tokenTransferProxy: TokenTransferProxyContract;

        beforeAll(async () => {
            const dummyTokenRegistry = await contractsApi.loadTokenRegistry();

            const dummyREPAddress = await dummyTokenRegistry.getTokenAddressBySymbol.callAsync(
                "REP",
            );

            dummyREPToken = await DummyTokenContract.at(dummyREPAddress, web3, TX_DEFAULTS);
            tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();

            await dummyREPToken.setBalance.sendTransactionAsync(OWNER, DEFAULT_STARTING_BALANCE, {
                from: OWNER,
            });
        });

        describe("given a symbol for a token in the token registry", () => {
            let tokenData: TokenData;

            describe("when the user does not have any allowance", () => {
                beforeAll(async () => {
                    const tokens = new Tokens(dharma, OWNER);

                    tokenData = await tokens.getTokenDataForSymbol("REP");
                });

                test("returns false for hasUnlimitedAllowance", () => {
                    expect(tokenData.hasUnlimitedAllowance).toEqual(false);
                });

                test("returns 0 for allowance", () => {
                    expect(tokenData.allowance).toEqual(0);
                });
            });

            test("returns the token data", () => {
                expect(tokenData.balance).toEqual(13);
                expect(tokenData.symbol).toEqual("REP");
            });

            describe("when the token owner has unlimited allowance set for the proxy", () => {
                let currentSnapshotId: number;

                beforeAll(async () => {
                    currentSnapshotId = await web3Utils.saveTestSnapshot();

                    await dummyREPToken.approve.sendTransactionAsync(
                        tokenTransferProxy.address,
                        UNLIMITED_ALLOWANCE,
                        { from: OWNER },
                    );

                    const tokens = new Tokens(dharma, OWNER);

                    tokenData = await tokens.getTokenDataForSymbol("REP");
                });

                afterEach(async () => {
                    await web3Utils.revertToSnapshot(currentSnapshotId);
                });

                test("it returns true for hasUnlimitedAllowance", () => {
                    expect(tokenData.hasUnlimitedAllowance).toEqual(true);
                });
            });
        });
    });

    describe("#get", () => {
        let receivedTokenData;
        let supportedTokens;

        beforeAll(async () => {
            jest.setTimeout(10000);

            const tokens = new Tokens(dharma, OWNER);

            supportedTokens = await dharma.token.getTokenSymbolList();
            receivedTokenData = await tokens.get();
        });

        afterAll(() => {
            jest.setTimeout(5000);
        });

        test("returns an array with length equal to the number of supported tokens", () => {
            expect(receivedTokenData.length).toEqual(supportedTokens.length);
        });

        test("includes all of the supported token symbols in the list", () => {
            const receivedTokenSymbols = receivedTokenData.map((token) => token.symbol);

            expect(receivedTokenSymbols).toEqual(supportedTokens);
        });
    });
});
