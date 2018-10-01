import * as singleLineString from "single-line-string";

import { Web3Utils } from "../../../utils/web3_utils";

import { DebtOrderParams } from "../../loan/debt_order";

import { SignatureUtils } from "../../../utils/signature_utils";

import { Dharma } from "../dharma";

import {
    DebtOrderData,
    ECDSASignature,
    EthereumAddress,
    InterestRate,
    TimeInterval,
    TokenAmount,
} from "../";

import { SignedPrice } from "./signed_price";

import { BigNumber } from "../../../utils/bignumber";

export const MAX_LTV_LOAN_OFFER_ERRORS = {
    INSUFFICIENT_COLLATERAL_AMOUNT: (collateralAmount: number, collateralTokenSymbol: string) =>
        singleLineString`Collateral of ${collateralAmount} ${collateralTokenSymbol} is too insufficient
            for the maximum loan-to-value.`,
    PRICES_NOT_SET: () => `The prices of the principal and collateral must be set first.`,
};

export interface MaxLTVData {
    principal: TokenAmount;
    interestRate: InterestRate;
    termLength: TimeInterval;
    expiresIn: TimeInterval;
    maxLTV: BigNumber;
    collateralTokenSymbol: string;
    priceProvider: string;
    relayer?: EthereumAddress;
    relayerFee?: TokenAmount;
}

export interface MaxLTVParams extends DebtOrderParams {
    maxLTV: number;
    collateralToken: string;
    priceProvider: string;
}

export class MaxLTVLoanOffer {
    // TODO: replace with decision engine address (async function?)
    public static decisionEngineAddress = "test";

    public static async createAndSignAsCreditor(
        dharma: Dharma,
        params: MaxLTVParams,
        creditor?: string,
    ): Promise<MaxLTVLoanOffer> {
        const offer = new MaxLTVLoanOffer(dharma, params);

        await offer.signAsCreditor(creditor);

        return offer;
    }

    private readonly data: MaxLTVData;

    private creditor?: string;
    private creditorSignature?: ECDSASignature;
    private debtorSignature?: ECDSASignature;
    private collateralAmount?: number;
    private principalPrice?: SignedPrice;
    private collateralPrice?: SignedPrice;
    private debtor?: string;

    constructor(private readonly dharma: Dharma, params: MaxLTVParams) {
        const {
            maxLTV,
            priceProvider,
            collateralToken,
            principalAmount,
            principalToken,
            relayerAddress,
            relayerFeeAmount,
            interestRate,
            termDuration,
            termUnit,
            expiresInDuration,
            expiresInUnit,
        } = params;

        const data = {
            principal: new TokenAmount(principalAmount, principalToken),
            interestRate: new InterestRate(interestRate),
            termLength: new TimeInterval(termDuration, termUnit),
            expiresIn: new TimeInterval(expiresInDuration, expiresInUnit),
            maxLTV: new BigNumber(maxLTV),
            collateralTokenSymbol: collateralToken,
            priceProvider,
        };

        if (relayerAddress && relayerFeeAmount) {
            data.relayer = new EthereumAddress(relayerAddress);
            data.relayerFee = new TokenAmount(relayerFeeAmount, principalToken);
        }

        this.data = data;
    }

    /**
     * Eventually signs the loan offer as the creditor.
     *
     * @throws Throws if the loan offer is already signed by a creditor.
     *
     * @example
     * loanOffer.signAsCreditor();
     * => Promise<void>
     *
     * @return {Promise<void>}
     */
    public async signAsCreditor(creditorAddress?: string): Promise<void> {
        // TODO: check if already signed by creditor

        this.creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            creditorAddress,
        );

        const loanOfferHash = this.getCreditorCommitmentHash();

        const isMetaMask = !!this.dharma.web3.currentProvider.isMetaMask;

