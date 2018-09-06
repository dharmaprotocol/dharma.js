import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

import { Dharma } from "../../../../src/types/dharma";

export async function testCreate(dharma: Dharma, params: LoanRequestParams) {
    describe("passing valid params", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        test("eventually returns an instance of a LoanRequest", () => {
            expect(loanRequest instanceof LoanRequest).toBeTruthy();
        });

        test("not signed by the debtor", async () => {
            const isSignedByDebtor = await loanRequest.isSignedByDebtor();

            expect(isSignedByDebtor).toEqual(false);
        });
    });
}
