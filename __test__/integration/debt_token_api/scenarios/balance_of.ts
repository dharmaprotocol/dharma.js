import { DebtTokenScenario } from "./scenarios";
import { ACCOUNTS } from "../../../accounts";

export const BALANCE_OF_SCENARIOS: DebtTokenScenario.BalanceOfScenario[] = [
    {
        description: "when user holds a balance of 1 debt token",
        owner: ACCOUNTS[1].address,
        balance: 1,
    },
];
