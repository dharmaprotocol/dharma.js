// External
import * as Web3 from "web3";
import { BigNumber } from "../../../utils/bignumber";

// APIs
import { ContractsAPI } from "../../apis";

// Utils
import { Assertions } from "../../invariants";
import { TermsContractParameters } from "../terms_contract_parameters";

// Constants
import {
    ERC721CollateralizedTermsContractParameters,
    ERC721CollateralizerAdapterErrors,
} from "./loan_adapter";

// STUB. TODO: Get number of contracts in registry.
const maxContracts = 3;

const MAX_ERC721_CONTRACT_INDEX_HEX = (maxContracts - 1).toString(16);
// TODO: Get accurate number of maximum tokens here.
const MAX_TOKEN_REFERENCE = 999999999999999;

export class ERC721CollateralizedLoanTerms {
    private assert: Assertions;

    constructor(web3: Web3, contractsAPI: ContractsAPI) {
        this.assert = new Assertions(web3, contractsAPI);
    }

    public packParameters(params: ERC721CollateralizedTermsContractParameters): string {
        this.assertValidParams(params);

        const { erc721ContractIndex, tokenReference, isEnumerable } = params;

        const erc721ContractIndexShifted = TermsContractParameters.bitShiftLeft(
            erc721ContractIndex,
            60,
        );
        const tokenReferenceShifted = TermsContractParameters.bitShiftLeft(tokenReference, 4);
        const isEnumerableShifted = TermsContractParameters.bitShiftLeft(isEnumerable, 0);

        const baseTenParameters = erc721ContractIndexShifted
            .plus(tokenReferenceShifted)
            .plus(isEnumerableShifted);

        return `0x${baseTenParameters.toString(16).padStart(64, "0")}`;
    }

    public unpackParameters(packedParams: string): ERC721CollateralizedTermsContractParameters {
        this.assert.schema.bytes32("packedParams", packedParams);

        const erc721ContractIndexHex = `0x${packedParams.substr(39, 12)}`;
        const tokenReferenceHex = `0x${packedParams.substr(51, 14)}`;
        const isEnumerableHex = `0x${packedParams.substr(65, 1)}`;

        return {
            erc721ContractIndex: new BigNumber(erc721ContractIndexHex),
            tokenReference: new BigNumber(tokenReferenceHex),
            isEnumerable: new BigNumber(isEnumerableHex),
        };
    }

    public assertValidParams(params: ERC721CollateralizedTermsContractParameters) {
        const { erc721ContractIndex, tokenReference, isEnumerable } = params;

        this.assertERC721ContractIndexWithinBounds(erc721ContractIndex);
        this.assertValidIsEnumerable(isEnumerable);
        this.assertValidTokenReference(tokenReference);
    }

    private assertERC721ContractIndexWithinBounds(collateralTokenIndex: BigNumber) {
        // Collateral token index cannot be a decimal value.
        if (TermsContractParameters.isDecimalValue(collateralTokenIndex)) {
            throw new Error(ERC721CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
        }

        if (collateralTokenIndex.lt(0) || collateralTokenIndex.gt(MAX_ERC721_CONTRACT_INDEX_HEX)) {
            throw new Error(
                ERC721CollateralizerAdapterErrors.INVALID_CONTRACT_INDEX(collateralTokenIndex),
            );
        }
    }

    private assertValidIsEnumerable(isEnumerable: BigNumber) {
        const flagAsNumber = isEnumerable.toNumber();

        // There are only two possible values for a bit flag!
        if (flagAsNumber !== 0 && flagAsNumber !== 1) {
            throw new Error(ERC721CollateralizerAdapterErrors.INVALID_IS_ENUMERABLE_FLAG());
        }
    }

    private assertValidTokenReference(tokenReference: BigNumber) {
        // Token reference cannot be a decimal value.
        if (TermsContractParameters.isDecimalValue(tokenReference)) {
            throw new Error(ERC721CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
        }

        // Token reference can't be negative.
        if (tokenReference.lt(0)) {
            throw new Error(ERC721CollateralizerAdapterErrors.INVALID_TOKEN_REFERENCE());
        }

        // Token reference has a maximum value that cannot be exceeded due to how we pack params.
        if (tokenReference.gt(MAX_TOKEN_REFERENCE)) {
            throw new Error(ERC721CollateralizerAdapterErrors.TOKEN_REFERENCE_EXCEEDS_MAXIMUM());
        }
    }
}
