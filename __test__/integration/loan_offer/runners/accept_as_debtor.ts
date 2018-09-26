import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

import { testAccept } from "./accept";

export async function testAcceptAsDebtor(dharma: Dharma, params: any) {
    async function signAndAccept(loanOffer: LoanOffer, address: string) {
        await loanOffer.signAsDebtor(address);

        await loanOffer.acceptAsDebtor(address, { gas: 4712388 });
    }

    await testAccept(dharma, params, signAndAccept);
}
