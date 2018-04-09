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
                    const tokenID = await orderAPI.getIssuanceHash(order);
                    tokenIDs.push(new BigNumber(tokenID));
                }
            });

            test("returns the correct owner", async () => {
                for (let tokenID of tokenIDs) {
                    const owner = await debtTokenAPI.ownerOf(tokenID);
                    expect(owner).toEqual(scenario.creditor);
                }
            });
        });
    }
}
