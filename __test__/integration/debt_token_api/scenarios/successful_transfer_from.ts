// External
import { BigNumber } from "bignumber.js";

// Utils
import * as Units from "utils/units";
import { ERC20TokenSymbol } from "utils/constants";
import { ACCOUNTS } from "../../../accounts";

// Types
import { DebtTokenScenario } from "./";
import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";

const CREDITOR = ACCOUNTS[0].address;
const DEBTOR = ACCOUNTS[1].address;
const TOKENS_APPROVED_OPERATOR = ACCOUNTS[2].address;
const OWNERS_APPROVED_OPERATOR = ACCOUNTS[3].address;

const ORDER_1: SimpleInterestLoanOrder = {
    principalAmount: Units.ether(10),
    principalTokenSymbol: ERC20TokenSymbol.ZRX,
    interestRate: new BigNumber(4.135),
    amortizationUnit: "months",
    termLength: new BigNumber(3),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

const ORDER_2: SimpleInterestLoanOrder = {
    principalAmount: new BigNumber(11 * 10 ** 18),
    principalTokenSymbol: ERC20TokenSymbol.MKR,
    interestRate: new BigNumber(8.937),
    amortizationUnit: "years",
    termLength: new BigNumber(2),
    debtor: DEBTOR,
    creditor: CREDITOR,
};

const defaults: DebtTokenScenario.TransferFromScenario = {
    // Scenario Setup Parameters
    description: `Default Description`,
    orders: [ORDER_1, ORDER_2],
    debtor: DEBTOR,
    creditor: CREDITOR,
    succeeds: true,

    // TransferFrom Setup Parameters
    tokensApprovedOperator: TOKENS_APPROVED_OPERATOR,
    ownersApprovedOperator: OWNERS_APPROVED_OPERATOR,

    // TransferFrom Scenario Parameters
    from: CREDITOR,
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
    sender: CREDITOR,
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
