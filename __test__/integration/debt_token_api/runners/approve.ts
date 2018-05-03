import { BigNumber } from "utils/bignumber";

// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";
import { Orders } from "../scenarios/orders";

export class ApproveScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.ApproveScenario) {
        const { debtTokenAPI } = this.testAPIs;

        let apiCallPromise: Promise<string>;

        let scenarioTokenID: BigNumber;

        describe(scenario.description, () => {
            beforeEach(async () => {
                const orderOneTokenID = await this.generateDebtTokenForOrder(
                    scenario.orderFilledByCreditorOne,
                );

                const orderTwoTokenID = await this.generateDebtTokenForOrder(
                    scenario.orderFilledByCreditorTwo,
                );

                scenarioTokenID = scenario.tokenID(
                    orderOneTokenID,
                    orderTwoTokenID,
                    Orders.NONEXISTENT_TOKEN_ID,
                    Orders.MALFORMED_TOKEN_ID,
                );

                apiCallPromise = debtTokenAPI.approveAsync(scenario.approvee, scenarioTokenID, {
                    from: scenario.approver,
                });
            });

            if (scenario.shouldSucceed) {
                test("approvee is approved", async () => {
                    await apiCallPromise;
                    const approved = await debtTokenAPI.getApproved(scenarioTokenID);
                    expect(approved).toEqual(scenario.approvee);
                });
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    await expect(apiCallPromise).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }
}
