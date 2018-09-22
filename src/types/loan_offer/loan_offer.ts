import { Dharma } from "../dharma";

import { DEBT_ORDER_ERRORS, DebtOrder, DebtOrderParams } from "../../loan/debt_order";

import { EthereumAddress } from "../../types";
import { CreditorProxyContract, DebtOrderDataWrapper } from "../../wrappers";
import { ECDSASignature } from "../ecdsa_signature";

import { Web3Utils } from "../../../utils/web3_utils";

const DECISION_ENGINE_ADDRESS = "decisionEngineAddress";

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
            { from: sender },
        );
    }

    private getLoanOfferHash(): string {
        return Web3Utils.soliditySHA3(
            new DebtOrderDataWrapper(this.data).getHash(),
            DECISION_ENGINE_ADDRESS,
        );
    }
}
