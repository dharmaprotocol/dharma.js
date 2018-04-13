import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";
import { Orders } from "../scenarios/orders";

export class OwnerOfScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.OwnerOfScenario) {
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

                if (scenario.transferee) {
                    await debtTokenAPI.transfer(scenario.transferee, orderOneTokenID, {
                        from: scenario.orderFilledByCreditorOne.creditor,
                    });

                    await debtTokenAPI.transfer(scenario.transferee, orderTwoTokenID, {
                        from: scenario.orderFilledByCreditorTwo.creditor,
                    });
                }

                apiCallPromise = debtTokenAPI.ownerOf(scenarioTokenID);
            });

            if (scenario.shouldSucceed) {
                if (scenario.transferee) {
                    test("returns the address of the transferee", async () => {
                        await expect(apiCallPromise).resolves.toEqual(scenario.transferee);
                    });
                } else {
                    test("returns the address of the creditor", async () => {
                        await expect(apiCallPromise).resolves.toEqual(
                            scenario.orderFilledByCreditorOne.creditor,
                        );
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
