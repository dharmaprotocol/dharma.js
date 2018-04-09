// External
import * as Web3 from "web3";

// Scenario Runners
import { OwnerOfScenarioRunner, BalanceOfScenarioRunner, TestAPIs, TestAdapters } from "./runners";

// APIs
import { ContractsAPI, DebtTokenAPI, OrderAPI, SignerAPI, TokenAPI } from "src/apis/";

// Types
import { DebtTokenScenario } from "./scenarios";

// Adapters
import { SimpleInterestLoanAdapter } from "src/adapters";

// Utils
import { Web3Utils } from "utils/web3_utils";

export class DebtTokenScenarioRunner {
    private web3Utils: Web3Utils;
    private web3: Web3;
    // APIs
    private testAPIs: TestAPIs;

    // Adapters
    private testAdapters: TestAdapters;

    // Scenario Runners
    private balanceOfScenarioRunner: BalanceOfScenarioRunner;
    private ownerOfScenarioRunner: OwnerOfScenarioRunner;

    private currentSnapshotId: number;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.web3Utils = new Web3Utils(web3);

        const contractsAPI = new ContractsAPI(this.web3);
        const debtTokenAPI = new DebtTokenAPI(this.web3, contractsAPI);
        const tokenAPI = new TokenAPI(this.web3, contractsAPI);
        const orderAPI = new OrderAPI(this.web3, contractsAPI);
        const signerAPI = new SignerAPI(this.web3, contractsAPI);
        this.testAPIs = {
            contractsAPI,
            debtTokenAPI,
            orderAPI,
            signerAPI,
            tokenAPI,
        };

        // Adapters
        this.testAdapters = {
            simpleInterestLoanAdapter: new SimpleInterestLoanAdapter(contractsAPI),
        };

        this.balanceOfScenarioRunner = new BalanceOfScenarioRunner();
        this.ownerOfScenarioRunner = new OwnerOfScenarioRunner();

        this.testOwnerOfScenario = this.testOwnerOfScenario.bind(this);
        this.testBalanceOfScenario = this.testBalanceOfScenario.bind(this);
        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async testBalanceOfScenario(scenario: DebtTokenScenario.BalanceOfScenario) {
        return this.balanceOfScenarioRunner.testScenario(
            scenario,
            this.web3,
            this.testAPIs,
            this.testAdapters,
        );
    }

    public async testOwnerOfScenario(scenario: DebtTokenScenario.OwnerOfScenario) {
        return this.ownerOfScenarioRunner.testScenario(
            scenario,
            this.web3,
            this.testAPIs,
            this.testAdapters,
        );
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }
}
