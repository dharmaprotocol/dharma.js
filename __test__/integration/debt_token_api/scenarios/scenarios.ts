import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";
import { BigNumber } from "utils/bignumber";

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
        errorMessage?: string;
    }

    export interface ThrowableScenario extends Scenario, Throwable {}

    export interface BalanceOfScenario extends Scenario {
        balance: number;
    }

    export interface OwnerOfScenario extends Scenario {
        shouldTransferTo?: string;
    }

    export interface ExistsScenario extends Scenario {
        shouldExist: boolean;
    }

    export interface ApproveScenario extends ThrowableScenario {
        shouldGenerateTokens: boolean;
        approver: string;
        approvee: string;
    }

    export interface GetApprovedScenario extends Scenario {
        isApproved: boolean;
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

    export interface TransferFromScenario extends Scenario {
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
        tokenID: (
            ordersIssuanceHash: BigNumber,
            otherTokenId: BigNumber,
            nonexistentTokenId: BigNumber,
        ) => BigNumber;
        data?: string;

        // Transaction options
        sender: string;

        // Scenario outcome
        succeeds: boolean;
        errorType?: string;
        errorMessage?: string;
    }

    // Transfer scenario ingests the same parameters as transferFrom so that
    // we can reuse our test runners for both methods
    export interface TransferScenario extends TransferFromScenario {}
}
