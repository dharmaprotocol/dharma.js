// Debt Order
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testIsSignedByDebtor(dharma: Dharma, params: LoanRequestParams) {
    describe("after LoanRequest initialization", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        it("returns true", () => {
            expect(loanRequest.isSignedByDebtor()).toEqual(true);
        });
    });
}
