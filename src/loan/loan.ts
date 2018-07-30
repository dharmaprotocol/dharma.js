import { BigNumber } from "../../utils/bignumber";

import { Agreement, BaseLoanConstructorParams, LoanData } from "./agreement";

import { DebtOrderData, EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../types";

import { Dharma } from "../dharma";

export class Loan extends Agreement {
    public static async load(dharma: Dharma, data: LoanData): Promise<Loan> {
        const debtOrderData: DebtOrderData = {
            ...data,
            principalAmount: new BigNumber(data.principalAmount),
            debtorFee: new BigNumber(data.debtorFee),
            creditorFee: new BigNumber(data.creditorFee),
            relayerFee: new BigNumber(data.relayerFee),
            underwriterFee: new BigNumber(data.underwriterFee),
            underwriterRiskRating: new BigNumber(data.underwriterRiskRating),
            expirationTimestampInSec: new BigNumber(data.expirationTimestampInSec),
            salt: new BigNumber(data.salt),
        };

        const loanOrder = await dharma.adapters.collateralizedSimpleInterestLoan.fromDebtOrder(
            debtOrderData,
        );

        const principal = TokenAmount.fromRaw(
            loanOrder.principalAmount,
            loanOrder.principalTokenSymbol,
        );

        const collateral = TokenAmount.fromRaw(
            loanOrder.collateralAmount,
            loanOrder.collateralTokenSymbol,
        );

        const interestRate = InterestRate.fromRaw(loanOrder.interestRate);

        const termLength = new TimeInterval(
            loanOrder.termLength.toNumber(),
            loanOrder.amortizationUnit,
        );

        const debtorAddress = new EthereumAddress(loanOrder.debtor!);

        const loanParams: BaseLoanConstructorParams = {
            principal,
            collateral,
            termLength,
            interestRate,
            expiresAt: loanOrder.expirationTimestampInSec.toNumber(),
            debtorAddress,
        };

        return new Loan(dharma, loanParams, debtOrderData);
    }

    /**
     * Eventually returns true if the loan's collateral has been either seized
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
     * Eventually returns true if the loan's collateral is seizable
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
     * Eventually returns true if the loan has been fully repaid.
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
     * Eventually returns true if the loan's collateral is returnable to the debtor.
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
     * Eventually returns the amount held as collateral for this loan.
     *
     * This will return 0 if the loan's collateral is withdrawn.
     *
     * @example
     * await loan.getCurrentCollateralAmount();
     * => 10
     *
     * @returns {Promise<number>} the amount currently held as collateral for the loan
     */
    public async getCurrentCollateralAmount(): Promise<number> {
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
     * await loan.getTotalExpectedRepaymentAmount();
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
     * * @example
     * await loan.getRepaymentTokenSymbol();
     * => "REP"
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
     * await loan.getOutstandingAmount();
     * => 25
     *
     * @returns {Promise<number>}
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
     * await loan.getRepaidAmount();
     * => 10
     *
     * @returns {Promise<number>}
     */
    public async getRepaidAmount(): Promise<number> {
        const agreementId = this.getAgreementId();

        const repaidAmount = await this.dharma.servicing.getValueRepaid(agreementId);

        const tokenSymbol = this.params.principal.tokenSymbol;

        return TokenAmount.fromRaw(repaidAmount, tokenSymbol).decimalAmount;
    }
}
