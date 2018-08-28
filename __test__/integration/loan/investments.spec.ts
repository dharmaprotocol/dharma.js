import * as Web3 from "web3";

import { ACCOUNTS } from "../../accounts";

import { Dharma } from "../../../src/dharma";

jest.unmock("@dharmaprotocol/contracts");

import { Investments, LoanRequest } from "../../../src/loan/";

import { VALID_LOAN_REQUEST } from "./scenarios/valid_loan_request";

import { setBalancesAndAllowances } from "./utils/set_balances_and_allowances";

import { Web3Utils } from "../../../utils/web3_utils";

const host = "http://localhost:8545";
const dharma = new Dharma(host);
const provider = new Web3.providers.HttpProvider(host);
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const DEBTOR = ACCOUNTS[7].address;
const CREDITOR = ACCOUNTS[8].address;

describe("Investments (Integration)", () => {
    let currentSnapshotId: number;

    beforeAll(async () => {
        currentSnapshotId = await web3Utils.saveTestSnapshot();
    });

    afterAll(async () => {
        await web3Utils.revertToSnapshot(currentSnapshotId);
    });

    describe("#get", () => {
        describe("querying for an owner with 1 investment", () => {
            beforeAll(async () => {
                await setBalancesAndAllowances(dharma, VALID_LOAN_REQUEST, DEBTOR, CREDITOR);
                const loanRequest = await LoanRequest.createAndSignAsDebtor(
                    dharma,
                    VALID_LOAN_REQUEST,
                    DEBTOR,
                );
                const txhash = await loanRequest.fillAsCreditor(CREDITOR);
                expect(txhash).toBeDefined();
            });

            test("returns the correct number of investments ", async () => {
                const investments = await Investments.get(dharma, CREDITOR);
                expect(investments.length).toEqual(1);
            });
        });
    });
});
