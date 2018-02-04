import promisify from "tiny-promisify";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import { DummyTokenContract, DummyTokenRegistryContract } from "src/wrappers";
import { CONTRACT_WRAPPER_ERRORS } from "src/wrappers/contract_wrappers/base_contract_wrapper";
import { ACCOUNTS } from '../accounts';
import Web3 from 'web3'

// We use the mocked version of "fs-extra" defined in __mocks__/fs-extra.ts
import * as mockFs from "fs-extra";

// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const web3Wrapper = new Web3Wrapper(provider);

const DUMMY_TOKEN_ARTIFACTS_PATH = "src/artifacts/DummyToken.json";
const DUMMY_TOKEN_REGISTRY_ARTIFACTS_PATH = "src/artifacts/DummyTokenRegistry.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 }

describe("Dummy Token Contract Wrapper (Unit)", () => {
    let networkId: number;
    let dummyTokenContractAbi: Web3.ContractAbi;
    let dummyREPTokenAddress: string;

    beforeAll(async () => {
        networkId = await web3Wrapper.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const dummyTokenArtifacts = await readFilePromise(DUMMY_TOKEN_ARTIFACTS_PATH);
        const { abi } = JSON.parse(dummyTokenArtifacts);

        dummyTokenContractAbi = abi;

        // HACK: Since we cannot disable jest mocking on a line-by-line
        // basis, we manually pull the DummyTokenRegistry abi and address,
        // mock the filesystem to correctly return them in the DummyTokenRegistry's
        // artifacts, and then finally are able to retrieve a wrapped DummyTokenRegistry
        // contract.  This allows us to retrieve the address of a deployed DummyToken
        // listed in the registry for testing purposes.
        const dummyTokenRegistryArtifacts = await readFilePromise(DUMMY_TOKEN_REGISTRY_ARTIFACTS_PATH);
        const { abi: registryAbi, networks: registryNetworks } = JSON.parse(dummyTokenRegistryArtifacts);
        const registryAddress = registryNetworks[networkId].address;

        let mockFilesystem = {};
        let mockNetworks = {};

        mockNetworks[networkId] = {
            address: registryAddress
        };

        mockFilesystem[DUMMY_TOKEN_REGISTRY_ARTIFACTS_PATH] = JSON.stringify({
            networks: mockNetworks,
            abi: registryAbi
        });

        mockFs.mockFilesystem(mockFilesystem);

        const dummyTokenRegistry = await DummyTokenRegistryContract.deployed(web3, TX_DEFAULTS);
        dummyREPTokenAddress = await dummyTokenRegistry.getTokenAddress.callAsync("REP");
    });

    // TODO: Create tests for general solidity method calls on the Debt Token contract
    describe("#at()", () => {
        describe("local artifacts are nonexistent", () => {
            beforeAll(() => {
                mockFs.mockFilesystem({});
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(DummyTokenContract.at(dummyREPTokenAddress, web3, TX_DEFAULTS)).rejects
                    .toThrowError(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("DummyToken"));
            });
        });

        describe("local artifacts are malformed", () => {
            beforeAll(() => {
                let mockFilesystem = {};
                mockFilesystem[DUMMY_TOKEN_ARTIFACTS_PATH] = "{ incomplete JSON :(";

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws ARTIFACTS_NOT_READABLE error", async () => {
                await expect(DummyTokenContract.at(dummyREPTokenAddress, web3, TX_DEFAULTS)).rejects
                    .toThrowError(CONTRACT_WRAPPER_ERRORS.ARTIFACTS_NOT_READABLE("DummyToken"));
            });
        });

        describe("contract address does not point to contract", () => {
            beforeAll(async () => {
                let mockFilesystem = {};
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address
                }
                mockFilesystem[DUMMY_TOKEN_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: dummyTokenContractAbi
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                await expect(DummyTokenContract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS)).rejects
                    .toThrowError(CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DummyToken", networkId));
            });
        });

        describe("local artifacts readable and contract address associated w/ network id is valid", () => {
            beforeAll(async () => {
                let mockFilesystem = {};
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address
                }
                mockFilesystem[DUMMY_TOKEN_ARTIFACTS_PATH] = JSON.stringify({
                    networks: mockNetworks,
                    abi: dummyTokenContractAbi
                });

                mockFs.mockFilesystem(mockFilesystem);
            });

            test("returns new DebtKernelWrapper w/ current address correctly set", async () => {
                const contractWrapper = await DummyTokenContract.at(dummyREPTokenAddress, web3, TX_DEFAULTS);

                expect(contractWrapper.address).toBe(dummyREPTokenAddress);
                expect(contractWrapper.abi).toEqual(dummyTokenContractAbi);
            });
        });
    });
});
