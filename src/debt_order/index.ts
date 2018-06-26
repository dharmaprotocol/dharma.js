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

import { DebtOrderDataWrapper } from "../wrappers";

const SALT_DECIMALS = 20;

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

interface DebtOrderConstructorParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    debtorAddress: EthereumAddress;
    expiresAt: number;
}

export class DebtOrder {
    /**
     * Eventually returns an instance of an open DebtOrder signed by the debtor.
     *
     * @example
     * const debtOrder = await Types.DebtOrder.create(dharma, {
     *      principalAmount: 5,
     *      principalToken: "REP",
     *      collateralAmount: 10,
     *      collateralToken: "MKR",
     *      interestRate: 12.3,
     *      termDuration: 6,
     *      termUnit: "months",
     *      debtorAddress: debtor.address,
     *      expiresInDuration: 5,
     *      expiresInUnit: "days",
     *  });
     *
     * @returns {Promise<DebtOrder>}
     */
    public static async create(dharma: Dharma, params: DebtOrderParams): Promise<DebtOrder> {
        const {
            principalAmount,
            principalToken,
            collateralAmount,
            collateralToken,
            interestRate,
            termDuration,
            termUnit,
            debtorAddress,
            expiresInDuration,
            expiresInUnit,
        } = params;

        const principal = new TokenAmount(principalAmount, principalToken);
        const collateral = new TokenAmount(collateralAmount, collateralToken);
        const interestRateTyped = new InterestRate(interestRate);
        const termLength = new TimeInterval(termDuration, termUnit);
        const debtorAddressTyped = new EthereumAddress(debtorAddress);
        const expiresIn = new TimeInterval(expiresInDuration, expiresInUnit);

        const currentBlocktime = new BigNumber(await dharma.blockchain.getCurrentBlockTime());

        const expirationTimestampInSec = expiresIn.fromTimestamp(currentBlocktime);

        const debtOrderConstructorParams: DebtOrderConstructorParams = {
            principal,
            collateral,
            interestRate: interestRateTyped,
            termLength,
            debtorAddress: debtorAddressTyped,
            expiresAt: expirationTimestampInSec.toNumber(),
        };

        const loanOrder: CollateralizedSimpleInterestLoanOrder = {
            principalAmount: principal.rawAmount,
            principalTokenSymbol: principal.tokenSymbol,
            interestRate: interestRateTyped.raw,
            amortizationUnit: termLength.getAmortizationUnit(),
            termLength: new BigNumber(termLength.amount),
            collateralTokenSymbol: collateral.tokenSymbol,
            collateralAmount: collateral.rawAmount,
            gracePeriodInDays: new BigNumber(0),
            expirationTimestampInSec,
        };

        const data = await dharma.adapters.collateralizedSimpleInterestLoan.toDebtOrder(loanOrder);
        const debtKernel = await dharma.contracts.loadDebtKernelAsync();
        const repaymentRouter = await dharma.contracts.loadRepaymentRouterAsync();
        const salt = this.generateSalt();

        data.debtor = debtorAddressTyped.toString();
        data.kernelVersion = debtKernel.address;
        data.issuanceVersion = repaymentRouter.address;
        data.salt = salt;

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

        const debtorAddress = new EthereumAddress(loanOrder.debtor!); // TODO(kayvon): this could throw.

        const debtOrderParams = {
            principal,
            collateral,
            termLength,
            interestRate,
            expiresAt: loanOrder.expirationTimestampInSec.toNumber(),
            debtorAddress,
        };

        return new DebtOrder(dharma, debtOrderParams, data);
    }

    private static generateSalt(): BigNumber {
        return BigNumber.random(SALT_DECIMALS).times(new BigNumber(10).pow(SALT_DECIMALS));
    }

    private constructor(
        private dharma: Dharma,
        private params: DebtOrderConstructorParams,
        private data: DebtOrderData,
    ) {}

