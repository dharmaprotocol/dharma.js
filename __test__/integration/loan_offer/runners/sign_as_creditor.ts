import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

export async function testSignAsCreditor(dharma: Dharma, params: any) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        beforeAll(async () => {
            loanOffer = await LoanOffer.create(dharma, params);
        });

        test("is signed by the creditor", async () => {
            let isSignedByCreditor = await loanOffer.isSignedByCreditor();
            expect(isSignedByCreditor).toEqual(false);

            await loanOffer.signAsCreditor();

            isSignedByCreditor = await loanOffer.isSignedByCreditor();
            expect(isSignedByCreditor).toEqual(true);
        });
    });
}
