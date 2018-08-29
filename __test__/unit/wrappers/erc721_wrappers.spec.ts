import { WrapperTestObject, WrapperTestRunner } from "./wrapper_test_runner";

import {
    ERC721TokenRegistry,
    ERC721Collateralizer,
    ERC721CollateralizedSimpleInterestTermsContract,
    ERC721Token,
    MintableERC721Token,
} from "@dharmaprotocol/contracts";

import { ERC721TokenRegistryContract } from "../../../src/wrappers/contract_wrappers/e_r_c721_token_registry_wrapper";
import { ERC721CollateralizerContract } from "../../../src/wrappers/contract_wrappers/e_r_c721_collateralizer_wrapper";
import { ERC721CollateralizedSimpleInterestTermsContractContract } from "../../../src/wrappers/contract_wrappers/e_r_c721_collateralized_simple_interest_terms_contract_wrapper";
import { ERC721TokenContract } from "../../../src/wrappers/contract_wrappers/e_r_c721_token_wrapper";
import { MintableERC721TokenContract } from "../../../src/wrappers/contract_wrappers/mintable_e_r_c721_token_wrapper";

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
];

const wrapperTestRunner = new WrapperTestRunner();

wrappers.forEach(wrapperTestRunner.testWrapper);
