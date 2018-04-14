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
        owner: Orders.CREDITOR,
        balance: balance,
        shouldSucceed: true,
    };
}

const BALANCES = Array.from(Array(Orders.ALL_ORDERS.length + 1).keys()); // [0, 1, 2, 3]

export namespace BalanceOfScenarios {
    export const SUCCESSFUL: DebtTokenScenario.BalanceOfScenario[] = BALANCES.map(
        generateScenarioForBalanceOf,
    );
    export const UNSUCCESSFUL: DebtTokenScenario.BalanceOfScenario[] = [
        {
            description: "owner field is malformed",
            orders: [],
            balance: 0,
            owner: "0x123",
            shouldSucceed: false,
            errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
            errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]{40}$"',
        },
    ];
}
