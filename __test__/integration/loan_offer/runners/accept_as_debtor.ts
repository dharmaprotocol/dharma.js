import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { testAccept } from "./accept";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

export async function testAcceptAsDebtor(dharma: Dharma, params: DebtOrderParams) {
    async function signAndAccept(loanOffer: LoanOffer, debtorAddress: string) {
        await loanOffer.acceptAsDebtor(debtorAddress);
    }

    await testAccept(dharma, params, signAndAccept);
}
