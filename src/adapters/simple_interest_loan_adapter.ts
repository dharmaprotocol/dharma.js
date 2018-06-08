// External Libraries
import * as omit from "lodash.omit";
import * as singleLineString from "single-line-string";
import * as Web3 from "web3";

// Utils
import { BigNumber } from "../../utils/bignumber";
import { NULL_ADDRESS } from "../../utils/constants";
import { TransactionUtils } from "../../utils/transaction_utils";

// Types
import { DebtOrderData, DebtRegistryEntry, RepaymentSchedule } from "../types";
import { SimpleInterestLoanTerms } from "./simple_interest_loan_terms";

import { ContractsAPI } from "../apis";

import { Assertions } from "../invariants";

import { Adapter } from "./adapter";

export interface SimpleInterestLoanOrder extends DebtOrderData {
    // Required Debt Order Parameters
    principalAmount: BigNumber;
    principalTokenSymbol: string;

    // Parameters for Terms Contract
    interestRate: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
}

export interface SimpleInterestTermsContractParameters {
    principalAmount: BigNumber;
    interestRate: BigNumber;
    amortizationUnit: AmortizationUnit;
    termLength: BigNumber;
    principalTokenIndex: BigNumber;
}

export type AmortizationUnit = "hours" | "days" | "weeks" | "months" | "years";

const MAX_TERM_LENGTH_VALUE_HEX = "0xffff";
const MAX_INTEREST_RATE_PRECISION = 4;

export const SimpleInterestAdapterErrors = {
    INVALID_TOKEN_INDEX: (tokenIndex: BigNumber) =>
        singleLineString`Token Registry does not track a token at index
                         ${tokenIndex.toString()}.`,
    INVALID_PRINCIPAL_AMOUNT: () =>
        singleLineString`Principal amount must be a whole number greater than 0
                         and less than 2^96 - 1.`,
    INVALID_INTEREST_RATE: () =>
        singleLineString`Interest amount cannot be negative,
                         greater than 1677.7216, or have more than
                         ${MAX_INTEREST_RATE_PRECISION} decimal places.`,
    INVALID_AMORTIZATION_UNIT_TYPE: () =>
        singleLineString`Amortization unit must be of type HOURS, DAYS,
                         WEEKS, MONTHS, or YEARS.`,
    INVALID_TERM_LENGTH: () =>
        singleLineString`Term length value cannot be negative or greater
                         than ${parseInt(MAX_TERM_LENGTH_VALUE_HEX, 16)}`,

    MISMATCHED_TOKEN_SYMBOL: (principalTokenIndex: BigNumber, symbol: string) =>
        singleLineString`Terms contract parameters are invalid for the given debt order.
                         Principal token at index ${principalTokenIndex.toString()}, specified
                         in the terms contract, does not correspond to specified token
                         with symbol ${symbol}`,

    MISMATCHED_TERMS_CONTRACT: (termsContract: string) =>
        singleLineString`Terms contract at address ${termsContract} is not
                         a SimpleInterestTermsContract.  As such, this adapter will not
                         interface with the terms contract as expected`,
};

export class SimpleInterestLoanAdapter implements Adapter {
    public static Installments: { [type: string]: AmortizationUnit } = {
        HOURLY: "hours",
        DAILY: "days",
        WEEKLY: "weeks",
        MONTHLY: "months",
        YEARLY: "years",
    };

    private assert: Assertions;
    private readonly contracts: ContractsAPI;
    private termsContractInterface: SimpleInterestLoanTerms;

    public constructor(web3: Web3, contracts: ContractsAPI) {
        this.assert = new Assertions(web3, contracts);
        this.contracts = contracts;
        this.termsContractInterface = new SimpleInterestLoanTerms(web3, contracts);
    }

    /**
     * Asynchronously generates a Dharma debt order given an instance of a
     * simple interest loan order.
     *
     * @param  simpleInterestLoanOrder a simple interest loan order instance.
     * @return the generated Dharma debt order.
     */
    public async toDebtOrderData(
        simpleInterestLoanOrder: SimpleInterestLoanOrder,
    ): Promise<DebtOrderData> {
        this.assert.schema.simpleInterestLoanOrder(
            "simpleInterestLoanOrder",
            simpleInterestLoanOrder,
        );

        const {
            principalTokenSymbol,
            principalAmount,
            interestRate,
            amortizationUnit,
            termLength,
        } = simpleInterestLoanOrder;

        const principalToken = await this.contracts.loadTokenBySymbolAsync(principalTokenSymbol);
        const principalTokenIndex = await this.contracts.getTokenIndexBySymbolAsync(
            principalTokenSymbol,
        );

        const simpleInterestTermsContract = await this.contracts.loadSimpleInterestTermsContract();

        let debtOrderData: DebtOrderData = omit(simpleInterestLoanOrder, [
            "principalTokenSymbol",
            "interestRate",
            "amortizationUnit",
            "termLength",
        ]);

        debtOrderData = {
            ...debtOrderData,
            principalToken: principalToken.address,
            termsContract: simpleInterestTermsContract.address,
            termsContractParameters: this.termsContractInterface.packParameters({
                principalTokenIndex,
                principalAmount,
                interestRate,
                amortizationUnit,
                termLength,
            }),
        };

        return TransactionUtils.applyNetworkDefaults(debtOrderData, this.contracts);
    }

