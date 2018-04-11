import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";
import { BigNumber } from "bignumber.js";

export namespace DebtTokenScenario {
    export interface Scenario {
        description: string;
        orders: SimpleInterestLoanOrder[];
        creditor: string;
        debtor: string;
    }

    export interface BalanceOfScenario extends Scenario {
        balance: number;
    }

    export interface OwnerOfScenario extends Scenario {
        shouldTransferTo?: string;
    }

    export interface ExistsScenario extends Scenario {
        shouldExist: boolean;
    }

    export interface ApproveScenario extends Scenario {
        shouldSucceed: boolean;
        shouldGenerateTokens: boolean;
        approver: string;
        approvee: string;
        errorType?: string;
        errorMessage?: string;
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
}
