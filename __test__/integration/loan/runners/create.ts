// Debt Order
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testCreate(dharma: Dharma, params: LoanRequestParams) {
    describe("valid params", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        test("eventually returns an instance of DebtOrder", () => {
            expect(loanRequest instanceof LoanRequest).toBeTruthy();
        });
    });
}
