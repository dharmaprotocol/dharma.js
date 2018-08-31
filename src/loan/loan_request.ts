import * as singleLineString from "single-line-string";
import { BigNumber } from "../../utils/bignumber";

import { Agreement, BaseLoanConstructorParams, LoanData } from "./agreement";

import {
    BLOCK_TIME_ESTIMATE_SECONDS,
    NULL_ADDRESS,
    NULL_ECDSA_SIGNATURE,
    SALT_DECIMALS,
} from "../../utils/constants";

import { CollateralizedSimpleInterestLoanOrder } from "../adapters/collateralized_simple_interest_loan_adapter";

import { Dharma } from "../dharma";

import {
    DebtOrderData,
    DurationUnit,
    EthereumAddress,
    InterestRate,
    Loan,
    TimeInterval,
    TokenAmount,
} from "../types";

export const LOAN_REQUEST_ERRORS = {
    ALREADY_SIGNED_BY_DEBTOR: `The loan request has already been signed by the debtor.`,
    ALREADY_SIGNED_BY_CREDITOR: `The loan request has already been signed by the creditor.`,
    NOT_YET_FILLED: `The loan request has yet to be filled.`,
    PROXY_FILL_DISALLOWED: singleLineString`A loan request must be signed by both the creditor and
    debtor before it can be filled by proxy.`,
};

export interface LoanRequestParams {
    principalAmount: number;
    principalToken: string;
    collateralAmount: number;
    collateralToken: string;
    interestRate: number;
    termDuration: number;
    termUnit: DurationUnit;
    expiresInDuration: number;
    expiresInUnit: DurationUnit;
    relayerAddress?: string;
    relayerFeeAmount?: number;
    creditorFeeAmount?: number;
}

export interface LoanRequestTerms {
    principalAmount: number;
    principalTokenSymbol: string;
    collateralAmount: number;
    collateralTokenSymbol: string;
    interestRate: number;
    termDuration: number;
    termUnit: string;
    expiresAt: number;
}

export class LoanRequest extends Agreement {
    public static generateSalt(): BigNumber {
        return BigNumber.random(SALT_DECIMALS).times(new BigNumber(10).pow(SALT_DECIMALS));
    }

