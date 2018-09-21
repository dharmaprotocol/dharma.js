// Test runner
import { WrapperTestObject, WrapperTestRunner } from "./wrapper_test_runner";

// Artifacts
import {
    CreditorProxy,
    ERC721CollateralizedSimpleInterestTermsContract,
    ERC721Collateralizer,
    ERC721Token,
    ERC721TokenRegistry,
    MintableERC721Token,
} from "@dharmaprotocol/contracts";

// Wrappers
import {
    CreditorProxyContract,
    ERC721CollateralizedSimpleInterestTermsContractContract,
    ERC721CollateralizerContract,
    ERC721TokenContract,
    ERC721TokenRegistryContract,
    MintableERC721TokenContract,
} from "../../../src/wrappers";

/**
 * A class that contains methods for testing the basics of a contract wrapper.
 *
 * @type {WrapperTestRunner}
 */
const wrapperTestRunner = new WrapperTestRunner();

/**
 * Using the test runner defined above, we will test basic functionality for each of the wrappers
 * defined below.
 */
const wrappers: WrapperTestObject[] = [
    {
        name: "ERC721TokenRegistry",
        displayName: "ERC 721 Token Registry Contract",
        artifactPath:
            "node_modules/@dharmaprotocol/contracts/artifacts/json/ERC721TokenRegistry.json",
        contract: ERC721TokenRegistryContract,
        artifact: ERC721TokenRegistry,
    },
    {
        name: "ERC721Collateralizer",
        displayName: "ERC 721 Collateralizer Contract",
        artifactPath:
            "node_modules/@dharmaprotocol/contracts/artifacts/json/ERC721Collateralizer.json",
        contract: ERC721CollateralizerContract,
        artifact: ERC721Collateralizer,
    },
    {
        name: "ERC721CollateralizedSimpleInterestTermsContract",
        displayName: "ERC 721 Collateralized Simple Interest Terms Contract",
        artifactPath:
            "node_modules/@dharmaprotocol/contracts/artifacts/json/ERC721CollateralizedSimpleInterestTermsContract.json",
        contract: ERC721CollateralizedSimpleInterestTermsContractContract,
        artifact: ERC721CollateralizedSimpleInterestTermsContract,
    },
    {
        name: "ERC721Token",
        displayName: "ERC 721 Token",
        artifactPath: "node_modules/@dharmaprotocol/contracts/artifacts/json/ERC721Token.json",
        contract: ERC721TokenContract,
        artifact: ERC721Token,
    },
    {
        name: "MintableERC721Token",
        displayName: "Mintable ERC 721 Token",
        artifactPath:
            "node_modules/@dharmaprotocol/contracts/artifacts/json/MintableERC721Token.json",
        contract: MintableERC721TokenContract,
        artifact: MintableERC721Token,
    },
    {
        name: "CreditorProxy",
        displayName: "Creditor Proxy",
        artifactPath: "node_modules/@dharmaprotocol/contracts/artifacts/json/CreditorProxy.json",
        contract: CreditorProxyContract,
        artifact: CreditorProxy,
    },
];

wrappers.forEach(wrapperTestRunner.testWrapper);
