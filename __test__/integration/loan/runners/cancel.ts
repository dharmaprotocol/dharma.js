// Debt Order
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/types/dharma";

export async function testCancel(dharma: Dharma, params: LoanRequestParams) {
    describe("for an open loan request", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        describe("calling cancel before the request has been signed by the debtor", () => {
            test(`throws`, async () => {
                await expect(loanRequest.cancel()).rejects.toThrow();
            });
        });

        describe("calling cancel once the request has been signed by the debtor", () => {
            beforeAll(async () => {
                await loanRequest.signAsDebtor();
            });

            test(`returns a tx hash`, async () => {
                const txHash = await loanRequest.cancel();

                expect(txHash).toBeDefined();
                expect(typeof txHash).toEqual("string");
            });
        });
    });
}
