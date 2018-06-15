import * as Web3 from "web3";

// Types
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";
import { EthereumAddress } from "../../../../src/types";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

// Test utils
import { ACCOUNTS } from "../../../accounts";

const CREDITOR = ACCOUNTS[1];

import { FillScenario } from "../scenarios/fill_scenarios";
import { setBalancesAndAllowances } from "../utils/set_balances_and_allowances";

export async function testFill(dharma: Dharma, web3: Web3, scenario: FillScenario) {
    await setBalancesAndAllowances(dharma, web3, scenario.debtOrderParams, CREDITOR.address);

    describe(scenario.description, () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, scenario.debtOrderParams);
            scenario.setUpDebtOrder(debtOrder);
        });

        if (scenario.shouldSucceed) {
            test.only("#fill succeeds", async () => {
                const fillTransactionHash = await debtOrder.fillAsCreditor(
                    scenario.creditorAddress,
                );

                await dharma.blockchain.awaitTransactionMinedAsync(fillTransactionHash);
                // test the transaction receipt is correct
            });
        } else {
            test("#fill fails", async () => {
                const fillTransactionHash = await debtOrder.fillAsCreditor(
                    scenario.creditorAddress,
                );

                // test the transaction fails
            });
        }
    });
}
