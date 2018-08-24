import * as Web3 from "web3";

// Internal dependencies
import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { IS_EXPIRED_SCENARIOS } from "./scenarios/is_expired_scenarios";
import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

// Test runners
import { testGetTotalExpectedRepaymentAmount } from "./runners/get_total_expected_repayment_amount";

const host = "http://localhost:8545";
const provider = new Web3.providers.HttpProvider(host);
const web3 = new Web3(provider);
const dharma = new Dharma(web3);

describe("Loan (Integration)", () => {
    describe("#getTotalExpectedRepaymentAmount", async () => {
        await testGetTotalExpectedRepaymentAmount(dharma, DEBT_ORDER_PARAMS_ONE);
    });
});
