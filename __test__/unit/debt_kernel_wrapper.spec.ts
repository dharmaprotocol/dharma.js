jest.mock("@dharmaprotocol/contracts");

import * as promisify from "tiny-promisify";
import { Web3Utils } from "utils/web3_utils";
import { DebtKernelContract } from "src/wrappers";
import { CONTRACT_WRAPPER_ERRORS } from "src/wrappers/contract_wrappers/base_contract_wrapper";
import { ACCOUNTS } from "../accounts";
import * as Web3 from "web3";

import { DebtKernel as ContractArtifactsMock } from "@dharmaprotocol/contracts";

// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const DEBT_KERNEL_RAW_ARTIFACTS_PATH =
    "node_modules/@dharmaprotocol/contracts/artifacts/json/DebtKernel.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address };

describe("Debt Kernel Contract Wrapper (Unit)", () => {
    let networkId: number;
    let debtKernelContractAddress: string;
    let debtKernelContractAbi: Web3.ContractAbi;

    beforeAll(async () => {
        networkId = await web3Utils.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const artifact = await readFilePromise(DEBT_KERNEL_RAW_ARTIFACTS_PATH);
        const { networks, abi } = JSON.parse(artifact);
        const { address } = networks[networkId];

        debtKernelContractAddress = address;
        debtKernelContractAbi = abi;
    });

    // TODO: Create tests for general solidity method calls on the Debt Kernel contract
    describe("#deployed()", () => {
        describe("no contract address associated w/ current network id", () => {
            beforeAll(() => {
                ContractArtifactsMock.mock(debtKernelContractAbi, {});
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                const networkId = await web3Utils.getNetworkIdAsync();
                await expect(DebtKernelContract.deployed(web3, TX_DEFAULTS)).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtKernel", networkId),
                );
            });
        });

        describe("contract address associated w/ current network id does not point to contract", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                ContractArtifactsMock.mock(debtKernelContractAbi, mockNetworks);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(DebtKernelContract.deployed(web3, TX_DEFAULTS)).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtKernel", networkId),
                );
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: debtKernelContractAddress,
                };

                ContractArtifactsMock.mock(debtKernelContractAbi, mockNetworks);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await DebtKernelContract.deployed(web3, TX_DEFAULTS);

                expect(contractWrapper.address).toBe(debtKernelContractAddress);
                expect(contractWrapper.abi).toEqual(debtKernelContractAbi);
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

                ContractArtifactsMock.mock(debtKernelContractAbi, mockNetworks);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(
                    DebtKernelContract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtKernel", networkId),
                );
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                ContractArtifactsMock.mock(debtKernelContractAbi, mockNetworks);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await DebtKernelContract.at(
                    debtKernelContractAddress,
                    web3,
                    TX_DEFAULTS,
                );

                expect(contractWrapper.address).toBe(debtKernelContractAddress);
                expect(contractWrapper.abi).toEqual(debtKernelContractAbi);
            });
        });
    });
});
