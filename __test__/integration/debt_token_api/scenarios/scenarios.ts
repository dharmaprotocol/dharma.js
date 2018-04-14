import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";
import { BigNumber } from "utils/bignumber";
import { Orders } from "./orders";

export namespace DebtTokenScenario {
    export interface BaseScenario {
        description: string;
    }

    export interface Scenario extends BaseScenario {
        orders: SimpleInterestLoanOrder[];
        creditor: string;
        debtor: string;
    }

    export interface Throwable {
        shouldSucceed: boolean;
        errorType?: string;
        errorMessage?: string | RegExp;
    }

    export interface TokenInjectable {
        orderFilledByCreditorOne: SimpleInterestLoanOrder;
        orderFilledByCreditorTwo: SimpleInterestLoanOrder;
        tokenID: (
            creditorOneTokenID: BigNumber,
            creditorTwoTokenID: BigNumber,
            nonexistentTokenID: BigNumber,
            malFormedTokenID: BigNumber,
        ) => BigNumber;
    }

    export const TOKEN_INJECTABLE_DEFAULTS: TokenInjectable = {
        orderFilledByCreditorOne: Orders.CREDITOR_ONE_ORDER,
        orderFilledByCreditorTwo: Orders.CREDITOR_TWO_ORDER,
        tokenID: (creditorOneTokenID, creditorTwoTokenID, nonexistentTokenID, malFormedTokenID) =>
            creditorOneTokenID,
    };

    export interface ThrowableScenario extends Scenario, Throwable {}

    export interface BalanceOfScenario extends BaseScenario, Throwable {
        orders: SimpleInterestLoanOrder[];
        owner: string;
        balance: number;
    }

    export interface OwnerOfScenario extends BaseScenario, Throwable, TokenInjectable {
        transferee?: string;
    }

    export interface ExistsScenario extends BaseScenario, Throwable, TokenInjectable {
        shouldExist: boolean;
    }

    export interface ApproveScenario extends BaseScenario, Throwable, TokenInjectable {
        approver: string;
        approvee: string;
    }

    export interface GetApprovedScenario extends BaseScenario, Throwable, TokenInjectable {
        isApproved: boolean;
        approvee: string;
    }

    export interface SetApprovalForAllScenario extends BaseScenario, Throwable {
        operator: string;
        from: string;
        approved: boolean;
        alreadyApproved: boolean;
    }

    export interface IsApprovedForAllScenario extends BaseScenario, Throwable {
        owner: string;
        operator: string;
        isOperatorApproved: boolean;
    }

    export interface TransferFromScenario extends BaseScenario, Throwable, TokenInjectable {
        // Setup arguments
        tokensApprovedOperator: string;
        ownersApprovedOperator: string;

        // TransferFrom method arguments
        from: string;
        to: (
            userRecipient: string,
            validContractRecipient: string,
            invalidContractRecipient: string,
            malformed: string,
        ) => string;
        data?: string;

        // Transaction options
        sender: string;
    }

    // Transfer scenario ingests the same parameters as transferFrom so that
    // we can reuse our test runners for both methods
    export interface TransferScenario extends TransferFromScenario {}
}
