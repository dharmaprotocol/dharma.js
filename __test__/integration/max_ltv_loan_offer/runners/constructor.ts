import { Dharma } from "../../../../src";

import { MaxLTVLoanOffer } from "../../../../src/types";

import { MaxLTVParams } from "../../../../src/types/loan_offer/max_ltv";

export function testConstructor(dharma: Dharma, params: MaxLTVParams) {
    describe("passing valid params", () => {
        let loanOffer: MaxLTVLoanOffer;

        beforeEach(async () => {
            loanOffer = await MaxLTVLoanOffer.create(dharma, params);
        });

        test("returns a MaxLTVLoanOffer", () => {
            expect(loanOffer).toBeInstanceOf(MaxLTVLoanOffer);
        });

        test("not signed by the debtor", () => {
            const isSignedByDebtor = loanOffer.isSignedByDebtor();

            expect(isSignedByDebtor).toEqual(false);
        });

        test("not signed by the creditor", () => {
            const isSignedByCreditor = loanOffer.isSignedByCreditor();

            expect(isSignedByCreditor).toEqual(false);
        });
    });
}
