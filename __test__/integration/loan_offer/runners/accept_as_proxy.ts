import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { testAccept } from "./accept";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

import { ACCOUNTS } from "../../../accounts";

export async function testAcceptAsProxy(dharma: Dharma, params: DebtOrderParams) {
    async function signAndAccept(loanOffer: LoanOffer, debtorAddress: string) {
        await loanOffer.signAsDebtor(debtorAddress);

        await loanOffer.acceptAsProxy(ACCOUNTS[3].address);
    }

    await testAccept(dharma, params, signAndAccept);
}
