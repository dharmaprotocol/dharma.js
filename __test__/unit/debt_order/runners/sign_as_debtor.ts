// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

export async function testSignAsDebtor(dharma: Dharma, params: DebtOrderParams) {
    const spy = jest.spyOn(dharma.sign, "asDebtor");

    describe("when the order is already signed by the debtor", () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, params);

            await debtOrder.signAsDebtor();
        });

        it("does not call dharma.sign.asDebtor", async () => {
            expect(spy).not.toBeCalled();
        });
    });
}
