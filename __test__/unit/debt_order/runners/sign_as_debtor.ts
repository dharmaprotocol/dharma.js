// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

export async function testSignAsDebtor(dharma: Dharma, params: DebtOrderParams) {
    describe("when the order is already signed by the debtor during #create", () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, params);
        });

        it("it does not call dharma.sign.byDebtor", async () => {
            const spy = jest.spyOn(dharma.sign, "asDebtor");

            await debtOrder.signAsDebtor();

            expect(spy).not.toHaveBeenCalled();
        });
    });
}
