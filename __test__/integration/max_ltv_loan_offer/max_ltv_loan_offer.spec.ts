import { Dharma, Web3 } from "../../../src";

jest.unmock("@dharmaprotocol/contracts");

import { VALID_MAX_LTV_LOAN_ORDER_PARAMS } from "./scenarios/valid_max_ltv_loan_order_params";

import { testConstructor } from "./runners/constructor";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const dharma = new Dharma(provider);

describe("Max LTV Loan Offer (Integration)", () => {
    describe("constructor", () => {
        testConstructor(dharma, VALID_MAX_LTV_LOAN_ORDER_PARAMS);
    });

    describe("signAsCreditor", () => {});

    describe("signAsDebtor", () => {});

    describe("acceptAsDebtor", () => {});
});
