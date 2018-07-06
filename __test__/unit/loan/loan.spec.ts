// Internal dependencies
import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { IS_EXPIRED_SCENARIOS } from "./scenarios/is_expired_scenarios";
import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

// Test runners
import { testCancel } from "./runners/cancel_as_debtor";
import { testCreate } from "./runners/create";
import { testGetTotalExpectedRepaymentAmount } from "./runners/get_total_expected_repayment_amount";
import { testIsCancelled } from "./runners/is_cancelled";
import { testExpired } from "./runners/is_expired";
import { testIsSignedByDebtor } from "./runners/is_signed_by_debtor";
import { testSignAsDebtor } from "./runners/sign_as_debtor";

const dharma = new Dharma("http://localhost:8545");

describe("Loan (Integration)", () => {
    describe("#getTotalExpectedRepaymentAmount", async () => {
        await testGetTotalExpectedRepaymentAmount(dharma, DEBT_ORDER_PARAMS_ONE);
    });
});
