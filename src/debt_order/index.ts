import * as _ from "lodash";
import { BigNumber } from "../../utils/bignumber";

import { Dharma } from "../";
import { CollateralizedSimpleInterestLoanOrder } from "../adapters/collateralized_simple_interest_loan_adapter";

import { Address, DebtOrderData, InterestRate, TimeInterval, TokenAmount } from "../types";

import { DebtOrderDataWrapper } from "../wrappers";

export interface BaseDebtOrderParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    debtorAddress: Address;
}

export interface DebtOrderParams extends BaseDebtOrderParams {
    expiresIn: TimeInterval;
}

interface DebtOrderConstructorParams extends BaseDebtOrderParams {
    expiresAt: number;
}

import { BLOCK_TIME_ESTIMATE_SECONDS } from "../../utils/constants";

export interface FillParameters {
    creditorAddress: string;
}

export class DebtOrder {
    public static async create(dharma: Dharma, params: DebtOrderParams): Promise<DebtOrder> {
        const {
            principal,
            collateral,
            interestRate,
            termLength,
            debtorAddress,
            expiresIn,
        } = params;

        const currentBlocktime = new BigNumber(await dharma.blockchain.getCurrentBlockTime());

        const expirationTimestampInSec = expiresIn.fromTimestamp(currentBlocktime);

        const loanOrder: CollateralizedSimpleInterestLoanOrder = {
            principalAmount: principal.rawAmount,
            principalTokenSymbol: principal.tokenSymbol,
            interestRate: interestRate.raw,
            amortizationUnit: termLength.getAmortizationUnit(),
            termLength: new BigNumber(termLength.amount),
            collateralTokenSymbol: principal.tokenSymbol,
            collateralAmount: collateral.rawAmount,
            gracePeriodInDays: new BigNumber(0),
            expirationTimestampInSec,
        };

        const data = await dharma.adapters.collateralizedSimpleInterestLoan.toDebtOrder(loanOrder);
        const debtKernel = await dharma.contracts.loadDebtKernelAsync();
        const repaymentRouter = await dharma.contracts.loadRepaymentRouterAsync();
        const salt = this.generateSalt();

        data.debtor = debtorAddress.toString();
        data.kernelVersion = debtKernel.address;
        data.issuanceVersion = repaymentRouter.address;
        data.salt = salt;

        const debtOrderConstructorParams = {
            ...params,
            expiresAt: expirationTimestampInSec.toNumber(),
        };
        delete debtOrderConstructorParams.expiresIn;

        const debtOrder = new DebtOrder(dharma, debtOrderConstructorParams, data);

        await debtOrder.signAsDebtor();

        return debtOrder;
    }

