// External
import { BigNumber } from "bignumber.js";

// APIs
import { AdaptersAPI } from "src/apis";

// Types
import { OrderGenerationScenario } from "./";

// Utils
import * as Units from "utils/units";

export const UNSUCCESSFUL_ORDER_GENERATION: OrderGenerationScenario[] = [
    {
        description: "using simple interest loan adapter with incomplete input parameters",
        adapter: (adaptersApi: AdaptersAPI) => adaptersApi.simpleInterestLoan,
        inputParameters: {
            principalAmount: Units.ether(1),
            principalTokenSymbol: "REP",
            interestRate: new BigNumber(0.32),
            amortizationUnit: "days",
            // We omit the termLength required parameter
            //  termLength: 7,
        },
        throws: true,
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'requires property "termLength"',
    },
];
