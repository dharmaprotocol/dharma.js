// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

export async function testCreate(dharma: Dharma, params: DebtOrderParams, index: number) {
    describe(`scenario ${index}`, () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, params);
        });

        test("eventually returns an instance of DebtOrder", () => {
            expect(debtOrder instanceof DebtOrder).toBeTruthy();
        });
    });
}
