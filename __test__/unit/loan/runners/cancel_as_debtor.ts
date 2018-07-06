// Debt Order
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testCancel(dharma: Dharma, params: LoanRequestParams) {
    describe("when the cancel function is called on an open order", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        it(`calls dharma.order.cancelOrderAsync`, async () => {
            const spy = jest.spyOn(dharma.order, "cancelOrderAsync");

            await loanRequest.cancelAsDebtor();

            expect(spy).toHaveBeenCalled();
        });
    });
}
