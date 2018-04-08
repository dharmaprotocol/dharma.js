// External
import * as Web3 from "web3";

// Scenario Runners
import { OwnerOfScenarioRunner, BalanceOfScenarioRunner } from "./runners";

// APIs
import { ContractsAPI, DebtTokenAPI, OrderAPI, SignerAPI, TokenAPI } from "src/apis/";

// Types
import { DebtTokenScenario } from "./scenarios";

// Adapters
import { SimpleInterestLoanAdapter } from "src/adapters";

// Utils
import { Web3Utils } from "utils/web3_utils";

export class DebtTokenScenarioRunner {
    // Snapshotting.
    private web3Utils: Web3Utils;

    private currentSnapshotId: number;

    // Scenario Runners
    private balanceOfScenarioRunner: BalanceOfScenarioRunner;
    private ownerOfScenarioRunner: OwnerOfScenarioRunner;

    constructor(web3: Web3) {
        this.web3Utils = new Web3Utils(web3);

        const contractsAPI = new ContractsAPI(web3);
        const debtTokenAPI = new DebtTokenAPI(web3, contractsAPI);
        const tokenAPI = new TokenAPI(web3, contractsAPI);
        const orderAPI = new OrderAPI(web3, contractsAPI);
        const signerAPI = new SignerAPI(web3, contractsAPI);

        const testAPIs = {
            contractsAPI,
            debtTokenAPI,
            orderAPI,
            signerAPI,
            tokenAPI,
        };

        const testAdapters = {
            simpleInterestLoanAdapter: new SimpleInterestLoanAdapter(contractsAPI),
        };

        this.balanceOfScenarioRunner = new BalanceOfScenarioRunner(web3, testAPIs, testAdapters);
        this.ownerOfScenarioRunner = new OwnerOfScenarioRunner(web3, testAPIs, testAdapters);

        this.testOwnerOfScenario = this.testOwnerOfScenario.bind(this);
        this.testBalanceOfScenario = this.testBalanceOfScenario.bind(this);
        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async testBalanceOfScenario(scenario: DebtTokenScenario.BalanceOfScenario) {
        return this.balanceOfScenarioRunner.testScenario(scenario);
    }

    public async testOwnerOfScenario(scenario: DebtTokenScenario.OwnerOfScenario) {
        return this.ownerOfScenarioRunner.testScenario(scenario);
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }
}
