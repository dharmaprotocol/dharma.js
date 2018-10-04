import { LoanRequest } from "../../../../src/loan";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { Dharma } from "../../../../src/types/dharma";

export async function testCreate(dharma: Dharma, params: DebtOrderParams) {
    describe("passing valid params", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create<LoanRequest>(dharma, params);
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
