// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

export async function testCancel(dharma: Dharma, params: DebtOrderParams) {
    describe("when the cancel function is called on an open order", () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, params);
        });

        it(`calls dharma.order.cancelOrderAsync`, async () => {
            const spy = jest.spyOn(dharma.order, "cancelOrderAsync");

            await debtOrder.cancelAsDebtor();

            expect(spy).toHaveBeenCalled();
        });
    });
}
