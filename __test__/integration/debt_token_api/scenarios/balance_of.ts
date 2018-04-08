import { DebtTokenScenario } from "./scenarios";
import { ACCOUNTS } from "../../../accounts";
import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";
import { BigNumber } from "bignumber.js";
import { ERC20TokenSymbol } from "utils/constants";
import * as singleLineString from "single-line-string";

const CREDITOR = ACCOUNTS[0].address;
const DEBTOR = ACCOUNTS[1].address;

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

const ORDERS = [order1, order2, order3];

const DESCRIPTION = (balance: number) =>
    singleLineString`when user holds a balance of ${balance} debt token${balance == 1 ? "" : "s"}.`;

function generateScenarioForBalanceOf(balance: number): DebtTokenScenario.BalanceOfScenario {
    return {
        description: DESCRIPTION(balance),
        orders: ORDERS.slice(0, balance),
        creditor: CREDITOR,
        debtor: DEBTOR,
        balance: balance,
    };
}

const BALANCES = Array.from(Array(ORDERS.length).keys());

export const BALANCE_OF_SCENARIOS: DebtTokenScenario.BalanceOfScenario[] = BALANCES.map(
    generateScenarioForBalanceOf,
);
