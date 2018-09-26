import { BigNumber, Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { setBalancesAndAllowances } from "../utils/set_balances_and_allowances";

// Accounts
import { ACCOUNTS } from "../../../accounts";

const { Token } = Dharma.Types;

const CREDITOR = ACCOUNTS[0];
const DEBTOR = ACCOUNTS[1];

const TX_DEFAULTS = { from: CREDITOR.address, gas: 4712388 };

export async function testAccept(
    dharma: Dharma,
    params: DebtOrderParams,
    signAndAccept: (loanOffer: LoanOffer, debtorAddress: string) => void,
) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        beforeEach(async () => {
            loanOffer = await LoanOffer.createAndSignAsCreditor(dharma, params);

            setBalancesAndAllowances(dharma, params, DEBTOR.address, CREDITOR.address);
        });

        test("is accepted by debtor", async () => {
            const isAcceptedBefore = await loanOffer.isAccepted();
            expect(isAcceptedBefore).toEqual(false);

            await signAndAccept(loanOffer, DEBTOR.address);

            const isAcceptedAfter = await loanOffer.isAccepted();
            expect(isAcceptedAfter).toEqual(true);
        });
    });
}
