// External
import { BigNumber } from "bignumber.js";

// Utils
import { ACCOUNTS } from "../../../accounts";
import { Orders } from "./orders";

// Types
import { DebtTokenScenario } from "./";

const TOKENS_APPROVED_OPERATOR = ACCOUNTS[2].address;
const OWNERS_APPROVED_OPERATOR = ACCOUNTS[3].address;

const defaults = {
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

export const SUCCESSFUL_TRANSFER_FROM_SCENARIOS: DebtTokenScenario.TransferFromScenario[] = [
    {
        ...defaults,
        description: "called by tokens owner to a non-contract recipient",
    },
    {
        ...defaults,
        description:
            "called by token's approved operator (i.e. `approve`) to a non-contract recipient",
        sender: TOKENS_APPROVED_OPERATOR,
    },
    {
        ...defaults,
        description:
            "called by token owner's approved operator (i.e. `setApprovalForAll`) to a non-contract recipient",
        sender: OWNERS_APPROVED_OPERATOR,
    },
    {
        ...defaults,
        description: "called by tokens owner to a valid contract recipient",
        to: (
            userRecipient: string,
            validContractRecipient: string,
            invalidContractRecipient: string,
            malformed: string,
        ) => validContractRecipient,
    },
    {
        ...defaults,
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
        ...defaults,
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
