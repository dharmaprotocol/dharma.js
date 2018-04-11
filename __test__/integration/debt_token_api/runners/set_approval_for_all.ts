import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";

export class SetApprovalForAllScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.SetApprovalForAllScenario) {
        const { debtTokenAPI } = this.testAPIs;

        let apiCall: Promise<string>;

        describe(scenario.description, () => {
            beforeEach(() => {
                apiCall = debtTokenAPI.setApprovalForAll(scenario.operator, scenario.approved, {
                    from: scenario.from,
                });
            });

            if (scenario.shouldSucceed) {
                test("updates operator's permissioning accordingly", async () => {
                    await apiCall;
                    await expect(
                        debtTokenAPI.isApprovedForAll(scenario.from, scenario.operator),
                    ).resolves.toBe(scenario.approved);
                });
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    await expect(apiCall).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }
}
