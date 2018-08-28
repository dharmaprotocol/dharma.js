jest.unmock("@dharmaprotocol/contracts");

// Internal dependencies
import { Dharma } from "../../../src/dharma";

import { VALID_LOAN_REQUEST } from "./scenarios/valid_loan_request";

// Test runners
import { testGetTotalExpectedRepaymentAmount } from "./runners/get_total_expected_repayment_amount";

const dharma = new Dharma("http://localhost:8545");

describe("Loan (Integration)", () => {
    describe("#getTotalExpectedRepaymentAmount", async () => {
        await testGetTotalExpectedRepaymentAmount(dharma, VALID_LOAN_REQUEST);
    });
});
