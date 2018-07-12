// Debt Order
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testIsCancelled(dharma: Dharma, params: LoanRequestParams) {
    let loanRequest: LoanRequest;

    describe("when an order has just been opened", () => {
        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        test(`eventually returns false`, async () => {
            const isCancelled = await loanRequest.isCancelled();

            expect(isCancelled).toEqual(false);
        });
    });

    describe("when an order has been cancelled", () => {
        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
            await loanRequest.cancel();
        });

        test(`eventually returns true`, async () => {
            const isCancelled = await loanRequest.isCancelled();

            expect(isCancelled).toEqual(true);
        });
    });
}
