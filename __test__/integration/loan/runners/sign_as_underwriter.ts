import { LoanRequest } from "../../../../src/loan";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { Dharma } from "../../../../src/types/dharma";

export async function testSignAsUnderwriter(dharma: Dharma, params: DebtOrderParams) {
    describe("when the loan request is first created", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create<LoanRequest>(dharma, params);
        });

        test("`isSignedByUnderwriter` returns false", () => {
            expect(loanRequest.isSignedByUnderwriter()).toEqual(false);
        });

        describe("once the loan request has been signed by the underwriter", () => {
            beforeAll(async () => {
                await loanRequest.signAsUnderwriter(params.underwriterAddress);
            });

            test("`isSignedByUnderwriter` returns true", () => {
                expect(loanRequest.isSignedByUnderwriter()).toEqual(true);
            });
        });
    });
}
