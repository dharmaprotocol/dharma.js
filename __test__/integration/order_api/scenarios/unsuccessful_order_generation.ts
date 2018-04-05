// External
import { BigNumber } from "bignumber.js";

// APIs
import { AdaptersAPI } from "src/apis";
import { ContractsError } from "src/apis/contracts_api";

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
            //  termLength: new BigNumber(7),
        },
        throws: true,
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'requires property "termLength"',
    },
    {
        description: "using simple interest loan adapter with invalid input parameters",
        adapter: (adaptersApi: AdaptersAPI) => adaptersApi.simpleInterestLoan,
        inputParameters: {
            principalAmount: Units.ether(1),
            principalTokenSymbol: "REP",
            interestRate: new BigNumber(0.32),
            amortizationUnit: "invalid amortization unit",
            termLength: new BigNumber(7),
        },
        throws: true,
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'does not match pattern "^((hours)|(days)|(weeks)|(months)|(years))$"',
    },
    {
        description:
            "using collateralized simple interest loan adapter with incomplete input parameters",
        adapter: (adaptersApi: AdaptersAPI) => adaptersApi.collateralizedSimpleInterestLoan,
        inputParameters: {
            principalAmount: Units.ether(1),
            principalTokenSymbol: "REP",
            interestRate: new BigNumber(0.32),
            amortizationUnit: "days",
            termLength: new BigNumber(7),
            // We omit the collateralTokenSymbol required parameter
            // collateralTokenSymbol: "MKR",
            collateralAmount: Units.ether(2),
            gracePeriodInDays: new BigNumber(3),
        },
        throws: true,
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'requires property "collateralTokenSymbol"',
    },
    {
        description:
            "using collateralized simple interest loan adapter with invalid input parameters",
        adapter: (adaptersApi: AdaptersAPI) => adaptersApi.collateralizedSimpleInterestLoan,
        inputParameters: {
            principalAmount: Units.ether(1),
            principalTokenSymbol: "REP",
            interestRate: new BigNumber(0.32),
            amortizationUnit: "days",
            termLength: new BigNumber(7),
            collateralTokenSymbol: "invalid collateral token symbol",
            collateralAmount: Units.ether(2),
            gracePeriodInDays: new BigNumber(3),
        },
        throws: true,
        errorType: "CANNOT_FIND_TOKEN_WITH_SYMBOL",
        errorMessage: ContractsError.CANNOT_FIND_TOKEN_WITH_SYMBOL(
            "invalid collateral token symbol",
        ),
    },
];
