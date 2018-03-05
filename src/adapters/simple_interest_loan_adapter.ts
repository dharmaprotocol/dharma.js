import * as omit from "lodash.omit";
import { DebtOrder } from "../types";
import { ContractsAPI } from "../apis";
import { BigNumber } from "../../utils/bignumber";
import { NULL_ADDRESS } from "../../utils/constants";
import { Assertions } from "../invariants";
import * as Web3 from "web3";
import * as singleLineString from "single-line-string";

export interface SimpleInterestLoanOrder extends DebtOrder {
    // Required Debt Order Parameters
    principalAmount: BigNumber;
    principalToken: string;

    // Parameters for Terms Contract
    interestRate: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
}

export interface SimpleInterestTermsContractParameters {
    totalExpectedRepayment: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
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

export const SimpleInterestAdapterErrors = {
    INVALID_EXPECTED_REPAYMENT_VALUE: () =>
        singleLineString`Total expected repayment value cannot be negative or
                         greater than 2^128 - 1.`,
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
};

const TX_DEFAULTS = { from: NULL_ADDRESS, gas: 0 };
const MAX_EXPECTED_REPAYMENT_VALUE_HEX = "0xffffffffffffffffffffffffffffffff";
const MAX_TERM_LENGTH_VALUE_HEX = "0xffffffffffffffffffffffffffffff";

export class SimpleInterestLoanTerms {
    private assert: Assertions;

    constructor(web3: Web3) {
        this.assert = new Assertions(web3);
    }

    public packParameters(termsContractParameters: SimpleInterestTermsContractParameters): string {
        const { totalExpectedRepayment, amortizationUnit, termLength } = termsContractParameters;

        this.assertTotalExpectedRepaymentWithinBounds(totalExpectedRepayment);
        this.assertValidAmortizationUnit(amortizationUnit);
        this.assertTermLengthWholeAndWithinBounds(termLength);

        const totalExpectedRepaymentHex = totalExpectedRepayment.toString(16);
        const amortizationUnitTypeHex = AmortizationUnitCode[
            amortizationUnit.toUpperCase()
        ].toString(16);
        const termLengthHex = termLength.toString(16);

        return (
            "0x" +
            totalExpectedRepaymentHex.padStart(32, "0") +
            amortizationUnitTypeHex.padStart(2, "0") +
            termLengthHex.padStart(30, "0")
        );
    }

    public unpackParameters(
        termsContractParametersPacked: string,
    ): SimpleInterestTermsContractParameters {
        this.assert.schema.bytes32("termsContractParametersPacked", termsContractParametersPacked);

        const totalExpectedRepaymentHex = termsContractParametersPacked.substr(0, 34);
        const amortizationUnitTypeHex = "0x" + termsContractParametersPacked.substr(34, 2);
        const termLengthHex = "0x" + termsContractParametersPacked.substr(36);

        const totalExpectedRepayment = new BigNumber(totalExpectedRepaymentHex);
        const termLength = new BigNumber(termLengthHex);

        // Since the amortization unit type is stored in 1 byte, it can't exceed
        // a value of 255.  As such, we're not concerned about using BigNumber's
        // to represent amortization units.
        const unitCode = parseInt(amortizationUnitTypeHex, 16);

        // We only need to assert that the amortization unit type is valid,
        // given that it's impossible for the parsed totalExpectedRepayment
        // and termLength to exceed their bounds.
        this.assertValidAmortizationUnitCode(unitCode);

        const amortizationUnit = AmortizationUnitCode[unitCode].toLowerCase() as AmortizationUnit;

        return {
            totalExpectedRepayment,
            termLength,
            amortizationUnit,
        };
    }

    public assertTotalExpectedRepaymentWithinBounds(totalExpectedRepayment: BigNumber) {
        if (
            totalExpectedRepayment.lt(0) ||
            totalExpectedRepayment.gt(MAX_EXPECTED_REPAYMENT_VALUE_HEX)
        ) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_EXPECTED_REPAYMENT_VALUE());
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
        this.assert = new Assertions(web3);
        this.contracts = contracts;
        this.termsContractInterface = new SimpleInterestLoanTerms(web3);
    }

    /**
     * Asynchronously generates a Dharma debt order given an instance of a
     * simple interest loan order.
     *
     * @param  simpleInterestLoanOrder a simple interest loan order instance.
     * @return                         the generated Dharma debt order.
     */
    public async toDebtOrder(simpleInterestLoanOrder: SimpleInterestLoanOrder): Promise<DebtOrder> {
        this.assert.schema.simpleInterestLoanOrder(
            "simpleInterestLoanOrder",
            simpleInterestLoanOrder,
        );

        const {
            principalToken,
            principalAmount,
            interestRate,
            amortizationUnit,
            termLength,
        } = simpleInterestLoanOrder;

        let debtOrder: DebtOrder = omit(simpleInterestLoanOrder, [
            "interestRate",
            "amortizationUnit",
            "termLength",
        ]);

        const simpleInterestTermsContract = await this.contracts.loadSimpleInterestTermsContract(
            principalToken,
            TX_DEFAULTS,
        );

        const totalExpectedRepayment = principalAmount.times(interestRate.plus(1)).trunc();

        debtOrder.termsContract = simpleInterestTermsContract.address;
        debtOrder.termsContractParameters = this.termsContractInterface.packParameters({
            totalExpectedRepayment,
            amortizationUnit,
            termLength,
        });

        return debtOrder;
    }

    /**
     * Asynchronously generates a simple interest loan order given a Dharma
     * debt order instance.
     *
     * @param  debtOrder a Dharma debt order instance.
     * @return           the generated simple interest loan order.
     */
    public async fromDebtOrder(debtOrder: DebtOrder): Promise<SimpleInterestLoanOrder> {
        this.assert.schema.debtOrderWithTermsSpecified("debtOrder", debtOrder);
        await this.assertTermsContractCorrespondsToPrincipalToken(
            debtOrder.principalToken,
            debtOrder.termsContract,
        );

        const {
            totalExpectedRepayment,
            termLength,
            amortizationUnit,
        } = this.termsContractInterface.unpackParameters(debtOrder.termsContractParameters);

        const { principalAmount, principalToken } = debtOrder;
        const interestRate = totalExpectedRepayment.div(principalAmount).sub(1);

        return {
            ...debtOrder,
            principalAmount,
            principalToken,
            interestRate,
            termLength,
            amortizationUnit,
        };
    }

    private async assertTermsContractCorrespondsToPrincipalToken(
        principalToken: string,
        termsContract: string,
    ): Promise<void> {
        const termsContractRegistry = await this.contracts.loadTermsContractRegistry(TX_DEFAULTS);
        const termsContractCorrespondingToPrincipalToken = await termsContractRegistry.getSimpleInterestTermsContractAddress.callAsync(
            principalToken,
        );

        if (termsContractCorrespondingToPrincipalToken !== termsContract) {
            throw new Error(
                SimpleInterestAdapterErrors.INVALID_TERMS_CONTRACT(principalToken, termsContract),
            );
        }
    }
}
