// Debt Order
import { LoanRequest } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/types/dharma";

import { IsExpiredScenario } from "../scenarios/is_expired_scenarios";

export async function testExpired(dharma: Dharma, scenario: IsExpiredScenario) {
    describe(scenario.description, () => {
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, scenario.params);
        });

        test(`eventually returns ${scenario.isExpired}`, async () => {
            const isExpired = await loanRequest.isExpired();

            expect(isExpired).toEqual(scenario.isExpired);
        });
    });
}
