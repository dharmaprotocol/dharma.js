// External
import { BigNumber } from "bignumber.js";

// Scenario
import { UnpackTermsScenario } from "./";

// Types
import { DebtOrder } from "src/types";

export const SUCCESSFUL_UNPACK_TERMS: UnpackTermsScenario[] = [
    {
        description: "terms contract corresponds to simple interest and parameters valid",
        debtOrder: (defaults: DebtOrder.Instance) => {
            return {
                ...defaults,
                termsContractParameters:
                    "0x00000000002ff62db077c000000230f010007000000000000000000000000000",
            };
        },
        throws: false,
        expectedParameters: {
            principalTokenIndex: new BigNumber(0), // REP's index in the Token Registry is 0
            principalAmount: new BigNumber(3.456 * 10 ** 18), // Principal Amount: 3.456e18
            interestRate: new BigNumber(14.36), // Interest Rate: 14.36%
            amortizationUnit: "days", // Daily installments
            termLength: new BigNumber(7), // 7 day term
        },
    },
];
