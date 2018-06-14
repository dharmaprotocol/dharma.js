// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

import { IsExpiredScenario } from "../scenarios/is_expired_scenarios";

export async function testExpired(dharma: Dharma, scenario: IsExpiredScenario) {
    describe(scenario.description, () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, scenario.params);
        });

        test(`eventually returns ${scenario.isExpired}`, async () => {
            const isExpired = await debtOrder.isExpired();

            expect(isExpired).toEqual(scenario.isExpired);
        });
    });
}
