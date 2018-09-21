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

    public async accept(): Promise<string> {
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
        );
    }

    private getLoanOfferHash(): string {
        return Web3Utils.soliditySHA3(
            new DebtOrderDataWrapper(this.data).getHash(),
            DECISION_ENGINE_ADDRESS,
        );
    }
}
