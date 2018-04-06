import * as singleLineString from "single-line-string";
import * as omit from "lodash.omit";
import * as Web3 from "web3";

import { BigNumber } from "utils/bignumber";
import { Web3Utils } from "utils/web3_utils";

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

import { TermsContract } from "src/wrappers";

import { NULL_ADDRESS } from "../../utils/constants";

const MAX_COLLATERAL_TOKEN_INDEX_HEX = TermsContractParameters.generateHexValueOfLength(2);
const MAX_COLLATERAL_AMOUNT_HEX = TermsContractParameters.generateHexValueOfLength(23);
const MAX_GRACE_PERIOD_IN_DAYS_HEX = TermsContractParameters.generateHexValueOfLength(2);

const SECONDS_IN_DAY = 60 * 60 * 24;

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

export interface CollateralizedSimpleInterestTermsContractParameters
    extends SimpleInterestTermsContractParameters,
        CollateralizedTermsContractParameters {}

export const CollateralizerAdapterErrors = {
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
    COLLATERAL_NOT_FOUND: (agreementId: string) =>
        singleLineString`Collateral was not found for given agreement ID ${agreementId}. Make sure 
                         that the agreement ID is correct, and that the collateral has not already
                         been withdrawn.`,
    DEBT_NOT_YET_REPAID: (agreementId: string) =>
        singleLineString`Debt has not been fully repaid for loan with agreement ID ${agreementId}`,
    LOAN_NOT_IN_DEFAULT_FOR_GRACE_PERIOD: (agreementId: string) =>
        singleLineString`Loan with agreement ID ${agreementId} is not currently in a state of
                        default when adjusted for grace period`,
};

export class CollateralizedLoanTerms {
    private assert: Assertions;

