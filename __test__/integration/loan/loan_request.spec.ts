// Internal dependencies
import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { IS_EXPIRED_SCENARIOS } from "./scenarios/is_expired_scenarios";
import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

// Test runners
import { testAllowCollateralTransfer } from "./runners/allow_collateral_transfer";
import { testCancel } from "./runners/cancel_as_debtor";
import { testCreate } from "./runners/create";
import { testGenerateLoan } from "./runners/generate_loan";
import { testIsCancelled } from "./runners/is_cancelled";
import { testExpired } from "./runners/is_expired";
import { testIsSignedByDebtor } from "./runners/is_signed_by_debtor";
import { testSignAsDebtor } from "./runners/sign_as_debtor";

const dharma = new Dharma("http://localhost:8545");

describe("Loan Request (Integration)", () => {
    describe("#create", async () => {
        await testCreate(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#generateLoan", async () => {
        await testGenerateLoan(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#allowCollateralTransfer", async () => {
        await testAllowCollateralTransfer(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#isExpired", async () => {
        IS_EXPIRED_SCENARIOS.forEach(async (scenario) => {
            await testExpired(dharma, scenario);
        });
    });

    describe("#signAsDebtor", async () => {
        await testSignAsDebtor(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#isSignedByDebtor", async () => {
        await testIsSignedByDebtor(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#isCancelled", async () => {
        await testIsCancelled(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#cancelAsDebtor", async () => {
        await testCancel(dharma, DEBT_ORDER_PARAMS_ONE);
    });
});
