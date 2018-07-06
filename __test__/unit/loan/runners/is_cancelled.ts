// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testIsCancelled(dharma: Dharma, params: DebtOrderParams) {
    let debtOrder: DebtOrder;

    describe("when an order has just been opened", () => {
        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, params);
        });

        test(`eventually returns false`, async () => {
            const isCancelled = await debtOrder.isCancelled();

            expect(isCancelled).toEqual(false);
        });
    });

    describe("when an order has been cancelled", () => {
        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, params);
            await debtOrder.cancelAsDebtor();
        });

        test(`eventually returns true`, async () => {
            const isCancelled = await debtOrder.isCancelled();

            expect(isCancelled).toEqual(true);
        });
    });
}
