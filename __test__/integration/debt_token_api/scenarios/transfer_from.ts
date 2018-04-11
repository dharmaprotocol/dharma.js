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

const successfulDefaults = {
    // Scenario Setup Parameters
    orders: Orders.ALL_ORDERS,
    ...Orders.WHO,
    succeeds: true,

    // TransferFrom Setup Parameters
    tokensApprovedOperator: TOKENS_APPROVED_OPERATOR,
    ownersApprovedOperator: OWNERS_APPROVED_OPERATOR,

    // TransferFrom Scenario Parameters
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
        nonexistentTokenId: BigNumber,
    ) => ordersIssuanceHash,
    sender: Orders.CREDITOR,
};

const unsuccessfulDefaults = {
    ...successfulDefaults,
    succeeds: false,
};

export const SUCCESSFUL_TRANSFER_FROM_SCENARIOS: DebtTokenScenario.TransferFromScenario[] = [
    {
        ...successfulDefaults,
        description: "called by tokens owner to a non-contract recipient",
    },
    {
        ...successfulDefaults,
        description:
            "called by token's approved operator (i.e. `approve`) to a non-contract recipient",
        sender: TOKENS_APPROVED_OPERATOR,
    },
    {
        ...successfulDefaults,
        description:
            "called by token owner's approved operator (i.e. `setApprovalForAll`) to a non-contract recipient",
        sender: OWNERS_APPROVED_OPERATOR,
    },
    {
        ...successfulDefaults,
        description: "called by tokens owner to a valid contract recipient",
        to: (
            userRecipient: string,
            validContractRecipient: string,
            invalidContractRecipient: string,
            malformed: string,
        ) => validContractRecipient,
    },
    {
        ...successfulDefaults,
        description:
            "called by token's approved operator (i.e. `approve`) to a valid contract recipient",
        sender: TOKENS_APPROVED_OPERATOR,
        to: (
            userRecipient: string,
            validContractRecipient: string,
            invalidContractRecipient: string,
            malformed: string,
        ) => validContractRecipient,
    },
    {
        ...successfulDefaults,
        description:
            "called by token owner's approved operator (i.e. `setApprovalForAll`) to a valid contract recipient",
        sender: OWNERS_APPROVED_OPERATOR,
        to: (
            userRecipient: string,
            validContractRecipient: string,
            invalidContractRecipient: string,
            malformed: string,
        ) => validContractRecipient,
    },
];

export const UNSUCCESSFUL_TRANSFER_FROM_SCENARIOS: DebtTokenScenario.TransferFromScenario[] = [
    {
        ...unsuccessfulDefaults,
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
        ...unsuccessfulDefaults,
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
        ...unsuccessfulDefaults,
        description: "account sending transferFrom not approved to transfer debt token",
        sender: UNAPPROVED_TRANSFER_FROM_SENDER,
        errorType: "ACCOUNT_UNAUTHORIZED_TO_TRANSFER",
        errorMessage: DebtTokenAPIErrors.ACCOUNT_UNAUTHORIZED_TO_TRANSFER(
            UNAPPROVED_TRANSFER_FROM_SENDER,
        ),
    },
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
    {
        ...unsuccessfulDefaults,
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
        ...unsuccessfulDefaults,
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
