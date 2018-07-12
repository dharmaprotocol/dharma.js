import * as Web3 from "web3";

// Types
import { Loan, LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Dharma.js
import { Dharma } from "../../../../src/dharma";

// Accounts
import { ACCOUNTS } from "../../../accounts";

// Utils
import { setBalancesAndAllowances } from "../utils/set_balances_and_allowances";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const CREDITOR = ACCOUNTS[3];

export async function testGenerateLoan(dharma: Dharma, params: LoanRequestParams) {
    let loanRequest: LoanRequest;

    describe("when the LoanRequest has been filled", () => {
        beforeAll(async () => {
            await setBalancesAndAllowances(dharma, web3, params, CREDITOR.address);

            loanRequest = await LoanRequest.create(dharma, params);
            const transactionHash = await loanRequest.fill(CREDITOR.address);
            await dharma.blockchain.awaitTransactionMinedAsync(transactionHash);
        });

        test(`eventually returns an instance of Loan`, async () => {
            const loan = await loanRequest.generateLoan();

            expect(loan instanceof Loan).toBeTruthy();
        });
    });

    describe("when the LoanRequest has not been filled", () => {
        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        test(`eventually throws an error`, async () => {
            expect(loanRequest.generateLoan()).rejects.toBeInstanceOf(Error);
        });
    });
}
