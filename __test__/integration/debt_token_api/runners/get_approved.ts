import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";
import { Orders } from "../scenarios/orders";
import { NULL_ADDRESS } from "utils/constants";

export class GetApprovedScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.GetApprovedScenario) {
        const { debtTokenAPI } = this.testAPIs;

        let apiCallPromise: Promise<string>;

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

                if (scenario.isApproved) {
                    await debtTokenAPI.approveAsync(scenario.approvee, orderOneTokenID, {
                        from: scenario.orderFilledByCreditorOne.creditor,
                    });

                    await debtTokenAPI.approveAsync(scenario.approvee, orderTwoTokenID, {
                        from: scenario.orderFilledByCreditorTwo.creditor,
                    });
                }

                apiCallPromise = debtTokenAPI.getApproved(scenarioTokenID);
            });

            if (scenario.shouldSucceed) {
                if (scenario.isApproved) {
                    test("returns the address of the approvee", async () => {
                        await expect(apiCallPromise).resolves.toEqual(scenario.approvee);
                    });
                } else {
                    test("returns the NULL address", async () => {
                        await expect(apiCallPromise).resolves.toEqual(NULL_ADDRESS);
                    });
                }
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    await expect(apiCallPromise).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }
}
