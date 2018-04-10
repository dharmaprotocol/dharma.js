import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";
import { BigNumber } from "bignumber.js";
import { TxData } from "src/types";

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

    export interface TransferFromScenario extends Scenario {
        from: string;
        to: string;
        tokenID: BigNumber;
        data?: string;
        options?: TxData;
    }
}