        this.creditorSignature = await this.dharma.sign.signPayloadWithAddress(
            loanOfferHash,
            this.creditor,
            isMetaMask,
        );
    }

    /**
     * Returns whether the loan offer has been signed by a creditor.
     *
     * @example
     * loanOffer.isSignedByCreditor();
     * => true
     *
     * @return {boolean}
     */
    public isSignedByCreditor(): boolean {
        if (
            this.creditorSignature &&
            SignatureUtils.isValidSignature(
                this.getCreditorCommitmentHash(),
                this.creditorSignature,
                this.creditor,
            )
        ) {
            return true;
        }

        return false;
    }

    public setPrincipalPrice(principalPrice: SignedPrice) {
        // TODO: assert signed price feed provider address is the address we expect
        // TODO: assert signed time is within some delta of current time (?)
        this.principalPrice = principalPrice;
    }

    public getPrincipalPrice(): SignedPrice {
        return this.principalPrice;
    }

    public setCollateralPrice(collateralPrice: SignedPrice) {
        // TODO: assert signed price feed provider address is the address we expect
        // TODO: assert signed time is within some delta of current time (?)
        this.collateralPrice = collateralPrice;
    }

    public getCollateralPrice(): SignedPrice {
        return this.principalPrice;
    }

    public setCollateralAmount(collateralAmount: number) {
        // TODO: assert prices are set
        // TODO: assert collateralAmount sufficient
        this.collateralAmount = collateralAmount;
    }

    public getCollateralAmount(): number {
        return this.collateralAmount;
    }

    public async signAsDebtor(debtorAddress?: string): Promise<void> {
        // TODO: check if already signed by debtor

        if (!this.principalPrice || !this.collateralPrice) {
            throw new Error(MAX_LTV_LOAN_OFFER_ERRORS.PRICES_NOT_SET());
        }

        // TODO: assert signed address matches principal token address
        // TODO: assert signed address matches collateral token address

        if (!this.collateralAmountIsSufficient()) {
            throw new Error(
                MAX_LTV_LOAN_OFFER_ERRORS.INSUFFICIENT_COLLATERAL_AMOUNT(
                    this.collateralAmount,
                    this.data.collateralTokenSymbol,
                ),
            );
        }

        this.debtor = await EthereumAddress.validAddressOrCurrentUser(this.dharma, debtorAddress);

        const isMetaMask = !!this.dharma.web3.currentProvider.isMetaMask;

        const debtorCommitmentHash = this.getDebtorCommitHash();

        this.debtorSignature = await this.dharma.sign.signPayloadWithAddress(
            debtorCommitmentHash,
            this.debtor,
            isMetaMask,
        );
    }

    /**
     * Returns whether the loan offer has been signed by a debtor.
     *
     * @example
     * loanOffer.isSignedByDebtor();
     * => true
     *
     * @return {boolean}
     */
    public isSignedByDebtor(): boolean {
        if (
            this.debtorSignature &&
            SignatureUtils.isValidSignature(
                this.getDebtorCommitHash(),
                this.debtorSignature,
                this.debtor,
            )
        ) {
            return true;
        }

        return false;
    }

    public async acceptAsDebtor(): Promise<void> {
        // TODO: send transaction to CreditorProxtContract
    }

    private getCreditorCommitmentTermsHash(): string {
        return Web3Utils.soliditySHA3(
            this.data.kernelVersion,
            this.data.issuanceVersion,
            this.data.termsContract,
            this.data.principalAmount,
            this.data.principalToken,
            this.data.collateralToken,
            this.data.maxLTV,
            this.data.interestRate,
            this.data.debtorFee,
            this.data.creditorFee,
            this.data.relayer,
            this.data.relayerFee,
            this.data.expirationTimestampInSec,
            this.data.salt,
        );
    }

    private getCreditorCommitmentHash(): string {
        // TODO: remove mock implementation
        return Web3Utils.soliditySHA3("mockCreditorCommitmentHash");

        return Web3Utils.soliditySHA3(
            MaxLTVLoanOffer.decisionEngineAddress,
            this.getCreditorCommitmentTermsHash(),
        );
    }

    private getIssuanceCommitmentHash(): string {
        return Web3Utils.soliditySHA3(
            this.data.issuanceVersion,
            this.debtor,
            this.data.underwriter,
            this.data.underwriterRiskRating,
            this.data.termsContract,
            this.data.termsContractParameters,
            this.data.salt,
        );
    }

    private getDebtorCommitHash(): string {
        // TODO: remove mock implementation
        return Web3Utils.soliditySHA3("mockDebtorCommitmentHash");

        return Web3Utils.soliditySHA3(
            this.data.kernelVersion,
            this.getIssuanceCommitmentHash(),
            this.data.underwriterFee,
            this.data.principal.rawAmount,
            this.data.principalToken,
            this.data.debtorFee,
            this.data.creditorFee,
            this.data.relayer,
            this.data.relayerFee,
            this.data.expirationTimestampInSec,
        );
    }

    private collateralAmountIsSufficient(): boolean {
        if (!this.collateralAmount || !this.principalPrice || !this.collateralPrice) {
            return false;
        }

        // We do not use the TokenAmount's rawValue here because what matters is the "real world" amount
        // of the principal and collateral, without regard for how many decimals are used in their
        // blockchain representations.
        const principalValue = new BigNumber(this.data.principal.decimalAmount).times(
            this.principalPrice.tokenPrice,
        );

        const collateralValue = new BigNumber(this.collateralAmount).times(
            this.collateralPrice.tokenPrice,
        );

        return principalValue.div(collateralValue).lte(this.data.maxLTV);
    }
}
