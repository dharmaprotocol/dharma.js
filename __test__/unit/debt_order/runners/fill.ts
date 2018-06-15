// Types
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";
import { Address } from "../../../../src/types";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

// Test utils
import { ACCOUNTS } from "../../../accounts";

import { FillScenario } from "../scenarios/fill_scenarios";

export async function testFill(dharma: Dharma, scenario: FillScenario) {
    describe(scenario.description, () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, scenario.debtOrderParams);
            scenario.setUpDebtOrder(debtOrder);
        });

        if (scenario.shouldSucceed) {
            test.only("#fill succeeds", async () => {
                const fillTransactionHash = await debtOrder.fillAsCreditor(
                    scenario.creditorAddress,
                );

                await dharma.blockchain.awaitTransactionMinedAsync(fillTransactionHash);
                // test the transaction receipt is correct
            });
        } else {
            test("#fill fails", async () => {
                const fillTransactionHash = await debtOrder.fillAsCreditor(
                    scenario.creditorAddress,
                );

                // test the transaction fails
            });
        }
    });
}
