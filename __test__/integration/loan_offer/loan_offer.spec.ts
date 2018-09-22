import { Dharma, Web3 } from "../../../src";

jest.unmock("@dharmaprotocol/contracts");

import { VALID_DEBT_ORDER_PARAMS } from "./scenarios/valid_debt_order_params";

import { testCreate } from "./runners/create";
import { testCreateAndSignAsCreditor } from "./runners/create_and_sign_as_creditor";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const dharma = new Dharma(provider);

describe("Loan Request (Integration)", () => {
    describe("#create", async () => {
        await testCreate(dharma, VALID_DEBT_ORDER_PARAMS);
    });

    describe("#createAndSignAsCreditor", async () => {
        await testCreateAndSignAsCreditor(dharma, VALID_DEBT_ORDER_PARAMS);
    });
});
