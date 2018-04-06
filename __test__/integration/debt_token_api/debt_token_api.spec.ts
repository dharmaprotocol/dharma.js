// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

// External
import * as Web3 from "web3";

import { DebtTokenScenarioRunner } from "./debt_token_scenario_runner";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);

const scenarioRunner = new DebtTokenScenarioRunner(web3);

describe("Debt Token API (Integration Tests)", () => {
    beforeEach(scenarioRunner.saveSnapshotAsync);

    afterEach(scenarioRunner.revertToSavedSnapshot);
});
