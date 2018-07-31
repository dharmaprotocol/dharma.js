import { Loan } from "../loan";

import { TokenAmount } from "../../types";

import { BigNumber } from "../../../utils/bignumber";

class Debt extends Loan {
    /**
     * Eventually makes a repayment on the loan, with the default payment amount being the
     * expected size of a single installment given the principal, interest rate,
     * and terms.
     *
     * @example
     * loan.makeRepayment();
     * => Promise<string>
     *
     * const outstandingAmount = await loan.getOutstandingAmount();
     * loan.makeRepayment(outstandingAmount);
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to make the repayment
     */
    public async makeRepayment(repaymentAmount?: number): Promise<string> {
        const agreementId = this.getAgreementId();
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
                agreementId,
            );
        }

        return this.dharma.servicing.makeRepayment(
            agreementId,
            rawRepaymentAmount,
            principalTokenAddressString,
        );
    }

    /**
     * Eventually returns the collateral and sends it to the debtor.
     * This will fail if the collateral is not returnable.
     *
     * @example
     * loan.returnCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the Ethereum transaction to return the collateral
     */
    public async returnCollateral(): Promise<string> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.returnCollateralAsync(
            this.getAgreementId(),
        );
    }
}
