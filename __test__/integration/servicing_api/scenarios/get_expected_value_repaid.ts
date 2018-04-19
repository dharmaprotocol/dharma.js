// libraries
import { BigNumber } from "utils/bignumber";

// utils
import * as Units from "utils/units";

import { GetExpectedValueRepaidScenario } from "./";

export const GET_EXPECTED_VALUE_REPAID: GetExpectedValueRepaidScenario[] = [
    {
        description: "in 0 days at 10% interest amortized monthly from 1 Ether principal",
        days: 0,
        principalAmount: Units.ether(1),
        interestRate: new BigNumber(10),
        amortizationUnit: "months",
        expected: Units.ether(0),
    },
    {
        description: "in 31 days at 10% interest amortized monthly from 1 Ether principal",
        days: 31,
        principalAmount: Units.ether(1),
        interestRate: new BigNumber(10),
        amortizationUnit: "months",
        expected: Units.ether(0.55),
    },
    {
        description: "in 61 days at 10% interest amortized monthly from 1 Ether principal",
        days: 61,
        principalAmount: Units.ether(1),
        interestRate: new BigNumber(10),
        amortizationUnit: "months",
        expected: Units.ether(1.1),
    },
    {
        description: "in 0 days at 20% interest amortized monthly from 1 Ether principal",
        days: 0,
        principalAmount: Units.ether(1),
        interestRate: new BigNumber(20),
        amortizationUnit: "months",
        expected: Units.ether(0),
    },
    {
        description: "in 31 days at 20% interest amortized monthly from 1 Ether principal",
        days: 31,
        principalAmount: Units.ether(1),
        interestRate: new BigNumber(20),
        amortizationUnit: "months",
        expected: Units.ether(0.6),
    },
    {
        description: "in 61 days at 20% interest amortized monthly from 1 Ether principal",
        days: 61,
        principalAmount: Units.ether(1),
        interestRate: new BigNumber(20),
        amortizationUnit: "months",
        expected: Units.ether(1.2),
    },
];
