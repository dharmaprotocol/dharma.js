import { DebtTokenAPIErrors } from "src/apis/debt_token_api";
import { DebtTokenScenario } from "./scenarios";
import { ACCOUNTS } from "../../../accounts";

const APPROVER = ACCOUNTS[5].address;
const OPERATOR = ACCOUNTS[6].address;

const defaults = {
    shouldSucceed: true,
    operator: OPERATOR,
    from: APPROVER,
    approved: true,
    alreadyApproved: false,
};

export const SET_APPROVAL_FOR_ALL_SCENARIOS: DebtTokenScenario.SetApprovalForAllScenario[] = [
    {
        description: "user grants approval to operator",
        ...defaults,
    },
    {
        description: "user revokes approval for existing operator",
        ...defaults,
        approved: false,
        alreadyApproved: true,
    },
    {
        description: "user specifes themselves as operator",
        shouldSucceed: false,
        operator: OPERATOR,
        from: OPERATOR,
        approved: true,
        alreadyApproved: false,
        errorType: "OWNER_CANNOT_BE_OPERATOR",
        errorMessage: DebtTokenAPIErrors.OWNER_CANNOT_BE_OPERATOR(),
    },
    {
        description: "operator field is malformed",
        ...defaults,
        shouldSucceed: false,
        operator: "0x123",
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]{40}$"',
    },
];
