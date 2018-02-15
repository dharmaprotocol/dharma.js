jest.mock("src/artifacts/ts/TokenTransferProxy");

import * as promisify from "tiny-promisify";
import { Web3Utils } from "utils/web3_utils";
import { TokenTransferProxyContract } from "src/wrappers";
import { TokenTransferProxy as MockContractArtifacts } from "src/artifacts/ts/TokenTransferProxy";
import { CONTRACT_WRAPPER_ERRORS } from "src/wrappers/contract_wrappers/base_contract_wrapper";
import { ACCOUNTS } from "../accounts";
import * as Web3 from "web3";

// We use an unmocked version of "fs" in order to pull the correct
// contract address from our artifacts for testing purposes
import * as fs from "fs";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH = "src/artifacts/json/TokenTransferProxy.json";

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Token Transfer Proxy Contract Wrapper (Unit)", () => {
    let networkId: number;
    let tokenTransferProxyContractAddress: string;
    let tokenTransferProxyContractAbi: Web3.ContractAbi;

    beforeAll(async () => {
        networkId = await web3Utils.getNetworkIdAsync();

        const readFilePromise = promisify(fs.readFile);
        const artifact = await readFilePromise(TOKEN_TRANSFER_PROXY_ARTIFACTS_PATH);
        const { networks, abi } = JSON.parse(artifact);
        const { address } = networks[networkId];

        tokenTransferProxyContractAddress = address;
        tokenTransferProxyContractAbi = abi;
    });

    // TODO: Create tests for general solidity method calls on the Debt Token contract
    describe("#deployed()", () => {
        describe("no contract address associated w/ current network id", () => {
            beforeAll(() => {
                MockContractArtifacts.mock(tokenTransferProxyContractAbi, {});
            });

            test("throws CONTRACT_NOT_FOUND_ON_NETWORK error", async () => {
                const networkId = await web3Utils.getNetworkIdAsync();
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
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                MockContractArtifacts.mock(tokenTransferProxyContractAbi, mockNetworks);
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
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: tokenTransferProxyContractAddress,
                };

                MockContractArtifacts.mock(tokenTransferProxyContractAbi, mockNetworks);
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
        describe("contract address does not point to contract", () => {
            beforeAll(async () => {
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                MockContractArtifacts.mock(tokenTransferProxyContractAbi, mockNetworks);
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
                let mockNetworks = {};

                mockNetworks[networkId] = {
                    address: ACCOUNTS[0].address,
                };

                MockContractArtifacts.mock(tokenTransferProxyContractAbi, mockNetworks);
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
