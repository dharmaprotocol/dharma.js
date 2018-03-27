// libraries
import * as Web3 from "web3";
import * as singleLineString from "single-line-string";
import * as omit from "lodash.omit";

// utils
import { BigNumber } from "../../utils/bignumber";
import { NULL_ADDRESS } from "../../utils/constants";

// types
import { DebtOrder, RepaymentSchedule } from "../types";

import { ContractsAPI } from "../apis";
import { Assertions } from "../invariants";
import { DebtRegistryEntry } from "../types/debt_registry_entry";

export interface SimpleInterestLoanOrder extends DebtOrder.Instance {
    // Required Debt Order Parameters
    principalAmount: BigNumber;
    principalTokenSymbol: string;

    // Parameters for Terms Contract
    interestRate: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
}

export interface SimpleInterestTermsContractParameters {
    principalAmount: BigNumber;
    interestRate: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
    principalTokenIndex: BigNumber;
}

export type AmortizationUnit = "hours" | "days" | "weeks" | "months" | "years";
const AmortizationUnitCodes = ["hours", "days", "weeks", "months", "years"];

enum AmortizationUnitCode {
    HOURS,
    DAYS,
    WEEKS,
    MONTHS,
    YEARS,
}

const MAX_PRINCIPAL_TOKEN_INDEX_HEX = "0xff";
const MAX_PRINCIPAL_AMOUNT_HEX = "0xffffffffffffffffffffffff";
const MAX_TERM_LENGTH_VALUE_HEX = "0xffff";

const MAX_INTEREST_RATE_PRECISION = 4;
const FIXED_POINT_SCALING_FACTOR = 10 ** MAX_INTEREST_RATE_PRECISION;
const MAX_INTEREST_RATE = 2 ** 24 / FIXED_POINT_SCALING_FACTOR;

export const SimpleInterestAdapterErrors = {
    INVALID_TOKEN_INDEX: (tokenIndex: BigNumber) =>
        singleLineString`Token Registry does not track a token at index
                         ${tokenIndex.toString()}.`,
    INVALID_PRINCIPAL_AMOUNT: () =>
        singleLineString`Principal amount must be a whole number greater than 0
                         and less than 2^96 - 1.`,
    INVALID_INTEREST_RATE: () =>
        singleLineString`Interest amount cannot be negative,
                         greater than 1677.7216, or have more than
                         ${MAX_INTEREST_RATE_PRECISION} decimal places.`,
    INVALID_AMORTIZATION_UNIT_TYPE: () =>
        singleLineString`Amortization unit must be of type HOURS, DAYS,
                         WEEKS, MONTHS, or YEARS.`,
    INVALID_TERM_LENGTH: () =>
        singleLineString`Term length value cannot be negative or greater
                         than 2^120 - 1`,
    INVALID_TERMS_CONTRACT: (principalToken: string, termsContract: string) =>
        singleLineString`Terms Contract at address ${termsContract} does not
                         correspond to the SimpleInterestTermsContract associated
                         with the principal token at address ${principalToken}`,
    UNSUPPORTED_PRINCIPAL_TOKEN: (principalTokenSymbol: string) =>
        singleLineString`Token with symbol ${principalTokenSymbol} is not supported
                         by the Dharma Token Registry`,
    MISMATCHED_TOKEN_SYMBOL: (principalTokenAddress: string, symbol: string) =>
        singleLineString`Terms contract parameters are invalid for the given debt order.
                         Principal token at address ${principalTokenAddress} does not
                         correspond to specified token with symbol ${symbol}`,
};

const TX_DEFAULTS = { from: NULL_ADDRESS, gas: 0 };

export class SimpleInterestLoanTerms {
    private assert: Assertions;

    constructor(web3: Web3, contracts: ContractsAPI) {
        this.assert = new Assertions(web3, contracts);
    }

    public packParameters(termsContractParameters: SimpleInterestTermsContractParameters): string {
        const {
            principalTokenIndex,
            principalAmount,
            interestRate,
            amortizationUnit,
            termLength,
        } = termsContractParameters;

        this.assertPrincipalTokenIndexWithinBounds(principalTokenIndex);
        this.assertPrincipalAmountWithinBounds(principalAmount);
        this.assertInterestRateValid(interestRate);
        this.assertValidAmortizationUnit(amortizationUnit);
        this.assertTermLengthWholeAndWithinBounds(termLength);

        const interestRateFixedPoint = interestRate.mul(FIXED_POINT_SCALING_FACTOR);

        const principalTokenIndexHex = principalTokenIndex.toString(16);
        const principalAmountHex = principalAmount.toString(16);
        const interestRateFixedPointHex = interestRateFixedPoint.toString(16);
        const amortizationUnitTypeHex = AmortizationUnitCode[
            amortizationUnit.toUpperCase()
        ].toString(16);
        const termLengthHex = termLength.toString(16);

        return (
            "0x" +
            principalTokenIndexHex.padStart(2, "0") +
            principalAmountHex.padStart(24, "0") +
            interestRateFixedPointHex.padStart(6, "0") +
            amortizationUnitTypeHex.padStart(1, "0") +
            termLengthHex.padStart(4, "0") +
            "0".repeat(27)
        );
    }

