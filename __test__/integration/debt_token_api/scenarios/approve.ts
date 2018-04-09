import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";
import { ACCOUNTS } from "../../../accounts";
import { NULL_ADDRESS } from "utils/constants";

export const APPROVE_SCENARIOS: DebtTokenScenario.ApproveScenario[] = [
    {
        description: "the debt token is transferred to the null address",
        orders: [Orders.ORDER_ONE],
        ...Orders.WHO,
        shouldSucceed: true,
        transferer: Orders.CREDITOR,
        transferee: NULL_ADDRESS,
    },
    {
        description: "the debt token is transferred to the existing owner",
        orders: [Orders.ORDER_ONE],
        ...Orders.WHO,
        shouldSucceed: false,
        transferer: Orders.CREDITOR,
        transferee: Orders.CREDITOR,
    },
    {
        description: "the debt token is transferred by the owner to another account",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
        shouldSucceed: true,
        transferer: Orders.CREDITOR,
        transferee: ACCOUNTS[2].address,
    },
];
