import { Dharma } from "../../../../src";

import { MaxLTVLoanOffer } from "../../../../src/types";

import { MaxLTVParams } from "../../../../src/types/loan_offer/max_ltv";

import { generateSignedPrice } from "../utils/generate_signed_price";

import { ACCOUNTS } from "../../../accounts";

export async function testSignAsDebtor(dharma: Dharma, params: MaxLTVParams) {
    describe("passing valid params", () => {
        const creditor = ACCOUNTS[0].address;
        const priceProvider = params.priceProvider;
        const debtor = ACCOUNTS[1].address;

        let loanOffer: MaxLTVLoanOffer;

        beforeEach(() => {
            loanOffer = new MaxLTVLoanOffer(dharma, params);
        });

        test("signs the offer as the debtor if all prerequisites are met", async () => {
            const isSignedByDebtorBefore = loanOffer.isSignedByDebtor();
            expect(isSignedByDebtorBefore).toBe(false);

            await loanOffer.signAsCreditor(creditor);

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

            loanOffer.setCollateralAmount(160);

            await loanOffer.signAsDebtor(debtor);

            const isSignedByDebtorAfter = loanOffer.isSignedByDebtor();
            expect(isSignedByDebtorAfter).toBe(true);
        });
    });
}
