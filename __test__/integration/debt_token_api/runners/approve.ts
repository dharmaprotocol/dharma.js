// External
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";

// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";

export class ApproveScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.ApproveScenario) {
        const { debtTokenAPI, orderAPI } = this.testAPIs;

        let tokenIDs: BigNumber[];

        describe(scenario.description, () => {
            beforeEach(async () => {
                tokenIDs = await Promise.all(scenario.orders.map(this.generateDebtTokenForOrder));
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
