import { ACCOUNTS } from "../../../accounts";

import { GetInvestmentsScenario } from "./";

export const GET_INVESTMENTS: GetInvestmentsScenario[] = [
    {
        description: "no investments associated with user",
        creditor: ACCOUNTS[5].address,
        account: ACCOUNTS[5].address,
        numInvestments: 0,
    },
    {
        description: "one investment associated with user",
        creditor: ACCOUNTS[5].address,
        account: ACCOUNTS[5].address,
        numInvestments: 1,
    },
    {
        description: "three investments associated with user",
        creditor: ACCOUNTS[5].address,
        account: ACCOUNTS[5].address,
        numInvestments: 3,
    },
    {
        description: "5 debts associated with user",
        creditor: ACCOUNTS[5].address,
        account: ACCOUNTS[5].address,
        numInvestments: 5,
    },
    {
        description: "invalid address passed into account argument",
        creditor: ACCOUNTS[5].address,
        account: "0x122341",
        numInvestments: 0,
        errorMessage: "Expected account to conform to schema /Address",
    },
];