    public static async load(dharma: Dharma, data: DebtOrderData): Promise<DebtOrder> {
        const loanOrder = await dharma.adapters.collateralizedSimpleInterestLoan.fromDebtOrder(
            data,
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

        const debtorAddress = new Address(loanOrder.debtor!); // TODO(kayvon): this could throw.

        const debtOrderParams = {
            principal,
            collateral,
            interestRate,
            termLength,
            expiresAt: loanOrder.expirationTimestampInSec.toNumber(),
            debtorAddress,
        };

        return new DebtOrder(dharma, debtOrderParams, data);
    }

    private static generateSalt(): BigNumber {
        return BigNumber.random();
    }

    private constructor(
        private dharma: Dharma,
        private params: DebtOrderConstructorParams,
        private data: DebtOrderData,
    ) {}

    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @returns {Promise<boolean>}
     */
    public async isExpired(): Promise<boolean> {
        // This timestamp comes from the blockchain.
        const expirationTimestamp: BigNumber = this.data.expirationTimestampInSec;
        // We compare this timestamp to the expected timestamp of the next block.
        const latestBlockTime = await this.getCurrentBlocktime();
        const approximateNextBlockTime = latestBlockTime + BLOCK_TIME_ESTIMATE_SECONDS;

        return expirationTimestamp.lt(approximateNextBlockTime);
    }

    public isSignedByUnderwriter(): boolean {
        return !_.isEmpty(this.data.underwriterSignature);
    }

    public isSignedByDebtor(): boolean {
        return !_.isEmpty(this.data.debtorSignature);
    }

    public async signAsUnderwriter() {
        if (this.isSignedByUnderwriter()) {
            return;
        }

        this.data.underwriterSignature = await this.dharma.sign.asUnderwriter(this.data, true);
    }

    public async signAsDebtor() {
        if (this.isSignedByDebtor()) {
            return;
        }

        this.data.debtorSignature = await this.dharma.sign.asDebtor(this.data, true);
    }

    public async isCancelled(): Promise<boolean> {
        return this.dharma.order.isCancelled(this.data);
    }

    public async cancel(): Promise<string> {
        return this.dharma.order.cancelOrderAsync(this.data);
    }

    public async isFilled(): Promise<boolean> {
        return this.dharma.order.checkOrderFilledAsync(this.data);
    }

    public async fill(parameters: FillParameters): Promise<string> {
        this.data.creditor = parameters.creditorAddress;

        await this.signAsCreditor();

        return this.dharma.order.fillAsync(this.data);
    }

    /**
     * Makes a repayment on the loan, with the default payment amount being the
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
     * @returns {Promise<string>} the hash of the transaction to make the repayment
     */
    public async makeRepayment(repaymentAmount?: TokenAmount): Promise<string> {
        const agreementId = this.getAgreementId();
        const tokenSymbol = this.params.principal.tokenSymbol;
        const principalTokenAddress = await this.dharma.contracts.getTokenAddressBySymbolAsync(
            tokenSymbol,
        );

        // If repaymentAmount is not specified, we default to the expected amount per installment
        const rawRepaymentAmount = repaymentAmount
            ? repaymentAmount.rawAmount
            : await this.dharma.servicing.getExpectedAmountPerRepayment(agreementId);

        return this.dharma.servicing.makeRepayment(
            agreementId,
            rawRepaymentAmount,
            principalTokenAddress,
        );
    }

    public async isCollateralWithdrawn(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.isCollateralWithdrawn(
            this.getAgreementId(),
        );
    }

    public async isCollateralSeizable(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.canSeizeCollateral(
            this.getAgreementId(),
        );
    }

    public async isCollateralReturnable(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.canReturnCollateral(
            this.getAgreementId(),
        );
    }

    /**
     * Returns the total amount expected to be repaid.
     *
     * @example
     * order.getTotalExpectedRepaymentAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    public async getTotalExpectedRepaymentAmount(): Promise<TokenAmount> {
        const agreementId = this.getAgreementId();

        const totalExpectedRepaymentAmount = await this.dharma.servicing.getTotalExpectedRepayment(
            agreementId,
        );

        const tokenSymbol = this.params.principal.tokenSymbol;

        return TokenAmount.fromRaw(totalExpectedRepaymentAmount, tokenSymbol);
    }

    /**
     * Returns the outstanding balance of the loan.
     *
     * @example
     * order.getOutstandingAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    public async getOutstandingAmount(): Promise<TokenAmount> {
        const totalExpectedRepaymentAmount = await this.getTotalExpectedRepaymentAmount();

        const repaidAmount = await this.getRepaidAmount();

        const outstandingAmount = totalExpectedRepaymentAmount.rawAmount.minus(
            repaidAmount.rawAmount,
        );

        const tokenSymbol = this.params.principal.tokenSymbol;

        return TokenAmount.fromRaw(outstandingAmount, tokenSymbol);
    }

    /**
     * Returns the total amount repaid so far.
     *
     * @example
     * order.getRepaidAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    public async getRepaidAmount(): Promise<TokenAmount> {
        const agreementId = this.getAgreementId();

        const repaidAmount = await this.dharma.servicing.getValueRepaid(agreementId);

        const tokenSymbol = this.params.principal.tokenSymbol;

        return TokenAmount.fromRaw(repaidAmount, tokenSymbol);
    }

    private isSignedByCreditor(): boolean {
        return !_.isEmpty(this.data.creditorSignature);
    }

    private async signAsCreditor(): Promise<void> {
        if (this.isSignedByCreditor()) {
            return;
        }

        this.data.creditorSignature = await this.dharma.sign.asCreditor(this.data, true);
    }

    private getAgreementId(): string {
        return new DebtOrderDataWrapper(this.data).getIssuanceCommitmentHash();
    }

    private serialize(): DebtOrderData {
        return this.data;
    }

    private async getCurrentBlocktime(): Promise<number> {
        return this.dharma.blockchain.getCurrentBlockTime();
    }
}
