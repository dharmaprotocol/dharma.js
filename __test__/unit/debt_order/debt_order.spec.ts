// Internal dependencies
import * as Web3 from "web3";
import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { FILL_SCENARIOS } from "./scenarios/fill_scenarios";
import { IS_EXPIRED_SCENARIOS } from "./scenarios/is_expired_scenarios";
import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

// Test runners
import { testCancel } from "./runners/cancel_as_debtor";
import { testCreate } from "./runners/create";
import { testFill } from "./runners/fill";
import { testGetTotalExpectedRepaymentAmount } from "./runners/get_total_expected_repayment_amount";
import { testIsCancelled } from "./runners/is_cancelled";
import { testExpired } from "./runners/is_expired";
import { testIsSignedByDebtor } from "./runners/is_signed_by_debtor";
import { testSignAsDebtor } from "./runners/sign_as_debtor";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const dharma = new Dharma(web3.currentProvider);

describe("Debt Order (Integration)", () => {
    describe("#create", async () => {
        await testCreate(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#fill", async () => {
        FILL_SCENARIOS.forEach(async (scenario) => {
            await testFill(dharma, web3, scenario);
        });
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

    describe("#getTotalExpectedRepaymentAmount", async () => {
        await testGetTotalExpectedRepaymentAmount(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#isCancelled", async () => {
        await testIsCancelled(dharma, DEBT_ORDER_PARAMS_ONE);
    });

    describe("#cancelAsDebtor", async () => {
        await testCancel(dharma, DEBT_ORDER_PARAMS_ONE);
    });
});
