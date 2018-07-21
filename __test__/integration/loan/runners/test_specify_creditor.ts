import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

import { NULL_ADDRESS } from "../../../../utils/constants";
import { ACCOUNTS } from "../../../accounts";

const CURRENT_USER = ACCOUNTS[0].address;
const SPECIFIED_CREDITOR = ACCOUNTS[5].address;

export async function testSpecifyCreditor(dharma: Dharma, params: LoanRequestParams) {
    describe("when the creditor is previously unspecified", () => {
        let loanRequest: LoanRequest;

        beforeEach(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        it("specifies the current user as creditor", async () => {
            expect(loanRequest.data.creditor).toEqual(NULL_ADDRESS);
            await loanRequest.specifyCreditor();
            expect(loanRequest.data.creditor).toEqual(CURRENT_USER);
        });

        it("specifies the specified creditor as creditor", async () => {
            expect(loanRequest.data.creditor).toEqual(NULL_ADDRESS);
            await loanRequest.specifyCreditor(SPECIFIED_CREDITOR);
            expect(loanRequest.data.creditor).toEqual(SPECIFIED_CREDITOR);
        });
    });
}
