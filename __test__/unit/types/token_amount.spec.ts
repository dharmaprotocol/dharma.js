// External libraries
import * as _ from "lodash";

// Utils
import { BigNumber } from "../../../utils/bignumber";
import { TOKEN_REGISTRY_TRACKED_TOKENS } from "../../../utils/constants";

// Types
import { TokenAmount } from "../../../src/types";

describe("TokenAmount (Unit)", () => {
    const symbol = "REP";
    const registryDataForREP = _.find(
        TOKEN_REGISTRY_TRACKED_TOKENS,
        (tokenObject) => tokenObject.symbol === symbol,
    );
    const numDecimals = registryDataForREP.decimals;
    const amount = 10.2;
    const amountAsString = `${amount} ${symbol}`;
    const rawAmount = new BigNumber(amount).times(
        new BigNumber(10).pow(registryDataForREP.decimals),
    );

    describe("instantiation", () => {
        const tokenAmount = new TokenAmount(amount, symbol);

        test("should expose the token amount as raw big number", () => {
            expect(tokenAmount.rawAmount).toEqual(rawAmount);
        });

        test("should expose token amount in decimal", () => {
            expect(tokenAmount.decimalAmount).toEqual(amount);
        });

        test("should expose the token amount as a string", () => {
            expect(tokenAmount.toString()).toEqual(amountAsString);
        });

        test("should expose metadata about the underyling token", () => {
            expect(tokenAmount.tokenSymbol).toEqual(symbol);
            expect(tokenAmount.tokenNumDecimals).toEqual(numDecimals);
            expect(tokenAmount.tokenName).toEqual(registryDataForREP.name);
        });
    });

    describe("#fromRaw", () => {
        const tokenAmount = TokenAmount.fromRaw(rawAmount, symbol);

        test("should expose the token amount as raw big number", () => {
            expect(tokenAmount.rawAmount).toEqual(rawAmount);
        });

        test("should expose token amount in decimal", () => {
            expect(tokenAmount.decimalAmount).toEqual(amount);
        });

        test("should expose the token amount as a string", () => {
            expect(tokenAmount.toString()).toEqual(amountAsString);
        });

        test("should expose metadata about the underyling token", () => {
            expect(tokenAmount.tokenSymbol).toEqual(symbol);
            expect(tokenAmount.tokenNumDecimals).toEqual(numDecimals);
            expect(tokenAmount.tokenName).toEqual(registryDataForREP.name);
        });
    });
});
