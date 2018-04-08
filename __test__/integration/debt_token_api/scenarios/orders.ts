import { ACCOUNTS } from "../../../accounts";
import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";
import { BigNumber } from "bignumber.js";
import { ERC20TokenSymbol } from "utils/constants";

export const CREDITOR = ACCOUNTS[0].address;
export const DEBTOR = ACCOUNTS[1].address;

export const ORDER_ONE: SimpleInterestLoanOrder = {
    principalAmount: new BigNumber(10 * 10 ** 18),
    principalTokenSymbol: ERC20TokenSymbol.ZRX,
    interestRate: new BigNumber(4.135),
    amortizationUnit: "months",
    termLength: new BigNumber(3),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

export const ORDER_TWO: SimpleInterestLoanOrder = {
    principalAmount: new BigNumber(11 * 10 ** 18),
    principalTokenSymbol: ERC20TokenSymbol.MKR,
    interestRate: new BigNumber(8.937),
    amortizationUnit: "years",
    termLength: new BigNumber(2),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

export const ORDER_THREE: SimpleInterestLoanOrder = {
    principalAmount: new BigNumber(12 * 10 ** 18),
    principalTokenSymbol: ERC20TokenSymbol.REP,
    interestRate: new BigNumber(1.987),
    amortizationUnit: "weeks",
    termLength: new BigNumber(10),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

export const ORDERS = [ORDER_ONE, ORDER_TWO, ORDER_THREE];
