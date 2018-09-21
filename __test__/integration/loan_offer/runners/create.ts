import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

export async function testCreate(dharma: Dharma, params: any) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        beforeAll(async () => {
            loanOffer = await LoanOffer.create(dharma, params) as LoanOffer;
        });

        test("not signed by the debtor", async () => {
            const isSignedByDebtor = await loanOffer.isSignedByDebtor();

            expect(isSignedByDebtor).toEqual(false);
        });
    });
}
