import { DebtTokenAPIErrors } from "../../../../src/apis/debt_token_api";
import { Orders } from "./orders";
import { DebtTokenScenario } from "./scenarios";

const successfulDefaults = {
    ...DebtTokenScenario.TOKEN_INJECTABLE_DEFAULTS,
    shouldSucceed: true,
    approver: Orders.CREDITOR_ONE,
    approvee: Orders.APPROVEE,
};

const unsuccessfulDefaults = {
    ...successfulDefaults,
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
        {
            description: "`approve` is invoked with a malformed token id",
            ...unsuccessfulDefaults,
            tokenID: (
                creditorOneTokenID,
                creditorTwoTokenID,
                nonexistentTokenID,
                malFormedTokenID,
            ) => malFormedTokenID,
            errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
            errorMessage: /instance does not conform to the "wholeBigNumber" format/,
        },
        {
            description: "`approve` is invoked with a malformed approvee address",
            ...unsuccessfulDefaults,
            approvee: "invalid receipient address",
            errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
            errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]{40}$"',
        },
    ];
}
