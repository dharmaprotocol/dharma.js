// External libraries
import * as Web3 from "web3";

// Utils
import { BigNumber } from "../../../../utils/bignumber";

// Accounts
import { ACCOUNTS } from "../../../accounts";

// Debt Order
import { Loan, LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

// Types
import { EthereumAddress, InterestRate, TokenAmount } from "../../../../src/types";

import { setBalancesAndAllowances } from "../utils/set_balances_and_allowances";

const CREDITOR = ACCOUNTS[3];

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

export async function testGetTotalExpectedRepaymentAmount(
    dharma: Dharma,
    params: LoanRequestParams,
) {
    describe("when called on a filled DebtOrder instance", () => {
        let loanRequest: LoanRequest;
        let loan: Loan;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);

            await setBalancesAndAllowances(dharma, web3, params, CREDITOR.address);

            await loanRequest.fill(CREDITOR.address);

            loan = await loanRequest.generateLoan();
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
