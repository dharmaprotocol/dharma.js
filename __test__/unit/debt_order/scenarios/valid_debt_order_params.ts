// Debt Order
import { DebtOrderParams } from "../../../../src/debt_order";

// Types
import { EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../../../../src/types";

// Test utils
import { ACCOUNTS } from "../../../accounts";

const debtor = ACCOUNTS[1];

export const DEBT_ORDER_PARAMS_ONE: DebtOrderParams = {
    principalAmount: 5,
    principalToken: "REP",
    collateralAmount: 10,
    collateralToken: "MKR",
    interestRate: 12.3,
    termDuration: 6,
    termUnit: "months",
    debtorAddress: debtor.address,
    expiresInDuration: 5,
    expiresInUnit: "days",
};
