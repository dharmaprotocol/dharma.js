import { Dharma } from "../../../../src";

import { MaxLTVLoanOffer } from "../../../../src/types";

import { MAX_LTV_LOAN_OFFER_ERRORS, MaxLTVParams } from "../../../../src/types/loan_offer/max_ltv";

import { generateSignedPrice } from "../utils/generate_signed_price";

import { ACCOUNTS } from "../../../accounts";

export async function testSignAsDebtor(dharma: Dharma, params: MaxLTVParams) {
    describe("passing valid params", () => {
        const creditor = ACCOUNTS[0].address;
        const priceProvider = params.priceProvider;
        const debtor = ACCOUNTS[1].address;

        let loanOffer: MaxLTVLoanOffer;

        async function setPrices() {
            const principalTokenAddress = await dharma.contracts.getTokenAddressBySymbolAsync(
                params.principalToken,
            );
            const collateralTokenAddress = await dharma.contracts.getTokenAddressBySymbolAsync(
                params.collateralToken,
            );

            const principalPrice = await generateSignedPrice(
                dharma,
                priceProvider,
                principalTokenAddress,
                10,
                Math.round(Date.now() / 1000),
            );
            const collateralPrice = await generateSignedPrice(
                dharma,
                priceProvider,
                collateralTokenAddress,
                10,
                Math.round(Date.now() / 1000),
            );

            loanOffer.setPrincipalPrice(principalPrice);
            loanOffer.setCollateralPrice(collateralPrice);
        }

        beforeEach(() => {
            loanOffer = new MaxLTVLoanOffer(dharma, params);
        });

        test("signs the offer as the debtor if all prerequisites are met", async () => {
            const isSignedByDebtorBefore = loanOffer.isSignedByDebtor();
            expect(isSignedByDebtorBefore).toBe(false);

            await loanOffer.signAsCreditor(creditor);

            await setPrices();

            loanOffer.setCollateralAmount(160);

            await loanOffer.signAsDebtor(debtor);

            const isSignedByDebtorAfter = loanOffer.isSignedByDebtor();
            expect(isSignedByDebtorAfter).toBe(true);
        });

        describe("should throw", () => {
            test("when the debtor has already signed", async () => {
                const isSignedByDebtorBefore = loanOffer.isSignedByDebtor();
                expect(isSignedByDebtorBefore).toBe(false);

                await loanOffer.signAsCreditor(creditor);

                await setPrices();

                loanOffer.setCollateralAmount(160);

                await loanOffer.signAsDebtor(debtor);

                // second attempt to sign as debtor
                await expect(loanOffer.signAsDebtor(debtor)).rejects.toThrow(
                    MAX_LTV_LOAN_OFFER_ERRORS.ALREADY_SIGNED_BY_DEBTOR(),
                );
            });

            test("when prices are not set", async () => {
                const isSignedByDebtorBefore = loanOffer.isSignedByDebtor();
                expect(isSignedByDebtorBefore).toBe(false);

                await loanOffer.signAsCreditor(creditor);

                loanOffer.setCollateralAmount(160);

                await expect(loanOffer.signAsDebtor(debtor)).rejects.toThrow(
                    MAX_LTV_LOAN_OFFER_ERRORS.PRICES_NOT_SET(),
                );
            });

            test("when the collateral amount is not set", async () => {
                const isSignedByDebtorBefore = loanOffer.isSignedByDebtor();
                expect(isSignedByDebtorBefore).toBe(false);

                await loanOffer.signAsCreditor(creditor);

                await setPrices();

                await expect(loanOffer.signAsDebtor(debtor)).rejects.toThrow(
                    MAX_LTV_LOAN_OFFER_ERRORS.COLLATERAL_AMOUNT_NOT_SET(),
                );
            });

            test("when the collateral amount is insufficient", async () => {
                const isSignedByDebtorBefore = loanOffer.isSignedByDebtor();
                expect(isSignedByDebtorBefore).toBe(false);

                await loanOffer.signAsCreditor(creditor);

                await setPrices();

                const collateralAmount = 10;

                loanOffer.setCollateralAmount(collateralAmount);

                await expect(loanOffer.signAsDebtor(debtor)).rejects.toThrow(
                    MAX_LTV_LOAN_OFFER_ERRORS.INSUFFICIENT_COLLATERAL_AMOUNT(
                        collateralAmount,
                        params.collateralToken,
                    ),
                );
            });
        });
    });
}
