jest.mock("@dharmaprotocol/contracts");

import * as promisify from "tiny-promisify";
import { Web3Utils } from "utils/web3_utils";
import { DummyTokenContract, TokenRegistryContract } from "src/wrappers";
import {
    DummyToken as DummyTokenMockArtifacts,
    TokenRegistry as TokenRegistryMockArtifacts,
} from "@dharmaprotocol/contracts";
import { CONTRACT_WRAPPER_ERRORS } from "src/wrappers/contract_wrappers/base_contract_wrapper";
import { ACCOUNTS } from "../accounts";
import * as Web3 from "web3";

// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const DUMMY_TOKEN_ARTIFACTS_PATH =
    "node_modules/@dharmaprotocol/contracts/artifacts/json/DummyToken.json";
const TOKEN_REGISTRY_ARTIFACTS_PATH =
    "node_modules/@dharmaprotocol/contracts/artifacts/json/TokenRegistry.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Dummy Token Contract Wrapper (Unit)", () => {
    let networkId: number;
    let dummyTokenContractAbi: Web3.ContractAbi;
    let tokenRegistryContractAbi: Web3.ContractAbi;

    let REPTokenAddress: string;

    beforeAll(async () => {
        networkId = await web3Utils.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);

        // When we mock @dharmaprotocol/contracts, *all* contracts become by
        // default mocked.  Thus, if we depend on accessing any contract at
        // any point in time during this test, it needs to be mocked in some capacity.
        //
        // Given that we depend on the token registry to pull the addresses of
        // dummy token contracts deployed on the current network, we have to manually
        // retrieve and mock its artifacts alongside the dummy token artifacts.
        const dummyTokenArtifacts = await readFilePromise(DUMMY_TOKEN_ARTIFACTS_PATH);
        const tokenRegistryArtifacts = await readFilePromise(TOKEN_REGISTRY_ARTIFACTS_PATH);

        // Pull, parse, and store for later use dummy token's ABI from JSON artifacts
        const { abi } = JSON.parse(dummyTokenArtifacts);
        dummyTokenContractAbi = abi;

        // Pull, parse, and store token registry's abi / network metadata
        // contract.
        const {
            abi: tokenRegistryContractAbi,
            networks: tokenRegistryContractNetworks,
        } = JSON.parse(tokenRegistryArtifacts);

        // Mock the returned token registry artifacts using the stored abi / network metadata
        TokenRegistryMockArtifacts.mock(tokenRegistryContractAbi, tokenRegistryContractNetworks);

        // Now that our contract artifacts are mocked, the TokenRegistryContract wrapper should
        // work as intended, and allow us to pull the address of a deployed ERC20 token.
        const tokenRegistry = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);
        REPTokenAddress = await tokenRegistry.getTokenAddress.callAsync("REP");
    });

    // TODO: Create tests for general solidity method calls on the Debt Token contract
    describe("#at()", () => {
        describe("contract address does not point to contract", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                DummyTokenMockArtifacts.mock(dummyTokenContractAbi, mockNetworks);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    DummyTokenContract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DummyToken", networkId),
                );
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                DummyTokenMockArtifacts.mock(dummyTokenContractAbi, mockNetworks);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await DummyTokenContract.at(
                    REPTokenAddress,
                    web3,
                    TX_DEFAULTS,
                );

                expect(contractWrapper.address).toBe(REPTokenAddress);
                expect(contractWrapper.abi).toEqual(dummyTokenContractAbi);
            });
        });
    });
});
