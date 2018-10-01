import { Dharma } from "../../../../src";

import { MaxLTVLoanOffer } from "../../../../src/types";

import { MaxLTVParams } from "../../../../src/types/loan_offer/max_ltv";

import { ACCOUNTS } from "../../../accounts";

export async function testCreateAndSignAsCreditor(dharma: Dharma, params: MaxLTVParams) {
    describe("passing valid params", () => {
        let loanOffer: MaxLTVLoanOffer;

        beforeEach(async () => {
            const creditor = ACCOUNTS[0].address;

            loanOffer = await MaxLTVLoanOffer.createAndSignAsCreditor(dharma, params, creditor);
        });

        test("returns a MaxLTVLoanOffer", () => {
            expect(loanOffer).toBeInstanceOf(MaxLTVLoanOffer);
        });

        test("not signed by the debtor", () => {
            const isSignedByDebtor = loanOffer.isSignedByDebtor();

            expect(isSignedByDebtor).toEqual(false);
        });

        test("is signed by the creditor", () => {
            const isSignedByCreditor = loanOffer.isSignedByCreditor();

            expect(isSignedByCreditor).toEqual(true);
        });
    });
}
