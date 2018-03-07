// libraries
import * as Web3 from "web3";

// utils
import { Web3Utils } from "utils/web3_utils";

import { OrderAPI, ServicingAPI, SignerAPI, ContractsAPI, AdaptersAPI } from "src/apis";
import { DebtOrder } from "src/types";
import {
    DebtOrderWrapper,
    DummyTokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "src/wrappers";
import { DebtKernelContract } from "src/wrappers/contract_wrappers/debt_kernel_wrapper";

import { MakeRepaymentRunner } from "./runners/make_repayment";
import { GetValueRepaidRunner } from "./runners/get_value_repaid";
import { GetExpectedValueRepaidRunner } from "./runners/get_expected_value_repaid";

export class ServicingScenarioRunner {
    public web3Utils: Web3Utils;
    public debtKernel: DebtKernelContract;
    public repaymentRouter: RepaymentRouterContract;
    public tokenTransferProxy: TokenTransferProxyContract;
    public principalToken: DummyTokenContract;
    public testMakeRepaymentScenario;
    public testGetValueRepaidScenario;
    public testGetExpectedValueRepaidScenario;

    private currentSnapshotId: number;

    constructor(web3: Web3) {
        this.web3Utils = new Web3Utils(web3);

        this.saveSnapshotAsync = this.saveSnapshotAsync.bind(this);
        this.revertToSavedSnapshot = this.revertToSavedSnapshot.bind(this);

        this.testMakeRepaymentScenario = MakeRepaymentRunner.testMakeRepaymentScenario.bind(this);
        this.testGetValueRepaidScenario = GetValueRepaidRunner.testGetValueRepaidScenario.bind(
            this,
        );
        this.testGetExpectedValueRepaidScenario = GetExpectedValueRepaidRunner.testGetExpectedValueRepaidScenario.bind(
            this,
        );
    }

    public async saveSnapshotAsync() {
        this.currentSnapshotId = await this.web3Utils.saveTestSnapshot();
    }

    public async revertToSavedSnapshot() {
        await this.web3Utils.revertToSnapshot(this.currentSnapshotId);
    }
}
