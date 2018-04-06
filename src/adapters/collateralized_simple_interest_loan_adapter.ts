import * as singleLineString from "single-line-string";
import * as omit from "lodash.omit";

import { BigNumber } from "utils/bignumber";

import { ContractsAPI } from "src/apis";
import { Assertions } from "src/invariants";
import { DebtOrder, DebtRegistryEntry, RepaymentSchedule } from "src/types";
import { Adapter } from "./adapter";

import { TermsContractParameters } from "./terms_contract_parameters";
import {
    SimpleInterestLoanTerms,
    SimpleInterestLoanOrder,
    SimpleInterestTermsContractParameters,
} from "./simple_interest_loan_adapter";

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

interface CollateralizedSimpleInterestTermsContractParameters
    extends SimpleInterestTermsContractParameters,
        CollateralizedTermsContractParameters {}

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
    MISMATCHED_TOKEN_SYMBOL: (tokenAddress: string, symbol: string) =>
        singleLineString`Terms contract parameters are invalid for the given debt order.
                         Token at address ${tokenAddress} does not
                         correspond to specified token with symbol ${symbol}`,
    MISMATCHED_TERMS_CONTRACT: (termsContractAddress: string) =>
        singleLineString`Terms contract at address ${termsContractAddress} is not
                         a CollateralizedSimpleInterestTermsContract.  As such, this adapter will
                         not interface with the terms contract as expected`,
};

export class CollateralizedLoanTerms {
    private assert: Assertions;

    constructor(contractsAPI: ContractsAPI) {
        this.assert = new Assertions(contractsAPI);
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

export class CollateralizedSimpleInterestLoanAdapter implements Adapter.Interface {
    private assert: Assertions;
    private contractsAPI: ContractsAPI;
    private simpleInterestLoanTerms: SimpleInterestLoanTerms;
    private collateralizedLoanTerms: CollateralizedLoanTerms;

    public constructor(contractsAPI: ContractsAPI) {
        this.assert = new Assertions(contractsAPI);
        this.contractsAPI = contractsAPI;
        this.simpleInterestLoanTerms = new SimpleInterestLoanTerms(contractsAPI);
        this.collateralizedLoanTerms = new CollateralizedLoanTerms(contractsAPI);
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

        const collateralizedSimpleInterestTermsContract = await this.contractsAPI.loadCollateralizedSimpleInterestTermsContract();

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
            termsContract: collateralizedSimpleInterestTermsContract.address,
            termsContractParameters: packedParams,
        };

        return DebtOrder.applyNetworkDefaults(debtOrder, this.contractsAPI);
    }

    public async fromDebtOrder(
        debtOrder: DebtOrder.Instance,
    ): Promise<CollateralizedSimpleInterestLoanOrder> {
        this.assert.schema.debtOrderWithTermsSpecified("debtOrder", debtOrder);

        const { principalTokenIndex, collateralTokenIndex, ...params } = this.unpackParameters(
            debtOrder.termsContractParameters,
        );

        const principalTokenSymbol = await this.contractsAPI.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        const collateralTokenSymbol = await this.contractsAPI.getTokenSymbolByIndexAsync(
            collateralTokenIndex,
        );

        // Assert that the principal token corresponds to the symbol we've unpacked.
        await this.assertTokenCorrespondsToSymbol(debtOrder.principalToken, principalTokenSymbol);

        return {
            ...debtOrder,
            principalTokenSymbol,
            collateralTokenSymbol,
            ...params,
        };
    }

    public async fromDebtRegistryEntry(
        entry: DebtRegistryEntry,
    ): Promise<CollateralizedSimpleInterestLoanOrder> {
        await this.assertIsCollateralizedSimpleInterestTermsContract(entry.termsContract);

        const { principalTokenIndex, collateralTokenIndex, ...params } = this.unpackParameters(
            entry.termsContractParameters,
        );

        const principalTokenSymbol = await this.contractsAPI.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        const collateralTokenSymbol = await this.contractsAPI.getTokenSymbolByIndexAsync(
            collateralTokenIndex,
        );

        const loanOrder: CollateralizedSimpleInterestLoanOrder = {
            principalTokenSymbol,
            collateralTokenSymbol,
            ...params,
        };

        return loanOrder;
    }

    public getRepaymentSchedule(debtEntry: DebtRegistryEntry): Array<number> {
        const { termsContractParameters, issuanceBlockTimestamp } = debtEntry;
        const { termLength, amortizationUnit } = this.unpackParameters(termsContractParameters);

        return new RepaymentSchedule(
            amortizationUnit,
            termLength,
            issuanceBlockTimestamp.toNumber(),
        ).toArray();
    }

    private unpackParameters(
        termsContractParameters: string,
    ): CollateralizedSimpleInterestTermsContractParameters {
        const simpleInterestParams = this.simpleInterestLoanTerms.unpackParameters(
            termsContractParameters,
        );

        const collateralizedParams = this.collateralizedLoanTerms.unpackParameters(
            termsContractParameters,
        );

        return {
            ...simpleInterestParams,
            ...collateralizedParams,
        };
    }

    private async assertTokenCorrespondsToSymbol(
        tokenAddress: string,
        symbol: string,
    ): Promise<void> {
        const doesTokenCorrespondToSymbol = await this.contractsAPI.doesTokenCorrespondToSymbol(
            tokenAddress,
            symbol,
        );

        if (!doesTokenCorrespondToSymbol) {
            throw new Error(
                CollateralizedAdapterErrors.MISMATCHED_TOKEN_SYMBOL(tokenAddress, symbol),
            );
        }
    }

    private async assertIsCollateralizedSimpleInterestTermsContract(
        termsContractAddress: string,
    ): Promise<void> {
        const collateralizedSimpleInterestTermsContract = await this.contractsAPI.loadCollateralizedSimpleInterestTermsContract();

        if (termsContractAddress !== collateralizedSimpleInterestTermsContract.address) {
            throw new Error(
                CollateralizedAdapterErrors.MISMATCHED_TERMS_CONTRACT(termsContractAddress),
            );
        }
    }
}
