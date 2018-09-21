import { Dharma } from "../dharma";

import { DebtOrder, DebtOrderParams } from "../../loan/debt_order";

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
}
