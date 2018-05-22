// External
import * as Web3 from "web3";
import { BigNumber } from "../../utils/bignumber";

// APIs
import { ContractsAPI } from "../apis";

// Utils
import { Assertions } from "../invariants";
import { TermsContractParameters } from "./terms_contract_parameters";

// Constants
import { TOKEN_REGISTRY_TRACKED_TOKENS } from "../../utils/constants";
import {
    CollateralizedTermsContractParameters,
    CollateralizerAdapterErrors,
} from "./collateralized_simple_interest_loan_adapter";

const MAX_COLLATERAL_TOKEN_INDEX_HEX = (TOKEN_REGISTRY_TRACKED_TOKENS.length - 1).toString(16);
const MAX_COLLATERAL_AMOUNT_HEX = TermsContractParameters.generateHexValueOfLength(23);
const MAX_GRACE_PERIOD_IN_DAYS_HEX = TermsContractParameters.generateHexValueOfLength(2);

export class CollateralizedLoanTerms {
    private assert: Assertions;

    constructor(web3: Web3, contractsAPI: ContractsAPI) {
        this.assert = new Assertions(web3, contractsAPI);
    }

    public packParameters(params: CollateralizedTermsContractParameters): string {
        this.assertValidParams(params);

        const { collateralTokenIndex, collateralAmount, gracePeriodInDays } = params;

        const collateralTokenIndexShifted = TermsContractParameters.bitShiftLeft(
            collateralTokenIndex,
            100,
        );
        const collateralAmountShifted = TermsContractParameters.bitShiftLeft(collateralAmount, 8);
        const gracePeriodInDaysShifted = TermsContractParameters.bitShiftLeft(gracePeriodInDays, 0);

        const baseTenParameters = collateralTokenIndexShifted
            .plus(collateralAmountShifted)
            .plus(gracePeriodInDaysShifted);

        return `0x${baseTenParameters.toString(16).padStart(64, "0")}`;
    }

    public unpackParameters(packedParams: string): CollateralizedTermsContractParameters {
        this.assert.schema.bytes32("packedParams", packedParams);

        const collateralTokenIndexHex = `0x${packedParams.substr(39, 2)}`;
        const collateralAmountHex = `0x${packedParams.substr(41, 23)}`;
        const gracePeriodInDaysHex = `0x${packedParams.substr(64, 2)}`;

        return {
            collateralTokenIndex: new BigNumber(collateralTokenIndexHex),
            collateralAmount: new BigNumber(collateralAmountHex),
            gracePeriodInDays: new BigNumber(gracePeriodInDaysHex),
        };
    }

    public assertValidParams(params: CollateralizedTermsContractParameters) {
        const { collateralTokenIndex, collateralAmount, gracePeriodInDays } = params;

        this.assertCollateralTokenIndexWithinBounds(collateralTokenIndex);
        this.assertCollateralAmountWithinBounds(collateralAmount);
        this.assertGracePeriodInDaysWithinBounds(gracePeriodInDays);
    }

    private assertCollateralTokenIndexWithinBounds(collateralTokenIndex: BigNumber) {
        // Collateral token index cannot be a decimal value.
        if (TermsContractParameters.isDecimalValue(collateralTokenIndex)) {
            throw new Error(CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
        }

        if (collateralTokenIndex.lt(0) || collateralTokenIndex.gt(MAX_COLLATERAL_TOKEN_INDEX_HEX)) {
            throw new Error(CollateralizerAdapterErrors.INVALID_TOKEN_INDEX(collateralTokenIndex));
        }
    }

    private assertCollateralAmountWithinBounds(collateralAmount: BigNumber) {
        // Collateral amount cannot be a decimal value.
        if (TermsContractParameters.isDecimalValue(collateralAmount)) {
            throw new Error(CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
        }

        if (collateralAmount.isNegative() || collateralAmount.isZero()) {
            throw new Error(CollateralizerAdapterErrors.COLLATERAL_AMOUNT_MUST_BE_POSITIVE());
        }

        if (collateralAmount.gt(MAX_COLLATERAL_AMOUNT_HEX)) {
            throw new Error(CollateralizerAdapterErrors.COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM());
        }
    }

    private assertGracePeriodInDaysWithinBounds(gracePeriodInDays: BigNumber) {
        // Grace period cannot be a decimal value.
        if (TermsContractParameters.isDecimalValue(gracePeriodInDays)) {
            throw new Error(CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
        }

        // Grace period can't be negative.
        if (gracePeriodInDays.lt(0)) {
            throw new Error(CollateralizerAdapterErrors.GRACE_PERIOD_IS_NEGATIVE());
        }

        // Grace period has a maximum value that cannot be exceeded due to how we pack params.
        if (gracePeriodInDays.gt(MAX_GRACE_PERIOD_IN_DAYS_HEX)) {
            throw new Error(CollateralizerAdapterErrors.GRACE_PERIOD_EXCEEDS_MAXIMUM());
        }
    }
}
