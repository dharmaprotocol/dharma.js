// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testIsSignedByDebtor(dharma: Dharma, params: DebtOrderParams) {
    describe("after DebtOrder initialization", () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, params);
        });

        it("returns true", () => {
            expect(debtOrder.isSignedByDebtor()).toEqual(true);
        });
    });
}
