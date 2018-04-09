// External
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";

// Types
import { ScenarioRunner, TestAPIs, TestAdapters } from "./";
import { DebtTokenScenario } from "../scenarios";

export class OwnerOfScenarioRunner extends ScenarioRunner {
    public testScenario(
        scenario: DebtTokenScenario.OwnerOfScenario,
        web3: Web3,
        testAPIs: TestAPIs,
        testAdapters: TestAdapters,
    ) {
        const { debtTokenAPI, orderAPI } = testAPIs;

        let tokenIDs: BigNumber[] = [];

        describe(scenario.description, () => {
            beforeEach(async () => {
                for (let loanOrder of scenario.orders) {
                    const order = await this.generateDebtTokenForOrder(
                        loanOrder,
                        web3,
                        testAPIs,
                        testAdapters,
                    );
                    const tokenIDAsString = await orderAPI.getIssuanceHash(order);
                    const tokenID = new BigNumber(tokenIDAsString);

                    if (scenario.shouldTransferTo) {
                        await debtTokenAPI.transfer(scenario.shouldTransferTo, tokenID, {
                            from: scenario.creditor,
                        });
                    }

                    tokenIDs.push(tokenID);
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
