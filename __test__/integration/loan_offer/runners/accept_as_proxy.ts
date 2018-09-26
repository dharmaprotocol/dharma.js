import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { testAccept } from "./accept";

export async function testAcceptAsProxy(dharma: Dharma, params: any) {
    async function signAndAccept(loanOffer: LoanOffer, address: string) {
        await loanOffer.signAsDebtor(address);

        await loanOffer.acceptAsProxy(address);
    }

    await testAccept(dharma, params, signAndAccept);
}
