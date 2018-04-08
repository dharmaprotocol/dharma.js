import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";

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
}
