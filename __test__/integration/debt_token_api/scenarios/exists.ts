import { DebtTokenScenario } from "./scenarios";

const successfulDefaults = {
    ...DebtTokenScenario.TOKEN_INJECTABLE_DEFAULTS,
    shouldSucceed: true,
};

const unsuccessfulDefaults = {
    ...successfulDefaults,
    shouldSucceed: false,
};

export namespace ExistsScenarios {
    export const SUCCESSFUL: DebtTokenScenario.ExistsScenario[] = [
        {
            description: "the id maps to a debt token",
            ...successfulDefaults,
            shouldExist: true,
        },
        {
            description: "the id does not map to a debt token",
            ...successfulDefaults,
            tokenID: (
                creditorOneTokenID,
                creditorTwoTokenID,
                nonexistentTokenID,
                malFormedTokenID,
            ) => nonexistentTokenID,
            shouldExist: false,
        },
    ];
    export const UNSUCCESSFUL: DebtTokenScenario.ExistsScenario[] = [
        {
            description: "the token id is malformed",
            ...unsuccessfulDefaults,
            tokenID: (
                creditorOneTokenID,
                creditorTwoTokenID,
                nonexistentTokenID,
                malFormedTokenID,
            ) => malFormedTokenID,
            shouldExist: false,
            errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
            errorMessage: /instance does not conform to the "wholeBigNumber" format/,
        },
    ];
}
