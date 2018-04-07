export namespace DebtTokenScenario {
    export interface Scenario {
        description: string;
    }

    export interface BalanceOfScenario extends Scenario {
        balance: number;
        owner: string;
    }
}