    public unpackParameters(
        termsContractParametersPacked: string,
    ): SimpleInterestTermsContractParameters {
        this.assert.schema.bytes32("termsContractParametersPacked", termsContractParametersPacked);

        const principalTokenIndexHex = termsContractParametersPacked.substr(0, 4);
        const principalAmountHex = `0x${termsContractParametersPacked.substr(4, 24)}`;
        const interestRateFixedPointHex = `0x${termsContractParametersPacked.substr(28, 6)}`;
        const amortizationUnitTypeHex = `0x${termsContractParametersPacked.substr(34, 1)}`;
        const termLengthHex = `0x${termsContractParametersPacked.substr(35, 4)}`;

        const principalTokenIndex = new BigNumber(principalTokenIndexHex);
        const principalAmount = new BigNumber(principalAmountHex);
        const interestRateFixedPoint = new BigNumber(interestRateFixedPointHex);
        const termLength = new BigNumber(termLengthHex);

        // Given that our fixed point representation of the interest rate
        // is scaled up by our chosen scaling factor, we scale it down
        // for computations.
        const interestRate = interestRateFixedPoint.div(FIXED_POINT_SCALING_FACTOR);

        // Since the amortization unit type is stored in 1 byte, it can't exceed
        // a value of 255.  As such, we're not concerned about using BigNumber's
        // to represent amortization units.
        const unitCode = parseInt(amortizationUnitTypeHex, 16);

        // We only need to assert that the amortization unit type is valid,
        // given that it's impossible for the parsed totalExpectedRepayment,
        // principalTokenIndex, and termLength to exceed their bounds.
        this.assertValidAmortizationUnitCode(unitCode);

        const amortizationUnit = AmortizationUnitCode[unitCode].toLowerCase() as AmortizationUnit;

        return {
            principalTokenIndex,
            principalAmount,
            interestRate,
            termLength,
            amortizationUnit,
        };
    }

    public assertPrincipalTokenIndexWithinBounds(principalTokenIndex: BigNumber) {
        if (principalTokenIndex.lt(0) || principalTokenIndex.gt(MAX_PRINCIPAL_TOKEN_INDEX_HEX)) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_TOKEN_INDEX(principalTokenIndex));
        }
    }

    public assertPrincipalAmountWithinBounds(principalAmount: BigNumber) {
        if (principalAmount.lt(0) || principalAmount.gt(MAX_PRINCIPAL_AMOUNT_HEX)) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_PRINCIPAL_AMOUNT());
        }
    }

    public assertInterestRateValid(interestRate: BigNumber) {
        const [, rightOfDecimal] = interestRate.toString().split(".");

        const numDecimals = typeof rightOfDecimal !== "undefined" ? rightOfDecimal.length : 0;

        if (
            interestRate.lt(0) ||
            interestRate.gt(MAX_INTEREST_RATE) ||
            numDecimals > MAX_INTEREST_RATE_PRECISION
        ) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_INTEREST_RATE());
        }
    }

    public assertValidAmortizationUnitCode(amortizationUnitCode: number) {
        if (amortizationUnitCode > AmortizationUnitCodes.length - 1) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
        }
    }

    public assertValidAmortizationUnit(amortizationUnitType: AmortizationUnit) {
        if (!AmortizationUnitCodes.includes(amortizationUnitType)) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
        }
    }

    public assertTermLengthWholeAndWithinBounds(termLengthInAmortizationUnits: BigNumber) {
        if (
            termLengthInAmortizationUnits.lt(0) ||
            termLengthInAmortizationUnits.gt(MAX_TERM_LENGTH_VALUE_HEX)
        ) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
        } else {
            this.assert.schema.wholeNumber("termLength", termLengthInAmortizationUnits);
        }
    }
}

export class SimpleInterestLoanAdapter {
    public static Installments: { [type: string]: AmortizationUnit } = {
        HOURLY: "hours",
        DAILY: "days",
        WEEKLY: "weeks",
        MONTHLY: "months",
        YEARLY: "years",
    };

