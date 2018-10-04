import { LoanRequest } from "../../../../src/loan";

import { Dharma } from "../../../../src/types/dharma";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

export async function testIsCancelled(dharma: Dharma, params: DebtOrderParams) {
    let loanRequest: LoanRequest;

    describe("when an order has just been opened", () => {
        beforeAll(async () => {
            loanRequest = await LoanRequest.create<LoanRequest>(dharma, params);
        });

        test(`eventually returns false`, async () => {
            const isCancelled = await loanRequest.isCancelled();

            expect(isCancelled).toEqual(false);
        });
    });

    describe("when an order has been cancelled", () => {
        beforeAll(async () => {
            loanRequest = await LoanRequest.createAndSignAsDebtor(dharma, params);
            await loanRequest.cancel();
        });

        test(`eventually returns true`, async () => {
            const isCancelled = await loanRequest.isCancelled();

            expect(isCancelled).toEqual(true);
        });
    });
}
