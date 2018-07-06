// Internal dependencies
import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { IS_EXPIRED_SCENARIOS } from "./scenarios/is_expired_scenarios";
import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

// Test runners
import { testGetTotalExpectedRepaymentAmount } from "./runners/get_total_expected_repayment_amount";

const dharma = new Dharma("http://localhost:8545");

describe("Loan (Integration)", () => {
    describe("#getTotalExpectedRepaymentAmount", async () => {
        await testGetTotalExpectedRepaymentAmount(dharma, DEBT_ORDER_PARAMS_ONE);
    });
});
