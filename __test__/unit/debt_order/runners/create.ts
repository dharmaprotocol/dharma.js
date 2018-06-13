// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

export class CreateRunner {
    constructor(private readonly dharma: Dharma) {}

    public async testCreate(params: DebtOrderParams) {
        describe(`when given ${JSON.stringify(params)}`, async () => {
            let debtOrder: DebtOrder;

            beforeAll(async () => {
                debtOrder = await DebtOrder.create(this.dharma, params);
            });

            it("eventually returns an instance of DebtOrder", async () => {
                expect(typeof debtOrder).toBe(DebtOrder);
            });
        });
    }
}
