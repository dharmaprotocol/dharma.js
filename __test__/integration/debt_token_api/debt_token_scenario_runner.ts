import * as Web3 from "web3";
import { Web3Utils } from "utils/web3_utils";
import { BigNumber } from "bignumber.js";
import { ERC20TokenSymbol } from "utils/constants";

import { ContractsAPI, DebtTokenAPI, OrderAPI, SignerAPI } from "src/apis/";

import {
    DummyTokenContract,
    TokenTransferProxyContract,
    TokenRegistryContract,
} from "src/wrappers";

import { DebtTokenScenario } from "./scenarios";

import { SimpleInterestLoanAdapter } from "src/adapters";

import { SimpleInterestLoanOrder } from "src/adapters/simple_interest_loan_adapter";

import { ACCOUNTS } from "../../accounts";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

export class DebtTokenScenarioRunner {
    private web3Utils: Web3Utils;
    private web3: Web3;

    // Contracts
    private tokenTransferProxy: TokenTransferProxyContract;
    private tokenRegistry: TokenRegistryContract;

    // APIs
    private contractsAPI: ContractsAPI;
    private debtTokenAPI: DebtTokenAPI;
    private orderAPI: OrderAPI;
    private signerAPI: SignerAPI;

    // Adapters
    private simpleInterestLoanAdapter: SimpleInterestLoanAdapter;

    private isConfigured: boolean = false;
    private currentSnapshotId: number;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.web3Utils = new Web3Utils(web3);

        this.testBalanceOfScenario = this.testBalanceOfScenario.bind(this);
        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async configure() {
        // Prevent unnecessary configuration.
        if (this.isConfigured) {
            return;
        }

        // APIs
        this.contractsAPI = new ContractsAPI(this.web3);
        this.debtTokenAPI = new DebtTokenAPI(this.web3, this.contractsAPI);
        this.orderAPI = new OrderAPI(this.web3, this.contractsAPI);
        this.signerAPI = new SignerAPI(this.web3, this.contractsAPI);

        // Contracts
        this.tokenTransferProxy = await TokenTransferProxyContract.deployed(this.web3, TX_DEFAULTS);
        this.tokenRegistry = await TokenRegistryContract.deployed(this.web3, TX_DEFAULTS);

        // Adapters
        this.simpleInterestLoanAdapter = new SimpleInterestLoanAdapter(this.contractsAPI);

        this.isConfigured = true;
    }

    private async generateDebtTokenForOrder(order: SimpleInterestLoanOrder) {
        const principalTokenAddress = await this.tokenRegistry.getTokenAddressBySymbol.callAsync(
            order.principalTokenSymbol,
        );

        const principalToken = await DummyTokenContract.at(
            principalTokenAddress,
            this.web3,
            TX_DEFAULTS,
        );

        await principalToken.setBalance.sendTransactionAsync(order.creditor, order.principalAmount);

        await principalToken.approve.sendTransactionAsync(
            this.tokenTransferProxy.address,
            order.principalAmount,
            { from: order.creditor },
        );

        const preparedOrder = await this.orderAPI.generate(this.simpleInterestLoanAdapter, order);
        preparedOrder.debtorSignature = await this.signerAPI.asDebtor(preparedOrder, false);

        await this.orderAPI.fillAsync(preparedOrder, {
            from: order.creditor,
        });
    }

    public async testBalanceOfScenario(scenario: DebtTokenScenario.BalanceOfScenario) {
        describe(scenario.description, () => {
            beforeEach(async () => {
                for (let order of scenario.orders) {
                    await this.generateDebtTokenForOrder(order);
                }
            });

            test("returns correct balance of debt tokens", async () => {
                const computedBalance = await this.debtTokenAPI.balanceOf(scenario.creditor);
                await expect(computedBalance.toNumber()).toEqual(scenario.balance);
            });
        });
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }
}
