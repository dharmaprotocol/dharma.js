import { Loan } from "./loan";

import { Dharma } from "../types/dharma";

/**
 * Describes a loan from a creditor's perspective.
 *
 * Includes functionality for:
 * - seizing collateral.
 */
export class Investment extends Loan {
    /**
     * Eventually seizes the collateral and sends it to the creditor.
     *
     * This will fail if the collateral is not seizable.
     *
     * @example
     * investment.seizeCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to seize the collateral
     */
    public async seizeCollateral(): Promise<string> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.seizeCollateralAsync(
            this.data.id,
        );
    }
}
