// Utils
import { BigNumber } from "../../../../utils/bignumber";

// Accounts
import { ACCOUNTS } from "../../../accounts";

import { Loan } from "../../../../src/loan/loan";
import { LoanRequest, LoanRequestParams } from "../../../../src/loan/loan_request";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/types/dharma";

// Types
import { InterestRate, TokenAmount } from "../../../../src/types";

import { setBalancesAndAllowances } from "../utils/set_balances_and_allowances";

const DEBTOR = ACCOUNTS[2].address;
const CREDITOR = ACCOUNTS[3].address;

export async function testGetTotalExpectedRepaymentAmount(
    dharma: Dharma,
    params: LoanRequestParams,
) {
    describe("when called on a filled DebtOrder instance", () => {
        let loanRequest: LoanRequest;
        let loan: Loan;

        beforeAll(async () => {
            loanRequest = await LoanRequest.createAndSignAsDebtor(dharma, params, DEBTOR);

            await setBalancesAndAllowances(dharma, params, DEBTOR, CREDITOR);

            await loanRequest.fillAsCreditor(CREDITOR);

            const id = loanRequest.getAgreementId();

            loan = await Loan.fetch(dharma, id);
        });

        test(`eventually returns the open order's principal plus interest`, async () => {
            const amount = await loan.getTotalExpectedRepaymentAmount();

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
