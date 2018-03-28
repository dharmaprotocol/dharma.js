import * as Web3 from "web3";
import * as singleLineString from "single-line-string";
import * as omit from "lodash.omit";

import { BigNumber } from "utils/bignumber";

import { ContractsAPI } from "src/apis";
import { Assertions } from "src/invariants";
import { DebtOrder } from "src/types";

import { TermsContractParameters } from "./terms_contract_parameters";
import { SimpleInterestLoanTerms, SimpleInterestLoanOrder } from "./simple_interest_loan_adapter";

const MAX_COLLATERAL_TOKEN_INDEX_HEX = TermsContractParameters.generateHexValueOfLength(2);
const MAX_COLLATERAL_AMOUNT_HEX = TermsContractParameters.generateHexValueOfLength(23);
const MAX_GRACE_PERIOD_IN_DAYS_HEX = TermsContractParameters.generateHexValueOfLength(2);

// Extend order to include parameters necessary for a collateralized terms contract.
export interface CollateralizedSimpleInterestLoanOrder extends SimpleInterestLoanOrder {
    collateralTokenSymbol: string;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}

export interface CollateralizedTermsContractParameters {
    collateralTokenIndex: BigNumber;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}

export const CollateralizedAdapterErrors = {
    INVALID_TOKEN_INDEX: (tokenIndex: BigNumber) =>
        singleLineString`Token Registry does not track a token at index
                         ${tokenIndex.toString()}.`,
    COLLATERAL_AMOUNT_IS_NEGATIVE: () => singleLineString`Collateral amount cannot be negative.`,
    COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM: () =>
        singleLineString`Collateral amount exceeds maximum value of 2^92 - 1.`,
    GRACE_PERIOD_IS_NEGATIVE: () => singleLineString`The grace period cannot be negative.`,
    GRACE_PERIOD_EXCEEDS_MAXIMUM: () =>
        singleLineString`The grace period exceeds the maximum value of 2^8 - 1`,
    INVALID_DECIMAL_VALUE: () => singleLineString`Values cannot be expressed as decimals.`,
};

export class CollateralizedLoanTerms {
    private assert: Assertions;

    constructor(web3: Web3, contractsAPI: ContractsAPI) {
        this.assert = new Assertions(web3, contractsAPI);
    }

    public packParameters(params: CollateralizedTermsContractParameters): string {
        const { collateralTokenIndex, collateralAmount, gracePeriodInDays } = params;

        this.assertCollateralTokenIndexWithinBounds(collateralTokenIndex);
        this.assertCollateralAmountWithinBounds(collateralAmount);
        this.assertGracePeriodInDaysWithinBounds(gracePeriodInDays);

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

    private assertCollateralTokenIndexWithinBounds(collateralTokenIndex: BigNumber) {
        // Collateral token index cannot be a decimal value.
        if (TermsContractParameters.isDecimalValue(collateralTokenIndex)) {
            throw new Error(CollateralizedAdapterErrors.INVALID_DECIMAL_VALUE());
        }

        if (collateralTokenIndex.lt(0) || collateralTokenIndex.gt(MAX_COLLATERAL_TOKEN_INDEX_HEX)) {
            throw new Error(CollateralizedAdapterErrors.INVALID_TOKEN_INDEX(collateralTokenIndex));
        }
    }

    private assertCollateralAmountWithinBounds(collateralAmount: BigNumber) {
        // Collateral amount cannot be a decimal value.
        if (TermsContractParameters.isDecimalValue(collateralAmount)) {
            throw new Error(CollateralizedAdapterErrors.INVALID_DECIMAL_VALUE());
        }

        if (collateralAmount.lt(0)) {
            throw new Error(CollateralizedAdapterErrors.COLLATERAL_AMOUNT_IS_NEGATIVE());
        }

        if (collateralAmount.gt(MAX_COLLATERAL_AMOUNT_HEX)) {
            throw new Error(CollateralizedAdapterErrors.COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM());
        }
    }

    private assertGracePeriodInDaysWithinBounds(gracePeriodInDays: BigNumber) {
        // Grace period cannot be a decimal value.
        if (TermsContractParameters.isDecimalValue(gracePeriodInDays)) {
            throw new Error(CollateralizedAdapterErrors.INVALID_DECIMAL_VALUE());
        }

        // Grace period can't be negative.
        if (gracePeriodInDays.lt(0)) {
            throw new Error(CollateralizedAdapterErrors.GRACE_PERIOD_IS_NEGATIVE());
        }

        // Grace period has a maximum value that cannot be exceeded due to how we pack params.
        if (gracePeriodInDays.gt(MAX_GRACE_PERIOD_IN_DAYS_HEX)) {
            throw new Error(CollateralizedAdapterErrors.GRACE_PERIOD_EXCEEDS_MAXIMUM());
        }
    }
}

export class CollateralizedSimpleInterestLoanAdapter {
    private assert: Assertions;
    private contractsAPI: ContractsAPI;
    private simpleInterestLoanTerms: SimpleInterestLoanTerms;
    private collateralizedLoanTerms: CollateralizedLoanTerms;

