import { BigNumber } from "../../../../utils/bignumber";

import { ACCOUNTS } from "../../../accounts";

import { Debt, LoanRequest, InterestRate, TokenAmount } from "../../../../src/types";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { Dharma } from "../../../../src/types/dharma";

import { setBalancesAndAllowances } from "../utils/set_balances_and_allowances";

const DEBTOR = ACCOUNTS[2].address;
const CREDITOR = ACCOUNTS[3].address;

export async function testGetTotalExpectedRepaymentAmount(dharma: Dharma, params: DebtOrderParams) {
    describe("when called on a filled DebtOrder instance", () => {
        let loanRequest: LoanRequest;
        let debt: Debt;

        beforeAll(async () => {
            loanRequest = await LoanRequest.createAndSignAsDebtor(dharma, params, DEBTOR);

            await setBalancesAndAllowances(dharma, params, DEBTOR, CREDITOR);

            await loanRequest.fillAsCreditor(CREDITOR);

            const id = loanRequest.getAgreementId();

            debt = await Debt.fetch<Debt>(dharma, id);
        });

        test(`eventually returns the open order's principal plus interest`, async () => {
            const amount = await debt.getTotalExpectedRepaymentAmount();

            const principal = new TokenAmount(params.principalAmount, params.principalToken);
            const interestRate = new InterestRate(params.interestRate);
            const principalAmount = principal.rawAmount.toNumber();
            const interest = interestRate.raw.toNumber();

            const principalPlusInterest = (1 + interest / 100) * principalAmount;

            const expectedValue = TokenAmount.fromRaw(
                new BigNumber(principalPlusInterest),
                principal.tokenSymbol,
            ).decimalAmount;

            expect(amount).toEqual(expectedValue);
        });
    });
}
