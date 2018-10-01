import { MaxLTVParams } from "../../../../src/types/loan_offer/max_ltv";

export const VALID_MAX_LTV_LOAN_ORDER_PARAMS: MaxLTVParams = {
    collateralToken: "MKR",
    expiresInDuration: 5,
    expiresInUnit: "days",
    interestRate: 12.3,
    maxLTV: 50,
    priceProvider: "test",
    principalAmount: 5,
    principalToken: "REP",
    termDuration: 6,
    termUnit: "months",
};
