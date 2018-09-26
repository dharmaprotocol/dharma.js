import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

export async function testCreateAndSignAsCreditor(dharma: Dharma, params: DebtOrderParams) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        beforeAll(async () => {
            loanOffer = await LoanOffer.createAndSignAsCreditor(dharma, params);
        });

        test("is signed by the creditor", async () => {
            const isSignedByCreditor = await loanOffer.isSignedByCreditor();

            expect(isSignedByCreditor).toEqual(true);
        });

        test("is not signed by the debtor", async () => {
            const isSignedByDebtor = await loanOffer.isSignedByDebtor();

            expect(isSignedByDebtor).toEqual(false);
        });
    });
}
