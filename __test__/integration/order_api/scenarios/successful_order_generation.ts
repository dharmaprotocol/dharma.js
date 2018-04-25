// External
import { BigNumber } from "utils/bignumber";

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
            principalAmount: new BigNumber(1),
            principalTokenSymbol: "REP",
            interestRate: new BigNumber(0.123),
            amortizationUnit: "days",
            termLength: new BigNumber(7),
        },
        throws: false,
    },
    {
        description:
            "using collateralized simple interest loan adapter with valid input parameters",
        adapter: (adaptersApi: AdaptersAPI) => adaptersApi.collateralizedSimpleInterestLoan,
        inputParameters: {
            principalAmount: new BigNumber(1),
            principalTokenSymbol: "ZRX",
            interestRate: new BigNumber(4.135),
            amortizationUnit: "months",
            termLength: new BigNumber(3),
            collateralTokenSymbol: "MKR",
            collateralAmount: new BigNumber(2),
            gracePeriodInDays: new BigNumber(3),
        },
        throws: false,
    },
];
