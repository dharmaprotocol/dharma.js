// External
import * as Web3 from "web3";

// Types
import { ScenarioRunner, TestAPIs, TestAdapters } from "./";
import { DebtTokenScenario } from "../scenarios";
import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";

export class BalanceOfScenarioRunner extends ScenarioRunner {
    public testScenario(
        scenario: DebtTokenScenario.BalanceOfScenario,
        web3: Web3,
        testAPIs: TestAPIs,
        testAdapters: TestAdapters,
    ) {
        const { debtTokenAPI } = testAPIs;

        describe(scenario.description, () => {
            beforeEach(async () => {
                for (let order of scenario.orders) {
                    await this.generateDebtTokenForOrder(order, web3, testAPIs, testAdapters);
                }
            });

            test("returns correct balance of debt tokens", async () => {
                const computedBalance = await debtTokenAPI.balanceOf(scenario.creditor);
                expect(computedBalance.toNumber()).toEqual(scenario.balance);
            });
        });
    }

    private async generateDebtTokenForOrder(
        simpleInterestLoanOrder: SimpleInterestLoanOrder,
        web3: Web3,
        testAPIs: TestAPIs,
        testAdapters: TestAdapters,
    ) {
        const { orderAPI, signerAPI, tokenAPI } = testAPIs;
        const { simpleInterestLoanAdapter } = testAdapters;

        const principalTokenAddress = await this.configureTokenBalance(
            web3,
            testAPIs,
            simpleInterestLoanOrder.creditor,
            simpleInterestLoanOrder.principalAmount,
            simpleInterestLoanOrder.principalTokenSymbol,
        );

        await tokenAPI.setProxyAllowanceAsync(
            principalTokenAddress,
            simpleInterestLoanOrder.principalAmount,
        );

        const order = await orderAPI.generate(simpleInterestLoanAdapter, simpleInterestLoanOrder);
        order.debtorSignature = await signerAPI.asDebtor(order, false);

        await orderAPI.fillAsync(order, {
            from: order.creditor,
        });
    }
}
