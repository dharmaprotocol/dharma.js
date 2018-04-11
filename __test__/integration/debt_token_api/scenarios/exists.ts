import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";

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
