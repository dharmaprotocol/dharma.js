// External Libraries
import * as Web3 from "web3";
// Utils
import { BigNumber } from "../../utils/bignumber";

import { ContractsAPI } from "../apis";
import { Assertions } from "../invariants";
import {
    AmortizationUnit,
    SimpleInterestAdapterErrors,
    SimpleInterestTermsContractParameters,
} from "./simple_interest_loan_adapter";

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

    /**
     * Asserts that invariants are met for a given packed parameters string.
     *
     * @param {string} packedParameters
     */
    public validate(packedParameters: string) {
        const unpackedParameters = this.unpackParameters(packedParameters);
        this.packParameters(unpackedParameters);
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
