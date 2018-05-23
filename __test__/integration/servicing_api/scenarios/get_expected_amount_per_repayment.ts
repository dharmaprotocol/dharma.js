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
        description: "33% interest amortized monthly from 3 Ether principal over 3 months",
        termLength: new BigNumber(3),
        principalAmount: Units.ether(3),
        interestRate: new BigNumber(33),
        amortizationUnit: "months",
        agreementExists: true,
        // 3 repayments of 1.33 ETH.
        expected: Units.ether(1.33),
    },
    {
        description: "when the given issuance hash does not match an existing debt agreement",
        termLength: new BigNumber(2),
        principalAmount: Units.ether(10),
        interestRate: new BigNumber(15),
        amortizationUnit: "years",
        agreementExists: false,
        error: /^Debt agreement with issuance hash 0x[a-fA-F0-9]{64} could not be found in the deployed debt registry$/,
        expected: Units.ether(0),
    },
];
