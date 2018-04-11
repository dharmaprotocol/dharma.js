// External
import { BigNumber } from "bignumber.js";

// Scenario
import { UnpackTermsScenario } from "./";

// Utils
import * as Units from "utils/units";

export const SUCCESSFUL_UNPACK_TERMS: UnpackTermsScenario[] = [
    {
        description: "terms contract corresponds to simple interest and parameters valid",
        termsContract: (
            simpleInterest: string,
            collateralizedSimpleInterest: string,
            other: string,
        ) => simpleInterest,
        termsContractParameters:
            "0x00000000002ff62db077c000000230f010007000000000000000000000000000",
        throws: false,
        expectedParameters: {
            principalTokenIndex: new BigNumber(0), // REP's index in the Token Registry is 0
            principalAmount: new BigNumber(3.456 * 10 ** 18), // Principal Amount: 3.456e18
            interestRate: new BigNumber(14.36), // Interest Rate: 14.36%
            amortizationUnit: "days", // Daily installments
            termLength: new BigNumber(7), // 7 day term
        },
    },
    {
        description:
            "terms contract corresponds to collateralized simple interest and parameters valid",
        termsContract: (
            simpleInterest: string,
            collateralizedSimpleInterest: string,
            other: string,
        ) => collateralizedSimpleInterest,
        termsContractParameters:
            "0x000000003635c9adc5dea000000003e8300020200000008ac7230489e800005a",
        throws: false,
        expectedParameters: {
            // Simple Interest parameters
            principalTokenIndex: new BigNumber(0), // REP's index in the Token Registry is 0
            principalAmount: Units.ether(1000), // Principal Amount: 1e18
            interestRate: new BigNumber(0.1), // Interest Rate: 0.1%
            amortizationUnit: "months", // Monthly installments
            termLength: new BigNumber(2), // 7 day term
            // Collateralization parameters
            collateralAmount: Units.ether(10),
            collateralTokenIndex: new BigNumber(2),
            gracePeriodInDays: new BigNumber(90),
        },
    },
];
