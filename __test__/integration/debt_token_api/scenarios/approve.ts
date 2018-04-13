import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";
import { DebtTokenAPIErrors } from "src/apis/debt_token_api";

const defaults = {
    orderFilledByCreditorOne: Orders.CREDITOR_ONE_ORDER,
    orderFilledByCreditorTwo: Orders.CREDITOR_TWO_ORDER,
    tokenID: (creditorOneTokenID, creditorTwoTokenID, nonexistentTokenID, malFormedTokenID) =>
        creditorOneTokenID,
    approver: Orders.CREDITOR_ONE,
    approvee: Orders.APPROVEE,
};

const successfulDefaults = {
    ...defaults,
    shouldSucceed: true,
};

const unsuccessfulDefaults = {
    ...defaults,
    shouldSucceed: false,
};

export namespace ApproveScenarios {
    export const SUCCESSFUL: DebtTokenScenario.ApproveScenario[] = [
        {
            description: "`approve` is invoked by the token owner and specifies a valid approvee",
            ...successfulDefaults,
        },
    ];
    export const UNSUCCESSFUL: DebtTokenScenario.ApproveScenario[] = [
        {
            description: "`approve` is invoked with a token id that does not exist",
            ...unsuccessfulDefaults,
            tokenID: (
                creditorOneTokenID,
                creditorTwoTokenID,
                nonexistentTokenID,
                malFormedTokenID,
            ) => nonexistentTokenID,
            errorType: "TOKEN_WITH_ID_DOES_NOT_EXIST",
            errorMessage: DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
        },
        {
            description: "`approve` is not invoked by the token's owner",
            ...unsuccessfulDefaults,
            approver: Orders.DEBTOR, // this account is not the token owner and thus cannot invoke `approve`
            errorType: "ONLY_OWNER",
            errorMessage: DebtTokenAPIErrors.ONLY_OWNER(Orders.DEBTOR),
        },
        {
            description:
                "`approve` is invoked by the token's owner but specifies the token owner as the approvee",
            ...unsuccessfulDefaults,
            approvee: Orders.CREDITOR_ONE, // approvee cannot be the current token owner.
            errorType: "NOT_OWNER",
            errorMessage: DebtTokenAPIErrors.NOT_OWNER(),
        },
    ];
}
