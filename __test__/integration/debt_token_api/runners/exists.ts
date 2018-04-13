// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";
import { Orders } from "../scenarios/orders";

export class ExistsScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.ExistsScenario) {
        const { debtTokenAPI } = this.testAPIs;

        let apiCallPromise: Promise<boolean>;

        describe(scenario.description, () => {
            beforeEach(async () => {
                const orderOneTokenID = await this.generateDebtTokenForOrder(
                    scenario.orderFilledByCreditorOne,
                );

                const orderTwoTokenID = await this.generateDebtTokenForOrder(
                    scenario.orderFilledByCreditorTwo,
                );

                const scenarioTokenID = scenario.tokenID(
                    orderOneTokenID,
                    orderTwoTokenID,
                    Orders.NONEXISTENT_TOKEN_ID,
                    Orders.MALFORMED_TOKEN_ID,
                );

                apiCallPromise = debtTokenAPI.exists(scenarioTokenID);
            });

            if (scenario.shouldSucceed) {
                test("approvee is approved", async () => {
                    await expect(apiCallPromise).resolves.toEqual(scenario.shouldExist);
                });
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    await expect(apiCallPromise).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }
}
