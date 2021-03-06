import { Loan } from "./loan";

import { TokenAmount } from "../types";

import { BigNumber } from "../../utils/bignumber";

/**
 * Describes a debt -- aka a loan from a debtor's perspective.
 *
 * Includes functionality for:
 * - returning collateral
 * - making repayments
 */
export class Debt extends Loan {
    /**
     * Eventually makes a repayment on the debt, with the default payment amount being the
     * expected size of a single installment given the principal, interest rate,
     * and terms.
     *
     * @example
     * debt.makeRepayment();
     * => Promise<string>
     *
     * const outstandingAmount = await debt.getOutstandingAmount();
     * debt.makeRepayment(outstandingAmount);
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to make the repayment
     */
    public async makeRepayment(repaymentAmount?: number): Promise<string> {
        const tokenSymbol = this.params.principal.tokenSymbol;
        const principalTokenAddressString = await this.dharma.contracts.getTokenAddressBySymbolAsync(
            tokenSymbol,
        );

        // If repaymentAmount is not specified, we default to the expected amount per installment.
        let rawRepaymentAmount: BigNumber;

        if (repaymentAmount) {
            const repaymentAmountType = new TokenAmount(repaymentAmount, tokenSymbol);
            rawRepaymentAmount = repaymentAmountType.rawAmount;
        } else {
            rawRepaymentAmount = await this.dharma.servicing.getExpectedAmountPerRepayment(
                this.params.id,
            );
        }

        return this.dharma.servicing.makeRepayment(
            this.params.id,
            rawRepaymentAmount,
            principalTokenAddressString,
        );
    }

    /**
     * Eventually returns the collateral to the debtor.
     *
     * This call will throw if the collateral is not returnable.
     *
     * @example
     * debt.returnCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to return the collateral
     */
    public async returnCollateral(): Promise<string> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.returnCollateralAsync(
            this.params.id,
        );
    }
}
