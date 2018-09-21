import { Dharma } from "../dharma";

import { DebtOrder, DebtOrderParams } from "../../loan/debt_order";

import { DebtOrderDataWrapper } from "../../wrappers";

import { Web3Utils } from "../../../utils/web3_utils";

const DECISION_ENGINE_ADDRESS = "decisionEngineAddress";

export class LoanOffer extends DebtOrder {
    public static async createAndSignAsCreditor(
        dharma: Dharma,
        params: DebtOrderParams,
        creditor?: string,
    ): Promise<LoanOffer> {
        const offer = await LoanOffer.create<LoanOffer>(dharma, params);

        offer.data.creditor = creditor;

        await offer.signAsCreditor(creditor);

        return offer;
    }

    public async signAsCreditor(creditor?: string): Promise<void> {
        const loanOfferHash = this.getLoanOfferHash();

        const isMetaMask = !!this.dharma.web3.currentProvider.isMetaMask;

        this.data.creditorSignature = await this.dharma.sign.signPayloadWithAddress(
            loanOfferHash,
            creditor,
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
