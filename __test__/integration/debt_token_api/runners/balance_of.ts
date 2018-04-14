// Types
import { BigNumber } from "utils/bignumber";
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";

export class BalanceOfScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.BalanceOfScenario) {
        const { debtTokenAPI } = this.testAPIs;

        let apiCallPromise: Promise<BigNumber>;

        describe(scenario.description, () => {
            beforeEach(async () => {
                for (let order of scenario.orders) {
                    await this.generateDebtTokenForOrder(order);
                }
                apiCallPromise = debtTokenAPI.balanceOf(scenario.owner);
            });

            if (scenario.shouldSucceed) {
                test("returns correct balance of debt tokens", async () => {
                    await expect(apiCallPromise).resolves.toEqual(new BigNumber(scenario.balance));
                });
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    await expect(apiCallPromise).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }
}
