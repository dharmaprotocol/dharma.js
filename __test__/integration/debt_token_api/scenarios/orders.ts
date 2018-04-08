import { ACCOUNTS } from "../../../accounts";
import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";
import { BigNumber } from "bignumber.js";
import { ERC20TokenSymbol } from "utils/constants";

export const CREDITOR = ACCOUNTS[0].address;
export const DEBTOR = ACCOUNTS[1].address;

const order1: SimpleInterestLoanOrder = {
    principalAmount: new BigNumber(10 * 10 ** 18),
    principalTokenSymbol: ERC20TokenSymbol.ZRX,
    interestRate: new BigNumber(4.135),
    amortizationUnit: "months",
    termLength: new BigNumber(3),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

const order2: SimpleInterestLoanOrder = {
    principalAmount: new BigNumber(11 * 10 ** 18),
    principalTokenSymbol: ERC20TokenSymbol.MKR,
    interestRate: new BigNumber(8.937),
    amortizationUnit: "years",
    termLength: new BigNumber(2),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

const order3: SimpleInterestLoanOrder = {
    principalAmount: new BigNumber(12 * 10 ** 18),
    principalTokenSymbol: ERC20TokenSymbol.REP,
    interestRate: new BigNumber(1.987),
    amortizationUnit: "weeks",
    termLength: new BigNumber(10),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

export const ORDERS = [order1, order2, order3];
