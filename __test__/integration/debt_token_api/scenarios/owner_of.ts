import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";
import { ACCOUNTS } from "../../../accounts";
import * as singleLineString from "single-line-string";

export const OWNER_OF_SCENARIOS: DebtTokenScenario.OwnerOfScenario[] = [
    {
        description: "the creditor is the owner of the debt token",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
    },
    {
        description: "the creditor transfers ownership",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
        shouldTransferTo: ACCOUNTS[2].address,
    },
];
