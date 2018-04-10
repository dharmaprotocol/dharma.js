// External
import { BigNumber } from "bignumber.js";

// Utils
import * as Units from "utils/units";
import { ERC20TokenSymbol } from "utils/constants";
import { ACCOUNTS } from "../../../accounts";

// Types
import { DebtTokenScenario } from "./";
import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";

// Errors
import { DebtTokenAPIErrors } from "src/apis/debt_token_api";

const CREDITOR = ACCOUNTS[0].address;
const DEBTOR = ACCOUNTS[1].address;
const TOKENS_APPROVED_OPERATOR = ACCOUNTS[2].address;
const OWNERS_APPROVED_OPERATOR = ACCOUNTS[3].address;
const UNAPPROVED_TRANSFER_FROM_SENDER = ACCOUNTS[4].address;

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
    succeeds: false,

    // TransferFrom Setup Parameters
    tokensApprovedOperator: TOKENS_APPROVED_OPERATOR,
    ownersApprovedOperator: OWNERS_APPROVED_OPERATOR,

    // TransferFrom Scenario parameters
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
        nonExistentTokenId: BigNumber,
    ) => ordersIssuanceHash,
    sender: CREDITOR,
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
        errorMessage: DebtTokenAPIErrors.TOKEN_DOES_NOT_EXIST(new BigNumber(13)),
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
        errorMessage: DebtTokenAPIErrors.TOKEN_DOES_NOT_BELONG_TO_ACCOUNT(CREDITOR),
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
    // {
    //     ...defaults,
    //     description: "recipient account is contract that does not implement ERC721Receiver",
    //     tokenID: (
    //         ordersIssuanceHash: BigNumber,
    //         nonCreditorsTokenID: BigNumber,
    //         nonExistentTokenId: BigNumber,
    //     ) => ordersIssuanceHash,
    //     errorType: "CONTRACT_RECIPIENT_DOES_NOT_RECOGNIZE_721",
    //     errorMessage: DebtTokenAPIErrors.CONTRACT_RECIPIENT_DOES_NOT_RECOGNIZE_721(),
    //     to: (
    //         userRecipient: string,
    //         validContractRecipient: string,
    //         invalidContractRecipient: string,
    //     ) => invalidContractRecipient,
    // },
];