    /**
     * Eventually returns an instance of a loan request object with the terms specified.
     *
     * @example
     * const loanRequest = await LoanRequest.create(dharma, {
     *      principalAmount: 5,
     *      principalToken: "REP",
     *      collateralAmount: 10,
     *      collateralToken: "MKR",
     *      relayerAddress: "0x000000000000000000000000000000",
     *      relayerFeeAmount: 23.1,
     *      interestRate: 12.3,
     *      termDuration: 6,
     *      termUnit: "months",
     *      expiresInDuration: 5,
     *      expiresInUnit: "days",
     *  });
     *
     * @returns {Promise<LoanRequest>}
     */
    public static async create(dharma: Dharma, params: LoanRequestParams): Promise<LoanRequest> {
        const {
            principalAmount,
            principalToken,
            collateralAmount,
            collateralToken,
            relayerAddress,
            relayerFeeAmount,
            interestRate,
            termDuration,
            termUnit,
            expiresInDuration,
            expiresInUnit,
            creditorFeeAmount,
        } = params;

        const principal = new TokenAmount(principalAmount, principalToken);
        const collateral = new TokenAmount(collateralAmount, collateralToken);
        const interestRateTyped = new InterestRate(interestRate);
        const termLength = new TimeInterval(termDuration, termUnit);
        const expiresIn = new TimeInterval(expiresInDuration, expiresInUnit);

        const currentBlocktime = new BigNumber(await dharma.blockchain.getCurrentBlockTime());

        const expirationTimestampInSec = expiresIn.fromTimestamp(currentBlocktime);

        const loanRequestConstructorParams: BaseLoanConstructorParams = {
            principal,
            collateral,
            interestRate: interestRateTyped,
            termLength,
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

        if (relayerAddress && relayerAddress !== NULL_ADDRESS) {
            loanRequestConstructorParams.relayer = new EthereumAddress(relayerAddress);

            const relayerFee = new TokenAmount(relayerFeeAmount, principalToken);

            loanRequestConstructorParams.relayerFee = relayerFee;

            data.relayer = relayerAddress;
            data.relayerFee = new BigNumber(relayerFee.rawAmount);
        }

        if (creditorFeeAmount && creditorFeeAmount > 0) {
            const creditorFee = new TokenAmount(creditorFeeAmount, principalToken);

            loanRequestConstructorParams.creditorFee = creditorFee;
            data.creditorFee = creditorFee.rawAmount;
        }

        data.kernelVersion = debtKernel.address;
        data.issuanceVersion = repaymentRouter.address;
        data.salt = salt;

        return new LoanRequest(dharma, loanRequestConstructorParams, data);
    }

    public static async load(dharma: Dharma, data: LoanData): Promise<LoanRequest> {
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

        const loanRequestParams: BaseLoanConstructorParams = {
            principal,
            collateral,
            termLength,
            interestRate,
            expiresAt: loanOrder.expirationTimestampInSec.toNumber(),
        };

        if (debtOrderData.relayer && debtOrderData.relayer !== NULL_ADDRESS) {
            const relayer = new EthereumAddress(debtOrderData.relayer);
            const relayerFee = TokenAmount.fromRaw(debtOrderData.relayerFee, principal.tokenSymbol);

            loanRequestParams.relayer = relayer;
            loanRequestParams.relayerFee = relayerFee;
        }

        if (debtOrderData.creditorFee && debtOrderData.creditorFee.greaterThan(0)) {
            loanRequestParams.creditorFee = TokenAmount.fromRaw(
                debtOrderData.creditorFee,
                principal.tokenSymbol,
            );
        }

        return new LoanRequest(dharma, loanRequestParams, debtOrderData);
    }

    /**
     * Eventually creates and signs a loan request with the specified params.
     *
     * @example
     * const loanRequest = await LoanRequest.createAndSignAsDebtor(dharma, {...});
     *
     * @returns {Promise<LoanRequest>}
     */
    public static async createAndSignAsDebtor(
        dharma: Dharma,
        params: LoanRequestParams,
        debtor?: string,
    ): Promise<LoanRequest> {
        const request = await LoanRequest.create(dharma, params);

        await request.signAsDebtor(debtor);

        return request;
    }

    /**
     *  Returns the terms of the loan request.
     *
     * @example
     * const terms = loanRequest.getTerms();
     *
     * @returns {LoanRequestTerms}
     */
    public getTerms(): LoanRequestTerms {
        const { principal, collateral, interestRate, termLength, expiresAt } = this.params;

        return {
            principalAmount: principal.decimalAmount,
            principalTokenSymbol: principal.tokenSymbol,
            collateralAmount: collateral.decimalAmount,
            collateralTokenSymbol: collateral.tokenSymbol,
            interestRate: interestRate.percent,
            termDuration: termLength.amount,
            termUnit: termLength.getAmortizationUnit(),
            expiresAt,
        };
    }

    /**
     * Eventually returns an instance of the associated loan.
     *
     * @throws Throws if the loan request has yet to be filled.
     *
     * @example
     * const loan = await loanRequest.generateLoan();
     *
     * @returns {Promise<Loan>}
     */
    public async generateLoan(): Promise<Loan> {
        const isFilled = await this.isFilled();

        if (!isFilled) {
            throw new Error(LOAN_REQUEST_ERRORS.NOT_YET_FILLED);
        }

        return new Loan(this.dharma, this.params, this.data);
    }

    /**
     * Eventually returns true if the current loan request will be expired for the next block.
     *
     * @example
     * await loanRequest.isExpired();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isExpired(): Promise<boolean> {
        // This timestamp comes from the blockchain.
        const expirationTimestamp: BigNumber = this.data.expirationTimestampInSec;
        // We compare this timestamp to the expected timestamp of the next block.
        const latestBlockTime = await this.dharma.blockchain.getCurrentBlockTime();
        const approximateNextBlockTime = latestBlockTime + BLOCK_TIME_ESTIMATE_SECONDS;

        return expirationTimestamp.lt(approximateNextBlockTime);
    }

    /**
     * Returns whether the loan request has been signed by a debtor.
     *
     * @example
     * loanRequest.isSignedByDebtor();
     * => true
     *
     * @return {boolean}
     */
    public isSignedByDebtor(): boolean {
        return this.data.debtorSignature !== NULL_ECDSA_SIGNATURE;
    }

    /**
     * Eventually signs the loan request as the debtor.
     *
     * @throws Throws if the loan request is already signed by a debtor.
     *
     * @example
     * loanRequest.signAsDebtor();
     * => Promise<void>
     *
     * @return {void}
     */
    public async signAsDebtor(debtorAddress?: string): Promise<void> {
        if (this.isSignedByDebtor()) {
            throw Error(LOAN_REQUEST_ERRORS.ALREADY_SIGNED_BY_DEBTOR);
        }

        this.data.debtor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            debtorAddress,
        );

        const isMetaMask = !!this.dharma.web3.currentProvider.isMetaMask;

        this.data.debtorSignature = await this.dharma.sign.asDebtor(this.data, isMetaMask);
    }

