// External libraries
import * as ABIDecoder from "abi-decoder";
import * as _ from "lodash";
import * as omit from "lodash.omit";
import * as singleLineString from "single-line-string";
import * as Web3 from "web3";

// Utils
import { BigNumber } from "../../../utils/bignumber";
import { NULL_ADDRESS } from "../../../utils/constants";
import * as TransactionUtils from "../../../utils/transaction_utils";
import { Web3Utils } from "../../../utils/web3_utils";

// Apis
import { ContractsAPI } from "../../apis";

// Invariants
import { Assertions } from "../../invariants";

// Types
import { DebtOrderData, DebtRegistryEntry, RepaymentSchedule, TxData } from "../../types";
import { CollateralizedLoanTerms } from "../collateralized_simple_interest_loan_terms";
import {
    SimpleInterestLoanOrder,
    SimpleInterestTermsContractParameters,
} from "../simple_interest_loan_adapter";
import { SimpleInterestLoanTerms } from "../simple_interest_loan_terms";

import { Adapter } from "../adapter";

import { ERC20Contract } from "../../wrappers";

const SECONDS_IN_DAY = 60 * 60 * 24;

const TRANSFER_GAS_MAXIMUM = 200000;

// Extend order to include parameters necessary for a collateralized terms contract.
export interface ERC721CollateralizedSimpleInterestLoanOrder extends SimpleInterestLoanOrder {
    collateralTokenSymbol: string;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}

export interface ERC721CollateralizedTermsContractParameters {
    collateralTokenIndex: BigNumber;
    collateralAmount: BigNumber;
    gracePeriodInDays: BigNumber;
}

export interface ERC721CollateralizedSimpleInterestTermsContractParameters
    extends SimpleInterestTermsContractParameters,
        ERC721CollateralizedTermsContractParameters {}

