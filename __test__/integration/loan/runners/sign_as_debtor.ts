// Debt Order
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testSignAsDebtor(dharma: Dharma, params: LoanRequestParams) {
    describe("when the loan request is first created", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
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
