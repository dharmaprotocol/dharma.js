// Test Utils
import { ACCOUNTS } from "__test__/accounts";

// Errors
import { ContractsError } from "src/apis/contracts_api";

// Scenario
import { UnpackTermsScenario } from "./";

// Types
import { DebtOrder } from "src/types";

export const UNSUCCESSFUL_UNPACK_TERMS: UnpackTermsScenario[] = [
    {
        description: "terms contract at address is not tracked by dharma.js adapter",
        debtOrder: (defaults: DebtOrder.Instance) => {
            return {
                ...defaults,
                termsContract: ACCOUNTS[4].address,
            };
        },
        throws: true,
        errorType: "TERMS_CONTRACT_NOT_FOUND",
        errorMessage: ContractsError.TERMS_CONTRACT_NOT_FOUND(ACCOUNTS[4].address),
    },
];
