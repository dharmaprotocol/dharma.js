import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { ACCOUNTS } from "../../../accounts";

const UNDERWRITER_PARAMS = {
    underwriterAddress: ACCOUNTS[8].address,
    underwriterRiskRating: 3.2, // i.e., 3.2% chance that the debtor defaults
    underwriterFeeAmount: 0.6,
};

export const UNDERWRITTEN_LOAN_REQUEST: DebtOrderParams = {
    principalAmount: 5,
    principalToken: "REP",
    collateralAmount: 10,
    collateralToken: "MKR",
    interestRate: 12.3,
    termDuration: 6,
    termUnit: "months",
    expiresInDuration: 5,
    expiresInUnit: "days",
    ...UNDERWRITER_PARAMS,
};
