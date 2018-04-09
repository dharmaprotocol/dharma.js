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

                for (let tokenID of tokenIDs) {
                    await debtTokenAPI.transfer(scenario.transferee, tokenID, {
                        from: scenario.transferer,
                    });
                }
            });

            test("returns the correct owner of the debt token", async () => {
                for (let tokenID of tokenIDs) {
                    const owner = await debtTokenAPI.ownerOf(tokenID);
                    if (scenario.shouldSucceed) {
                        expect(owner).toEqual(scenario.transferee);
                    } else {
                        expect(owner).toEqual(scenario.creditor);
                    }
                }
            });
        });
    }
}
