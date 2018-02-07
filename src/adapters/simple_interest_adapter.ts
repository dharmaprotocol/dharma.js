import { BaseAdapter } from "./base_adapter";
import { DebtOrder } from "src/types";
import { ContractsAPI } from "src/apis";
import { BigNumber } from "bignumber.js";
import { NULL_ADDRESS } from "utils/constants";
import singleLineString from "single-line-string";

export interface SimpleInterestParameters {
    // Debt Order Parameters
    principalAmount: BigNumber;
    principalToken: string;
    debtor?: string;
    debtorFee?: BigNumber;
    creditor?: string;
    creditorFee?: BigNumber;
    relayer?: string;
    relayerFee?: BigNumber;
    underwriter?: string;
    underwriterFee?: BigNumber;
    underwriterRiskRating?: BigNumber;
    expirationTimestampInSec?: BigNumber;

    // Parameters for Terms Contract
    interestRate: BigNumber;
    amortizationUnitType: AmortizationUnitType;
    termLengthInAmortizationUnits: BigNumber;
}

export enum AmortizationUnitType {
    HOURS = 0,
    DAYS = 1,
    WEEKS = 2,
    MONTHS = 3,
    YEARS = 4,
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
};

const TX_DEFAULTS = { from: NULL_ADDRESS, gas: 0 };
const MAX_EXPECTED_REPAYMENT_VALUE_HEX = "0xffffffffffffffffffffffffffffffff";
const MAX_TERM_LENGTH_VALUE_HEX = "0xffffffffffffffffffffffffffffff";

export class SimpleInterestAdapter {
    private contracts: ContractsAPI;

    public constructor(contracts: ContractsAPI) {
        // super();

        this.contracts = contracts;
    }

    public async generateAsync(params: SimpleInterestParameters): Promise<DebtOrder> {
        const { debtKernel, repaymentRouter } = await this.contracts.loadDharmaContractsAsync(
            TX_DEFAULTS,
        );
        const {
            principalToken,
            principalAmount,
            interestRate,
            amortizationUnitType,
            termLengthInAmortizationUnits,
        } = params;

        const simpleInterestTermsContract = await this.contracts.loadSimpleInterestTermsContract(
            principalToken,
            TX_DEFAULTS,
        );

        const totalExpectedRepayment = principalAmount.times(interestRate.plus(1)).trunc();

        const termsContractParameters = this.packParameters(
            totalExpectedRepayment,
            amortizationUnitType,
            termLengthInAmortizationUnits,
        );

        return {
            kernelVersion: debtKernel.address,
            issuanceVersion: repaymentRouter.address,
            principalAmount,
            principalToken,
        };
    }
    //
    // public async validateAsync(debtOrder: DebtOrder): Promise<void> {
    //
    // }

    public packParameters(
        totalExpectedRepayment: BigNumber,
        amortizationUnitType: AmortizationUnitType,
        termLengthInAmortizationUnits: BigNumber,
    ): string {
        this.assertTotalExpectedRepaymentWithinBounds(totalExpectedRepayment);
        this.assertValidAmortizationUnitType(amortizationUnitType);
        this.assertTermLengthWithinBounds(termLengthInAmortizationUnits);

        const totalExpectedRepaymentHex = totalExpectedRepayment.toString(16);
        const amortizationUnitTypeHex = amortizationUnitType.toString(16);
        const termLengthInAmortizationUnitsHex = termLengthInAmortizationUnits.toString(16);

        return (
            "0x" +
            totalExpectedRepaymentHex.padStart(32, "0") +
            amortizationUnitTypeHex.padStart(2, "0") +
            termLengthInAmortizationUnitsHex.padStart(30, "0")
        );
    }

    private assertTotalExpectedRepaymentWithinBounds(totalExpectedRepayment: BigNumber) {
        if (
            totalExpectedRepayment.lt(0) ||
            totalExpectedRepayment.gt(MAX_EXPECTED_REPAYMENT_VALUE_HEX)
        ) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_EXPECTED_REPAYMENT_VALUE());
        }
    }

    private assertValidAmortizationUnitType(amortizationUnitType: AmortizationUnitType) {
        if (!(amortizationUnitType in AmortizationUnitType)) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
        }
    }

    private assertTermLengthWithinBounds(termLengthInAmortizationUnits: BigNumber) {
        if (
            termLengthInAmortizationUnits.lt(0) ||
            termLengthInAmortizationUnits.gt(MAX_TERM_LENGTH_VALUE_HEX)
        ) {
            throw new Error(SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
        }
    }
}
