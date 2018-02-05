import promisify from "tiny-promisify";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import { DebtTokenContract } from "src/wrappers";
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

const DEBT_TOKEN_ARTIFACTS_PATH = "src/artifacts/DebtToken.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Debt Token Contract Wrapper (Unit)", () => {
    let networkId: number;
    let debtTokenContractAddress: string;
    let debtTokenContractAbi: Web3.ContractAbi;

    beforeAll(async () => {
        networkId = await web3Wrapper.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const artifact = await readFilePromise(DEBT_TOKEN_ARTIFACTS_PATH);
        const { networks, abi } = JSON.parse(artifact);
        const { address } = networks[networkId];

        debtTokenContractAddress = address;
        debtTokenContractAbi = abi;
    });

    // TODO: Create tests for general solidity method calls on the Debt Token contract
    describe("#deployed()", () => {
        describe("local artifacts are nonexistent", () => {
            beforeAll(() => {
                mockFs.mockFilesystem({});
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(DebtTokenContract.deployed(web3, TX_DEFAULTS)).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("DebtToken"),
                );
            });
        });

        describe("local artifacts are malformed", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[DEBT_TOKEN_ARTIFACTS_PATH] = "{ incomplete JSON :(";

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(DebtTokenContract.deployed(web3, TX_DEFAULTS)).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("DebtToken"),
                );
            });
        });

        describe("no contract address associated w/ current network id", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[DEBT_TOKEN_ARTIFACTS_PATH] = JSON.stringify({
                    networks: {},
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                const networkId = await web3Wrapper.getNetworkIdAsync();
                await expect(DebtTokenContract.deployed(web3, TX_DEFAULTS)).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtToken", networkId),
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
                mockFilesystem[DEBT_TOKEN_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: debtTokenContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(DebtTokenContract.deployed(web3, TX_DEFAULTS)).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtToken", networkId),
                );
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                let mockFilesystem = {};
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: debtTokenContractAddress,
                };
                mockFilesystem[DEBT_TOKEN_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: debtTokenContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await DebtTokenContract.deployed(web3, TX_DEFAULTS);

                expect(contractWrapper.address).toBe(debtTokenContractAddress);
                expect(contractWrapper.abi).toEqual(debtTokenContractAbi);
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
                    DebtTokenContract.at(debtTokenContractAddress, web3, TX_DEFAULTS),
                ).rejects.toThrowError(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("DebtToken"));
            });
        });

        describe("local artifacts are malformed", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[DEBT_TOKEN_ARTIFACTS_PATH] = "{ incomplete JSON :(";

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(
                    DebtTokenContract.at(debtTokenContractAddress, web3, TX_DEFAULTS),
                ).rejects.toThrowError(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("DebtToken"));
            });
        });

        describe("contract address does not point to contract", () => {
            beforeAll(async () => {
                let mockFilesystem = {};
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };
                mockFilesystem[DEBT_TOKEN_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: debtTokenContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    DebtTokenContract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtToken", networkId),
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
                mockFilesystem[DEBT_TOKEN_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: debtTokenContractAbi,
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await DebtTokenContract.at(
                    debtTokenContractAddress,
                    web3,
                    TX_DEFAULTS,
                );

                expect(contractWrapper.address).toBe(debtTokenContractAddress);
                expect(contractWrapper.abi).toEqual(debtTokenContractAbi);
            });
        });
    });
});
