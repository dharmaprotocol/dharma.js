// External
import * as Web3 from "web3";

// Types
import { ScenarioRunner, TestAPIs, TestAdapters } from "./";
import { DebtTokenScenario } from "../scenarios";

export class BalanceOfScenarioRunner extends ScenarioRunner {
    public testScenario(
        scenario: DebtTokenScenario.BalanceOfScenario,
        web3: Web3,
        testAPIs: TestAPIs,
        testAdapters: TestAdapters,
    ) {
        const { debtTokenAPI } = testAPIs;

        describe(scenario.description, () => {
            beforeEach(async () => {
                for (let order of scenario.orders) {
                    await this.generateDebtTokenForOrder(order, web3, testAPIs, testAdapters);
                }
            });

            test("returns correct balance of debt tokens", async () => {
                const computedBalance = await debtTokenAPI.balanceOf(scenario.creditor);
                expect(computedBalance.toNumber()).toEqual(scenario.balance);
            });
        });
    }
}
