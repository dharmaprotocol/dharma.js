import { DebtOrderData, EthereumAddress, InterestRate, TimeInterval, TokenAmount } from "../types";

import { Dharma } from "../types/dharma";

export interface LoanParams {
    id: string;
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    creditor: EthereumAddress;
    debtor: EthereumAddress;
}

export interface LoanData {
    id: string;
    principalAmount: number;
    principalTokenSymbol: string;
    collateralAmount: number;
    collateralTokenSymbol: string;
    interestRate: number;
    termDuration: number;
    termUnit: string;
    debtorAddress: string;
    creditorAddress: string;
}

export interface ExpandedLoanData extends LoanData {
    repaidAmount: number;
    totalExpectedRepaymentAmount: number;
}

/**
 * Describes a loan from a lender's perspective, includes functionality for seizing
 * collateral.
 */
export class Loan {
    public static async fetch<T extends Loan>(dharma: Dharma, id: string): Promise<T> {
        const entry = await dharma.servicing.getDebtRegistryEntry(id);

        // HACK(kayvon): we don't include the debtor in the debt registry entry so we need to pull
        // it from the collateralizer.
        const collateralizer = await dharma.contracts.loadCollateralizerAsync();
        const debtor = await collateralizer.agreementToCollateralizer.callAsync(id);

        const parameters = dharma.adapters.collateralizedSimpleInterestLoan.unpackParameters(
            entry.termsContractParameters,
        );

        const principalSymbol = await dharma.token.getTokenSymbolByIndexAsync(
            parameters.principalTokenIndex,
        );

        const collateralSymbol = await dharma.token.getTokenSymbolByIndexAsync(
            parameters.collateralTokenIndex,
        );

        const params = {
            id,
            principal: TokenAmount.fromRaw(parameters.principalAmount, principalSymbol),
            collateral: TokenAmount.fromRaw(parameters.collateralAmount, collateralSymbol),
            interestRate: new InterestRate(parameters.interestRate.toNumber()),
            termLength: new TimeInterval(
                parameters.termLength.toNumber(),
                parameters.amortizationUnit,
            ),
            debtor: new EthereumAddress(debtor),
            creditor: new EthereumAddress(entry.beneficiary),
        };

        return new this(dharma, params) as T;
    }

    constructor(protected readonly dharma: Dharma, protected readonly params: LoanParams) {}

    /**
     *  Returns the loan's data as vanilla JS types.
     *
     * @example
     * const data = loan.getData();
     *
     * @returns {LoanData}
     */
    public getData(): LoanData {
        const {
            id,
            principal,
            collateral,
            interestRate,
            termLength,
            debtor,
            creditor,
        } = this.params;

        return {
            id,
            principalAmount: principal.decimalAmount,
            principalTokenSymbol: principal.tokenSymbol,
            collateralAmount: collateral.decimalAmount,
            collateralTokenSymbol: collateral.tokenSymbol,
            interestRate: interestRate.percent,
            termDuration: termLength.amount,
            termUnit: termLength.getAmortizationUnit(),
            debtorAddress: debtor.toString(),
            creditorAddress: creditor.toString(),
        };
    }

    /**
     *  Returns loan data as well as repaid amount and the total expected repayment amount.
     *
     * @example
     * const expandedData = await loan.getExpandedData();
     * => {
     *      repaidAmount: 100,
     *      totalExpectedRepaymentAmount: 250,
     *      ...
     *    }
     *
     * @returns {Promise<ExpandedLoanData>}
     */
    public async getExpandedData(): Promise<ExpandedLoanData> {
        const data = this.getData();

        const repaidAmount = await this.getRepaidAmount();
        const totalExpectedRepaymentAmount = await this.getTotalExpectedRepaymentAmount();

        return {
            ...data,
            repaidAmount,
            totalExpectedRepaymentAmount,
        };
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
            this.params.id,
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
            this.params.id,
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
            this.params.id,
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
        const totalExpectedRepaymentAmount = await this.dharma.servicing.getTotalExpectedRepayment(
            this.params.id,
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
        const repaidAmount = await this.dharma.servicing.getValueRepaid(this.params.id);

        const tokenSymbol = this.params.principal.tokenSymbol;

        return TokenAmount.fromRaw(repaidAmount, tokenSymbol).decimalAmount;
    }
}
