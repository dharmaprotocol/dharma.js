import { ACCOUNTS } from "../../accounts";

import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { Investments } from "../../../src/loan/lender/investments";

import { LoanRequest } from "../../../src/loan/";

import { DEBT_ORDER_PARAMS_ONE } from "./scenarios/valid_debt_order_params";

import { setBalancesAndAllowances } from "./utils/set_balances_and_allowances";

const dharma = new Dharma("http://localhost:8545");

const OWNER = ACCOUNTS[7].address;

describe("Investments (Integration)", () => {
    describe("#get", () => {
        describe("querying for an owner with 1 investment", () => {
            beforeAll(async () => {
                await setBalancesAndAllowances(dharma, DEBT_ORDER_PARAMS_ONE, OWNER);
                const loanRequest = await LoanRequest.create(dharma, DEBT_ORDER_PARAMS_ONE);
                await loanRequest.fill(OWNER);
            });

            test("returns the correct number of investments ", async () => {
                const investments = await Investments.get(dharma, OWNER);
                expect(investments.length).toEqual(1);
            });
        });
    });
});
