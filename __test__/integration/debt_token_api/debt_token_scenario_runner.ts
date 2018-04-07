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

import { ACCOUNTS } from "../../accounts";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

export class DebtTokenScenarioRunner {
    private web3Utils: Web3Utils;
    private web3: Web3;

    // Contracts
    private principalToken: DummyTokenContract;
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
        const principalTokenAddress = await this.tokenRegistry.getTokenAddressBySymbol.callAsync(
            ERC20TokenSymbol.ZRX,
        );
        this.principalToken = await DummyTokenContract.at(
            principalTokenAddress,
            this.web3,
            TX_DEFAULTS,
        );

        // Adapters
        this.simpleInterestLoanAdapter = new SimpleInterestLoanAdapter(
            this.web3,
            this.contractsAPI,
        );

        this.isConfigured = true;
    }

    public async testBalanceOfScenario(scenario: DebtTokenScenario.BalanceOfScenario) {
        describe(scenario.description, () => {
            beforeEach(async () => {
                const principalAmount = new BigNumber(10 * 10 ** 18);

                await this.principalToken.setBalance.sendTransactionAsync(
                    scenario.owner,
                    principalAmount,
                );

                await this.principalToken.approve.sendTransactionAsync(
                    this.tokenTransferProxy.address,
                    principalAmount,
                    { from: scenario.owner },
                );

                const params = {
                    principalAmount: principalAmount,
                    principalTokenSymbol: ERC20TokenSymbol.ZRX,
                    interestRate: new BigNumber(4.135),
                    amortizationUnit: "months",
                    termLength: new BigNumber(3),
                    debtor: ACCOUNTS[0].address,
                    creditor: scenario.owner,
                };

                const order = await this.orderAPI.generate(this.simpleInterestLoanAdapter, params);
                order.debtorSignature = await this.signerAPI.asDebtor(order, false);

                await this.orderAPI.fillAsync(order, {
                    from: scenario.owner,
                });
            });

            test("returns correct balance of debt tokens", async () => {
                const balance = await this.debtTokenAPI.balanceOf(scenario.owner);
                await expect(balance.toNumber()).toEqual(scenario.balance);
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
