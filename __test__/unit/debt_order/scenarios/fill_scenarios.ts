// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Types
import { Address, InterestRate, TimeInterval, TokenAmount } from "../../../../src/types";

// Test utils
import { ACCOUNTS } from "../../../accounts";

const debtor = ACCOUNTS[1];
const creditor = ACCOUNTS[2];

export interface FillScenario {
    description: string;
    creditorAddress: Address;
    debtOrderParams: DebtOrderParams;
    setUpDebtOrder: (debtOrder: DebtOrder) => void;
    shouldSucceed: boolean;
}

const creditorAddress: Address = new Address(creditor.address);

const debtOrderParams: DebtOrderParams = {
    principal: new TokenAmount(5, "REP"),
    collateral: new TokenAmount(10, "WETH"),
    interestRate: new InterestRate(12.3),
    termLength: new TimeInterval(6, "months"),
    debtorAddress: new Address(debtor.address),
    expiresIn: new TimeInterval(5, "days"),
};

export const FILL_SCENARIOS: FillScenario[] = [
    {
        description: "when the debt order is open",
        creditorAddress,
        debtOrderParams,
        setUpDebtOrder: (debtOrder: DebtOrder) => {},
        shouldSucceed: true,
    },
    // {
    //     description: "when the debt order is expired",
    // },
    // {
    //     description: "when the debt order is already filled",
    // },
    // {
    //     description: "when the debt order is canceled",
    // },
];
