import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

export async function testSignAsCreditor(dharma: Dharma, params: DebtOrderParams) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        beforeAll(async () => {
            loanOffer = await LoanOffer.create<LoanOffer>(dharma, params);
        });

        test("is signed by the creditor", async () => {
            const isSignedByCreditorBefore = await loanOffer.isSignedByCreditor();
            expect(isSignedByCreditorBefore).toEqual(false);

            await loanOffer.signAsCreditor();

            const isSignedByCreditorAfter = await loanOffer.isSignedByCreditor();
            expect(isSignedByCreditorAfter).toEqual(true);
        });
    });
}
