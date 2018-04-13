// External
import { BigNumber } from "utils/bignumber";

// Utils
import {
    unsuccessfulDefaults,
    SUCCESSFUL_TRANSFER_SCENARIOS,
    UNSUCCESSFUL_TRANSFER_SCENARIOS,
} from "./transfer";

// Types
import { DebtTokenScenario } from "./";

// Errors
import { DebtTokenAPIErrors } from "src/apis/debt_token_api";

export const SUCCESSFUL_TRANSFER_FROM_SCENARIOS: DebtTokenScenario.TransferFromScenario[] = SUCCESSFUL_TRANSFER_SCENARIOS;
export const UNSUCCESSFUL_TRANSFER_FROM_SCENARIOS: DebtTokenScenario.TransferFromScenario[] = [
    ...UNSUCCESSFUL_TRANSFER_SCENARIOS,
    {
        ...unsuccessfulDefaults,
        description: "'from' account does not own debt token",
        tokenID: (
            ordersIssuanceHash: BigNumber,
            nonCreditorsTokenID: BigNumber,
            nonExistentTokenId: BigNumber,
        ) => nonCreditorsTokenID,
        errorType: "ONLY_OWNER",
        errorMessage: DebtTokenAPIErrors.ONLY_OWNER(unsuccessfulDefaults.creditor),
    },
    ,
    {
        ...unsuccessfulDefaults,
        description: "data field is non-hexadecimal",
        data: "non-hexadecimal string",
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]*$"',
    },
    {
        ...unsuccessfulDefaults,
        description: "from field is malformed",
        from: "0x123",
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]{40}$"',
    },
];
