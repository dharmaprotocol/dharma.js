// libraries
import { BigNumber } from "utils/bignumber";

// utils
import * as Units from "utils/units";
import { NULL_BYTES32 } from "utils/constants";

import { MakeRepaymentScenario } from "./";
import { ServicingAPIErrors } from "src/apis/servicing_api";

const defaultArgs = {
    amount: Units.ether(0.5),
    allowance: Units.ether(2),
    balance: Units.ether(2),
    repaymentAttempts: 1,
    successfullyRepays: false,
    throws: true,
    agreementId: (issuanceHash: string) => issuanceHash,
    repaymentToken: (principalToken: string, nonPrincipalToken: string) => principalToken,
};

export const INVALID_MAKE_REPAYMENT: MakeRepaymentScenario[] = [
    {
        description: "tokenAddress is malformed",
        ...defaultArgs,
        repaymentToken: (principalToken: string, nonPrincipalToken: string) =>
            principalToken.substr(5),
        errorMessage: /instance does not match pattern/,
    },
    {
        description: "debtAgreementId is malformed",
        ...defaultArgs,
        agreementId: (issuanceHash: string) => issuanceHash.substr(8),
        errorMessage: /instance does not match pattern/,
    },
    {
        description: "no debt agreement with given id exists",
        ...defaultArgs,
        agreementId: (issuanceHash: string) => NULL_BYTES32,
        errorMessage: ServicingAPIErrors.DEBT_AGREEMENT_NONEXISTENT(NULL_BYTES32),
    },
    {
        description: "payer's balance in given token is insufficient",
        ...defaultArgs,
        balance: Units.ether(0.4),
        errorMessage: ServicingAPIErrors.INSUFFICIENT_REPAYMENT_BALANCE(),
    },
    {
        description: "payer's allowance granted to transfer proxy is insufficient",
        ...defaultArgs,
        allowance: Units.ether(0.4),
        errorMessage: ServicingAPIErrors.INSUFFICIENT_REPAYMENT_ALLOWANCE(),
    },
    {
        description: "amount is not a BigNumber",
        ...defaultArgs,
        amount: 100,
        errorMessage: /instance does not conform to the "BigNumber" format/,
    },
    {
        description: "amount is malformed",
        ...defaultArgs,
        amount: new BigNumber(-100),
        errorMessage: /instance does not conform to the "BigNumber" format/,
    },
    {
        description: "terms contract rejects repayment due to unexpected token",
        ...defaultArgs,
        throws: false,
        repaymentToken: (principalToken: string, nonPrincipalToken: string) => nonPrincipalToken,
    },
];