    public constructor(web3: Web3, contractsAPI: ContractsAPI) {
        this.assert = new Assertions(web3, contractsAPI);
        this.contractsAPI = contractsAPI;
        this.simpleInterestLoanTerms = new SimpleInterestLoanTerms(web3, contractsAPI);
        this.collateralizedLoanTerms = new CollateralizedLoanTerms(web3, contractsAPI);
    }

    public async toDebtOrder(
        collateralizedSimpleInterestLoanOrder: CollateralizedSimpleInterestLoanOrder,
    ): Promise<DebtOrder.Instance> {
        this.assert.schema.collateralizedSimpleInterestLoanOrder(
            "collateralizedSimpleInterestLoanOrder",
            collateralizedSimpleInterestLoanOrder,
        );

        const {
            // destructure simple interest loan order params.
            principalTokenSymbol,
            principalAmount,
            interestRate,
            amortizationUnit,
            termLength,
            // destructure collateralized loan order params.
            collateralTokenSymbol,
            collateralAmount,
            gracePeriodInDays,
        } = collateralizedSimpleInterestLoanOrder;

        const principalToken = await this.contractsAPI.loadTokenBySymbolAsync(principalTokenSymbol);

        const principalTokenIndex = await this.contractsAPI.getTokenIndexBySymbolAsync(
            principalTokenSymbol,
        );

        const collateralTokenIndex = await this.contractsAPI.getTokenIndexBySymbolAsync(
            collateralTokenSymbol,
        );

        // TODO(kayvon): this needs to be the collateralized simple interest contract
        const simpleInterestTermsContract = await this.contractsAPI.loadSimpleInterestTermsContract();

        let debtOrder: DebtOrder.Instance = omit(collateralizedSimpleInterestLoanOrder, [
            // omit the simple interest parameters that will be packed into the `termsContractParameters`.
            "principalTokenSymbol",
            "interestRate",
            "amortizationUnit",
            "termLength",
            // omit the collateralized parameters that will be packed into the `termsContractParameters`.
            "collateralTokenSymbol",
            "collateralAmount",
            "gracePeriodInDays",
        ]);

        const packedSimpleInterestParams = this.simpleInterestLoanTerms.packParameters({
            principalTokenIndex,
            principalAmount,
            interestRate,
            amortizationUnit,
            termLength,
        });

        const packedCollateralizedParams = this.collateralizedLoanTerms.packParameters({
            collateralTokenIndex,
            collateralAmount,
            gracePeriodInDays,
        });

        // Our final output is the perfect union of the packed simple interest params and the packed
        // collateralized params.
        const packedParams =
            packedSimpleInterestParams.substr(0, 39) + packedCollateralizedParams.substr(39, 27);

        debtOrder = {
            ...debtOrder,
            principalToken: principalToken.address,
            termsContract: simpleInterestTermsContract.address,
            termsContractParameters: packedParams,
        };

        return DebtOrder.applyNetworkDefaults(debtOrder, this.contractsAPI);
    }
}
