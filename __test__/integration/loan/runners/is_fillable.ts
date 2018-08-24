import * as Web3 from "web3";

import { Web3Utils } from "../../../../utils/web3_utils";

import { Dharma } from "../../../../src/dharma";

import { LoanRequest, LoanRequestParams } from "../../../../src/loan";

import { Token } from "../../../../src/types";

import { ACCOUNTS } from "../../../accounts";

import {
    revokeAllowanceForSymbol,
    revokeBalanceForSymbol,
    setBalanceForSymbol,
    setUnlimitedAllowanceForSymbol,
} from "../../../utils/utils";

const CREDITOR = ACCOUNTS[5].address;

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);

export async function testIsFillable(dharma: Dharma, params: LoanRequestParams) {
    describe("for a loan request with valid parameters", () => {
        let currentSnapshotId: number;
        let loanRequest: LoanRequest;

        beforeEach(async () => {
            currentSnapshotId = await web3Utils.saveTestSnapshot();

            loanRequest = await LoanRequest.create(dharma, params);
        });

        afterEach(async () => {
            await web3Utils.revertToSnapshot(currentSnapshotId);
        });

        describe("when the debtor has insufficient balance", () => {
            beforeEach(async () => {
                await setUnlimitedAllowanceForSymbol(dharma, params.principalToken, CREDITOR);
                await setUnlimitedAllowanceForSymbol(
                    dharma,
                    params.collateralToken,
                    params.debtorAddress,
                );

                await setBalanceForSymbol(
                    dharma,
                    params.principalAmount,
                    params.principalToken,
                    CREDITOR,
                );
                await revokeBalanceForSymbol(dharma, params.collateralToken, params.debtorAddress);
            });

            test("eventually returns false", async () => {
                const isFillable = await loanRequest.isFillable(CREDITOR);
                expect(isFillable).toEqual(false);
            });
        });

        describe("when the debtor has sufficient balance", () => {
            beforeEach(async () => {
                await setBalanceForSymbol(
                    dharma,
                    params.collateralAmount,
                    params.collateralToken,
                    params.debtorAddress,
                );
            });

            describe("when the debtor has not granted sufficient allowance", () => {
                beforeEach(async () => {
                    await revokeAllowanceForSymbol(
                        dharma,
                        params.collateralToken,
                        params.debtorAddress,
                    );
                    await setUnlimitedAllowanceForSymbol(dharma, params.principalToken, CREDITOR);
                    await setBalanceForSymbol(
                        dharma,
                        params.principalAmount,
                        params.principalToken,
                        CREDITOR,
                    );
                });

                test("eventually returns false", async () => {
                    const isFillable = await loanRequest.isFillable(CREDITOR);
                    expect(isFillable).toEqual(false);
                });
            });

            describe("when the creditor has not granted sufficient allowance", () => {
                test("eventually returns false", async () => {
                    await setUnlimitedAllowanceForSymbol(
                        dharma,
                        params.collateralToken,
                        params.debtorAddress,
                    );
                    await revokeAllowanceForSymbol(dharma, params.principalToken, CREDITOR);

                    const isFillable = await loanRequest.isFillable(CREDITOR);
                    expect(isFillable).toEqual(false);
                });
            });

            describe("when the creditor has insufficient balance", () => {
                beforeEach(async () => {
                    await setUnlimitedAllowanceForSymbol(dharma, params.principalToken, CREDITOR);
                    await setUnlimitedAllowanceForSymbol(
                        dharma,
                        params.collateralToken,
                        params.debtorAddress,
                    );
                    await revokeBalanceForSymbol(dharma, params.principalToken, CREDITOR);
                });

                test("eventually returns false", async () => {
                    const isFillable = await loanRequest.isFillable(CREDITOR);
                    expect(isFillable).toEqual(false);
                });
            });

            describe("when the debtor and creditor have both granted sufficient allowances and balances", () => {
                beforeEach(async () => {
                    await setUnlimitedAllowanceForSymbol(dharma, params.principalToken, CREDITOR);
                    await setUnlimitedAllowanceForSymbol(
                        dharma,
                        params.collateralToken,
                        params.debtorAddress,
                    );
                    await setBalanceForSymbol(
                        dharma,
                        params.principalAmount,
                        params.principalToken,
                        CREDITOR,
                    );
                });

                test("eventually returns true", async () => {
                    const isFillable = await loanRequest.isFillable(CREDITOR);
                    expect(isFillable).toEqual(true);
                });
            });
        });
    });
}
