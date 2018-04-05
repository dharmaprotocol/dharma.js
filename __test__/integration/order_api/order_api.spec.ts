// External
import * as Web3 from "web3";

// APIs
import { AdaptersAPI, ContractsAPI, OrderAPI, SignerAPI } from "src/apis";

// Utils
import { Web3Utils } from "utils/web3_utils";
import { ACCOUNTS } from "../../accounts";

// Scenarios
import {
    VALID_ORDERS,
    INVALID_ORDERS,
    VALID_ORDER_CANCELLATIONS,
    VALID_ISSUANCE_CANCELLATIONS,
    INVALID_ORDER_CANCELLATIONS,
    INVALID_ISSUANCE_CANCELLATIONS,
    NONCONSENUAL_ORDERS,
    SUCCESSFUL_ORDER_GENERATION,
    UNSUCCESSFUL_ORDER_GENERATION,
    SUCCESSFUL_UNPACK_TERMS,
    UNSUCCESSFUL_UNPACK_TERMS,
} from "./scenarios";

// Runners
import { OrderScenarioRunner } from "./order_scenario_runner";

// Wrappers
import {
    DummyTokenContract,
    TokenRegistryContract,
    DebtKernelContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
    TokenTransferProxyContract,
} from "src/wrappers";

// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const contractsApi = new ContractsAPI(web3);

let scenarioRunner = new OrderScenarioRunner(web3);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Order API (Integration Tests)", () => {
    beforeAll(async () => {
        const dummyTokenRegistry = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);
        const principalTokenAddress = await dummyTokenRegistry.getTokenAddressBySymbol.callAsync(
            "REP",
        );

        scenarioRunner.web3Utils = new Web3Utils(web3);
        scenarioRunner.orderSigner = new SignerAPI(web3, contractsApi);
        scenarioRunner.adaptersApi = new AdaptersAPI(web3, contractsApi);
        scenarioRunner.orderApi = new OrderAPI(web3, contractsApi, scenarioRunner.adaptersApi);
        scenarioRunner.principalToken = await DummyTokenContract.at(
            principalTokenAddress,
            web3,
            TX_DEFAULTS,
        );
        scenarioRunner.repaymentRouter = await RepaymentRouterContract.deployed(web3, TX_DEFAULTS);
        scenarioRunner.tokenTransferProxy = await TokenTransferProxyContract.deployed(
            web3,
            TX_DEFAULTS,
        );
        scenarioRunner.termsContract = await SimpleInterestTermsContractContract.deployed(
            web3,
            TX_DEFAULTS,
        );

        scenarioRunner.debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS);
    });

    beforeEach(scenarioRunner.saveSnapshotAsync);

    afterEach(scenarioRunner.revertToSavedSnapshot);

    describe("#fillAsync", () => {
        describe("Valid, consensual order fills", () => {
            VALID_ORDERS.forEach(scenarioRunner.testFillScenario);
        });

        describe("Invalid, consensual order fills", () => {
            INVALID_ORDERS.forEach(scenarioRunner.testFillScenario);
        });

        describe("Valid, non-consensual order fills", () => {
            NONCONSENUAL_ORDERS.forEach(scenarioRunner.testFillScenario);
        });
    });

    describe("#cancelOrderAsync", () => {
        describe("Invalid order cancellations", () => {
            INVALID_ORDER_CANCELLATIONS.forEach(scenarioRunner.testOrderCancelScenario);
        });

        describe("Valid order cancellations", () => {
            VALID_ORDER_CANCELLATIONS.forEach(scenarioRunner.testOrderCancelScenario);
        });
    });

    describe("#cancelIssuanceAsync", () => {
        describe("Invalid order cancellations", () => {
            INVALID_ISSUANCE_CANCELLATIONS.forEach(scenarioRunner.testIssuanceCancelScenario);
        });

        describe("Valid order cancellations", () => {
            VALID_ISSUANCE_CANCELLATIONS.forEach(scenarioRunner.testIssuanceCancelScenario);
        });
    });

    describe("#generate", () => {
        describe("Valid order generation", () => {
            SUCCESSFUL_ORDER_GENERATION.forEach(scenarioRunner.testOrderGenerationScenario);
        });

        describe("Invalid order generation", () => {
            UNSUCCESSFUL_ORDER_GENERATION.forEach(scenarioRunner.testOrderGenerationScenario);
        });
    });

    describe("#unpackTerms", () => {
        describe("Successful terms unpacking", () => {
            SUCCESSFUL_UNPACK_TERMS.forEach(scenarioRunner.testUnpackTermsScenario);
        });

        describe("Unsuccessful terms unpacking", () => {
            UNSUCCESSFUL_UNPACK_TERMS.forEach(scenarioRunner.testUnpackTermsScenario);
        });
    });
});
