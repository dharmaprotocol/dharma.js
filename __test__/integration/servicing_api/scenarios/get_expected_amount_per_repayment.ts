// libraries
import { BigNumber } from "../../../../utils/bignumber";

// utils
import * as Units from "../../../../utils/units";

import { GetExpectedAmountPerRepaymentScenario } from "./";

export const GET_EXPECTED_AMOUNT_PER_REPAYMENT: GetExpectedAmountPerRepaymentScenario[] = [
    {
        description: "10% interest amortized monthly from 1 Ether principal over 10 days",
        termLength: new BigNumber(10),
        principalAmount: Units.ether(1),
        interestRate: new BigNumber(10),
        amortizationUnit: "days",
        agreementExists: true,
        // 10 repayments of 1.1 ETH.
        expected: Units.ether(0.11),
    },
    {
        description: "15% interest amortized monthly from 10 Ether principal over 2 years",
        termLength: new BigNumber(2),
        principalAmount: Units.ether(10),
        interestRate: new BigNumber(15),
        amortizationUnit: "years",
        agreementExists: true,
        // 2 repayments of 5.75 ETH.
        expected: Units.ether(5.75),
    },
    {
        description: "when the given issuance hash does not match an agreement does not exist",
        termLength: new BigNumber(2),
        principalAmount: Units.ether(10),
        interestRate: new BigNumber(15),
        amortizationUnit: "years",
        agreementExists: false,
        error: /^Debt agreement with issuance hash 0x[a-fA-F0-9]{64} could not be found in the deployed debt registry$/,
        expected: Units.ether(0),
    },
];
