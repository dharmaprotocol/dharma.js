// We must explicitly unmock the dharma protocol contract artifacts
// in instances where we need our deployed artifacts in our test environment.
jest.unmock("@dharmaprotocol/contracts");

// libraries
import * as Web3 from "web3";

import { ErrorScenarioRunner } from "./error_scenario_runner";

import {
    INVALID_ORDERS,
    INVALID_REPAYMENT_SCENARIOS,
    VALID_ORDERS,
    VALID_REPAYMENTS,
} from "./scenarios";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const scenarioRunner = new ErrorScenarioRunner(web3);

describe("Blockchain API (Unit Tests)", () => {
    beforeEach(scenarioRunner.saveSnapshotAsync);

    afterEach(scenarioRunner.revertToSavedSnapshot);

    describe("#getErrorLogs", () => {
        beforeAll(async () => {
            await scenarioRunner.configure();
        });

        describe("invalid orders should result in retrievable error logs", () => {
            INVALID_ORDERS.forEach(scenarioRunner.testDebtKernelErrorScenario);
        });

        describe("valid orders should result in no error logs", () => {
            VALID_ORDERS.forEach(scenarioRunner.testDebtKernelErrorScenario);
        });

        describe("invalid repayments should result in queryable error logs", () => {
            INVALID_REPAYMENT_SCENARIOS.forEach(scenarioRunner.testRepaymentRouterErrorScenario);
        });

        describe("valid repayments should result in no error logs", () => {
            VALID_REPAYMENTS.forEach(scenarioRunner.testRepaymentRouterErrorScenario);
        });
    });
});
