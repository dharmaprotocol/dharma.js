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

import { ERC721CollateralizedLoanTerms } from "./loan_terms";

import { SimpleInterestLoanTerms } from "../simple_interest_loan_terms";

import {
    SimpleInterestLoanOrder,
    SimpleInterestTermsContractParameters,
} from "../simple_interest_loan_adapter";
// Adapter
import { Adapter } from "../adapter";
// Wrappers
import { ERC721TokenContract } from "../../wrappers";
// Schema
import { erc721CollateralizedSimpleInterestLoanOrder } from "../../schemas/erc721_collateralized_simple_interest_loan_order_schema";

const TRANSFER_GAS_MAXIMUM = 200000;

// Extend order to include parameters necessary for an ERC721-collateralized terms contract.
export interface ERC721CollateralizedSimpleInterestLoanOrder extends SimpleInterestLoanOrder {
    isEnumerable: boolean;
    erc721Symbol: string;
    // Can be an ID or an index.
    tokenReference: BigNumber;
}

export interface ERC721CollateralizedTermsContractParameters {
    isEnumerable: BigNumber;
    erc721ContractIndex: BigNumber;
    // Can be an ID or an index.
    tokenReference: BigNumber;
}

export interface ERC721CollateralizedSimpleInterestTermsContractParameters
    extends SimpleInterestTermsContractParameters,
        ERC721CollateralizedTermsContractParameters {}

export const ERC721CollateralizerAdapterErrors = {
    INVALID_CONTRACT_INDEX: (tokenIndex: BigNumber) =>
        singleLineString`Invalid index for ERC721 Token Registry: ${tokenIndex.toString()}.`,

    INVALID_IS_ENUMERABLE_FLAG: () =>
        singleLineString`isEnumerable should be 0 (if false) or 1 (if true).`,

    INVALID_TOKEN_REFERENCE: () =>
        singleLineString`Token Reference must be a valid token index or token ID.`,

    COLLATERAL_NOT_FOUND: (agreementId: string) =>
        singleLineString`Collateral was not found for given agreement ID ${agreementId}. Make sure
                         that the agreement ID is correct, and that the collateral has not already
                         been withdrawn.`,

    INVALID_DECIMAL_VALUE: () => singleLineString`Values cannot be expressed as decimals.`,

    TOKEN_REFERENCE_EXCEEDS_MAXIMUM: () => singleLineString`Token reference exceeds maximum value.`,

    MISMATCHED_TOKEN_SYMBOL: (tokenAddress: string, symbol: string) =>
        singleLineString`Terms contract parameters are invalid for the given debt order.
                         Token at address ${tokenAddress} does not
                         correspond to specified token with symbol ${symbol}`,

    MISMATCHED_TERMS_CONTRACT: (termsContractAddress: string) =>
        singleLineString`Terms contract at address ${termsContractAddress} is not
                         a ERC721CollateralizedSimpleInterestTermsContract. As such, this adapter 
                         will not interface with the terms contract as expected`,

    TOKEN_REFERENCE_NOT_FOUND: (tokenReference: BigNumber) =>
        singleLineString`Token not found with given reference: ${tokenReference.toString()}`,

    COLLATERALIZER_APPROVAL_NOT_GRANTED: () =>
        singleLineString`Collateralizer contract not granted approval for token transfer`,

    DEBT_NOT_YET_REPAID: (agreementId: string) =>
        singleLineString`Debt has not been fully repaid for loan with agreement ID ${agreementId}`,

    LOAN_NOT_IN_DEFAULT: (agreementId: string) =>
        singleLineString`Loan with agreement ID ${agreementId} is not currently in a state of default`,
};

export class ERC721CollateralizedSimpleInterestLoanAdapter implements Adapter {
    private assert: Assertions;
    private readonly contractsAPI: ContractsAPI;
    private simpleInterestLoanTerms: SimpleInterestLoanTerms;
    private collateralizedLoanTerms: ERC721CollateralizedLoanTerms;
    private web3Utils: Web3Utils;
    private web3: Web3;

