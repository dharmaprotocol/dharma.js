// External
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";

// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";

export class OwnerOfScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.OwnerOfScenario) {
        const { debtTokenAPI, orderAPI } = this.testAPIs;
        let tokenIDs: BigNumber[];

        describe(scenario.description, () => {
            beforeEach(async () => {
                tokenIDs = await Promise.all(scenario.orders.map(this.tokenIDForOrder));

                if (scenario.shouldTransferTo) {
                    for (let id of tokenIDs) {
                        await debtTokenAPI.transfer(scenario.shouldTransferTo, id, {
                            from: scenario.creditor,
                        });
                    }
                }
            });

            test("returns the correct owner", async () => {
                for (let tokenID of tokenIDs) {
                    const owner = await debtTokenAPI.ownerOf(tokenID);
                    if (scenario.shouldTransferTo) {
                        expect(owner).toEqual(scenario.shouldTransferTo);
                    } else {
                        expect(owner).toEqual(scenario.creditor);
                    }
                }
            });
        });
    }
}
