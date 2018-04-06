// Test Utils
import { ACCOUNTS } from "__test__/accounts";

// Errors
import { ContractsError } from "src/apis/contracts_api";
import { SimpleInterestAdapterErrors } from "src/adapters/simple_interest_loan_adapter";

// Scenario
import { UnpackTermsScenario } from "./";

export const UNSUCCESSFUL_UNPACK_TERMS: UnpackTermsScenario[] = [
    {
        description: "terms contract at address is not tracked by dharma.js adapter",
        termsContract: (
            simpleInterest: string,
            collateralizedSimpleInterest: string,
            other: string,
        ) => other,
        termsContractParameters:
            "0x00000000002ff62db077c000000230f010007000000000000000000000000000",
        throws: true,
        errorType: "TERMS_CONTRACT_NOT_FOUND",
        errorMessage: ContractsError.TERMS_CONTRACT_NOT_FOUND(ACCOUNTS[4].address),
    },
    {
        description: "parameters unpack to invalid values (simple interest, amortization unit > 4)",
        termsContract: (
            simpleInterest: string,
            collateralizedSimpleInterest: string,
            other: string,
        ) => simpleInterest,
        termsContractParameters:
            "0x0000000025674c25cd7f81d06700000050004000000000000000000000000000",
        throws: true,
        errorType: "INVALID_AMORTIZATION_UNIT_TYPE",
        errorMessage: SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE(),
    },
    {
        description: "parameters are not valid hexadecimal",
        termsContract: (
            simpleInterest: string,
            collateralizedSimpleInterest: string,
            other: string,
        ) => simpleInterest,
        termsContractParameters:
            "0x000000002567zzzzzzzf81d06700000050004000000000000000000000000000",
        throws: true,
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'does not match pattern "^0x[0-9a-fA-F]{64}$"',
    },
    {
        description: "parameters are too short",
        termsContract: (
            simpleInterest: string,
            collateralizedSimpleInterest: string,
            other: string,
        ) => simpleInterest,
        termsContractParameters: "0x0000000025674c25cd7f81d067000000500040000000000000000000000",
        throws: true,
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'does not match pattern "^0x[0-9a-fA-F]{64}$"',
    },
    {
        description: "parameters are too long",
        termsContract: (
            simpleInterest: string,
            collateralizedSimpleInterest: string,
            other: string,
        ) => simpleInterest,
        termsContractParameters:
            "0x0000000025674c25cd7f81d067000000500040000000000000000000000123456765432",
        throws: true,
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'does not match pattern "^0x[0-9a-fA-F]{64}$"',
    },
];
