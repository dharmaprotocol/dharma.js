import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";
import { ACCOUNTS } from "../../../accounts";
import { DebtTokenAPIErrors } from "src/apis/debt_token_api";

export const APPROVEE = ACCOUNTS[2].address;

const DEFAULTS = {
    orders: Orders.ALL_ORDERS,
    shouldGenerateTokens: true,
    ...Orders.WHO,
};

export namespace ApproveScenarios {
    export const SUCCESSFUL: DebtTokenScenario.ApproveScenario[] = [
        {
            ...DEFAULTS,
            description: "`approve` is invoked by the token owner and specifies a valid approvee",
            shouldSucceed: true,
            approver: Orders.CREDITOR,
            approvee: APPROVEE,
        },
    ];
    export const UNSUCCESSFUL: DebtTokenScenario.ApproveScenario[] = [
        {
            ...DEFAULTS,
            description: "`approve` is invoked with a token id that does not exist",
            shouldSucceed: false,
            shouldGenerateTokens: false,
            approver: Orders.CREDITOR, // this account is not the token owner and thus cannot invoke `approve`
            approvee: APPROVEE,
            errorType: "TOKEN_WITH_ID_DOES_NOT_EXIST",
            errorMessage: DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
        },
        {
            ...DEFAULTS,
            description: "`approve` is not invoked by the token owner",
            shouldSucceed: false,
            approver: Orders.DEBTOR, // this account is not the token owner and thus cannot invoke `approve`
            approvee: APPROVEE,
            errorType: "ONLY_OWNER",
            errorMessage: DebtTokenAPIErrors.ONLY_OWNER(Orders.DEBTOR),
        },
        {
            ...DEFAULTS,
            description:
                "`approve` is invoked by the token owner but specifies the token owner as the approvee",
            shouldSucceed: false,
            approver: Orders.CREDITOR,
            approvee: Orders.CREDITOR, // approvee cannot be the current token owner.
            errorType: "NOT_OWNER",
            errorMessage: DebtTokenAPIErrors.NOT_OWNER(),
        },
    ];
}
