// External
import { BigNumber } from "bignumber.js";

// Utils
import * as Units from "utils/units";
import { ERC20TokenSymbol } from "utils/constants";
import { ACCOUNTS } from "../../../accounts";

// Types
import { DebtTokenScenario } from "./";
import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";

const CREDITOR = ACCOUNTS[0].address;
const DEBTOR = ACCOUNTS[1].address;
const USER_RECIPIENT = ACCOUNTS[2].address;

const order: SimpleInterestLoanOrder = {
    principalAmount: Units.ether(10),
    principalTokenSymbol: ERC20TokenSymbol.ZRX,
    interestRate: new BigNumber(4.135),
    amortizationUnit: "months",
    termLength: new BigNumber(3),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

const defaults: DebtTokenScenario.TransferFromScenario = {
    // Scenario Setup Parameters
    description: `Default Description`,
    orders: [order],
    debtor: DEBTOR,
    creditor: CREDITOR,
    succeeds: true,

    // TransferFrom Scenario parameters
    from: CREDITOR,
    to: USER_RECIPIENT,
    tokenID: (ordersIssuanceHash: BigNumber, other: BigNumber) => ordersIssuanceHash,
    options: { from: CREDITOR },
};

export const SUCCESSFUL_TRANSFER_FROM_SCENARIOS: DebtTokenScenario.TransferFromScenario[] = [
    {
        ...defaults,
        description: "called by tokens owner to a non-contract recipient",
    },
];
