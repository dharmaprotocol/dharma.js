import { Dharma } from "../../../../src";

import { LoanOffer } from "../../../../src/types";

export async function testAcceptAsProxy(dharma: Dharma, params: any) {
    describe("passing valid params", () => {
        let loanOffer: LoanOffer;

        beforeAll(async () => {
            loanOffer = await LoanOffer.create(dharma, params);
        });
    });
}
