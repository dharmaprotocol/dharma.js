import { DebtTokenScenario } from "./scenarios";
import { ACCOUNTS } from "__test__/accounts";

const OWNER = ACCOUNTS[0].address;
const OPERATOR = ACCOUNTS[1].address;

const defaults = {
    shouldSucceed: true,
    owner: OWNER,
    operator: OPERATOR,
    isOperatorApproved: true,
};

export const IS_APPROVED_FOR_ALL_SCENARIOS: DebtTokenScenario.IsApprovedForAllScenario[] = [
    {
        description: "operator is approved by owner",
        ...defaults,
    },
    {
        description: "operator is not approved by owner",
        ...defaults,
        isOperatorApproved: false,
    },
    {
        description: "operator field is malformed",
        ...defaults,
        shouldSucceed: false,
        operator: "0x123",
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]{40}$"',
    },
    {
        description: "owner field is malformed",
        ...defaults,
        shouldSucceed: false,
        owner: "0x123",
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]{40}$"',
    },
];
