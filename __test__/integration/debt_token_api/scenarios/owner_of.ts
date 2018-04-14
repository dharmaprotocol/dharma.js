import { DebtTokenScenario } from "./scenarios";
import { Orders } from "./orders";
import { DebtTokenAPIErrors } from "src/apis/debt_token_api";

const successfulDefaults = {
    ...DebtTokenScenario.TOKEN_INJECTABLE_DEFAULTS,
    shouldSucceed: true,
};

const unsuccessfulDefaults = {
    ...successfulDefaults,
    shouldSucceed: false,
};

export namespace OwnerOfScenarios {
    export const SUCCESSFUL: DebtTokenScenario.OwnerOfScenario[] = [
        {
            description: "the original creditor is the owner of the debt token",
            ...successfulDefaults,
        },
        {
            description: "the creditor transfers ownership to the transferee",
            ...successfulDefaults,
            transferee: Orders.TRANSFEREE,
        },
    ];
    export const UNSUCCESSFUL: DebtTokenScenario.OwnerOfScenario[] = [
        {
            description: "debt token does not exist",
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
            description: "debt token id is malformed",
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
    ];
}