    private assert: Assertions;
    private contracts: ContractsAPI;
    private termsContractInterface: SimpleInterestLoanTerms;

    public constructor(web3: Web3, contracts: ContractsAPI) {
        this.assert = new Assertions(web3, contracts);
        this.contracts = contracts;
        this.termsContractInterface = new SimpleInterestLoanTerms(web3, contracts);
    }

    /**
     * Asynchronously generates a Dharma debt order given an instance of a
     * simple interest loan order.
     *
     * @param  simpleInterestLoanOrder a simple interest loan order instance.
     * @return                         the generated Dharma debt order.
     */
    public async toDebtOrder(
        simpleInterestLoanOrder: SimpleInterestLoanOrder,
    ): Promise<DebtOrder.Instance> {
        this.assert.schema.simpleInterestLoanOrder(
            "simpleInterestLoanOrder",
            simpleInterestLoanOrder,
        );

        const {
            principalTokenSymbol,
            principalAmount,
            interestRate,
            amortizationUnit,
            termLength,
        } = simpleInterestLoanOrder;

        const principalToken = await this.contracts.loadTokenBySymbolAsync(principalTokenSymbol);
        const principalTokenIndex = await this.contracts.getTokenIndexBySymbolAsync(
            principalTokenSymbol,
        );

        const simpleInterestTermsContract = await this.contracts.loadSimpleInterestTermsContract(
            TX_DEFAULTS,
        );

        let debtOrder: DebtOrder.Instance = omit(simpleInterestLoanOrder, [
            "principalTokenSymbol",
            "interestRate",
            "amortizationUnit",
            "termLength",
        ]);

        debtOrder = {
            ...debtOrder,
            principalToken: principalToken.address,
            termsContract: simpleInterestTermsContract.address,
            termsContractParameters: this.termsContractInterface.packParameters({
                principalTokenIndex,
                principalAmount,
                interestRate,
                amortizationUnit,
                termLength,
            }),
        };

        return DebtOrder.applyNetworkDefaults(debtOrder, this.contracts);
    }

    /**
     * Asynchronously generates a simple interest loan order given a Dharma
     * debt order instance.
     *
     * @param  debtOrder a Dharma debt order instance.
     * @return           the generated simple interest loan order.
     */
    public async fromDebtOrder(debtOrder: DebtOrder.Instance): Promise<SimpleInterestLoanOrder> {
        this.assert.schema.debtOrderWithTermsSpecified("debtOrder", debtOrder);

        const {
            principalTokenIndex,
            principalAmount,
            interestRate,
            termLength,
            amortizationUnit,
        } = this.termsContractInterface.unpackParameters(debtOrder.termsContractParameters);

        const principalTokenSymbol = await this.contracts.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        await this.assertPrincipalTokenCorrespondsToSymbol(
            debtOrder.principalToken,
            principalTokenSymbol,
        );

        return {
            ...debtOrder,
            principalAmount,
            principalTokenSymbol,
            interestRate,
            termLength,
            amortizationUnit,
        };
    }

    public async fromDebtRegistryEntry(entry: DebtRegistryEntry): Promise<SimpleInterestLoanOrder> {
        const {
            principalTokenIndex,
            principalAmount,
            interestRate,
            termLength,
            amortizationUnit,
        } = this.termsContractInterface.unpackParameters(entry.termsContractParameters);

        const principalTokenSymbol = await this.contracts.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        return {
            principalTokenSymbol,
            principalAmount,
            interestRate,
            termLength,
            amortizationUnit,
        };
    }

    public getRepaymentSchedule(debtEntry: DebtRegistryEntry): Array<number> {
        const { termsContractParameters, issuanceBlockTimestamp } = debtEntry;
        const { termLength, amortizationUnit } = this.termsContractInterface.unpackParameters(
            termsContractParameters,
        );

        return new RepaymentSchedule(
            amortizationUnit,
            termLength,
            issuanceBlockTimestamp.toNumber(),
        ).toArray();
    }

    private async assertPrincipalTokenCorrespondsToSymbol(
        principalToken: string,
        symbol: string,
    ): Promise<void> {
        const addressMappedToSymbol = await this.contracts.getTokenAddressBySymbolAsync(symbol);

        // Validate that the
        if (principalToken !== addressMappedToSymbol) {
            throw new Error(
                SimpleInterestAdapterErrors.MISMATCHED_TOKEN_SYMBOL(principalToken, symbol),
            );
        }
    }
}
