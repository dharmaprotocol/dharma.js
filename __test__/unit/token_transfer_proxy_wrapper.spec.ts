import promisify from "tiny-promisify";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import { TokenTransferProxyContract } from "src/wrappers";
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

const TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH = "src/artifacts/TokenTransferProxy.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Dummy Token Registry Contract Wrapper (Unit)", () => {
    let networkId: number;
    let tokenTransferProxyContractAddress: string;
    let tokenTransferProxyContractAbi: Web3.ContractAbi;

    beforeAll(async () => {
        networkId = await web3Wrapper.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const artifact = await readFilePromise(TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH);
        const { networks, abi } = JSON.parse(artifact);
        const { address } = networks[networkId];

        tokenTransferProxyContractAddress = address;
        tokenTransferProxyContractAbi = abi;
    });

    // TODO: Create tests for general solidity method calls on the Debt Token contract
    describe("#deployed()", () => {
        describe("local artifacts are nonexistent", () => {
            beforeAll(() => {
                mockFs.mockFilesystem({});
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(
                    TokenTransferProxyContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TokenTransferProxy"),
                );
            });
        });

        describe("local artifacts are malformed", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH] = "{ incomplete JSON :(";

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(
                    TokenTransferProxyContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TokenTransferProxy"),
                );
            });
        });

        describe("no contract address associated w/ current network id", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: {},
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                const networkId = await web3Wrapper.getNetworkIdAsync();
                await expect(
                    TokenTransferProxyContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TokenTransferProxy",
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
                mockFilesystem[TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: tokenTransferProxyContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    TokenTransferProxyContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TokenTransferProxy",
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
                    address: tokenTransferProxyContractAddress,
                };
                mockFilesystem[TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: tokenTransferProxyContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await TokenTransferProxyContract.deployed(
                    web3,
                    TX_DEFAULTS,
                );

                expect(contractWrapper.address).toBe(tokenTransferProxyContractAddress);
                expect(contractWrapper.abi).toEqual(tokenTransferProxyContractAbi);
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
                    TokenTransferProxyContract.at(
                        tokenTransferProxyContractAddress,
                        web3,
                        TX_DEFAULTS,
                    ),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TokenTransferProxy"),
                );
            });
        });

        describe("local artifacts are malformed", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH] = "{ incomplete JSON :(";

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(
                    TokenTransferProxyContract.at(
                        tokenTransferProxyContractAddress,
                        web3,
                        TX_DEFAULTS,
                    ),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("TokenTransferProxy"),
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
                mockFilesystem[TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: tokenTransferProxyContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    TokenTransferProxyContract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "TokenTransferProxy",
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
                mockFilesystem[TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: tokenTransferProxyContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await TokenTransferProxyContract.at(
                    tokenTransferProxyContractAddress,
                    web3,
                    TX_DEFAULTS,
                );

                expect(contractWrapper.address).toBe(tokenTransferProxyContractAddress);
                expect(contractWrapper.abi).toEqual(tokenTransferProxyContractAbi);
            });
        });
    });
});
