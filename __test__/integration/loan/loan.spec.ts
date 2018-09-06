import * as Web3 from "web3";
jest.unmock("@dharmaprotocol/contracts");

// Internal dependencies
import { Dharma } from "../../../src/dharma";

import { VALID_LOAN_REQUEST } from "./scenarios/valid_loan_request";

// Test runners
import { testGetTotalExpectedRepaymentAmount } from "./runners/get_total_expected_repayment_amount";

const host = "http://localhost:8545";
const provider = new Web3.providers.HttpProvider(host);
const web3 = new Web3(provider);
const dharma = new Dharma(web3);

describe("Loan (Integration)", () => {
    describe("#getTotalExpectedRepaymentAmount", async () => {
        await testGetTotalExpectedRepaymentAmount(dharma, VALID_LOAN_REQUEST);
    });
});
