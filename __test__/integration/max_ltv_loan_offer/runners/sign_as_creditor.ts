import { Dharma } from "../../../../src";

import { MaxLTVLoanOffer } from "../../../../src/types";

import { MaxLTVParams } from "../../../../src/types/loan_offer/max_ltv";

import { ACCOUNTS } from "../../../accounts";

export async function testSignAsCreditor(dharma: Dharma, params: MaxLTVParams) {
    describe("passing valid params", () => {
        const creditor = ACCOUNTS[0].address;

        let loanOffer: MaxLTVLoanOffer;

        beforeEach(async () => {
            loanOffer = await MaxLTVLoanOffer.create(dharma, params);
        });

        test("signs the offer as the creditor", async () => {
            const isSignedByCreditorBefore = loanOffer.isSignedByCreditor();
            expect(isSignedByCreditorBefore).toBe(false);

            await loanOffer.signAsCreditor(creditor);

            const isSignedByCreditorAfter = loanOffer.isSignedByCreditor();
            expect(isSignedByCreditorAfter).toBe(true);
        });
    });
}