    public constructor(web3: Web3, contractsAPI: ContractsAPI) {
        this.assert = new Assertions(web3, contractsAPI);
        this.web3Utils = new Web3Utils(web3);
        this.web3 = web3;

        this.contractsAPI = contractsAPI;

        this.simpleInterestLoanTerms = new SimpleInterestLoanTerms(web3, contractsAPI);
        this.collateralizedLoanTerms = new ERC721CollateralizedLoanTerms(web3, contractsAPI);
    }

    public async toDebtOrder(
        collateralizedSimpleInterestLoanOrder: ERC721CollateralizedSimpleInterestLoanOrder,
    ): Promise<DebtOrderData> {
        this.assert.schema.erc721CollateralizedSimpleInterestLoanOrder(
            "erc721CollateralizedSimpleInterestLoanOrder",
            collateralizedSimpleInterestLoanOrder,
        );

        const {
            // destructure simple interest loan order params.
            principalTokenSymbol,
            principalAmount,
            interestRate,
            amortizationUnit,
            termLength,
            // destructure erc721-collateralized loan order params.
            isEnumerable,
            erc721Symbol,
            tokenReference,
        } = collateralizedSimpleInterestLoanOrder;

        const principalToken = await this.contractsAPI.loadTokenBySymbolAsync(principalTokenSymbol);

        const principalTokenIndex = await this.contractsAPI.getTokenIndexBySymbolAsync(
            principalTokenSymbol,
        );

        const erc721ContractIndex = await this.contractsAPI.getERC721IndexBySymbolAsync(
            erc721Symbol,
        );

        const collateralizedContract = await this.contractsAPI.loadERC721CollateralizedSimpleInterestTermsContract();

        let debtOrderData: DebtOrderData = omit(collateralizedSimpleInterestLoanOrder, [
            // omit the simple interest parameters that will be packed
            // into the `termsContractParameters`.
            "principalTokenSymbol",
            "interestRate",
            "amortizationUnit",
            "termLength",
            // omit the collateralized parameters that will be packed into
            // the `termsContractParameters`.
            "erc721Symbol",
            "tokenReference",
            "isEnumerable",
        ]);

        // Our final output is the perfect union of the packed simple interest params and the packed
        // erc721-collateralized params.
        const packedParams = this.packParameters(
            {
                principalTokenIndex,
                principalAmount,
                interestRate,
                amortizationUnit,
                termLength,
            },
            {
                // We convert the isEnumerable var from boolean to bit flag.
                isEnumerable: isEnumerable ? new BigNumber(1) : new BigNumber(0),
                erc721ContractIndex,
                tokenReference,
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
     * ERC721CollateralizedSimpleInterestLoanOrder.
     *
     * @param {ERC721CollateralizedSimpleInterestLoanOrder} loanOrder
     * @returns {Promise<void>}
     */
    public async validateAsync(loanOrder: ERC721CollateralizedSimpleInterestLoanOrder) {
        const unpackedParams = this.unpackParameters(loanOrder.termsContractParameters);

        await this.collateralizedLoanTerms.assertValidParams(unpackedParams);
        await this.assertCollateralApprovalInvariantsAsync(loanOrder);
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

        const {
            principalTokenIndex,
            erc721ContractIndex,
            isEnumerable,
            ...params
        } = this.unpackParameters(debtOrderData.termsContractParameters);

        const principalTokenSymbol = await this.contractsAPI.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        const erc721Symbol = await this.contractsAPI.getERC721SymbolByIndexAsync(
            erc721ContractIndex,
        );

        // Assert that the principal token corresponds to the symbol we've unpacked.
        await this.assertERC20TokenCorrespondsToSymbol(
            debtOrderData.principalToken,
            principalTokenSymbol,
        );

        return {
            ...debtOrderData,
            principalTokenSymbol,
            ...params,
            // We convert the bit flag into a boolean.
            isEnumerable: isEnumerable.toString() === "1",
            erc721Symbol,
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
        await this.assertIsERC721CollateralizedSimpleInterestTermsContract(entry.termsContract);

        const {
            principalTokenIndex,
            erc721ContractIndex,
            isEnumerable,
            ...params
        } = this.unpackParameters(entry.termsContractParameters);

        const principalTokenSymbol = await this.contractsAPI.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        const erc721Symbol = await this.contractsAPI.getERC721SymbolByIndexAsync(
            erc721ContractIndex,
        );

        const loanOrder: ERC721CollateralizedSimpleInterestLoanOrder = {
            principalTokenSymbol,
            erc721Symbol,
            isEnumerable: isEnumerable.toString() === "1",
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

        const collateralizerContract = await this.contractsAPI.loadERC721CollateralizerAsync();

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

        const collateralizerContract = await this.contractsAPI.loadERC721CollateralizerAsync();

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
        // erc-721 collateralized params.
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
     * of default.
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
        const collateralizerContract = await this.contractsAPI.loadERC721CollateralizerAsync();

        const debtorAddress = await collateralizerContract.agreementToDebtor.callAsync(agreementId);

        return debtorAddress === NULL_ADDRESS;
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
        // Collateralizer contract is required for decoding logs.
        const collateralizer = await this.contractsAPI.loadERC721CollateralizerAsync();

        const collateralizerAddress = collateralizer.address;

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

    private async assertERC20TokenCorrespondsToSymbol(
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

    private async assertIsERC721CollateralizedSimpleInterestTermsContract(
        termsContractAddress: string,
    ): Promise<void> {
        const termsContract = await this.contractsAPI.loadERC721CollateralizedSimpleInterestTermsContract();

        if (termsContractAddress !== termsContract.address) {
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
     * loan is in a state of default.
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

        await this.collateralizedLoanTerms.assertValidParams(unpackedParams);

        await this.assertCollateralNotWithdrawn(agreementId);

        await this.assertDefaulted(agreementId);
    }

    private async assertDefaulted(agreementId: string): Promise<void> {
        const defaulted = await this.defaulted(agreementId);

        if (!defaulted) {
            throw new Error(ERC721CollateralizerAdapterErrors.LOAN_NOT_IN_DEFAULT(agreementId));
        }
    }

    private async defaulted(agreementId: string): Promise<boolean> {
        const termsContract = await this.contractsAPI.loadERC721CollateralizedSimpleInterestTermsContract();
        const repaymentToDate = await termsContract.getValueRepaidToDate.callAsync(agreementId);

        const currentTime = await this.web3Utils.getCurrentBlockTime();

        const minimumRepayment = await termsContract.getExpectedRepaymentValue.callAsync(
            agreementId,
            new BigNumber(currentTime),
        );

        return repaymentToDate.lt(minimumRepayment);
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

        await this.collateralizedLoanTerms.assertValidParams(unpackedParams);

        await this.assertCollateralNotWithdrawn(agreementId);

        await this.assertDebtRepaid(agreementId);
    }

    private async assertDebtRepaid(agreementId) {
        const debtRepaid = await this.debtRepaid(agreementId);

        if (!debtRepaid) {
            throw new Error(ERC721CollateralizerAdapterErrors.DEBT_NOT_YET_REPAID(agreementId));
        }
    }

    private async assertCollateralNotWithdrawn(agreementId) {
        const collateralWithdrawn = await this.isCollateralWithdrawn(agreementId);

        if (collateralWithdrawn) {
            throw new Error(ERC721CollateralizerAdapterErrors.COLLATERAL_NOT_FOUND(agreementId));
        }
    }

    private async assertCollateralApprovalInvariantsAsync(
        order: ERC721CollateralizedSimpleInterestLoanOrder,
    ) {
        const { erc721Symbol, tokenReference } = order;

        const erc721Token: ERC721TokenContract = await this.contractsAPI.loadERC721BySymbolAsync(
            erc721Symbol,
        );

        // Assert that the ERC721 Collateralizer has approval for transferring the asset.
        const approved = await erc721Token.getApproved.callAsync(tokenReference);
        const collateralizerContract = await this.contractsAPI.loadERC721CollateralizerAsync();

        if (approved !== collateralizerContract.address) {
            throw new Error(
                ERC721CollateralizerAdapterErrors.COLLATERALIZER_APPROVAL_NOT_GRANTED(),
            );
        }
    }

    private async debtRepaid(agreementId: string): Promise<boolean> {
        const termsContract = await this.contractsAPI.loadERC721CollateralizedSimpleInterestTermsContract();
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

        return {
            from: accounts[0],
            gas: TRANSFER_GAS_MAXIMUM,
        };
    }
}