    /**
     * Eventually returns true if the loan request has been cancelled.
     *
     * @example
     * await loanRequest.isCancelled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isCancelled(): Promise<boolean> {
        return this.dharma.order.isCancelled(this.data);
    }

    /**
     * Eventually attempts to cancel the loan request.
     *
     * Note that a loan request can only be canceled by the debtor, and transaction will only
     * succeed if the request has yet to be filled and has yet to expire.
     *
     * @example
     * await loanRequest.cancel();
     * => "0x000..."
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to cancel the loan request
     */
    public async cancel(): Promise<string> {
        return this.dharma.order.cancelOrderAsync(this.data, {
            from: this.data.debtor,
        });
    }

    /**
     * Eventually returns true if the current loan request has been filled by a creditor.
     *
     * @example
     * await loanRequest.isFilled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isFilled(): Promise<boolean> {
        return this.dharma.order.checkOrderFilledAsync(this.data);
    }

    /**
     * Eventually determines if the prospective creditor is able to fill the loan request.
     *
     * @returns {Promise<boolean>}
     */
    public async isFillable(prospectiveCreditorAddress?: string): Promise<boolean> {
        const creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            prospectiveCreditorAddress,
        );

        return this.dharma.order.isFillableBy(this.data, creditor, {
            from: creditor,
        });
    }

    /**
     * Eventually throws if the prospective creditor is unable to fill the loan request.
     *
     * @returns {Promise<void>}
     */
    public async assertFillable(prospectiveCreditorAddress?: string): Promise<void> {
        const creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            prospectiveCreditorAddress,
        );

        return this.dharma.order.assertFillableBy(this.data, creditor, {
            from: creditor,
        });
    }

    /**
     * Eventually fills the loan request as creditor, transferring the principal to the debtor.
     *
     * @example
     * loanRequest.fill();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to fill the loan request
     */
    public async fillAsCreditor(creditorAddress?: string): Promise<string> {
        this.data.creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            creditorAddress,
        );

        return this.dharma.order.fillAsync(this.data, {
            from: this.data.creditor,
        });
    }

    /**
     * Eventually fills the loan as proxy. Requires that the loan request be signed by both the
     * creditor and debtor.
     *
     * @throws Throws if the loan request is not signed by both the creditor and debtor.
     *
     * @example
     * loanRequest.fillAsProxy();
     * => Promise<string>
     *
     * @return {Promise<string>}
     */
    public async fillAsProxy(proxyAddress?: string): Promise<string> {
        if (this.isSignedByCreditor() && this.isSignedByDebtor()) {
            const sender = await EthereumAddress.validAddressOrCurrentUser(
                this.dharma,
                proxyAddress,
            );

            return this.dharma.order.fillAsync(this.data, {
                from: sender,
            });
        } else {
            throw new Error(LOAN_REQUEST_ERRORS.PROXY_FILL_DISALLOWED);
        }
    }

    /**
     * Returns whether the loan request has been signed by a creditor.
     *
     * @example
     * loanRequest.isSignedByCreditor();
     * => true
     *
     * @return {boolean}
     */
    public isSignedByCreditor(): boolean {
        return this.data.creditorSignature !== NULL_ECDSA_SIGNATURE;
    }

    /**
     * Eventually signs the loan request as the creditor.
     *
     * @throws Throws if the loan request is already signed by a creditor.
     *
     * @example
     * loanRequest.signAsCreditor();
     * => Promise<void>
     *
     * @return {Promise<void>}
     */
    public async signAsCreditor(creditorAddress?: string): Promise<void> {
        if (this.isSignedByCreditor()) {
            throw new Error(LOAN_REQUEST_ERRORS.ALREADY_SIGNED_BY_CREDITOR);
        }

        this.data.creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            creditorAddress,
        );

        const isMetaMask = !!this.dharma.web3.currentProvider.isMetaMask;

        this.data.creditorSignature = await this.dharma.sign.asCreditor(this.data, isMetaMask);
    }
}
