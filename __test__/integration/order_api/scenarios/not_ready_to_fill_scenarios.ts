import { FillScenario } from "./";

import { INVALID_ORDERS } from "./invalid_orders";
import { NONCONSENUAL_ORDERS } from "./nonconsensual_orders";

const creditorErrors = [
    "CREDITOR_BALANCE_INSUFFICIENT",
    "CREDITOR_ALLOWANCE_INSUFFICIENT",
    "INVALID_CREDITOR_SIGNATURE",
];

// Invalid and non-consensual orders are not ready to be filled, except those with errors
// relating to the creditor information.
export const NOT_READY_TO_FILL_SCENARIOS: FillScenario[] = INVALID_ORDERS.concat(
    NONCONSENUAL_ORDERS,
).filter((scenario) => !creditorErrors.includes(scenario.errorType));
