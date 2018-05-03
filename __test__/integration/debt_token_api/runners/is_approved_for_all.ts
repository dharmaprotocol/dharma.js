import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";

export class IsApprovedForAllScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.IsApprovedForAllScenario) {
        const { debtTokenAPI } = this.testAPIs;

        let apiCall: Promise<boolean>;

        describe(scenario.description, () => {
            beforeEach(async () => {
                if (scenario.isOperatorApproved) {
                    await debtTokenAPI.setApprovalForAllAsync(scenario.operator, true, {
                        from: scenario.owner,
                    });
                }

                apiCall = debtTokenAPI.isApprovedForAll(scenario.owner, scenario.operator);
            });

            if (scenario.shouldSucceed) {
                test("returns status of operator vis-a-vis owner", async () => {
                    await expect(apiCall).resolves.toBe(scenario.isOperatorApproved);
                });
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    await expect(apiCall).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }
}
