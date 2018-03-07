// We must explicitly unmock the dharma protocol contract artifacts
// in instances where we need our deployed artifacts in our test environment.
jest.unmock("@dharmaprotocol/contracts");

// libraries
import * as Web3 from "web3";

import { OrderAPI, ServicingAPI, SignerAPI, ContractsAPI, AdaptersAPI } from "src/apis";
import { DebtOrder } from "src/types";
import {
    DebtOrderWrapper,
    DummyTokenContract,
    RepaymentRouterContract,
    TokenTransferProxyContract,
} from "src/wrappers";

import {
    VALID_MAKE_REPAYMENT,
    INVALID_MAKE_REPAYMENT,
    GET_VALUE_REPAID,
    GET_EXPECTED_VALUE_REPAID,
} from "./scenarios";

import { ServicingScenarioRunner } from "./servicing_scenario_runner";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let scenarioRunner = new ServicingScenarioRunner(web3);

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

    // TODO: Add tests for malformed TCP
    // TODO: Add tests for different types of terms contracts
    // TODO: Add tests for different variations of loan terms
});
