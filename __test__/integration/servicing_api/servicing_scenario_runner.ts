// libraries
import * as Web3 from "web3";

// utils
import { Web3Utils } from "utils/web3_utils";

// scenario runners
import { GetDebtsRunner } from "./runners/get_debts";
import { GetExpectedValueRepaidRunner } from "./runners/get_expected_value_repaid";
import { GetInvestmentsRunner } from "./runners/get_investments";
import { GetRepaymentScheduleRunner } from "./runners/get_repayment_schedule";
import { GetTotalExpectedRepaymentRunner } from "./runners/get_total_expected_repayment";
import { GetValueRepaidRunner } from "./runners/get_value_repaid";
import { MakeRepaymentRunner } from "./runners/make_repayment";

export class ServicingScenarioRunner {
    public web3Utils: Web3Utils;

    public testMakeRepaymentScenario;
    public testGetValueRepaidScenario;
    public testGetExpectedValueRepaidScenario;
    public testGetRepaymentScheduleScenario;
    public testGetDebtsScenario;
    public testGetInvestmentsScenario;
    public testGetTotalExpectedRepayment;

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
        this.testGetRepaymentScheduleScenario = GetRepaymentScheduleRunner.testGetRepaymentScheduleScenario.bind(
            this,
        );
        this.testGetDebtsScenario = GetDebtsRunner.testScenario.bind(this);
        this.testGetInvestmentsScenario = GetInvestmentsRunner.testScenario.bind(this);
        this.testGetTotalExpectedRepayment = GetTotalExpectedRepaymentRunner.testScenario.bind(
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
