import { Loan } from "./loan";

/**
 * Describes an investment -- aka a loan from a creditor's perspective.
 *
 * Includes functionality for:
 * - seizing collateral
 */
export class Investment extends Loan {
    /**
     * Eventually seizes the collateral on behalf of the creditor.
     *
     * This call will throw if the collateral is not seizable.
     *
     * @example
     * investment.seizeCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to seize the collateral
     */
    public async seizeCollateral(): Promise<string> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.seizeCollateralAsync(
            this.params.id,
        );
    }
}
