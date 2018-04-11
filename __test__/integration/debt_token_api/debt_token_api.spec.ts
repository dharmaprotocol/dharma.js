// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

// External
import * as Web3 from "web3";

import { DebtTokenScenarioRunner } from "./debt_token_scenario_runner";

import {
    BALANCE_OF_SCENARIOS,
    OWNER_OF_SCENARIOS,
    EXISTS_SCENARIOS,
    SUCCESSFUL_APPROVE_SCENARIOS,
    UNSUCCESSFUL_APPROVE_SCENARIOS,
    GET_APPROVED_SCENARIOS,
} from "./scenarios";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);

const scenarioRunner = new DebtTokenScenarioRunner(web3);

describe("Debt Token API (Integration Tests)", () => {
    beforeEach(() => {
        return scenarioRunner.saveSnapshotAsync();
    });

    afterEach(() => {
        return scenarioRunner.revertToSavedSnapshot();
    });

    describe("#balanceOf", () => {
        describe("debt token balances should be retrievable", () => {
            BALANCE_OF_SCENARIOS.forEach(scenarioRunner.testBalanceOfScenario);
        });
    });

    describe("#ownerOf", () => {
        describe("debt token ownership should be retrievable", () => {
            OWNER_OF_SCENARIOS.forEach(scenarioRunner.testOwnerOfScenario);
        });
    });

    describe("#exists", () => {
        describe("the existence of a given debt token id should be confirmable", () => {
            EXISTS_SCENARIOS.forEach(scenarioRunner.testExistsScenario);
        });
    });

    describe("#approve", () => {
        describe("should succeed", () => {
            SUCCESSFUL_APPROVE_SCENARIOS.forEach(scenarioRunner.testApproveScenario);
        });

        describe("should fail", () => {
            UNSUCCESSFUL_APPROVE_SCENARIOS.forEach(scenarioRunner.testApproveScenario);
        });
    });

    describe("#getApproved", () => {
        describe("approved accounts for a debt token should be retrievable", () => {
            GET_APPROVED_SCENARIOS.forEach(scenarioRunner.testGetApprovedScenario);
        });
    });
});
