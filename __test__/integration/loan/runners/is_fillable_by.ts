import * as Web3 from "web3";

import { Dharma } from "../../../../src/dharma";
import { LoanRequest, LoanRequestParams } from "../../../../src/loan";
import { TokenAmount } from "../../../../src/types";
import { DummyTokenContract } from "../../../../src/wrappers";

import { BigNumber } from "../../../../utils/bignumber";
import { Web3Utils } from "../../../../utils/web3_utils";
import { ACCOUNTS } from "../../../accounts";

const CREDITOR = ACCOUNTS[5].address;

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

async function setBalance(dharma: Dharma, amount: TokenAmount, recipient: string): Promise<string> {
    const tokenRegistry = await dharma.contracts.loadTokenRegistry();

    const tokenAddress = await tokenRegistry.getTokenAddressBySymbol.callAsync(amount.tokenSymbol);

    const token = await DummyTokenContract.at(tokenAddress, web3, TX_DEFAULTS);

    return token.setBalance.sendTransactionAsync(recipient, amount.rawAmount);
}

export async function testIsFillableBy(dharma: Dharma, params: LoanRequestParams) {
    describe("for a loan request with valid parameters", () => {
        let currentSnapshotId: number;
        let loanRequest: LoanRequest;

        beforeAll(async () => {
            const amount = new TokenAmount(0, params.collateralToken);
            await setBalance(dharma, amount, params.debtorAddress);
        });

        beforeEach(async () => {
            currentSnapshotId = await web3Utils.saveTestSnapshot();

            loanRequest = await LoanRequest.create(dharma, params);
        });

        afterEach(async () => {
            await web3Utils.revertToSnapshot(currentSnapshotId);
        });

        describe("when the debtor has insufficient balance", () => {
            test("eventually returns false", async () => {
                await loanRequest.allowCollateralTransfer();
                const isFillable = await loanRequest.isFillableBy(CREDITOR);

                expect(isFillable).toEqual(false);
            });
        });

        describe("when the debtor has sufficient balance", () => {
            beforeEach(async () => {
                const amount = new TokenAmount(params.collateralAmount, params.collateralToken);
                await setBalance(dharma, amount, params.debtorAddress);
            });

            describe("when the debtor has not granted sufficient allowance", () => {
                test("eventually returns false", async () => {
                    const isFillable = await loanRequest.isFillableBy(CREDITOR);

                    expect(isFillable).toEqual(false);
                });
            });

            describe("when the creditor has not granted sufficient allowance", () => {
                test("eventually returns false", async () => {
                    await loanRequest.allowCollateralTransfer();

                    const isFillable = await loanRequest.isFillableBy(CREDITOR);

                    expect(isFillable).toEqual(false);
                });
            });

            describe("when the debtor and creditor have both granted sufficient allowance", () => {
                test("eventually returns true", async () => {
                    await loanRequest.allowCollateralTransfer();
                    await loanRequest.allowPrincipalTransfer(CREDITOR);

                    const isFillable = await loanRequest.isFillableBy(CREDITOR);

                    expect(isFillable).toEqual(true);
                });
            });
        });
    });
}
