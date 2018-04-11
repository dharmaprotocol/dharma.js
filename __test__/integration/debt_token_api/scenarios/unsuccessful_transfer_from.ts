// External
import { BigNumber } from "bignumber.js";

// Utils
import { ACCOUNTS } from "../../../accounts";
import { Orders } from "./orders";

// Types
import { DebtTokenScenario } from "./";

// Errors
import { DebtTokenAPIErrors } from "src/apis/debt_token_api";

const TOKENS_APPROVED_OPERATOR = ACCOUNTS[2].address;
const OWNERS_APPROVED_OPERATOR = ACCOUNTS[3].address;
const UNAPPROVED_TRANSFER_FROM_SENDER = ACCOUNTS[4].address;

const defaults: DebtTokenScenario.TransferFromScenario = {
    // Scenario Setup Parameters
    description: `Default Description`,
    orders: Orders.ALL_ORDERS,
    ...Orders.WHO,
    succeeds: false,

    // TransferFrom Setup Parameters
    tokensApprovedOperator: TOKENS_APPROVED_OPERATOR,
    ownersApprovedOperator: OWNERS_APPROVED_OPERATOR,

    // TransferFrom Scenario parameters
    from: Orders.CREDITOR,
    to: (
        userRecipient: string,
        validContractRecipient: string,
        invalidContractRecipient: string,
        malformed: string,
    ) => userRecipient,
    tokenID: (
        ordersIssuanceHash: BigNumber,
        otherTokenId: BigNumber,
        nonExistentTokenId: BigNumber,
    ) => ordersIssuanceHash,
    sender: Orders.CREDITOR,
};

export const UNSUCCESSFUL_TRANSFER_FROM_SCENARIOS: DebtTokenScenario.TransferFromScenario[] = [
    {
        ...defaults,
        description: "debt token does not exist",
        tokenID: (
            ordersIssuanceHash: BigNumber,
            nonCreditorsTokenID: BigNumber,
            nonExistentTokenId: BigNumber,
        ) => nonExistentTokenId,
        errorType: "TOKEN_DOES_NOT_EXIST",
        errorMessage: DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST(),
    },
    {
        ...defaults,
        description: "account being transferred from does not own debt token",
        tokenID: (
            ordersIssuanceHash: BigNumber,
            nonCreditorsTokenID: BigNumber,
            nonExistentTokenId: BigNumber,
        ) => nonCreditorsTokenID,
        errorType: "TOKEN_DOES_NOT_BELONG_TO_ACCOUNT",
        errorMessage: DebtTokenAPIErrors.ONLY_OWNER(Orders.CREDITOR),
    },
    {
        ...defaults,
        description: "account sending transferFrom not approved to transfer debt token",
        sender: UNAPPROVED_TRANSFER_FROM_SENDER,
        errorType: "ACCOUNT_UNAUTHORIZED_TO_TRANSFER",
        errorMessage: DebtTokenAPIErrors.ACCOUNT_UNAUTHORIZED_TO_TRANSFER(
            UNAPPROVED_TRANSFER_FROM_SENDER,
        ),
    },
    {
        ...defaults,
        description: "data field is non-hexadecimal",
        data: "non-hexadecimal string",
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]*$"',
    },
    {
        ...defaults,
        description: "from field is malformed",
        from: "0x123",
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]{40}$"',
    },
    {
        ...defaults,
        description: "to field is malformed",
        to: (
            userRecipient: string,
            validContractRecipient: string,
            invalidContractRecipient: string,
            malformed: string,
        ) => malformed,
        errorType: "DOES_NOT_CONFORM_TO_SCHEMA",
        errorMessage: 'instance does not match pattern "^0x[0-9a-fA-F]{40}$"',
    },
    {
        ...defaults,
        description: "recipient account is contract that does not implement ERC721Receiver",
        tokenID: (
            ordersIssuanceHash: BigNumber,
            nonCreditorsTokenID: BigNumber,
            nonExistentTokenId: BigNumber,
        ) => ordersIssuanceHash,
        errorType: "CONTRACT_RECIPIENT_DOES_NOT_RECOGNIZE_721",
        errorMessage: "does not implement the ERC721Receiver interface",
        to: (
            userRecipient: string,
            validContractRecipient: string,
            invalidContractRecipient: string,
        ) => invalidContractRecipient,
    },
];
