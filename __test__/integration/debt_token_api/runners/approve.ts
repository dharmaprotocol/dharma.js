// External
import { BigNumber } from "utils/bignumber";

// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";

export class ApproveScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.ApproveScenario) {
        const { debtTokenAPI } = this.testAPIs;

        let tokenIDs: BigNumber[];

        describe(scenario.description, () => {
            beforeEach(async () => {
                if (scenario.shouldGenerateTokens) {
                    tokenIDs = await Promise.all(
                        scenario.orders.map(this.generateDebtTokenForOrder),
                    );
                } else {
                    tokenIDs = await Promise.all(
                        scenario.orders.map(this.getDebtTokenIDFromUnfilledOrder),
                    );
                }
            });

            if (scenario.shouldSucceed) {
                test("approvee is approved", async () => {
                    for (let tokenID of tokenIDs) {
                        await debtTokenAPI.approve(scenario.approvee, tokenID, {
                            from: scenario.approver,
                        });
                        const approved = await debtTokenAPI.getApproved(tokenID);
                        expect(approved).toEqual(scenario.approvee);
                    }
                });
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    for (let tokenID of tokenIDs) {
                        await expect(
                            debtTokenAPI.approve(scenario.approvee, tokenID, {
                                from: scenario.approver,
                            }),
                        ).rejects.toThrow(scenario.errorMessage);
                    }
                });
            }
        });
    }
}
