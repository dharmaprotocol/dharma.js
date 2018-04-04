// External
import { BigNumber } from "bignumber.js";

// APIs
import { AdaptersAPI } from "src/apis";

// Types
import { OrderGenerationScenario } from "./";

// Utils
import * as Units from "utils/units";

export const SUCCESSFUL_ORDER_GENERATION: OrderGenerationScenario[] = [
    {
        description: "using simple interest loan adapter with valid input parameters",
        adapter: (adaptersApi: AdaptersAPI) => adaptersApi.simpleInterestLoan,
        inputParameters: {
            principalAmount: Units.ether(1),
            principalTokenSymbol: "REP",
            interestRate: new BigNumber(0.123),
            amortizationUnit: "days",
            termLength: new BigNumber(7),
        },
        throws: false,
    },
];
