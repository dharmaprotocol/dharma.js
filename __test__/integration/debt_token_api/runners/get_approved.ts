// External
import { BigNumber } from "utils/bignumber";

// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";
import { Orders } from "../scenarios/orders";
import { NULL_ADDRESS } from "utils/constants";

export class GetApprovedScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.GetApprovedScenario) {
        const { debtTokenAPI } = this.testAPIs;

        let tokenIDs: BigNumber[];

        describe(scenario.description, () => {
            beforeEach(async () => {
                tokenIDs = await Promise.all(scenario.orders.map(this.generateDebtTokenForOrder));

                if (scenario.isApproved) {
                    for (let id of tokenIDs) {
                        await debtTokenAPI.approve(Orders.APPROVED, id, {
                            from: scenario.creditor,
                        });
                    }
                }
            });

            if (scenario.isApproved) {
                test("returns the approved address", async () => {
                    for (let tokenID of tokenIDs) {
                        await expect(debtTokenAPI.getApproved(tokenID)).resolves.toEqual(
                            Orders.APPROVED,
                        );
                    }
                });
            } else {
                test("returns the NULL address", async () => {
                    for (let tokenID of tokenIDs) {
                        await expect(debtTokenAPI.getApproved(tokenID)).resolves.toEqual(
                            NULL_ADDRESS,
                        );
                    }
                });
            }
        });
    }
}
