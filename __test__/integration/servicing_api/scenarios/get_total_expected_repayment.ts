// libraries
import { BigNumber } from "utils/bignumber";

// utils
import * as Units from "utils/units";

import { GetTotalExpectedRepaymentScenario } from "./";

export const GET_TOTAL_EXPECTED_REPAYMENT: GetTotalExpectedRepaymentScenario[] = [
    {
        description: "over 0 days at 10% interest amortized monthly from 1 Ether principal",
        termLength: 0,
        principalAmount: new BigNumber(1),
        interestRate: new BigNumber(10),
        amortizationUnit: "months",
        expected: Units.ether(0),
        agreementExists: true,
    },
    {
        description: "over 31 days at 10% interest amortized daily from 1 Ether principal",
        termLength: 31,
        principalAmount: new BigNumber(1),
        interestRate: new BigNumber(10),
        amortizationUnit: "days",
        expected: Units.ether(1.1),
        agreementExists: true,
    },
    {
        description: "over 61 days at 10% interest amortized daily from 1 Ether principal",
        termLength: 61,
        principalAmount: new BigNumber(1),
        interestRate: new BigNumber(10),
        amortizationUnit: "days",
        expected: Units.ether(1.1),
        agreementExists: true,
    },
    {
        description: "over 0 months at 20% interest amortized monthly from 1 Ether principal",
        termLength: 0,
        principalAmount: new BigNumber(1),
        interestRate: new BigNumber(20),
        amortizationUnit: "months",
        expected: Units.ether(0),
        agreementExists: true,
    },
    {
        description: "over 1 month at 20% interest amortized monthly from 1 Ether principal",
        termLength: 1,
        principalAmount: new BigNumber(1),
        interestRate: new BigNumber(20),
        amortizationUnit: "months",
        expected: Units.ether(1.2),
        agreementExists: true,
    },
    {
        description: "over 2 months at 20% interest amortized monthly from 1 Ether principal",
        termLength: 2,
        principalAmount: new BigNumber(1),
        interestRate: new BigNumber(20),
        amortizationUnit: "months",
        expected: Units.ether(1.2),
        agreementExists: true,
    },
    {
        description: "over 73 days at 5% interest amortized daily from 2.5 Ether principal",
        termLength: 73,
        principalAmount: new BigNumber(2.5),
        interestRate: new BigNumber(5),
        amortizationUnit: "days",
        expected: Units.ether(2.625),
        agreementExists: true,
    },
    {
        description: "when the agreement does not exist",
        termLength: 73,
        principalAmount: new BigNumber(2.5),
        interestRate: new BigNumber(5),
        amortizationUnit: "days",
        expected: Units.ether(2.625),
        agreementExists: false,
        error: /^Debt agreement with issuance hash .+? could not be found in the deployed debt registry$/,
    },
];
