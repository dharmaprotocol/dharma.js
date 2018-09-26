import * as singleLineString from "single-line-string";
import { BigNumber } from "../../utils/bignumber";

import {
    BLOCK_TIME_ESTIMATE_SECONDS,
    NULL_ADDRESS,
    NULL_ECDSA_SIGNATURE,
    SALT_DECIMALS,
} from "../../utils/constants";

import { CollateralizedSimpleInterestLoanOrder } from "../adapters/collateralized_simple_interest_loan_adapter";

import { Dharma } from "../types/dharma";

import { DebtOrderDataWrapper } from "../wrappers";

import { SignatureUtils } from "../../utils/signature_utils";

import {
    DebtOrderData,
    DurationUnit,
    ECDSASignature,
    EthereumAddress,
    InterestRate,
    TimeInterval,
    TokenAmount,
} from "../types";

export const DEBT_ORDER_ERRORS = {
    ALREADY_SIGNED_BY_DEBTOR: `The debtor has already signed this debt order.`,
    ALREADY_SIGNED_BY_CREDITOR: `The creditor has already signed this debt order.`,
    INVALID_DEBTOR_SIGNATURE: singleLineString`The debtor signature is invalid.
        Please ensure the debtor signs the correct and most recent terms.`,
    PROXY_FILL_DISALLOWED: (className: string) =>
        singleLineString`A ${className} must be signed by both the creditor and
                         debtor before it can be filled by proxy.`,
};

export interface DebtOrderConstructorParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    expiresAt: number;
    relayer?: EthereumAddress;
    relayerFee?: TokenAmount;
    creditorFee?: TokenAmount;
    debtorFee?: TokenAmount;
}

export interface OrderData {
    kernelVersion: string;
    issuanceVersion: string;
    principalAmount: string;
    principalToken: string;
    debtor: string;
    debtorFee: string;
    creditor: string;
    creditorFee: string;
    relayer: string;
    relayerFee: string;
    underwriter: string;
    underwriterFee: string;
    underwriterRiskRating: string;
    termsContract: string;
    termsContractParameters: string;
    expirationTimestampInSec: string;
    salt: string;
    debtorSignature: ECDSASignature;
    creditorSignature: ECDSASignature;
    underwriterSignature: ECDSASignature;
}

export interface DebtOrderParams {
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

export interface DebtOrderTerms {
    principalAmount: number;
    principalTokenSymbol: string;
    collateralAmount: number;
    collateralTokenSymbol: string;
    interestRate: number;
    termDuration: number;
    termUnit: string;
    expiresAt: number;
}

export class DebtOrder {
    public static generateSalt(): BigNumber {
        return BigNumber.random(SALT_DECIMALS).times(new BigNumber(10).pow(SALT_DECIMALS));
    }

    public static async create<T extends DebtOrder>(
        dharma: Dharma,
        params: DebtOrderParams,
    ): Promise<T> {
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

        const loanRequestConstructorParams: DebtOrderConstructorParams = {
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

        return new this(dharma, loanRequestConstructorParams, data) as T;
    }

    public static async load<T extends DebtOrder>(dharma: Dharma, data: OrderData): Promise<T> {
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

        const loanRequestParams: DebtOrderConstructorParams = {
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

        return new this(dharma, loanRequestParams, debtOrderData) as T;
    }

    protected constructor(
        protected readonly dharma: Dharma,
        protected readonly params: DebtOrderConstructorParams,
        protected data: DebtOrderData,
    ) {}

    /**
     * Returns the terms of the loan request.
     *
     * @example
     * const terms = loanRequest.getTerms();
     *
     * @returns {DebtOrderTerms}
     */
    public getTerms(): DebtOrderTerms {
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
        if (this.data.debtorSignature === NULL_ECDSA_SIGNATURE) {
            return false;
        }

        const debtOrderDataWrapper = new DebtOrderDataWrapper(this.data);

        if (
            !SignatureUtils.isValidSignature(
                debtOrderDataWrapper.getDebtorCommitmentHash(),
                this.data.debtorSignature,
                this.data.debtor,
            )
        ) {
            throw Error(DEBT_ORDER_ERRORS.INVALID_DEBTOR_SIGNATURE);
        }

        return true;
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
            throw Error(DEBT_ORDER_ERRORS.ALREADY_SIGNED_BY_DEBTOR);
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
     * Returns whether the loan request has been signed by a creditor.
     *
     * @example
     * loanRequest.isSignedByCreditor();
     * => true
     *
     * @return {boolean}
     */
    public isSignedByCreditor(): boolean {
        // TODO: check validity of signature
        return this.data.creditorSignature !== NULL_ECDSA_SIGNATURE;
    }

    /**
     * Returns the loan request's unique identifier.
     *
     * @example
     * const id = loanRequest.getAgreementId();
     *
     * @return {string}
     */
    public getAgreementId(): string {
        return new DebtOrderDataWrapper(this.data).getIssuanceCommitmentHash();
    }

    /**
     * Returns the loan request's underlying data as JSON.
     *
     * Converting the loan request to JSON allows the resulting data to be written to disk,
     * or transmitted over the wire.
     *
     * @example
     * const data = loanRequest.toJSON();
     *
     * @return {OrderData}
     */
    public toJSON(): OrderData {
        return {
            kernelVersion: this.data.kernelVersion!,
            issuanceVersion: this.data.issuanceVersion!,
            principalAmount: this.data.principalAmount.toString(),
            principalToken: this.data.principalToken!,
            debtor: this.data.debtor!,
            debtorFee: this.data.debtorFee.toString(),
            creditor: this.data.creditor!,
            creditorFee: this.data.creditorFee.toString(),
            relayer: this.data.relayer!,
            relayerFee: this.data.relayerFee.toString(),
            underwriter: this.data.underwriter!,
            underwriterFee: this.data.underwriterFee.toString(),
            underwriterRiskRating: this.data.underwriterRiskRating.toString(),
            termsContract: this.data.termsContract!,
            termsContractParameters: this.data.termsContractParameters!,
            expirationTimestampInSec: this.data.expirationTimestampInSec.toString(),
            salt: this.data.salt.toString(),
            debtorSignature: this.data.debtorSignature!,
            creditorSignature: this.data.creditorSignature!,
            underwriterSignature: this.data.underwriterSignature!,
        };
    }

    protected async isWrittenToBlockchain(): Promise<boolean> {
        return this.dharma.order.checkOrderFilledAsync(this.data);
    }
}
