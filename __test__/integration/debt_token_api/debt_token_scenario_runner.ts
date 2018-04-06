import * as Web3 from "web3";
import { Web3Utils } from "utils/web3_utils";

import { ContractsAPI, DebtTokenAPI } from "src/apis/";

export class DebtTokenScenarioRunner {
    private web3Utils: Web3Utils;
    private web3: Web3;

    // APIs
    private contractsAPI: ContractsAPI;
    private debtTokenAPI: DebtTokenAPI;

    private isConfigured: boolean = false;
    private currentSnapshotId: number;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.web3Utils = new Web3Utils(web3);

        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);
    }

    public async configure() {
        // Prevent unnecessary configuration.
        if (this.isConfigured) {
            return;
        }

        this.contractsAPI = new ContractsAPI(this.web3);
        this.debtTokenAPI = new DebtTokenAPI(this.web3, this.contractsAPI);

        this.isConfigured = true;
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }
}
