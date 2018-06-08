// utils
import * as Units from "../../../../utils/units";

import { DebtOrderData } from "../../../../src/types";
import { MakeRepaymentScenario } from "./";

const defaultArgs = {
    amount: Units.ether(0.5),
    allowance: Units.ether(2),
    balance: Units.ether(2),
    successfullyRepays: true,
    throws: false,
    repaymentAttempts: 1,
    repaymentToken: (principalToken: string, nonPrincipalToken: string) => principalToken,
    agreementId: (issuanceHash: string) => issuanceHash,
};

export const VALID_MAKE_REPAYMENT: MakeRepaymentScenario[] = [
    {
        description:
            "arguments well-formed and payer's balance / allowance sufficient and principal token used",
        ...defaultArgs,
    },
    {
        description: "payer repays again in expected principal token",
        ...defaultArgs,
        repaymentAttempts: 2,
    },
];
