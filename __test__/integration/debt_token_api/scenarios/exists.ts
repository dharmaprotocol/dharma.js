import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";
import { ACCOUNTS } from "../../../accounts";
import * as singleLineString from "single-line-string";

export const EXISTS_SCENARIOS: DebtTokenScenario.ExistsScenario[] = [
    {
        description: "the id maps to a debt token",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
        shouldExist: true,
    },
    {
        description: "the id does not map to a debt token",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
        shouldExist: false,
    },
];
