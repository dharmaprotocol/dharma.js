// Internal dependencies
import * as Web3 from "web3";
import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { DebtOrder } from "../../../src/debt_order/";

// Types
import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

// Test runners
import { testCreate } from "./runners/create";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const dharma = new Dharma(web3.currentProvider);

describe("Debt Order (Integration)", () => {
    describe("#create", async () => {
        await testCreate(dharma, DEBT_ORDER_PARAMS_ONE);
    });
});
