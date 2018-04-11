// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";

export class BalanceOfScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.BalanceOfScenario) {
        describe(scenario.description, () => {
            beforeEach(async () => {
                for (let order of scenario.orders) {
                    await this.generateDebtTokenForOrder(order);
                }
            });

            test("returns correct balance of debt tokens", async () => {
                const { debtTokenAPI } = this.testAPIs;
                const computedBalance = await debtTokenAPI.balanceOf(scenario.creditor);
                expect(computedBalance.toNumber()).toEqual(scenario.balance);
            });
        });
    }
}