    constructor(contractsAPI: ContractsAPI) {
        this.assert = new Assertions(contractsAPI);
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

        if (collateralAmount.lt(0)) {
            throw new Error(CollateralizerAdapterErrors.COLLATERAL_AMOUNT_IS_NEGATIVE());
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

export class CollateralizedSimpleInterestLoanAdapter implements Adapter.Interface {
    private assert: Assertions;
    private contractsAPI: ContractsAPI;
    private simpleInterestLoanTerms: SimpleInterestLoanTerms;
    private collateralizedLoanTerms: CollateralizedLoanTerms;
    private web3Utils: Web3Utils;

    public constructor(web3: Web3, contractsAPI: ContractsAPI) {
        this.assert = new Assertions(web3, contractsAPI);
        this.web3Utils = new Web3Utils(web3);

        this.contractsAPI = contractsAPI;

        this.simpleInterestLoanTerms = new SimpleInterestLoanTerms(web3, contractsAPI);
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
            // omit the simple interest parameters that will be packed
            // into the `termsContractParameters`.
            "principalTokenSymbol",
            "interestRate",
            "amortizationUnit",
            "termLength",
            // omit the collateralized parameters that will be packed into
            // the `termsContractParameters`.
            "collateralTokenSymbol",
            "collateralAmount",
            "gracePeriodInDays",
        ]);

        // Our final output is the perfect union of the packed simple interest params and the packed
        // collateralized params.
        const packedParams = this.packParameters(
            {
                principalTokenIndex,
                principalAmount,
                interestRate,
                amortizationUnit,
                termLength,
            },
            {
                collateralTokenIndex,
                collateralAmount,
                gracePeriodInDays,
            },
        );

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

    /**
     * Seizes the collateral from the given debt agreement and
     * transfers it to the debt agreement's beneficiary.
     *
     * @param {string} agreementId
     * @returns {Promise<string>} The transaction's hash.
     */
    public async seizeCollateral(agreementId: string): Promise<string> {
        this.assert.schema.bytes32("agreementId", agreementId);

        await this.assertCollateralSeizeable(agreementId);

        const collateralizerContract = await this.contractsAPI.loadCollateralizerAsync();

        return collateralizerContract.seizeCollateral.sendTransactionAsync(
            agreementId,
            // FIXME: For default "from", was getting "invalid address" and default gas reverts.
            { from: ACCOUNTS[1].address, gas: 4712388 },
        );
    }

    /**
     * Returns collateral to the debt agreement's original collateralizer
     * if and only if the debt agreement's term has lapsed and
     * the total expected repayment value has been repaid.
     *
     * @param {string} agreementId
     * @returns {Promise<string>} The transaction's hash.
     */
    public async returnCollateral(agreementId: string): Promise<string> {
        this.assert.schema.bytes32("agreementId", agreementId);

        await this.assertCollateralReturnable(agreementId);

        const collateralizerContract = await this.contractsAPI.loadCollateralizerAsync();

        return collateralizerContract.returnCollateral.sendTransactionAsync(
            agreementId,
            // FIXME: For default "from", was getting "invalid address" and default gas reverts.
            { from: ACCOUNTS[1].address, gas: 4712388 },
        );
    }

    public unpackParameters(
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

    public packParameters(
        simpleTermsParams: SimpleInterestTermsContractParameters,
        collateralTermsParams: CollateralizedTermsContractParameters,
    ): string {
        const packedSimpleInterestParams = this.simpleInterestLoanTerms.packParameters(
            simpleTermsParams,
        );

        const packedCollateralizedParams = this.collateralizedLoanTerms.packParameters(
            collateralTermsParams,
        );

        // Our final output is the perfect union of the packed simple interest params and the packed
        // collateralized params.
        return packedSimpleInterestParams.substr(0, 39) + packedCollateralizedParams.substr(39, 27);
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
                CollateralizerAdapterErrors.MISMATCHED_TOKEN_SYMBOL(tokenAddress, symbol),
            );
        }
    }

    private async assertIsCollateralizedSimpleInterestTermsContract(
        termsContractAddress: string,
    ): Promise<void> {
        const collateralizedSimpleInterestTermsContract = await this.contractsAPI.loadCollateralizedSimpleInterestTermsContract();

        if (termsContractAddress !== collateralizedSimpleInterestTermsContract.address) {
            throw new Error(
                CollateralizerAdapterErrors.MISMATCHED_TERMS_CONTRACT(termsContractAddress),
            );
        }
    }

    /**
     * Collateral is seizable if the collateral has not been withdrawn yet, and the
     * loan has been defaulted for the duration of the grace period.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    private async assertCollateralSeizeable(agreementId: string): Promise<void> {
        const debtRegistry = await this.contractsAPI.loadDebtRegistryAsync();

        const termsContractParameters = (await debtRegistry.getTerms.callAsync(agreementId))[1];

        const unpackedParams = this.unpackParameters(termsContractParameters);

        this.collateralizedLoanTerms.assertValidParams(unpackedParams);

        await this.assertCollateralNotWithdrawn(agreementId);

        await this.assertDefaultedForGracePeriod(agreementId, unpackedParams.gracePeriodInDays);
    }

    /**
     * Collateral is returnable if the debt is repaid, and the collateral has not yet
     * been withdrawn.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    private async assertCollateralReturnable(agreementId: string): Promise<void> {
        const debtRegistry = await this.contractsAPI.loadDebtRegistryAsync();

        const termsContractParameters = (await debtRegistry.getTerms.callAsync(agreementId))[1];

        const unpackedParams = this.unpackParameters(termsContractParameters);

        this.collateralizedLoanTerms.assertValidParams(unpackedParams);

        await this.assertCollateralNotWithdrawn(agreementId);

        await this.assertDebtRepaid(agreementId);
    }

    private async assertDebtRepaid(agreementId) {
        const debtRepaid = await this.debtRepaid(agreementId);

        if (!debtRepaid) {
            throw new Error(CollateralizerAdapterErrors.DEBT_NOT_YET_REPAID(agreementId));
        }
    }

    private async assertDefaultedForGracePeriod(agreementId: string, gracePeriod: BigNumber) {
        const defaultedForGracePeriod = await this.defaultedForGracePeriod(
            agreementId,
            gracePeriod,
        );

        if (!defaultedForGracePeriod) {
            throw new Error(
                CollateralizerAdapterErrors.LOAN_NOT_IN_DEFAULT_FOR_GRACE_PERIOD(agreementId),
            );
        }
    }

    private async defaultedForGracePeriod(
        agreementId: string,
        gracePeriod: BigNumber,
    ): Promise<boolean> {
        const termsContract = await this.contractsAPI.loadCollateralizedSimpleInterestTermsContract();
        const repaymentToDate = await termsContract.getValueRepaidToDate.callAsync(agreementId);

        const currentTime = await this.web3Utils.getCurrentBlockTime();

        const timeAdjustedForGracePeriod = new BigNumber(currentTime).sub(
            gracePeriod.mul(SECONDS_IN_DAY),
        );

        const minimumRepayment = await termsContract.getExpectedRepaymentValue.callAsync(
            agreementId,
            timeAdjustedForGracePeriod,
        );

        return repaymentToDate.lt(minimumRepayment);
    }

    private async assertCollateralNotWithdrawn(agreementId) {
        const collateralizerContract = await this.contractsAPI.loadCollateralizerAsync();

        const collateralizerAddress = await collateralizerContract.agreementToCollateralizer.callAsync(
            agreementId,
        );

        if (collateralizerAddress === NULL_ADDRESS) {
            throw new Error(CollateralizerAdapterErrors.COLLATERAL_NOT_FOUND(agreementId));
        }
    }

    private async debtRepaid(agreementId: string): Promise<boolean> {
        const termsContract = await this.contractsAPI.loadCollateralizedSimpleInterestTermsContract();
        const repaymentToDate = await termsContract.getValueRepaidToDate.callAsync(agreementId);

        const termEnd = await termsContract.getTermEndTimestamp.callAsync(agreementId);

        const expectedTotalRepayment = await termsContract.getExpectedRepaymentValue.callAsync(
            agreementId,
            termEnd,
        );

        return repaymentToDate.gte(expectedTotalRepayment);
    }
}
