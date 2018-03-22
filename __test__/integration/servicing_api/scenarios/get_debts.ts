import { ACCOUNTS } from "../../../accounts";

import { GetDebtsScenario } from "./";

export const GET_DEBTS: GetDebtsScenario[] = [
    {
        description: "no debts associated with user",
        debtor: ACCOUNTS[4].address,
        account: ACCOUNTS[4].address,
        numDebtAgreements: 0,
    },
    {
        description: "one debt associated with user",
        debtor: ACCOUNTS[4].address,
        account: ACCOUNTS[4].address,
        numDebtAgreements: 1,
    },
    {
        description: "three debts associated with user",
        debtor: ACCOUNTS[4].address,
        account: ACCOUNTS[4].address,
        numDebtAgreements: 3,
    },
    {
        description: "5 debts associated with user",
        debtor: ACCOUNTS[4].address,
        account: ACCOUNTS[4].address,
        numDebtAgreements: 5,
    },
    {
        description: "invalid address passed into account argument",
        debtor: ACCOUNTS[4].address,
        account: "0x122341",
        numDebtAgreements: 0,
        errorMessage: "Hello, world!",
    },
];
