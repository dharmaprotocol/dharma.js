import * as _ from "lodash";

import { LoanRequest } from "../../../../src/loan";

import { DebtOrderParams } from "../../../../src/loan/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src/types/dharma";

export async function testGetTerms(dharma: Dharma, params: DebtOrderParams) {
    let loanRequest: LoanRequest;

    function generateExpectation() {
        return _.chain(params)
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
    }

    describe("when a loan request is originally created", () => {
        beforeAll(async () => {
            loanRequest = await LoanRequest.create<LoanRequest>(dharma, params);
        });

        test("returns the loan request's terms", async () => {
            const terms = loanRequest.getTerms();

            expect(terms).toEqual(generateExpectation());
        });
    });

    describe("when a loan request is loaded from serialized data", () => {
        beforeAll(async () => {
            const tempLoanRequest = await LoanRequest.create<LoanRequest>(dharma, params);
            const data = tempLoanRequest.toJSON();
            loanRequest = await LoanRequest.load<LoanRequest>(dharma, data);
        });

        test("returns the loan request's terms", async () => {
            const terms = loanRequest.getTerms();

            expect(terms).toEqual(generateExpectation());
        });
    });
}
