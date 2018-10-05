import { LoanRequest } from "../../../../src/loan";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { Dharma } from "../../../../src/types/dharma";

export async function testSignAsDebtor(dharma: Dharma, params: DebtOrderParams) {
    describe("when the loan request is first created", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create<LoanRequest>(dharma, params);
        });

        test("returns false", () => {
            expect(loanRequest.isSignedByDebtor()).toEqual(false);
        });

        describe("once the loan request has been signed by the debtor", () => {
            beforeAll(async () => {
                await loanRequest.signAsDebtor();
            });

            test("returns true", () => {
                expect(loanRequest.isSignedByDebtor()).toEqual(true);
            });
        });
    });
}
