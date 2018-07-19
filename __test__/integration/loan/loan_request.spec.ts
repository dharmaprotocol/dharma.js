// Internal dependencies
import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { IS_EXPIRED_SCENARIOS } from "./scenarios/is_expired_scenarios";
import { generateDebtOrderData } from "./scenarios/valid_debt_order_data";
import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

// Test runners
import { testCancel } from "./runners/cancel_as_debtor";
import { testCreate } from "./runners/create";
import { testGetTerms } from "./runners/get_terms";
import { testIsCancelled } from "./runners/is_cancelled";
import { testExpired } from "./runners/is_expired";
import { testIsSignedByDebtor } from "./runners/is_signed_by_debtor";
import { testLoad } from "./runners/load";
import { testSignAsDebtor } from "./runners/sign_as_debtor";
import { testIsFillable } from "./runners/test_is_fillable";

const dharma = new Dharma("http://localhost:8545");

describe("Loan Request (Integration)", () => {
    describe("#create", async () => {
        await testCreate(dharma, DEBT_ORDER_PARAMS_ONE);
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

    describe("#load", async () => {
        await testLoad(dharma, generateDebtOrderData);
    });

    describe("#cancel", async () => {
        await testCancel(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#getTerms", async () => {
        await testGetTerms(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#isFillable", async () => {
        await testIsFillable(dharma, DEBT_ORDER_PARAMS_ONE);
    });
});
