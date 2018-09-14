import { ExpandedLoanData } from "./loan";

import { Debt } from "./debt";

import { Dharma } from "../";

/**
 * Describes a collection of debts and provides functionality for managing such a collection.
 */
export class Debts {
    /**
     * Retrieves a collection of debts that belong to the specified owner.
     *
     * @returns {Promise<Debt[]>}
     */
    public static async get(dharma: Dharma, owner: string): Promise<Debt[]> {
        const agreementIds = await dharma.servicing.getDebtsAsync(owner);

        return Promise.all(
            agreementIds.map(async (agreementId) => {
                return Debt.fetch(dharma, agreementId);
            }),
        );
    }

    public static async getExpandedData(
        dharma: Dharma,
        owner: string,
    ): Promise<ExpandedLoanData[]> {
        const debts = await Debts.get(dharma, owner);

        return Promise.all(
            debts.map(async (debt) => {
                return debt.getExpandedData();
            }),
        );
    }
}
