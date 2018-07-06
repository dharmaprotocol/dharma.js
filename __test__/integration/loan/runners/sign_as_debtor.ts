// Debt Order
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testSignAsDebtor(dharma: Dharma, params: LoanRequestParams) {
    describe("when the order is already signed by the debtor during #create", () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        it("it does not call dharma.sign.byDebtor", async () => {
            const spy = jest.spyOn(dharma.sign, "asDebtor");

            await loanRequest.signAsDebtor();

            expect(spy).not.toHaveBeenCalled();
        });
    });
}
