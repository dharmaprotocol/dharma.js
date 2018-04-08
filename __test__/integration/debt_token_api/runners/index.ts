// External
import { BigNumber } from "bignumber.js";
import * as Web3 from "web3";

// Types
import { DebtTokenScenario } from "../scenarios";
import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";

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

    public async generateDebtTokenForOrder(
        simpleInterestLoanOrder: SimpleInterestLoanOrder,
        web3: Web3,
        testAPIs: TestAPIs,
        testAdapters: TestAdapters,
    ) {
        const { orderAPI, signerAPI, tokenAPI } = testAPIs;
        const { simpleInterestLoanAdapter } = testAdapters;

        const principalToken = await this.getDummyTokenBySymbol(
            web3,
            testAPIs,
            simpleInterestLoanOrder.principalTokenSymbol,
        );
        await this.configureTokenBalance(
            principalToken,
            simpleInterestLoanOrder.creditor,
            simpleInterestLoanOrder.principalAmount,
        );

        await tokenAPI.setProxyAllowanceAsync(
            principalToken.address,
            simpleInterestLoanOrder.principalAmount,
        );

        const order = await orderAPI.generate(simpleInterestLoanAdapter, simpleInterestLoanOrder);
        order.debtorSignature = await signerAPI.asDebtor(order, false);

        await orderAPI.fillAsync(order, {
            from: order.creditor,
        });
    }

    private async getDummyTokenBySymbol(
        web3: Web3,
        testAPIs: TestAPIs,
        tokenSymbol: string,
    ): Promise<DummyTokenContract> {
        const { contractsAPI } = testAPIs;
        const tokenAddress = await contractsAPI.getTokenAddressBySymbolAsync(tokenSymbol);

        return DummyTokenContract.at(tokenAddress, web3, TX_DEFAULTS);
    }

    private async configureTokenBalance(
        token: DummyTokenContract,
        account: string,
        balance: BigNumber,
    ): Promise<string> {
        return token.setBalance.sendTransactionAsync(account, balance);
    }
}

export { BalanceOfScenarioRunner } from "./balance_of";
