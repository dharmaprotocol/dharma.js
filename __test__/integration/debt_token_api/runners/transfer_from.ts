// External
import * as Web3 from "web3";
import { BigNumber } from "bignumber.js";

// Types
import { ScenarioRunner, TestAPIs, TestAdapters } from "./";
import { DebtTokenScenario } from "../scenarios";

export class TransferFromScenarioRunner extends ScenarioRunner {
    public testScenario(
        scenario: DebtTokenScenario.TransferFromScenario,
        web3: Web3,
        testAPIs: TestAPIs,
        testAdapters: TestAdapters,
    ) {
        const ARBITRARY_TOKEN_ID = new BigNumber(13);

        const { debtTokenAPI } = testAPIs;
        let tokenID: BigNumber;

        let transferFromPromise: Promise<string>;

        describe(scenario.description, () => {
            beforeEach(async () => {
                const issuanceHash = await this.generateDebtTokenForOrder(
                    scenario.orders[0],
                    web3,
                    testAPIs,
                    testAdapters,
                );

                tokenID = new BigNumber(issuanceHash);

                transferFromPromise = debtTokenAPI.transferFrom(
                    scenario.from,
                    scenario.to,
                    scenario.tokenID(tokenID, ARBITRARY_TOKEN_ID),
                    scenario.data,
                    scenario.options,
                );
            });

            if (scenario.succeeds) {
                test(`token's owner has changed to ${scenario.to}`, async () => {
                    await transferFromPromise;

                    await expect(debtTokenAPI.ownerOf(tokenID)).resolves.toEqual(scenario.to);
                });
            } else {
                test(`throws ${scenario.errorType}`, async () => {
                    await expect(transferFromPromise).rejects.toThrow(scenario.errorMessage);
                });
            }
        });
    }
}
