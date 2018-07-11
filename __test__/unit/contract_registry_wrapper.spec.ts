jest.mock("@dharmaprotocol/contracts");

// External Libraries
import { ContractRegistry as ContractArtifactsMock } from "@dharmaprotocol/contracts";
import * as promisify from "tiny-promisify";
import * as Web3 from "web3";

// Utils
import { Web3Utils } from "../../utils/web3_utils";

// Wrappers
import { ContractRegistryContract } from "../../src/wrappers";
import { CONTRACT_WRAPPER_ERRORS } from "../../src/wrappers/contract_wrappers/base_contract_wrapper";

import { ACCOUNTS } from "../accounts";

// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const CONTRACT_REGISTRY_RAW_ARTIFACTS_PATH =
    "node_modules/@dharmaprotocol/contracts/artifacts/json/ContractRegistry.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Contract Registry Contract Wrapper (Unit)", () => {
    let networkId: number;
    let contractRegistryContractAddress: string;
    let contractRegistryContractAbi: Web3.ContractAbi;

    beforeAll(async () => {
        networkId = await web3Utils.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const artifact = await readFilePromise(CONTRACT_REGISTRY_RAW_ARTIFACTS_PATH);
        const { networks, abi } = JSON.parse(artifact);
        const { address } = networks[networkId];

        contractRegistryContractAddress = address;
        contractRegistryContractAbi = abi;
    });

    describe("#deployed()", () => {
        describe("no contract address associated w/ current network id", () => {
            beforeAll(() => {
                ContractArtifactsMock.mock(contractRegistryContractAbi, {});
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    ContractRegistryContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtKernel", networkId),
                );
            });
        });

        describe("contract address associated w/ current network id does not point to contract", () => {
            beforeAll(async () => {
                const mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                ContractArtifactsMock.mock(contractRegistryContractAbi, mockNetworks);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    ContractRegistryContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtKernel", networkId),
                );
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                const mockNetworks = {};

                mockNetworks[networkId] = {
                    address: contractRegistryContractAddress,
                };

                ContractArtifactsMock.mock(contractRegistryContractAbi, mockNetworks);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await ContractRegistryContract.deployed(web3, TX_DEFAULTS);

                expect(contractWrapper.address).toBe(contractRegistryContractAddress);
                expect(contractWrapper.abi).toEqual(contractRegistryContractAbi);
            });
        });
    });

    describe("#at()", () => {
        describe("contract address does not point to contract", () => {
            beforeAll(async () => {
                const mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                ContractArtifactsMock.mock(contractRegistryContractAbi, mockNetworks);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    ContractRegistryContract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtKernel", networkId),
                );
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                const mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                ContractArtifactsMock.mock(contractRegistryContractAbi, mockNetworks);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await ContractRegistryContract.at(
                    contractRegistryContractAddress,
                    web3,
                    TX_DEFAULTS,
                );

                expect(contractWrapper.address).toBe(contractRegistryContractAddress);
                expect(contractWrapper.abi).toEqual(contractRegistryContractAbi);
            });
        });
    });
});
