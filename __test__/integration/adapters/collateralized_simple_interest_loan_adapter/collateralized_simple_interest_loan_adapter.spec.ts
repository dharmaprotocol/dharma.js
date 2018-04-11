// External
import * as Web3 from "web3";

// APIs
import { AdaptersAPI, ContractsAPI, OrderAPI, SignerAPI } from "src/apis";

// Utils
import { ACCOUNTS } from "../../../accounts";

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

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

describe("Collateralized Simple Interest Loan Adapter (Integration Tests)", () => {
    let returnCollateralRunner = new ReturnCollateralRunner();
    let principalToken: DummyTokenContract;
    let collateralToken: DummyTokenContract;

    beforeAll(async () => {
        const contractsApi = new ContractsAPI(web3);

        const adaptersApi = new AdaptersAPI(web3, contractsApi);

        const servicingApi = new ServicingAPI(web3, contractsApi);

        const adapter = new CollateralizedSimpleInterestLoanAdapter(web3, contractsApi);

        const orderApi = new OrderAPI(web3, contractsApi, adaptersApi);

        const signerApi = new SignerAPI(web3, contractsApi);

        const debtKernel = await DebtKernelContract.deployed(web3);

        const repaymentRouter = await RepaymentRouterContract.deployed(web3);

        const termsContract = await contractsApi.loadCollateralizedSimpleInterestTermsContract(
            TX_DEFAULTS,
        );

        principalToken = await DummyTokenContract.at(
            (await contractsApi.loadTokenBySymbolAsync("REP")).address,
            web3,
            TX_DEFAULTS,
        );

        collateralToken = await DummyTokenContract.at(
            (await contractsApi.loadTokenBySymbolAsync("ZRX")).address,
            web3,
            TX_DEFAULTS,
        );

        const tokenTransferProxy = await contractsApi.loadTokenTransferProxyAsync();

        returnCollateralRunner.initialize(
            web3,
            adapter,
            tokenTransferProxy,
            {
                debtKernel,
                repaymentRouter,
                principalToken,
                collateralToken,
                termsContract,
            },
            {
                orderApi,
                signerApi,
                servicingApi,
            },
        );
    });

    describe("#returnCollateral", () => {
        describe("Successful return of collateral", () => {
            SUCCESSFUL_RETURN_COLLATERAL_SCENARIOS.forEach(returnCollateralRunner.testScenario);
        });

        describe("Unsuccessful attempt to return collateral", () => {
            UNSUCCESSFUL_RETURN_COLLATERAL_SCENARIOS.forEach(returnCollateralRunner.testScenario);
        });
    });
});
