jest.unmock("@dharmaprotocol/contracts");

import * as Web3 from "web3";
import { Web3Utils } from "../../../utils/web3_utils";

import { Dharma } from "../../../src/dharma";
import { TokenData } from "../../../src/token/token";
import { Token } from "../../../src/types";

import { ACCOUNTS } from "../../accounts";

import { setBalanceForSymbol, setUnlimitedAllowanceForSymbol } from "../../utils/utils";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const dharma = new Dharma("http://localhost:8545");
const BALANCE = 10;
const TOKEN_SYMBOL = "MKR";

const OWNER = ACCOUNTS[0].address;

describe("Token (Integration)", () => {
    describe("#getDataForSymbol", () => {
        beforeAll(async () => {
            await setBalanceForSymbol(dharma, BALANCE, TOKEN_SYMBOL, OWNER);
        });

        describe("given a symbol for a token in the token registry", () => {
            let tokenData: TokenData;

            beforeAll(async () => {
                tokenData = await Token.getDataForSymbol(dharma, TOKEN_SYMBOL, OWNER);
            });

            describe("when the user does not have any allowance", () => {
                test("returns false for hasUnlimitedAllowance", () => {
                    expect(tokenData.hasUnlimitedAllowance).toEqual(false);
                });

                test("returns 0 for allowance", () => {
                    expect(tokenData.allowance).toEqual(0);
                });
            });

            test("returns the token data", () => {
                expect(tokenData.balance).toEqual(BALANCE);
                expect(tokenData.symbol).toEqual(TOKEN_SYMBOL);
            });

            describe("when the token owner has unlimited allowance set for the proxy", () => {
                let currentSnapshotId: number;

                beforeAll(async () => {
                    currentSnapshotId = await web3Utils.saveTestSnapshot();

                    await setUnlimitedAllowanceForSymbol(dharma, TOKEN_SYMBOL, OWNER);

                    tokenData = await Token.getDataForSymbol(dharma, TOKEN_SYMBOL, OWNER);
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

    describe("#all", () => {
        let receivedTokenData;
        let supportedTokens;

        beforeAll(async () => {
            jest.setTimeout(10000);

            supportedTokens = await dharma.token.getTokenSymbolList();
            receivedTokenData = await Token.all(dharma, OWNER);
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
