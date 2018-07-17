import * as _ from "lodash";

import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/dharma";

export async function testGetTerms(dharma: Dharma, params: LoanRequestParams) {
    let loanRequest: LoanRequest;

    describe("when a loan request is originally created", () => {
        beforeAll(async () => {
            loanRequest = await LoanRequest.create(dharma, params);
        });

        test("returns the loan request's terms", async () => {
            const terms = loanRequest.getTerms();

            const expectation = _.chain(params)
                .omit(["expiresInDuration", "expiresInUnit"])
                .assign({ expiresAt: loanRequest.params.expiresAt })
                .mapKeys((value, key) => {
                    switch (key) {
                        case "collateralToken":
                            return "collateralTokenSymbol";
                        case "principalToken":
                            return "principalTokenSymbol";
                        default:
                            return key;
                    }
                })
                .value();

            expect(terms).toEqual(expectation);
        });
    });
}
