// Scenarios
import * as ABIDecoder from "abi-decoder";
import { ReturnCollateralScenario } from "../scenarios";

import { BaseCollateralRunner } from "./base_collateral_runner";

export class ReturnCollateralRunner extends BaseCollateralRunner {
    public testScenario(scenario: ReturnCollateralScenario) {
        let agreementId;
        let collateralizer;

        describe(scenario.description, () => {
            beforeAll(async () => {
                await this.initializeWrappers(scenario);

                this.snapshotId = await this.web3Utils.saveTestSnapshot();

                // We fill a generic collateralized loan order, against which
                // we can test making repayments and returning collateral.
                await this.generateAndFillOrder(scenario);

                agreementId = await this.orderApi.getIssuanceHash(this.debtOrderData);

                // The time, in seconds since unix epoch, at which the term will end.
                const termEnd = await this.termsContract.getTermEndTimestamp.callAsync(agreementId);

                if (scenario.debtRepaid) {
                    // Repay the full debt, to test making the collateral returnable.
                    await this.repayDebt(agreementId, termEnd);
                }

                if (scenario.termLapsed) {
                    // Increase the EVM's time, such that the term has elapsed.
                    await this.increaseTime(termEnd.toNumber() + 1);
                }

                if (scenario.collateralWithdrawn) {
                    await this.adapter.returnCollateralAsync(agreementId);
                }

                collateralizer = await this.contractsApi.loadCollateralizerAsync();
            });

            afterAll(async () => {
                // Once the test has run, revert to a clean EVM state.
                await this.web3Utils.revertToSnapshot(this.snapshotId);
            });

            if (scenario.succeeds) {
                it("returns a valid transaction hash", async () => {
                    const txHash = await this.adapter.returnCollateralAsync(
                        scenario.givenAgreementId(agreementId),
                    );

                    expect(txHash.length).toEqual(66);
                });

                it("transfers collateral back to the debtor", async () => {
                    // STUB.
                });

                describe("#isCollateralReturned", () => {
                    it("returns true", async () => {
                        const isReturned = await this.adapter.isCollateralReturned(agreementId);

                        expect(isReturned).toEqual(true);
                    });
                });

                describe("#isCollateralSeized", () => {
                    it("returns false", async () => {
                        const isSeized = await this.adapter.isCollateralSeized(agreementId);

                        expect(isSeized).toEqual(false);
                    });
                });
            } else {
                it(`throws with message: ${scenario.error}`, async () => {
                    await expect(
                        this.adapter.returnCollateralAsync(scenario.givenAgreementId(agreementId)),
                    ).rejects.toThrow(scenario.error);
                });

                if (!scenario.collateralWithdrawn) {
                    it("does not transfer collateral back to the debtor", async () => {
                        const collateralAmount = await this.collateralToken.balanceOf.callAsync(
                            this.debtOrderData.debtor,
                        );

                        expect(collateralAmount.toNumber()).toEqual(0);
                    });

                    describe("#isCollateralReturned", () => {
                        it("returns false", async () => {
                            const isReturned = await this.adapter.isCollateralReturned(agreementId);

                            expect(isReturned).toEqual(false);
                        });
                    });
                }
            }
        });
    }
}
