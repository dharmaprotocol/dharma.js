import { DebtOrderParams } from "../../../../src/loan/debt_order";

export const VALID_LOAN_REQUEST: DebtOrderParams = {
    principalAmount: 5,
    principalToken: "REP",
    collateralAmount: 10,
    collateralToken: "MKR",
    interestRate: 12.3,
    termDuration: 6,
    termUnit: "months",
    expiresInDuration: 5,
    expiresInUnit: "days",
};
