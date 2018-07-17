import * as Web3 from "web3";

// Types
import { Loan, LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Dharma.js
import { Dharma } from "../../../../src/dharma";

// Accounts
import { ACCOUNTS } from "../../../accounts";

// Utils
import { Web3Utils } from "../../../../utils/web3_utils";
import { setBalancesAndAllowances } from "../utils/set_balances_and_allowances";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const CREDITOR = ACCOUNTS[3];

export async function testIsFilled(dharma: Dharma, params: LoanRequestParams) {
    let snapshotId: number;
    let loanRequest: LoanRequest;

    beforeEach(async () => {
        snapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(snapshotId);
    });

    describe("when the LoanRequest has been filled", () => {
        beforeAll(async () => {
            await setBalancesAndAllowances(dharma, web3, params, CREDITOR.address);

            loanRequest = await LoanRequest.create(dharma, params);
            const transactionHash = await loanRequest.fill(CREDITOR.address);
            await dharma.blockchain.awaitTransactionMinedAsync(transactionHash);
        });

        test(`eventually returns true`, async () => {
            const loanRequestFilled = await loanRequest.isFilled();
            expect(loanRequestFilled).toBeTruthy();
        });
    });

    describe("when the LoanRequest has not been filled", () => {
        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        test(`eventually returns false`, async () => {
            const loanRequestFilled = await loanRequest.isFilled();
            expect(loanRequestFilled).toBeFalsy();
        });
    });
}
