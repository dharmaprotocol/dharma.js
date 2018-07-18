import { ACCOUNTS } from "../../accounts";

import { Dharma } from "../../../src/dharma";
import { TokenData } from "../../../src/tokens/tokens";
import { Tokens } from "../../../src/types";

jest.unmock("@dharmaprotocol/contracts");

const dharma = new Dharma("http://localhost:8545");

const OWNER = ACCOUNTS[0].address;

describe("Tokens (Integration)", () => {
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
