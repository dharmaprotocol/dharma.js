import { WrapperTestObject, WrapperTestRunner } from "./wrapper_test_runner";

import {
    ERC721TokenRegistry,
    ERC721Collateralizer,
    ERC721CollateralizedSimpleInterestTermsContract,
} from "@dharmaprotocol/contracts";

import { ERC721TokenRegistryContract } from "../../../src/wrappers/contract_wrappers/e_r_c721_token_registry_wrapper";
import { ERC721CollateralizerContract } from "../../../src/wrappers/contract_wrappers/e_r_c721_collateralizer_wrapper";
import { ERC721CollateralizedSimpleInterestTermsContractContract } from "../../../src/wrappers/contract_wrappers/e_r_c721_collateralized_simple_interest_terms_contract_wrapper";

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
];

const wrapperTestRunner = new WrapperTestRunner();

wrappers.forEach(wrapperTestRunner.testWrapper);
