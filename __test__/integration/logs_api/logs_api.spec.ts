// We must explicitly unmock the dharma protocol contract artifacts
// in instances where we need our deployed artifacts in our test environment.
jest.unmock("@dharmaprotocol/contracts");

// External Libraries
import * as ABIDecoder from "abi-decoder";
import * as Web3 from "web3";

// APIs
import { ContractsAPI, LogsAPI } from "../../../src/apis";

import { ErrorScenarioRunner } from "./runners/error_scenario_runner";
import { GetScenarioRunner } from "./runners/get_runner";

// For adding ABIs to the decoder.
import { DebtKernel, RepaymentRouter } from "@dharmaprotocol/contracts";

import {
    INVALID_ORDERS,
    INVALID_REPAYMENT_SCENARIOS,
    VALID_ORDERS,
    VALID_REPAYMENTS,
} from "./scenarios";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const errorScenarioRunner = new ErrorScenarioRunner(web3);
const getScenarioRunner = new GetScenarioRunner(web3);

const contractsAPI = new ContractsAPI(web3);
const logsAPI = new LogsAPI(web3, contractsAPI);

describe("Logs API (Integration Tests)", () => {
    describe("get", async () => {
        beforeEach(getScenarioRunner.saveSnapshotAsync);

        afterEach(getScenarioRunner.revertToSavedSnapshot);

        beforeAll(async () => {
            await getScenarioRunner.configure();
        });

        describe("when called after valid repayments have been made", () => {
            VALID_REPAYMENTS.forEach(getScenarioRunner.testGetLogsAfterRepaymentScenario);
        });
    });

    describe("#list", () => {
        it("returns a list of events emitted by Dharma contracts", async () => {
            const eventList = [
                "LogDebtOrderFilled",
                "LogIssuanceCancelled",
                "LogDebtOrderCancelled",
                "LogError",
                "Pause",
                "Unpause",
                "OwnershipTransferred",
                "LogInsertEntry",
                "LogModifyEntryBeneficiary",
                "Authorized",
                "AuthorizationRevoked",
                "Transfer",
                "Approval",
                "ApprovalForAll",
                "LogRepayment",
                "CollateralLocked",
                "CollateralReturned",
                "CollateralSeized",
            ];

            expect(await logsAPI.list()).toEqual(eventList);
        });
    });

    describe("#getErrorLogs", () => {
        beforeEach(errorScenarioRunner.saveSnapshotAsync);

        afterEach(errorScenarioRunner.revertToSavedSnapshot);

        beforeAll(async () => {
            ABIDecoder.addABI(DebtKernel.abi);
            ABIDecoder.addABI(RepaymentRouter.abi);

            await errorScenarioRunner.configure();
        });

        afterAll(() => {
            ABIDecoder.removeABI(DebtKernel.abi);
            ABIDecoder.removeABI(RepaymentRouter.abi);
        });

        describe("invalid orders should result in retrievable error logs", () => {
            INVALID_ORDERS.forEach(errorScenarioRunner.testDebtKernelErrorScenario);
        });

        describe("valid orders should result in no error logs", () => {
            VALID_ORDERS.forEach(errorScenarioRunner.testDebtKernelErrorScenario);
        });

        describe("invalid repayments should result in queryable error logs", () => {
            INVALID_REPAYMENT_SCENARIOS.forEach(
                errorScenarioRunner.testRepaymentRouterErrorScenario,
            );
        });

        describe("valid repayments should result in no error logs", () => {
            VALID_REPAYMENTS.forEach(errorScenarioRunner.testRepaymentRouterErrorScenario);
        });
    });
});