    /**
     * Asynchronously generates a simple interest loan order given a Dharma
     * debt order instance.
     *
     * @param  debtOrderData a Dharma debt order instance.
     * @return           the generated simple interest loan order.
     */
    public async fromDebtOrderData(debtOrderData: DebtOrderData): Promise<SimpleInterestLoanOrder> {
        this.assert.schema.debtOrderWithTermsSpecified("debtOrder", debtOrderData);

        const {
            principalTokenIndex,
            principalAmount,
            interestRate,
            termLength,
            amortizationUnit,
        } = this.unpackParameters(debtOrderData.termsContractParameters);

        const principalTokenSymbol = await this.contracts.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        return {
            ...debtOrderData,
            principalAmount,
            principalTokenSymbol,
            interestRate,
            termLength,
            amortizationUnit,
        };
    }

    /**
     * Asynchronously translates a Dharma debt registry entry into a
     * simple interest loan order.
     *
     * @param entry a Dharma debt registry entry
     * @return      the translated simple interest loan order
     */
    public async fromDebtRegistryEntry(entry: DebtRegistryEntry): Promise<SimpleInterestLoanOrder> {
        await this.assertIsSimpleInterestTermsContract(entry.termsContract);

        const {
            principalTokenIndex,
            principalAmount,
            interestRate,
            termLength,
            amortizationUnit,
        } = this.unpackParameters(entry.termsContractParameters);

        const principalTokenSymbol = await this.contracts.getTokenSymbolByIndexAsync(
            principalTokenIndex,
        );

        return {
            principalTokenSymbol,
            principalAmount,
            interestRate,
            termLength,
            amortizationUnit,
        };
    }

    public getRepaymentSchedule(debtEntry: DebtRegistryEntry): number[] {
        const { termsContractParameters, issuanceBlockTimestamp } = debtEntry;
        const { termLength, amortizationUnit } = this.termsContractInterface.unpackParameters(
            termsContractParameters,
        );

        return new RepaymentSchedule(
            amortizationUnit,
            termLength,
            issuanceBlockTimestamp.toNumber(),
        ).toArray();
    }

    public unpackParameters(packedParams: string): SimpleInterestTermsContractParameters {
        return this.termsContractInterface.unpackParameters(packedParams);
    }

    /**
     * Validates that the basic invariants have been met for a given SimpleInterestLoanOrder.
     *
     * @param {SimpleInterestLoanOrder} simpleInterestLoanOrder
     * @returns {Promise<void>}
     */
    public async validateAsync(simpleInterestLoanOrder: SimpleInterestLoanOrder) {
        this.termsContractInterface.validate(simpleInterestLoanOrder.termsContractParameters);

        await this.assertIsSimpleInterestTermsContract(simpleInterestLoanOrder.termsContract);

        await this.assertPrincipalTokenValidAsync(simpleInterestLoanOrder);
    }

    private async assertIsSimpleInterestTermsContract(termsContractAddress: string): Promise<void> {
        const simpleInterestTermsContract = await this.contracts.loadSimpleInterestTermsContract();

        if (termsContractAddress !== simpleInterestTermsContract.address) {
            throw new Error(
                SimpleInterestAdapterErrors.MISMATCHED_TERMS_CONTRACT(termsContractAddress),
            );
        }
    }

    /**
     * Asserts that the address of the principal token specified in the loan order
     * matches the address of the principal token specified in the terms contract parameters.
     *
     * @param {SimpleInterestLoanOrder} loanOrder
     * @returns {Promise<void>}
     */
    private async assertPrincipalTokenValidAsync(loanOrder: SimpleInterestLoanOrder) {
        const principalTokenSymbol = loanOrder.principalTokenSymbol;

        const unpackedTerms = this.unpackParameters(loanOrder.termsContractParameters);

        const tokenIndex = unpackedTerms.principalTokenIndex;

        // Find the token in the registry.
        const tokenRegistry = await this.contracts.loadTokenRegistry();
        const tokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(
            principalTokenSymbol,
        );
        const expectedTokenAddress = await tokenRegistry.getTokenAddressByIndex.callAsync(
            tokenIndex,
        );

        if (tokenAddress === NULL_ADDRESS || tokenAddress !== expectedTokenAddress) {
            throw new Error(
                SimpleInterestAdapterErrors.MISMATCHED_TOKEN_SYMBOL(
                    tokenIndex,
                    principalTokenSymbol,
                ),
            );
        }
    }
}
