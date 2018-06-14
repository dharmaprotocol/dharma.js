// Internal dependencies
import * as Web3 from "web3";
import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { IS_EXPIRED_SCENARIOS } from "./scenarios/is_expired_scenarios";
import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

// Test runners
import { testCreate } from "./runners/create";
import { testExpired } from "./runners/is_expired";
import { testIsSignedByDebtor } from "./runners/is_signed_by_debtor";
import { testIsSignedByUnderwriter } from "./runners/is_signed_by_underwriter";
import { testSignAsDebtor } from "./runners/sign_as_debtor";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const dharma = new Dharma(web3.currentProvider);

describe("Debt Order (Integration)", () => {
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

    describe("#isSignedByUnderwriter", async () => {
        await testIsSignedByUnderwriter(dharma, DEBT_ORDER_PARAMS_ONE);
    });
});
