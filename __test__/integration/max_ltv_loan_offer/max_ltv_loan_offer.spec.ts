import { Dharma, Web3 } from "../../../src";

jest.unmock("@dharmaprotocol/contracts");

import { VALID_MAX_LTV_LOAN_ORDER_PARAMS } from "./scenarios/valid_max_ltv_loan_order_params";

import { testConstructor } from "./runners/constructor";
import { testCreateAndSignAsCreditor } from "./runners/create_and_sign_as_creditor";
import { testSignAsCreditor } from "./runners/sign_as_creditor";
import { testSignAsDebtor } from "./runners/sign_as_debtor";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const dharma = new Dharma(provider);

describe("Max LTV Loan Offer (Integration)", () => {
    describe("constructor", () => {
        testConstructor(dharma, VALID_MAX_LTV_LOAN_ORDER_PARAMS);
    });

    describe("createAndSignAsCreditor", async () => {
        await testCreateAndSignAsCreditor(dharma, VALID_MAX_LTV_LOAN_ORDER_PARAMS);
    });

    describe("signAsCreditor", async () => {
        await testSignAsCreditor(dharma, VALID_MAX_LTV_LOAN_ORDER_PARAMS);
    });

    describe("signAsDebtor", async () => {
        await testSignAsDebtor(dharma, VALID_MAX_LTV_LOAN_ORDER_PARAMS);
    });

    describe("acceptAsDebtor", () => {});
});
