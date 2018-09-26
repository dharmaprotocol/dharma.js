import { BigNumber, Dharma, Web3 } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { setBalancesAndAllowances } from "../utils/set_balances_and_allowances";

import { Web3Utils } from "../../../../utils/web3_utils";

// Accounts
import { ACCOUNTS } from "../../../accounts";

const { Token } = Dharma.Types;

const CREDITOR = ACCOUNTS[0];
const DEBTOR = ACCOUNTS[1];

const TX_DEFAULTS = { from: CREDITOR.address, gas: 4712388 };

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

export async function testAccept(
    dharma: Dharma,
    params: DebtOrderParams,
    signAndAccept: (loanOffer: LoanOffer, debtorAddress: string) => void,
) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        let currentSnapshotId: number;

        beforeAll(async () => {
            currentSnapshotId = await web3Utils.saveTestSnapshot();
        });

        beforeEach(async () => {
            loanOffer = await LoanOffer.createAndSignAsCreditor(dharma, params);

            await setBalancesAndAllowances(dharma, params, DEBTOR.address, CREDITOR.address);
        });

        afterEach(async () => {
            await web3Utils.revertToSnapshot(currentSnapshotId);
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
