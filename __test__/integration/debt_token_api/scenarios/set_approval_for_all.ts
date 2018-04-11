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
];
