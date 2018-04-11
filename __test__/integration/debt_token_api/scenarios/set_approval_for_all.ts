import { DebtTokenAPIErrors } from "src/apis/debt_token_api";
import { DebtTokenScenario } from "./scenarios";
import { ACCOUNTS } from "../../../accounts";

const APPROVER = ACCOUNTS[5].address;
const OPERATOR = ACCOUNTS[6].address;

export const SET_APPROVAL_FOR_ALL_SCENARIOS: DebtTokenScenario.SetApprovalForAllScenario[] = [
    {
        description: "user grants approval to operator",
        shouldSucceed: true,
        operator: OPERATOR,
        from: APPROVER,
        approved: true,
        alreadyApproved: false,
    },
    {
        description: "user revokes approval for existing operator",
        shouldSucceed: true,
        operator: OPERATOR,
        from: APPROVER,
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
];