export const ERC721CollateralizerAdapterErrors = {
    INVALID_TOKEN_INDEX: (tokenIndex: BigNumber) =>
        singleLineString`Token Registry does not track a token at index
                         ${tokenIndex.toString()}.`,

    COLLATERAL_AMOUNT_MUST_BE_POSITIVE: () =>
        singleLineString`Collateral amount must be greater than zero.`,

    COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM: () =>
        singleLineString`Collateral amount exceeds maximum value of 2^92 - 1.`,

    INSUFFICIENT_COLLATERAL_TOKEN_ALLOWANCE: () =>
        `Debtor has not granted sufficient allowance for collateral transfer.`,

    INSUFFICIENT_COLLATERAL_TOKEN_BALANCE: () =>
        `Debtor does not have sufficient balance required for collateral transfer.`,

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

export class ERC721CollateralizedSimpleInterestLoanAdapter implements Adapter {
    private assert: Assertions;
    private readonly contractsAPI: ContractsAPI;
    private simpleInterestLoanTerms: SimpleInterestLoanTerms;
    private collateralizedLoanTerms: CollateralizedLoanTerms;
    private web3Utils: Web3Utils;
    private web3: Web3;

    public constructor(web3: Web3, contractsAPI: ContractsAPI) {
        this.assert = new Assertions(web3, contractsAPI);
        this.web3Utils = new Web3Utils(web3);
        this.web3 = web3;

        this.contractsAPI = contractsAPI;

        this.simpleInterestLoanTerms = new SimpleInterestLoanTerms(web3, contractsAPI);
        this.collateralizedLoanTerms = new CollateralizedLoanTerms(web3, contractsAPI);
    }

    public async toDebtOrder(
        collateralizedSimpleInterestLoanOrder: ERC721CollateralizedSimpleInterestLoanOrder,
    ): Promise<DebtOrderData> {
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

        const collateralizedContract = await this.contractsAPI.loadCollateralizedSimpleInterestTermsContract();

        let debtOrderData: DebtOrderData = omit(collateralizedSimpleInterestLoanOrder, [
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

        debtOrderData = {
            ...debtOrderData,
            principalToken: principalToken.address,
            termsContract: collateralizedContract.address,
            termsContractParameters: packedParams,
        };

        return TransactionUtils.applyNetworkDefaults(debtOrderData, this.contractsAPI);
    }

    /**
     * Validates that the basic invariants have been met for a given
     * CollateralizedSimpleInterestLoanOrder.
     *
     * @param {CollateralizedSimpleInterestLoanOrder} loanOrder
     * @returns {Promise<void>}
     */
    public async validateAsync(loanOrder: ERC721CollateralizedSimpleInterestLoanOrder) {
        const unpackedParams = this.unpackParameters(loanOrder.termsContractParameters);

        this.collateralizedLoanTerms.assertValidParams(unpackedParams);

        await this.assertCollateralBalanceAndAllowanceInvariantsAsync(loanOrder);
    }

    /**
     * Given a valid debt order, returns a promise for a CollateralizedSimpleInterestLoanOrder,
     * which includes the DebtOrder information as well as as the contract terms (see documentation
     * on the `CollateralizedSimpleInterestLoanOrder` interface for more information.)
     *
     * @param {DebtOrderData} debtOrderData
     * @returns {Promise<CollateralizedSimpleInterestLoanOrder>}
     */
    public async fromDebtOrder(
        debtOrderData: DebtOrderData,
    ): Promise<ERC721CollateralizedSimpleInterestLoanOrder> {
        this.assert.schema.debtOrderWithTermsSpecified("debtOrder", debtOrderData);

        const { principalTokenIndex, collateralTokenIndex, ...params } = this.unpackParameters(
            debtOrderData.termsContractParameters,
        );

        const principalTokenSymbol = await this.contractsAPI.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        const collateralTokenSymbol = await this.contractsAPI.getTokenSymbolByIndexAsync(
            collateralTokenIndex,
        );

        // Assert that the principal token corresponds to the symbol we've unpacked.
        await this.assertTokenCorrespondsToSymbol(
            debtOrderData.principalToken,
            principalTokenSymbol,
        );

        return {
            ...debtOrderData,
            principalTokenSymbol,
            collateralTokenSymbol,
            ...params,
        };
    }

    /**
     * Given a valid DebtRegistryEntry, returns a CollateralizedSimpleInterestLoanOrder.
     *
     * @param {DebtRegistryEntry} entry
     * @returns {Promise<CollateralizedSimpleInterestLoanOrder>}
     */
    public async fromDebtRegistryEntry(
        entry: DebtRegistryEntry,
    ): Promise<ERC721CollateralizedSimpleInterestLoanOrder> {
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

        const loanOrder: ERC721CollateralizedSimpleInterestLoanOrder = {
            principalTokenSymbol,
            collateralTokenSymbol,
            ...params,
        };

        return loanOrder;
    }

    /**
     * Given a valid DebtRegistryEntry, returns an array of repayment dates (as unix timestamps.)
     *
     * @example
     *   adapter.getRepaymentSchedule(debtEntry);
     *   => [1521506879]
     *
     * @param {DebtRegistryEntry} debtEntry
     * @returns {number[]}
     */
    public getRepaymentSchedule(debtEntry: DebtRegistryEntry): number[] {
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
     * @param {TxData} options
     * @returns {Promise<string>} The transaction's hash.
     */
    public async seizeCollateralAsync(agreementId: string, options?: TxData): Promise<string> {
        this.assert.schema.bytes32("agreementId", agreementId);

        const defaultOptions = await this.getTxDefaultOptions();

        const transactionOptions = _.assign(defaultOptions, options);

        await this.assertDebtAgreementExists(agreementId);
        await this.assertCollateralSeizeable(agreementId);

        const collateralizerContract = await this.contractsAPI.loadCollateralizerAsync();

        return collateralizerContract.seizeCollateral.sendTransactionAsync(
            agreementId,
            transactionOptions,
        );
    }

    /**
     * Returns collateral to the debt agreement's original collateralizer
     * if and only if the debt agreement's term has lapsed and
     * the total expected repayment value has been repaid.
     *
     * @param {string} agreementId
     * @param {TxData} options
     * @returns {Promise<string>} The transaction's hash.
     */
    public async returnCollateralAsync(agreementId: string, options?: TxData): Promise<string> {
        this.assert.schema.bytes32("agreementId", agreementId);

        await this.assertDebtAgreementExists(agreementId);
        await this.assertCollateralReturnable(agreementId);

        const defaultOptions = await this.getTxDefaultOptions();

        const transactionOptions = _.assign(defaultOptions, options);

        const collateralizerContract = await this.contractsAPI.loadCollateralizerAsync();

        return collateralizerContract.returnCollateral.sendTransactionAsync(
            agreementId,
            transactionOptions,
        );
    }

    public unpackParameters(
        termsContractParameters: string,
    ): ERC721CollateralizedSimpleInterestTermsContractParameters {
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
        collateralTermsParams: ERC721CollateralizedTermsContractParameters,
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

    /**
     * Given an agreement ID for a valid collateralized debt agreement, returns true if the
     * collateral is returnable according to the terms of the agreement - I.E. the debt
     * has been repaid, and the collateral has not already been withdrawn.
     *
     * @example
     *  await adapter.canReturnCollateral(
     *     "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    public async canReturnCollateral(agreementId: string): Promise<boolean> {
        try {
            await this.assertCollateralReturnable(agreementId);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Given an agreement ID for a valid collateralized debt agreement, returns true if the
     * collateral can be seized by the creditor, according to the terms of the agreement. Collateral
     * is seizable if the collateral has not been withdrawn yet, and the loan has been in a state
     * of default for a duration of time greater than the grace period.
     *
     * @example
     *  await adapter.canSeizeCollateral(
     *     "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    public async canSeizeCollateral(agreementId: string): Promise<boolean> {
        try {
            await this.assertCollateralSeizeable(agreementId);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Returns true if the collateral associated with the given agreement ID
     * has already been seized or returned.
     *
     * @example
     *  await adapter.isCollateralWithdrawn(
     *    "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f"
     *  );
     *  => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    public async isCollateralWithdrawn(agreementId: string): Promise<boolean> {
        const collateralizerContract = await this.contractsAPI.loadCollateralizerAsync();

        const collateralizerAddress = await collateralizerContract.agreementToCollateralizer.callAsync(
            agreementId,
        );

        return collateralizerAddress === NULL_ADDRESS;
    }

    /**
     * Eventually returns true if the collateral associated with the given debt agreement ID
     * was returned to the debtor.
     *
     * @example
     * await adapter.isCollateralReturned("0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f")
     * => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    public async isCollateralReturned(agreementId: string): Promise<boolean> {
        return this.eventEmittedForAgreement("CollateralReturned", agreementId);
    }

    /**
     * Eventually returns true if the collateral associated with the given debt agreement ID
     * was seized by the creditor.
     *
     * @example
     * await adapter.isCollateralSeized("0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f")
     * => true
     *
     * @param {string} agreementId
     * @returns {Promise<boolean>}
     */
    public async isCollateralSeized(agreementId: string): Promise<boolean> {
        return this.eventEmittedForAgreement("CollateralSeized", agreementId);
    }

    private async eventEmittedForAgreement(
        eventName: string,
        agreementId: string,
    ): Promise<boolean> {
        // We use the contract registry to get the address of the collateralizer contract.
        const contractRegistry = await this.contractsAPI.loadContractRegistryAsync();
        // Collateralizer contract is required for decoding logs.
        const collateralizer = await this.contractsAPI.loadCollateralizerAsync();

        const collateralizerAddress = await contractRegistry.collateralizer.callAsync();

        return new Promise<boolean>((resolve, reject) => {
            this.web3.eth
                .filter({
                    address: collateralizerAddress,
                    fromBlock: 1,
                    toBlock: "latest",
                    topics: [null, agreementId, null],
                })
                .get((err, result) => {
                    if (err) {
                        reject(err);
                    }

                    ABIDecoder.addABI(collateralizer.abi);

                    const decodedResults = ABIDecoder.decodeLogs(result);

                    ABIDecoder.removeABI(collateralizer.abi);

                    const collateralReturnedEvent = _.find(decodedResults, (log: any) => {
                        const foundEvent = _.find(log.events, (event: any) => {
                            return event.name === "agreementID" && event.value === agreementId;
                        });

                        return log.name === eventName && foundEvent;
                    });

                    resolve(!_.isUndefined(collateralReturnedEvent));
                });
        });
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
                ERC721CollateralizerAdapterErrors.MISMATCHED_TOKEN_SYMBOL(tokenAddress, symbol),
            );
        }
    }

    private async assertIsCollateralizedSimpleInterestTermsContract(
        termsContractAddress: string,
    ): Promise<void> {
        const collateralizedSimpleInterestTermsContract = await this.contractsAPI.loadCollateralizedSimpleInterestTermsContract();

        if (termsContractAddress !== collateralizedSimpleInterestTermsContract.address) {
            throw new Error(
                ERC721CollateralizerAdapterErrors.MISMATCHED_TERMS_CONTRACT(termsContractAddress),
            );
        }
    }

    private async assertDebtAgreementExists(agreementId: string): Promise<void> {
        const debtTokenContract = await this.contractsAPI.loadDebtTokenAsync();

        return this.assert.debtAgreement.exists(
            agreementId,
            debtTokenContract,
            ERC721CollateralizerAdapterErrors.COLLATERAL_NOT_FOUND(agreementId),
        );
    }

    /**
     * Collateral is seizable if the collateral has not been withdrawn yet, and the
     * loan has been in a state of default for a duration of time greater than the grace period.
     *
     * @param {string} agreementId
     * @returns {Promise<void>}
     */
    private async assertCollateralSeizeable(agreementId: string): Promise<void> {
        const debtRegistry = await this.contractsAPI.loadDebtRegistryAsync();

        const [termsContract, termsContractParameters] = await debtRegistry.getTerms.callAsync(
            agreementId,
        );

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

        const [termsContract, termsContractParameters] = await debtRegistry.getTerms.callAsync(
            agreementId,
        );

        const unpackedParams = this.unpackParameters(termsContractParameters);

        this.collateralizedLoanTerms.assertValidParams(unpackedParams);

        await this.assertCollateralNotWithdrawn(agreementId);

        await this.assertDebtRepaid(agreementId);
    }

    private async assertDebtRepaid(agreementId) {
        const debtRepaid = await this.debtRepaid(agreementId);

        if (!debtRepaid) {
            throw new Error(ERC721CollateralizerAdapterErrors.DEBT_NOT_YET_REPAID(agreementId));
        }
    }

    private async assertDefaultedForGracePeriod(agreementId: string, gracePeriod: BigNumber) {
        const defaultedForGracePeriod = await this.defaultedForGracePeriod(
            agreementId,
            gracePeriod,
        );

        if (!defaultedForGracePeriod) {
            throw new Error(
                ERC721CollateralizerAdapterErrors.LOAN_NOT_IN_DEFAULT_FOR_GRACE_PERIOD(agreementId),
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
        const collateralWithdrawn = await this.isCollateralWithdrawn(agreementId);

        if (collateralWithdrawn) {
            throw new Error(ERC721CollateralizerAdapterErrors.COLLATERAL_NOT_FOUND(agreementId));
        }
    }

    private async assertCollateralBalanceAndAllowanceInvariantsAsync(
        order: ERC721CollateralizedSimpleInterestLoanOrder,
    ) {
        const { collateralAmount, collateralTokenSymbol } = order;

        const collateralToken: ERC20Contract = await this.contractsAPI.loadTokenBySymbolAsync(
            collateralTokenSymbol,
        );

        const tokenTransferProxy = await this.contractsAPI.loadTokenTransferProxyAsync();

        await this.assert.order.sufficientCollateralizerAllowanceAsync(
            order,
            collateralToken,
            collateralAmount,
            tokenTransferProxy,
            ERC721CollateralizerAdapterErrors.INSUFFICIENT_COLLATERAL_TOKEN_ALLOWANCE(),
        );

        await this.assert.order.sufficientCollateralizerBalanceAsync(
            order,
            collateralToken,
            collateralAmount,
            ERC721CollateralizerAdapterErrors.INSUFFICIENT_COLLATERAL_TOKEN_BALANCE(),
        );
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

    private async getTxDefaultOptions(): Promise<object> {
        const accounts = await this.web3Utils.getAvailableAddressesAsync();

        // TODO: Add fault tolerance to scenario in which not addresses are available

        return {
            from: accounts[0],
            gas: TRANSFER_GAS_MAXIMUM,
        };
    }
}
