import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

export async function testCreate(dharma: Dharma, params: DebtOrderParams) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        beforeAll(async () => {
            loanOffer = await LoanOffer.create<LoanOffer>(dharma, params);
        });

        test("not signed by the debtor", async () => {
            const isSignedByDebtor = await loanOffer.isSignedByDebtor();

            expect(isSignedByDebtor).toEqual(false);
        });

        test("not signed by the creditor", async () => {
            const isSignedByCreditor = await loanOffer.isSignedByCreditor();

            expect(isSignedByCreditor).toEqual(false);
        });
    });
}
