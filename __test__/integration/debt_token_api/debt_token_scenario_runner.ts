// External
import * as Web3 from "web3";

// Scenario Runners
import {
    OwnerOfScenarioRunner,
    BalanceOfScenarioRunner,
    ExistsScenarioRunner,
    TransferFromScenarioRunner,
    TransferScenarioRunner,
    ApproveScenarioRunner,
    GetApprovedScenarioRunner,
    SetApprovalForAllScenarioRunner,
    IsApprovedForAllScenarioRunner,
} from "./runners";

// APIs
import { ContractsAPI, DebtTokenAPI, OrderAPI, SignerAPI, TokenAPI, AdaptersAPI } from "src/apis/";

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
    private existsScenarioRunner: ExistsScenarioRunner;
    private transferFromScenarioRunner: TransferFromScenarioRunner;
    private transferScenarioRunner: TransferScenarioRunner;
    private approveScenarioRunner: ApproveScenarioRunner;
    private getApprovedScenarioRunner: GetApprovedScenarioRunner;
    private setApprovalForAllScenarioRunner: SetApprovalForAllScenarioRunner;
    private isApprovedForAllScenarioRunner: IsApprovedForAllScenarioRunner;

    constructor(web3: Web3) {
        this.web3Utils = new Web3Utils(web3);

        const contractsAPI = new ContractsAPI(web3);
        const adaptersAPI = new AdaptersAPI(web3, contractsAPI);
        const debtTokenAPI = new DebtTokenAPI(web3, contractsAPI);
        const tokenAPI = new TokenAPI(web3, contractsAPI);
        const orderAPI = new OrderAPI(web3, contractsAPI, adaptersAPI);
        const signerAPI = new SignerAPI(web3, contractsAPI);

        const testAPIs = {
            contractsAPI,
            debtTokenAPI,
            orderAPI,
            signerAPI,
            tokenAPI,
            adaptersAPI,
        };

        const testAdapters = {
            simpleInterestLoanAdapter: new SimpleInterestLoanAdapter(contractsAPI),
        };

        this.balanceOfScenarioRunner = new BalanceOfScenarioRunner(web3, testAPIs, testAdapters);
        this.ownerOfScenarioRunner = new OwnerOfScenarioRunner(web3, testAPIs, testAdapters);
        this.existsScenarioRunner = new ExistsScenarioRunner(web3, testAPIs, testAdapters);
        this.transferFromScenarioRunner = new TransferFromScenarioRunner(
            web3,
            testAPIs,
            testAdapters,
        );
        this.transferScenarioRunner = new TransferScenarioRunner(web3, testAPIs, testAdapters);
        this.approveScenarioRunner = new ApproveScenarioRunner(web3, testAPIs, testAdapters);
        this.getApprovedScenarioRunner = new GetApprovedScenarioRunner(
            web3,
            testAPIs,
            testAdapters,
        );
        this.setApprovalForAllScenarioRunner = new SetApprovalForAllScenarioRunner(
            web3,
            testAPIs,
            testAdapters,
        );
        this.isApprovedForAllScenarioRunner = new IsApprovedForAllScenarioRunner(
            web3,
            testAPIs,
            testAdapters,
        );

        this.testOwnerOfScenario = this.testOwnerOfScenario.bind(this);
        this.testBalanceOfScenario = this.testBalanceOfScenario.bind(this);
        this.testExistsScenario = this.testExistsScenario.bind(this);
        this.testTransferFromScenario = this.testTransferFromScenario.bind(this);
        this.testTransferScenario = this.testTransferScenario.bind(this);
        this.testApproveScenario = this.testApproveScenario.bind(this);
        this.testGetApprovedScenario = this.testGetApprovedScenario.bind(this);
        this.testSetApprovalForAll = this.testSetApprovalForAll.bind(this);
        this.testIsApprovedForAll = this.testIsApprovedForAll.bind(this);

        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async testBalanceOfScenario(scenario: DebtTokenScenario.BalanceOfScenario) {
        return this.balanceOfScenarioRunner.testScenario(scenario);
    }

    public async testOwnerOfScenario(scenario: DebtTokenScenario.OwnerOfScenario) {
        return this.ownerOfScenarioRunner.testScenario(scenario);
    }

    public async testExistsScenario(scenario: DebtTokenScenario.ExistsScenario) {
        return this.existsScenarioRunner.testScenario(scenario);
    }

    public async testTransferFromScenario(scenario: DebtTokenScenario.TransferFromScenario) {
        return this.transferFromScenarioRunner.testScenario(scenario);
    }

    public async testTransferScenario(scenario: DebtTokenScenario.TransferScenario) {
        return this.transferScenarioRunner.testScenario(scenario);
    }

    public async testApproveScenario(scenario: DebtTokenScenario.ApproveScenario) {
        return this.approveScenarioRunner.testScenario(scenario);
    }

    public async testGetApprovedScenario(scenario: DebtTokenScenario.GetApprovedScenario) {
        return this.getApprovedScenarioRunner.testScenario(scenario);
    }

    public async testSetApprovalForAll(scenario: DebtTokenScenario.SetApprovalForAllScenario) {
        return this.setApprovalForAllScenarioRunner.testScenario(scenario);
    }

    public async testIsApprovedForAll(scenario: DebtTokenScenario.IsApprovedForAllScenario) {
        return this.isApprovedForAllScenarioRunner.testScenario(scenario);
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }
}
