import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";

export const GET_APPROVED_SCENARIOS: DebtTokenScenario.GetApprovedScenario[] = [
    {
        description: "debt token specifies an approved account",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
        isApproved: true,
    },
    {
        description: "debt token does not specify an approved account",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
        isApproved: false,
    },
];
