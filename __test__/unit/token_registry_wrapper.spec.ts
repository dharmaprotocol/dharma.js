import promisify from "tiny-promisify";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import { TokenRegistryContract } from "src/wrappers";
import { CONTRACT_WRAPPER_ERRORS } from "src/wrappers/contract_wrappers/base_contract_wrapper";
import { ACCOUNTS } from "../accounts";
import Web3 from "web3";

// We use the mocked version of "fs-extra" defined in __mocks__/fs-extra.ts
import * as mockFs from "fs-extra";

// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Wrapper = new Web3Wrapper(provider);

const TOKEN_REGISTRY_ARTIFACTS_PATH = "src/artifacts/TokenRegistry.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Token Registry Contract Wrapper (Unit)", () => {
    let networkId: number;
    let tokenRegistryContractAddress: string;
    let tokenRegistryContractAbi: Web3.ContractAbi;

    beforeAll(async () => {
        networkId = await web3Wrapper.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const artifact = await readFilePromise(TOKEN_REGISTRY_ARTIFACTS_PATH);
        const { networks, abi } = JSON.parse(artifact);
        const { address } = networks[networkId];

        tokenRegistryContractAddress = address;
        tokenRegistryContractAbi = abi;
    });

    // TODO: Create tests for general solidity method calls on the Debt Token contract
    describe("#deployed()", () => {
        describe("local artifacts are nonexistent", () => {
            beforeAll(() => {
                mockFs.mockFilesystem({});
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(
                    TokenRegistryContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TokenRegistry"),
                );
            });
        });

        describe("local artifacts are malformed", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[TOKEN_REGISTRY_ARTIFACTS_PATH] = "{ incomplete JSON :(";

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(
                    TokenRegistryContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TokenRegistry"),
                );
            });
        });

        describe("no contract address associated w/ current network id", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[TOKEN_REGISTRY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: {},
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                const networkId = await web3Wrapper.getNetworkIdAsync();
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
                let mockFilesystem = {};
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };
                mockFilesystem[TOKEN_REGISTRY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: tokenRegistryContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
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
                let mockFilesystem = {};
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: tokenRegistryContractAddress,
                };
                mockFilesystem[TOKEN_REGISTRY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: tokenRegistryContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);

                expect(contractWrapper.address).toBe(tokenRegistryContractAddress);
                expect(contractWrapper.abi).toEqual(tokenRegistryContractAbi);
            });
        });
    });

    describe("#at()", () => {
        describe("local artifacts are nonexistent", () => {
            beforeAll(() => {
                mockFs.mockFilesystem({});
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(
                    TokenRegistryContract.at(tokenRegistryContractAddress, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TokenRegistry"),
                );
            });
        });

        describe("local artifacts are malformed", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[TOKEN_REGISTRY_ARTIFACTS_PATH] = "{ incomplete JSON :(";

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(
                    TokenRegistryContract.at(tokenRegistryContractAddress, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TokenRegistry"),
                );
            });
        });

        describe("contract address does not point to contract", () => {
            beforeAll(async () => {
                let mockFilesystem = {};
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };
                mockFilesystem[TOKEN_REGISTRY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: tokenRegistryContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
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
                let mockFilesystem = {};
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };
                mockFilesystem[TOKEN_REGISTRY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: tokenRegistryContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
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
