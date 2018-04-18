// We must explicitly unmock the dharma protocol contract artifacts
// in instances where we need our deployed artifacts in our test environment.
jest.unmock("@dharmaprotocol/contracts");

import { GET_REPAYMENT_SCHEDULE } from "./scenarios/get_repayment_schedule";

// libraries
import * as Web3 from "web3";

// scenarios
import {
    GET_DEBTS,
    GET_EXPECTED_VALUE_REPAID,
    GET_INVESTMENTS,
    GET_TOTAL_EXPECTED_REPAYMENT,
    GET_VALUE_REPAID,
    INVALID_MAKE_REPAYMENT,
    VALID_MAKE_REPAYMENT,
} from "./scenarios";

// scenario runner
import { ServicingScenarioRunner } from "./servicing_scenario_runner";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const scenarioRunner = new ServicingScenarioRunner(web3);

describe("Debt Servicing API (Integration Tests)", () => {
    beforeEach(scenarioRunner.saveSnapshotAsync);

    afterEach(scenarioRunner.revertToSavedSnapshot);

    describe("#makeRepayment", () => {
        describe("Valid repayments", () => {
            VALID_MAKE_REPAYMENT.forEach(scenarioRunner.testMakeRepaymentScenario);
        });

        describe("Invalid repayments", () => {
            INVALID_MAKE_REPAYMENT.forEach(scenarioRunner.testMakeRepaymentScenario);
        });
    });

    describe("#getValueRepaid", () => {
        GET_VALUE_REPAID.forEach(scenarioRunner.testGetValueRepaidScenario);
    });

    describe("#getExpectedValueRepaid()", () => {
        GET_EXPECTED_VALUE_REPAID.forEach(scenarioRunner.testGetExpectedValueRepaidScenario);
    });

    describe("#getTotalExpectedRepayment()", () => {
        GET_TOTAL_EXPECTED_REPAYMENT.forEach(scenarioRunner.testGetTotalExpectedRepayment);
    });

    describe("#getRepaymentSchedule", () => {
        GET_REPAYMENT_SCHEDULE.forEach(scenarioRunner.testGetRepaymentScheduleScenario);
    });

    describe("#getDebtsAsync()", () => {
        GET_DEBTS.forEach(scenarioRunner.testGetDebtsScenario);
    });

    describe("#getInvestmentsAsync()", () => {
        GET_INVESTMENTS.forEach(scenarioRunner.testGetInvestmentsScenario);
    });
});
