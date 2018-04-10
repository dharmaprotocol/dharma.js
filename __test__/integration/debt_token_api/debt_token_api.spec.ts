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
    SUCCESSFUL_TRANSFER_FROM_SCENARIOS,
    UNSUCCESSFUL_TRANSFER_FROM_SCENARIOS,
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

    describe("#transferFrom", () => {
        describe("should fail", () => {
            UNSUCCESSFUL_TRANSFER_FROM_SCENARIOS.forEach(scenarioRunner.testTransferFromScenario);
        });

        describe("should succeed", () => {
            SUCCESSFUL_TRANSFER_FROM_SCENARIOS.forEach(scenarioRunner.testTransferFromScenario);
        });
    });
});
