// External
import { BigNumber } from "bignumber.js";
import * as Web3 from "web3";

// Types
import { DebtTokenScenario } from "../scenarios";

// APIs
import { ContractsAPI, DebtTokenAPI, OrderAPI, SignerAPI, TokenAPI } from "src/apis";

// Adapters
import { SimpleInterestLoanAdapter } from "src/adapters";

// Wrappers
import { DummyTokenContract } from "src/wrappers";

// Utils
import { ACCOUNTS } from "../../../accounts";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

export interface TestAPIs {
    contractsAPI: ContractsAPI;
    debtTokenAPI: DebtTokenAPI;
    orderAPI: OrderAPI;
    signerAPI: SignerAPI;
    tokenAPI: TokenAPI;
}

export interface TestAdapters {
    simpleInterestLoanAdapter: SimpleInterestLoanAdapter;
}

export abstract class ScenarioRunner {
    public abstract testScenario(
        scenario: DebtTokenScenario.Scenario,
        web3: Web3,
        testAPIs: TestAPIs,
        testAdapters: TestAdapters,
    ): void;

    public async configureTokenBalance(
        web3: Web3,
        testAPIs: TestAPIs,
        account: string,
        balance: BigNumber,
        tokenSymbol: string,
    ): Promise<string> {
        const { contractsAPI } = testAPIs;

        const tokenAddress = await contractsAPI.getTokenAddressBySymbolAsync(tokenSymbol);

        const dummyToken = await DummyTokenContract.at(tokenAddress, web3, TX_DEFAULTS);

        await dummyToken.setBalance.sendTransactionAsync(account, balance);

        return tokenAddress;
    }
}

export { BalanceOfScenarioRunner } from "./balance_of";
