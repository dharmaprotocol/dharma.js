import { Dharma } from "../dharma";

import { DEBT_ORDER_ERRORS, DebtOrder, DebtOrderParams } from "../../loan/debt_order";

import { EthereumAddress } from "../../types";
import { DebtOrderDataWrapper } from "../../wrappers";

import { Web3Utils } from "../../../utils/web3_utils";

import { NULL_ECDSA_SIGNATURE } from "../../../utils/constants";
import { SignatureUtils } from "../../../utils/signature_utils";

const GAS = 4712388;

export class LoanOffer extends DebtOrder {
    public static async createAndSignAsCreditor(
        dharma: Dharma,
        params: DebtOrderParams,
        creditor?: string,
    ): Promise<LoanOffer> {
        const offer = await LoanOffer.create<LoanOffer>(dharma, params);

        await offer.signAsCreditor(creditor);

        return offer;
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
        if (this.isSignedByCreditor()) {
            throw new Error(DEBT_ORDER_ERRORS.ALREADY_SIGNED_BY_CREDITOR);
        }

        this.data.creditor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            creditorAddress,
        );

        const loanOfferHash = this.getLoanOfferHash();

        const isMetaMask = !!this.dharma.web3.currentProvider.isMetaMask;

        this.data.creditorSignature = await this.dharma.sign.signPayloadWithAddress(
            loanOfferHash,
            this.data.creditor,
            isMetaMask,
        );
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
        if (
            this.data.creditorSignature === NULL_ECDSA_SIGNATURE ||
            !SignatureUtils.isValidSignature(
                this.getLoanOfferHash(),
                this.data.creditorSignature,
                this.data.creditor,
            )
        ) {
            return false;
        }

        return true;
    }

    /**
     * Eventually accepts the loan offer as debtor, transferring the principal to the debtor and
     * the collateral to the creditor.
     *
     * @example
     * loanOffer.acceptAsDebtor();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to fill the loan request
     */
    public async acceptAsDebtor(debtorAddress?: string): Promise<string> {
        this.data.debtor = await EthereumAddress.validAddressOrCurrentUser(
            this.dharma,
            debtorAddress,
        );

        await this.signAsDebtor(this.data.debtor);

        return this.accept(this.data.debtor);
    }

    /**
     * Eventually accepts the loan offer as a proxy. Requires that the loan offer be signed by both the
     * creditor and debtor.
     *
     * @throws Throws if the loan offer is not signed by both the creditor and debtor.
     *
     * @example
     * loanOffer.acceptAsProxy();
     * => Promise<string>
     *
     * @return {Promise<string>}
     */
    public async acceptAsProxy(proxyAddress?: string): Promise<string> {
        if (this.isSignedByCreditor() && this.isSignedByDebtor()) {
            const proxySender = await EthereumAddress.validAddressOrCurrentUser(
                this.dharma,
                proxyAddress,
            );

            return this.accept(proxySender);
        } else {
            throw new Error(DEBT_ORDER_ERRORS.PROXY_FILL_DISALLOWED("loan offer"));
        }
    }

    /**
     * Eventually returns true if the current loan offer has been accepted on the blockchain.
     *
     * @example
     * await loanOffer.isAccepted();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    public async isAccepted(): Promise<boolean> {
        return this.isWrittenToBlockchain();
    }

    private async accept(sender: string) {
        const creditorProxy = await this.dharma.contracts.loadCreditorProxyContract();

        const debtOrderDataWrapper = new DebtOrderDataWrapper(this.data);

        return creditorProxy.fillDebtOffer.sendTransactionAsync(
            this.data.creditor,
            debtOrderDataWrapper.getOrderAddresses(),
            debtOrderDataWrapper.getOrderValues(),
            debtOrderDataWrapper.getOrderBytes32(),
            debtOrderDataWrapper.getSignaturesV(),
            debtOrderDataWrapper.getSignaturesR(),
            debtOrderDataWrapper.getSignaturesS(),
            { from: sender, gas: GAS },
        );
    }

    private getLoanOfferHash(): string {
        return Web3Utils.soliditySHA3(
            this.data.creditor,
            this.data.issuanceVersion,
            this.data.creditorFee,
            this.data.underwriter,
            this.data.underwriterRiskRating,
            this.data.termsContract,
            this.data.termsContractParameters,
            this.data.expirationTimestampInSec,
            this.data.salt,
        );
    }
}
