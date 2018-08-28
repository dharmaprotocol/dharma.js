import { ERC721TokenRegistryContract } from "../../src/wrappers/contract_wrappers/e_r_c721_token_registry_wrapper";

jest.mock("@dharmaprotocol/contracts");

import * as promisify from "tiny-promisify";
import { Web3Utils } from "utils/web3_utils";
import { ERC721TokenRegistry as MockContractArtifacts } from "@dharmaprotocol/contracts";
import { CONTRACT_WRAPPER_ERRORS } from "src/wrappers/contract_wrappers/base_contract_wrapper";
import { ACCOUNTS } from "../accounts";
import * as Web3 from "web3";

// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const ERC721_TOKEN_REGISTRY_ARTIFACTS_PATH =
    "node_modules/@dharmaprotocol/contracts/artifacts/json/ERC721TokenRegistry.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("ERC721 Token Registry Contract Wrapper (Unit)", () => {
    let networkId: number;
    let tokenRegistryContractAddress: string;
    let tokenRegistryContractAbi: Web3.ContractAbi;

    beforeAll(async () => {
        networkId = await web3Utils.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const artifact = await readFilePromise(ERC721_TOKEN_REGISTRY_ARTIFACTS_PATH);
        const { networks, abi } = JSON.parse(artifact);
        const { address } = networks[networkId];

        tokenRegistryContractAddress = address;
        tokenRegistryContractAbi = abi;
    });

    describe("#deployed()", () => {
        describe("no contract address associated w/ current network id", () => {
            beforeAll(() => {
                MockContractArtifacts.mock(tokenRegistryContractAbi, {});
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                const networkId = await web3Utils.getNetworkIdAsync();
                await expect(
                    ERC721TokenRegistryContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC721TokenRegistry",
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
                    ERC721TokenRegistryContract.deployed(web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC721TokenRegistry",
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

            test("returns new ERC721TokenRegistry wrapper w/ current address correctly set", async () => {
                const contractWrapper = await ERC721TokenRegistryContract.deployed(
                    web3,
                    TX_DEFAULTS,
                );

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
                    ERC721TokenRegistryContract.at(ACCOUNTS[0].address, web3, TX_DEFAULTS),
                ).rejects.toThrowError(
                    CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK(
                        "ERC721TokenRegistry",
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

            test("returns new ERC721TokenRegistryContract w/ current address correctly set", async () => {
                const contractWrapper = await ERC721TokenRegistryContract.at(
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
