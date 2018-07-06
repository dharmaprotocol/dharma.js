import { BaseLoan, BaseLoanConstructorParams } from "./base_loan";

import { BigNumber } from "../../utils/bignumber";
import { BLOCK_TIME_ESTIMATE_SECONDS, NULL_ECDSA_SIGNATURE } from "../../utils/constants";

import { CollateralizedSimpleInterestLoanOrder } from "../adapters/collateralized_simple_interest_loan_adapter";

import { Dharma } from "../dharma";

import {
    DebtOrderData,
    DurationUnit,
    EthereumAddress,
    InterestRate,
    TimeInterval,
    TokenAmount,
} from "../types";

export interface DebtOrderParams {
    principalAmount: number;
    principalToken: string;
    collateralAmount: number;
    collateralToken: string;
    interestRate: number;
    termDuration: number;
    termUnit: DurationUnit;
    debtorAddress: string;
    expiresInDuration: number;
    expiresInUnit: DurationUnit;
}

export class Loan extends BaseLoan {
    /**
     * Eventually enables the account at the default address to make repayments
     * on Dharma Protocol.
     *
     * @example
     * await loan.allowRepayments();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    public async allowRepayments(debtorAddress?: string): Promise<string> {
        const debtor = debtorAddress || this.params.debtorAddress.toString();

        const ethereumAddress = new EthereumAddress(debtor);

        const tokenSymbol = this.params.principal.tokenSymbol;

        return this.enableTokenTransfers(ethereumAddress, tokenSymbol);
    }

    /**
     * Eventually makes a repayment on the loan, with the default payment amount being the
     * expected size of a single installment given the principal, interest rate,
     * and terms.
     *
     * @example
     * order.makeRepayment();
     * => Promise<string>
     *
     * const outstandingAmount = await order.getOutstandingAmount();
     * order.makeRepayment(outstandingAmount);
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to make the repayment
     */
    public async makeRepayment(repaymentAmount?: number): Promise<string> {
        const agreementId = this.getAgreementId();
        const tokenSymbol = this.params.principal.tokenSymbol;
        const principalTokenAddressString = await this.dharma.contracts.getTokenAddressBySymbolAsync(
            tokenSymbol,
        );

        // If repaymentAmount is not specified, we default to the expected amount per installment.
        let rawRepaymentAmount: BigNumber;

        if (repaymentAmount) {
            const repaymentAmountType = new TokenAmount(repaymentAmount, tokenSymbol);
            rawRepaymentAmount = repaymentAmountType.rawAmount;
        } else {
            rawRepaymentAmount = await this.dharma.servicing.getExpectedAmountPerRepayment(
                agreementId,
            );
        }

        return this.dharma.servicing.makeRepayment(
            agreementId,
            rawRepaymentAmount,
            principalTokenAddressString,
        );
    }

    /**
     * Eventually returns true if the debt order's collateral has been either seized
     * by the creditor or returned to the debtor.
     *
     * @example
     * await loan.isCollateralWithdrawn();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isCollateralWithdrawn(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.isCollateralWithdrawn(
            this.getAgreementId(),
        );
    }

    /**
     * Eventually returns true if the debt order's collateral is seizable
     * by the creditor.
     *
     * @example
     * await loan.isCollateralSeizable();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isCollateralSeizable(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.canSeizeCollateral(
            this.getAgreementId(),
        );
    }

    /**
     * Eventually returns true if the debt order has been fully repaid.
     *
     * @example
     * await loan.isRepaid();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isRepaid(): Promise<boolean> {
        const outstandingAmount = await this.getOutstandingAmount();

        return outstandingAmount <= 0;
    }

    /**
     * Eventually returns true if the debt order's collateral is returnable
     * to the debtor.
     *
     * @example
     * await loan.isCollateralReturnable();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isCollateralReturnable(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.canReturnCollateral(
            this.getAgreementId(),
        );
    }

    /**
     * Eventually returns the collateral and sends it to the debtor.
     * This will fail if the collateral is not returnable.
     *
     * @example
     * order.returnCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to return the collateral
     */
    public async returnCollateral(): Promise<string> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.returnCollateralAsync(
            this.getAgreementId(),
        );
    }

    /**
     * Eventually seizes the collateral and sends it to the creditor.
     * This will fail if the collateral is not seizable.
     *
     * @example
     * order.seizeCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to seize the collateral
     */
    public async seizeCollateral(): Promise<string> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.seizeCollateralAsync(
            this.getAgreementId(),
        );
    }

    /**
     * Eventually returns the amount held as collateral for this debt order.
     * This will return 0 if the loan order has not yet been filled, or the collateral has already been seized.
     *
     * @example
     * order.getCurrentCollateralAmount();
     * => Promise<number>
     *
     * @returns {Promise<number>} the amount currently held as collateral for the debt order
     */
    public async getCurrentCollateralAmount(): Promise<number> {
        const isFilled = await this.isFilled();

        if (!isFilled) {
            return 0;
        }

        const isCollateralWithdrawn = await this.isCollateralWithdrawn();

        if (isCollateralWithdrawn) {
            return 0;
        }

        return this.params.collateral.decimalAmount;
    }

    /**
     * Eventually returns the total amount expected to be repaid.
     *
     * @example
     * await order.getTotalExpectedRepaymentAmount();
     * => 13.5
     *
     * @returns {Promise<number>}
     */
    public async getTotalExpectedRepaymentAmount(): Promise<number> {
        const agreementId = this.getAgreementId();

        const totalExpectedRepaymentAmount = await this.dharma.servicing.getTotalExpectedRepayment(
            agreementId,
        );

        const tokenSymbol = this.params.principal.tokenSymbol;

        return TokenAmount.fromRaw(totalExpectedRepaymentAmount, tokenSymbol).decimalAmount;
    }

    /**
     * Returns the symbol of the token to be repaid.
     *
     * @returns {string}
     */
    public getRepaymentTokenSymbol(): string {
        return this.params.principal.tokenSymbol;
    }

    /**
     * Eventually returns the outstanding balance of the loan.
     *
     * @example
     * order.getOutstandingAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    public async getOutstandingAmount(): Promise<number> {
        const repaymentToken = this.getRepaymentTokenSymbol();

        const totalExpectedRepaymentAmount = new TokenAmount(
            await this.getTotalExpectedRepaymentAmount(),
            repaymentToken,
        );

        const repaidAmount = new TokenAmount(await this.getRepaidAmount(), repaymentToken);

        const outstandingAmount = totalExpectedRepaymentAmount.rawAmount.minus(
            repaidAmount.rawAmount,
        );

        const tokenSymbol = this.params.principal.tokenSymbol;

        return TokenAmount.fromRaw(outstandingAmount, tokenSymbol).decimalAmount;
    }

    /**
     * Eventually returns the total amount repaid so far.
     *
     * @example
     * order.getRepaidAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    public async getRepaidAmount(): Promise<number> {
        const agreementId = this.getAgreementId();

        const repaidAmount = await this.dharma.servicing.getValueRepaid(agreementId);

        const tokenSymbol = this.params.principal.tokenSymbol;

        return TokenAmount.fromRaw(repaidAmount, tokenSymbol).decimalAmount;
    }
}
