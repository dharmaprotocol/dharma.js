import { Loan } from "../loan";

import { Dharma } from "../../dharma";

import { BaseLoanConstructorParams } from "../agreement";

import { DebtOrderData } from "../../types";

/**
 * Describes a loan from a lender's perspective, includes functionality for seizing
 * collateral.
 */
export class Investment extends Loan {
    constructor(
        public dharma: Dharma,
        public params: BaseLoanConstructorParams,
        public data: DebtOrderData,
    ) {
        super(dharma, params, data);
    }

    /**
     * Eventually seizes the collateral and sends it to the creditor.
     * This will fail if the collateral is not seizable.
     *
     * @example
     * loan.seizeCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to seize the collateral
     */
    public async seizeCollateral(): Promise<string> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.seizeCollateralAsync(
            this.getAgreementId(),
        );
    }
}
