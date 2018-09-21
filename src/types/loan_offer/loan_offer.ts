import { Dharma } from "../dharma";

import { DebtOrder, DebtOrderParams } from "../../loan/debt_order";

import { DebtOrderDataWrapper } from "../../wrappers";
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

    private creditorSignature?: ECDSASignature;

    public async signAsCreditor(creditor?: string): Promise<void> {
        const loanOfferHash = this.getLoanOfferHash();

        const isMetaMask = !!this.dharma.web3.currentProvider.isMetaMask;

        this.creditorSignature = await this.dharma.sign.signPayloadWithAddress(
            loanOfferHash,
            creditor,
            isMetaMask,
        );
    }

    private getLoanOfferHash(): string {
        return Web3Utils.soliditySHA3(
            new DebtOrderDataWrapper(this.data).getHash(),
            DECISION_ENGINE_ADDRESS,
        );
    }
}
