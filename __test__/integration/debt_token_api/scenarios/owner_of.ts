import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";

import * as singleLineString from "single-line-string";

export const OWNER_OF_SCENARIOS: DebtTokenScenario.OwnerOfScenario[] = [
    {
        description: "the creditor is the owner of the debt token",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
    },
];
