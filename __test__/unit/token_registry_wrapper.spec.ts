jest.mock("@dharmaprotocol/contracts");

import * as promisify from "tiny-promisify";
import { Web3Utils } from "utils/web3_utils";
import { TokenRegistryContract } from "src/wrappers";
import { TokenRegistry as MockContractArtifacts } from "@dharmaprotocol/contracts";
import { CONTRACT_WRAPPER_ERRORS } from "src/wrappers/contract_wrappers/base_contract_wrapper";
import { ACCOUNTS } from "../accounts";
import * as Web3 from "web3";

// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const TOKEN_REGISTRY_ARTIFACTS_PATH =
    "node_modules/@dharmaprotocol/contracts/artifacts/json/TokenRegistry.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Token Registry Contract Wrapper (Unit)", () => {
    let networkId: number;
    let tokenRegistryContractAddress: string;
    let tokenRegistryContractAbi: Web3.ContractAbi;

    beforeAll(async () => {
        networkId = await web3Utils.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const artifact = await readFilePromise(TOKEN_REGISTRY_ARTIFACTS_PATH);
        const { networks, abi } = JSON.parse(artifact);
        const { address } = networks[networkId];

        tokenRegistryContractAddress = address;
        tokenRegistryContractAbi = abi;
    });

    // TODO: Create tests for general solidity method calls on the Debt Token contract
    describe("#deployed()", () => {
        describe("no contract address associated w/ current network id", () => {
            beforeAll(() => {
                MockContractArtifacts.mock(tokenRegistryContractAbi, {});
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                const networkId = await web3Utils.getNetworkIdAsync();
                await expect(
                    TokenRegistryContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TokenRegistry",
                        networkId,
                    ),
                );
            });
        });

        describe("contract address associated w/ current network id does not point to contract", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                MockContractArtifacts.mock(tokenRegistryContractAbi, mockNetworks);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    TokenRegistryContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TokenRegistry",
                        networkId,
                    ),
                );
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: tokenRegistryContractAddress,
                };

                MockContractArtifacts.mock(tokenRegistryContractAbi, mockNetworks);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);

                expect(contractWrapper.address).toBe(tokenRegistryContractAddress);
                expect(contractWrapper.abi).toEqual(tokenRegistryContractAbi);
            });
        });
    });

    describe("#at()", () => {
        describe("contract address does not point to contract", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                MockContractArtifacts.mock(tokenRegistryContractAbi, mockNetworks);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    TokenRegistryContract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TokenRegistry",
                        networkId,
                    ),
                );
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                MockContractArtifacts.mock(tokenRegistryContractAbi, mockNetworks);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await TokenRegistryContract.at(
                    tokenRegistryContractAddress,
                    web3,
                    TX_DEFAULTS,
                );

                expect(contractWrapper.address).toBe(tokenRegistryContractAddress);
                expect(contractWrapper.abi).toEqual(tokenRegistryContractAbi);
            });
        });
    });
});
