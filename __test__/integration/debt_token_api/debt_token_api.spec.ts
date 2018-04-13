// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

// External
import * as Web3 from "web3";

import { DebtTokenScenarioRunner } from "./debt_token_scenario_runner";

import {
    BALANCE_OF_SCENARIOS,
    OwnerOfScenarios,
    ExistsScenarios,
    SUCCESSFUL_TRANSFER_SCENARIOS,
    UNSUCCESSFUL_TRANSFER_SCENARIOS,
    SUCCESSFUL_TRANSFER_FROM_SCENARIOS,
    UNSUCCESSFUL_TRANSFER_FROM_SCENARIOS,
    ApproveScenarios,
    GetApprovedScenarios,
    SET_APPROVAL_FOR_ALL_SCENARIOS,
    IS_APPROVED_FOR_ALL_SCENARIOS,
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
        describe("should succeed", () => {
            OwnerOfScenarios.SUCCESSFUL.forEach(scenarioRunner.testOwnerOfScenario);
        });

        describe("should fail", () => {
            OwnerOfScenarios.UNSUCCESSFUL.forEach(scenarioRunner.testOwnerOfScenario);
        });
    });

    describe("#exists", () => {
        describe("should succeed", () => {
            ExistsScenarios.SUCCESSFUL.forEach(scenarioRunner.testExistsScenario);
        });

        describe("should fail", () => {
            ExistsScenarios.UNSUCCESSFUL.forEach(scenarioRunner.testExistsScenario);
        });
    });

    describe("#approve", () => {
        describe("should succeed", () => {
            ApproveScenarios.SUCCESSFUL.forEach(scenarioRunner.testApproveScenario);
        });

        describe("should fail", () => {
            ApproveScenarios.UNSUCCESSFUL.forEach(scenarioRunner.testApproveScenario);
        });
    });

    describe("#transfer", () => {
        describe("should fail", () => {
            UNSUCCESSFUL_TRANSFER_SCENARIOS.forEach(scenarioRunner.testTransferScenario);
        });

        describe("should succeed", () => {
            SUCCESSFUL_TRANSFER_SCENARIOS.forEach(scenarioRunner.testTransferScenario);
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

    describe("#getApproved", () => {
        describe("should succeed", () => {
            GetApprovedScenarios.SUCCESSFUL.forEach(scenarioRunner.testGetApprovedScenario);
        });

        describe("should fail", () => {
            GetApprovedScenarios.UNSUCCESSFUL.forEach(scenarioRunner.testGetApprovedScenario);
        });
    });

    describe("#setApprovalForAll", () => {
        describe("user should be able to set operator as proxy", () => {
            SET_APPROVAL_FOR_ALL_SCENARIOS.forEach(scenarioRunner.testSetApprovalForAll);
        });
    });

    describe("#isApprovedForAll", () => {
        describe("user should be able to determine if operator is approved for all", () => {
            IS_APPROVED_FOR_ALL_SCENARIOS.forEach(scenarioRunner.testIsApprovedForAll);
        });
    });
});
