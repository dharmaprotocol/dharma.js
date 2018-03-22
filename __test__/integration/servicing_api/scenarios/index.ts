import { VALID_MAKE_REPAYMENT } from "./valid_make_repayment";
import { INVALID_MAKE_REPAYMENT } from "./invalid_make_repayment";
import { GET_VALUE_REPAID } from "./get_value_repaid";
import { GET_EXPECTED_VALUE_REPAID } from "./get_expected_value_repaid";
import { GET_REPAYMENT_SCHEDULE } from "./get_repayment_schedule";
import { GET_DEBTS } from "./get_debts";

import { BigNumber } from "bignumber.js";

export interface MakeRepaymentScenario {
    // The test's description, e.g. "payer's balance is insufficient"
    description: string;
    // The amount given as repayment.
    amount: BigNumber;
    // The sender's proxy allowance for the given repayment token.
    allowance: BigNumber;
    // The sender's balance for the given repayment token.
    balance: BigNumber;
    // Whether the test should expect the payment to succeed.
    successfullyRepays: boolean;
    // Whether the method should throw an error for the given arguments.
    throws: boolean;
    // The error message to expect if the method should throw an error.
    errorMessage?: string;
    // The number of times that the method should be called before test.
    repaymentAttempts: number;
    // The token address (principal or non-principal) to be used for the repayment.
    repaymentToken: (principalToken: string, nonPrincipalToken: string) => string;
    // The agreementId (from issuance hash) that should be used in the repayment.
    agreementId: (issuanceHash: string) => string;
}

export interface GetValueRepaidScenario {
    // The test's description.
    description: string;
    // The amount to be repaid.
    amount: BigNumber;
    // The number of times the repayment has been made.
    repaymentAttempts: number;
    // The return value expected from the method.
    expected: BigNumber;
}

export interface GetExpectedValueRepaidScenario {
    // The test's description.
    description: string;
    // The number of days from present for which the expected value should be calculated.
    days: number;
    principalAmount: BigNumber;
    interestRate: BigNumber;
    amortizationUnit: "hours" | "days" | "weeks" | "months" | "years";
    // The return value expected from the method.
    expected: BigNumber;
}

export interface GetRepaymentScheduleScenario {
    // The test's description.
    description: string;
    // Given a timestamp, returns a list of dates as unix timestamps.
    expected: (timestamp: number) => Array<number>;
    amortizationUnit: "hours" | "days" | "weeks" | "months" | "years";
    termLength: BigNumber;
}

export interface GetDebtsScenario {
    // The test's description.
    description: string;
    // Specifies the account we'll be pulling debts for
    account: string;
    // Specifies the account on whose behalf we'll be taking out loans
    debtor: string;
    // Number of debt agreements the account is engaged in.
    numDebtAgreements: number;
    // If the test fails, this field will contain the expected error message
    errorMessage?: string;
}

export {
    VALID_MAKE_REPAYMENT,
    INVALID_MAKE_REPAYMENT,
    GET_VALUE_REPAID,
    GET_EXPECTED_VALUE_REPAID,
    GET_REPAYMENT_SCHEDULE,
    GET_DEBTS,
};
