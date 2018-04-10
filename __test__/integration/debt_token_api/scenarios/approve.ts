import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";
import { ACCOUNTS } from "../../../accounts";
import { DebtTokenAPIErrors } from "src/apis/debt_token_api";

export const APPROVEE = ACCOUNTS[2].address;

export const SUCCESSFUL_APPROVE_SCENARIOS: DebtTokenScenario.ApproveScenario[] = [
    {
        description: "`approve` is invoked by the token owner and specifies a valid approvee",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
        shouldSucceed: true,
        approver: Orders.CREDITOR,
        approvee: APPROVEE,
    },
];

export const UNSUCCESSFUL_APPROVE_SCENARIOS: DebtTokenScenario.ApproveScenario[] = [
    {
        description: "`approve` is not invoked by the token owner",
        orders: [Orders.ORDER_ONE],
        ...Orders.WHO,
        shouldSucceed: false,
        approver: Orders.DEBTOR, // this account is not the token owner and thus cannot invoke `approve`
        approvee: APPROVEE,
        errorType: "ONLY OWNER",
        errorMessage: DebtTokenAPIErrors.ONLY_OWNER(Orders.DEBTOR),
    },
    {
        description:
            "`approve` is invoked by the token owner but specifies the token owner as the approvee",
        orders: Orders.ALL_ORDERS,
        ...Orders.WHO,
        shouldSucceed: false,
        approver: Orders.CREDITOR,
        approvee: Orders.CREDITOR, // approvee cannot be the current token owner.
        errorType: "NOT OWNER",
        errorMessage: DebtTokenAPIErrors.NOT_OWNER(),
    },
];
