jest.unmock("@dharmaprotocol/contracts");

import { Dharma } from "../../../src/dharma";
import { TokenData } from "../../../src/token/token";
import { Token } from "../../../src/types";

import { ACCOUNTS } from "../../accounts";

import {
    revokeAllowanceForSymbol,
    setBalanceForSymbol,
    setUnlimitedAllowanceForSymbol,
} from "../../utils/utils";

const dharma = new Dharma("http://localhost:8545");
const BALANCE = 10;
const TOKEN_SYMBOL = "MKR";

const OWNER = ACCOUNTS[0].address;

describe("Token (Integration)", () => {
    describe("#makeAllowanceUnlimitedIfNecessary", () => {
        describe("when the user does not have any allowance", () => {
            let txHash: string | void;

            beforeAll(async () => {
                txHash = await Token.makeAllowanceUnlimitedIfNecessary(dharma, TOKEN_SYMBOL, OWNER);
            });

            test("returns a transaction hash", () => {
                expect(typeof txHash).toEqual("string");
            });

            test("sets the allowance to unlimited", async () => {
                const tokenData = await Token.getDataForSymbol(dharma, TOKEN_SYMBOL, OWNER);
                expect(tokenData.hasUnlimitedAllowance).toEqual(true);
            });
        });

        describe("when the user already has an unlimited allowance", () => {
            let txHash: string | void;

            beforeAll(async () => {
                txHash = await Token.makeAllowanceUnlimitedIfNecessary(dharma, TOKEN_SYMBOL, OWNER);
            });

            afterAll(async () => {
                await revokeAllowanceForSymbol(dharma, TOKEN_SYMBOL, OWNER);
            });

            test("does not return a transaction hash", () => {
                expect(txHash).toBeUndefined();
            });

            test("the allowance remains unlimited", async () => {
                const tokenData = await Token.getDataForSymbol(dharma, TOKEN_SYMBOL, OWNER);
                expect(tokenData.hasUnlimitedAllowance).toEqual(true);
            });
        });
    });

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
                beforeAll(async () => {
                    await setUnlimitedAllowanceForSymbol(dharma, TOKEN_SYMBOL, OWNER);
                    tokenData = await Token.getDataForSymbol(dharma, TOKEN_SYMBOL, OWNER);
                });

                afterAll(async () => {
                    await revokeAllowanceForSymbol(dharma, TOKEN_SYMBOL, OWNER);
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
