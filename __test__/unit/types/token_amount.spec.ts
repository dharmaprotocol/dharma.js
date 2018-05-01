// utils
import * as _ from "lodash";
import { BigNumber } from "../../../utils/bignumber";
import { TOKEN_REGISTRY_TRACKED_TOKENS } from "../../../utils/constants";

// types
import { TokenAmount, TokenAmountType } from "../../../src/types/token_amount";

describe("TokenAmount", () => {
    describe("instantiation", () => {
        const symbol = "REP";
        const registryDataForREP = _.find(
            TOKEN_REGISTRY_TRACKED_TOKENS,
            (tokenObject) => tokenObject.symbol === symbol,
        );
        const numDecimals = new BigNumber(registryDataForREP.decimals);
        const decimalAmount = new BigNumber(4.5);
        const rawAmount = decimalAmount.times(new BigNumber(10).pow(registryDataForREP.decimals));
        const amountAsString = `${decimalAmount} ${symbol}`;

        describe("with valid decimal amount", () => {
            const tokenAmount = new TokenAmount({
                symbol,
                amount: decimalAmount,
                type: TokenAmountType.Decimal,
            });

            test("should expose the token amount as raw big number", () => {
                expect(tokenAmount.rawAmount).toEqual(rawAmount);
            });

            test("should expose token amount in decimal", () => {
                expect(tokenAmount.decimalAmount).toEqual(decimalAmount);
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

        describe("with valid raw amount", () => {
            const tokenAmount = new TokenAmount({
                symbol,
                amount: rawAmount,
                type: TokenAmountType.Raw,
            });

            test("should expose the token amount as raw big number", () => {
                expect(tokenAmount.rawAmount).toEqual(rawAmount);
            });

            test("should expose token amount in decimal", () => {
                expect(tokenAmount.decimalAmount).toEqual(decimalAmount);
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
});