    /**
     * Eventually enables the account at the given address to transfer the collateral token
     * on Dharma Protocol.
     *
     * We default the address to the default address given by web3.
     *
     * @example
     * await debtOrder.allowCollateralTransfer();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    public async allowCollateralTransfer(address?: string): Promise<string> {
        if (!address) {
            const accounts = await this.dharma.blockchain.getAccounts();

            address = accounts[0];
        }

        const ethereumAddress = new EthereumAddress(address);

        const tokenSymbol = this.params.collateral.tokenSymbol;

        return this.enableTokenTransfers(ethereumAddress, tokenSymbol);
    }

    /**
     * Eventually enables the account at the given address to transfer the principal token
     * on Dharma Protocol.
     *
     * We default the address to the default address given by web3.
     *
     * @example
     * await debtOrder.allowPrincipalTransfer();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    public async allowPrincipalTransfer(address?: string): Promise<string> {
        if (!address) {
            const accounts = await this.dharma.blockchain.getAccounts();

            address = accounts[0];
        }

        const ethereumAddress = new EthereumAddress(address);

        const tokenSymbol = this.params.principal.tokenSymbol;

        return this.enableTokenTransfers(ethereumAddress, tokenSymbol);
    }

    /**
     * Eventually enables the account at the given address to make repayments
     * on Dharma Protocol.
     *
     * We default the address to the default address given by web3.
     *
     * @example
     * await debtOrder.allowRepayments();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to enable the token transfers
     */
    public async allowRepayments(address?: string): Promise<string> {
        return this.allowPrincipalTransfer(address);
    }

    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @example
     * await debtOrder.isExpired();
     * => true
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

    public isSignedByDebtor(): boolean {
        return this.data.debtorSignature !== NULL_ECDSA_SIGNATURE;
    }

    public async signAsDebtor() {
        if (this.isSignedByDebtor()) {
            return;
        }

        this.data.debtorSignature = await this.dharma.sign.asDebtor(this.data, false);
    }

    /**
     * Eventually returns true if the current debt order has been cancelled.
     *
     * @example
     * await debtOrder.isCancelled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isCancelled(): Promise<boolean> {
        return this.dharma.order.isCancelled(this.data);
    }

    /**
     * Eventually attempts to cancel the current debt order. A debt order can be cancelled by the debtor
     * if it is open and unfilled.
     *
     * @example
     * await debtOrder.cancelAsDebtor();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to cancel the debt order
     */
    public async cancelAsDebtor(): Promise<string> {
        return this.dharma.order.cancelOrderAsync(this.data, {
            from: this.data.debtor,
        });
    }

    /**
     * Eventually returns true if the current debt order has been filled by a creditor.
     *
     * @example
     * await debtOrder.isFilled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isFilled(): Promise<boolean> {
        return this.dharma.order.checkOrderFilledAsync(this.data);
    }

    /**
     * Eventually fills the debt order as the creditor, transferring the principal to the debtor.
     *
     * @example
     * const creditorAddress = "0x000...";
     * order.fillAsCreditor(creditorAddress);
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to fill the debt order
     */
    public async fillAsCreditor(creditorAddress: string): Promise<string> {
        const creditorAddressTyped = new EthereumAddress(creditorAddress);

        this.data.creditor = creditorAddressTyped.toString();

        await this.signAsCreditor();

        return this.dharma.order.fillAsync(this.data, { from: this.data.creditor });
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

        const repaymentAmountType = new TokenAmount(repaymentAmount, tokenSymbol);

        const principalTokenAddressString = await this.dharma.contracts.getTokenAddressBySymbolAsync(
            tokenSymbol,
        );

        // If repaymentAmount is not specified, we default to the expected amount per installment.
        const rawRepaymentAmount =
            repaymentAmountType.rawAmount ||
            (await this.dharma.servicing.getExpectedAmountPerRepayment(agreementId));

        return this.dharma.servicing.makeRepayment(
            agreementId,
            new BigNumber(rawRepaymentAmount),
            principalTokenAddressString,
        );
    }

    /**
     * Eventually returns true if the debt order's collateral has been either seized
     * by the creditor or returned to the debtor.
     *
     * @example
     * await debtOrder.isCollateralWithdrawn();
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
     * await debtOrder.isCollateralSeizable();
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
     * Eventually returns true if the debt order's collateral is returnable
     * to the debtor.
     *
     * @example
     * await debtOrder.isCollateralReturnable();
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

    private async enableTokenTransfers(
        address: EthereumAddress,
        tokenSymbol: string,
    ): Promise<string> {
        const tokenAddress = await this.dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol);

        return this.dharma.token.setUnlimitedProxyAllowanceAsync(tokenAddress, {
            from: address.toString(),
        });
    }

    private isSignedByCreditor(): boolean {
        return this.data.creditorSignature !== NULL_ECDSA_SIGNATURE;
    }

    private async signAsCreditor(): Promise<void> {
        if (this.isSignedByCreditor()) {
            return;
        }

        this.data.creditorSignature = await this.dharma.sign.asCreditor(this.data, false);
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
