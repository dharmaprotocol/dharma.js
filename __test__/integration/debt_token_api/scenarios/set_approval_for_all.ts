import { DebtTokenAPIErrors } from "src/apis/debt_token_api";
import { DebtTokenScenario } from "./scenarios";
import { ACCOUNTS } from "../../../accounts";

export const APPROVER = ACCOUNTS[5].address;
export const OPERATOR_ONE = ACCOUNTS[6].address;
export const OPERATOR_TWO = ACCOUNTS[7].address;
export const OPERATOR_THREE = ACCOUNTS[8].address;

export const SET_APPROVAL_FOR_ALL_SCENARIOS: DebtTokenScenario.SetApprovalForAllScenario[] = [
    {
        description: "user specifies valid operator as proxy for their debt tokens",
        shouldSucceed: true,
        operator: OPERATOR_ONE,
        from: APPROVER,
        approved: true,
    },
    {
        description: "user specifes themselves as operator",
        shouldSucceed: false,
        operator: OPERATOR_ONE,
        from: OPERATOR_ONE,
        approved: true,
        errorType: "OWNER_CANNOT_BE_OPERATOR",
        errorMessage: DebtTokenAPIErrors.OWNER_CANNOT_BE_OPERATOR(),
    },
];
