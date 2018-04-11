import { DebtTokenScenario } from "./scenarios";
import * as singleLineString from "single-line-string";
import { Orders } from "./orders";

const DESCRIPTION = (balance: number) =>
    singleLineString`when user holds a balance of ${balance} debt token${
        balance === 1 ? "" : "s"
    }.`;

function generateScenarioForBalanceOf(balance: number): DebtTokenScenario.BalanceOfScenario {
    return {
        description: DESCRIPTION(balance),
        orders: Orders.ALL_ORDERS.slice(0, balance),
        creditor: Orders.CREDITOR,
        debtor: Orders.DEBTOR,
        balance: balance,
    };
}

const BALANCES = Array.from(Array(Orders.ALL_ORDERS.length + 1).keys()); // [0, 1, 2, 3]

export const BALANCE_OF_SCENARIOS: DebtTokenScenario.BalanceOfScenario[] = BALANCES.map(
    generateScenarioForBalanceOf,
);
