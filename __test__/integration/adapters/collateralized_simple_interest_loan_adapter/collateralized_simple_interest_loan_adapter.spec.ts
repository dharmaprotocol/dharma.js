// External
import * as Web3 from "web3";

// APIs
import { AdaptersAPI, ContractsAPI, OrderAPI, SignerAPI } from "src/apis";

// Scenarios
import { UNSUCCESSFUL_RETURN_COLLATERAL_SCENARIOS } from "./scenarios/unsuccessful_return_collateral_scenarios";

import { SUCCESSFUL_RETURN_COLLATERAL_SCENARIOS } from "./scenarios/successful_return_collateral_scenarios";

// Runners
import { ReturnCollateralRunner } from "./runners";

import { Assertions } from "src/invariants";

// Wrappers
import {
    DummyTokenContract,
    TokenRegistryContract,
    DebtKernelContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
    TokenTransferProxyContract,
} from "src/wrappers";

import { CollateralizedSimpleInterestLoanAdapter } from "src/adapters/collateralized_simple_interest_loan_adapter";

import { ServicingAPI } from "src/apis/servicing_api";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);

// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

describe("Collateralized Simple Interest Loan Adapter (Integration Tests)", () => {
    const contractsApi = new ContractsAPI(web3);

    const adaptersApi = new AdaptersAPI(web3, contractsApi);

    const servicingApi = new ServicingAPI(web3, contractsApi);

    const adapter = new CollateralizedSimpleInterestLoanAdapter(web3, contractsApi);

    const orderApi = new OrderAPI(web3, contractsApi, adaptersApi);

    const signerApi = new SignerAPI(web3, contractsApi);

    const returnCollateralRunner = new ReturnCollateralRunner(
        web3,
        adapter,
        {
            orderApi,
            signerApi,
            servicingApi,
            contractsApi,
        },
    );

    describe("#returnCollateral", () => {
        describe("Successful return of collateral", () => {
            SUCCESSFUL_RETURN_COLLATERAL_SCENARIOS.forEach(returnCollateralRunner.testScenario);
        });

        describe("Unsuccessful attempt to return collateral", () => {
            UNSUCCESSFUL_RETURN_COLLATERAL_SCENARIOS.forEach(returnCollateralRunner.testScenario);
        });
    });
});
