// Utils
import { BigNumber } from "../../../../../utils/bignumber";
import * as Units from "../../../../../utils/units";

// Scenarios
import { SeizeCollateralScenario } from "../scenarios";

import { BaseCollateralRunner } from "./base_collateral_runner";

export class SeizeCollateralRunner extends BaseCollateralRunner {
    public testScenario(scenario: SeizeCollateralScenario) {
        let agreementId;

        describe(scenario.description, () => {
            beforeAll(async () => {
                await this.initializeWrappers(scenario);

                this.snapshotId = await this.web3Utils.saveTestSnapshot();

                // We fill a generic collateralized loan order, against which
                // we can test making repayments and returning collateral.
                await this.generateAndFillOrder(scenario);

                agreementId = await this.orderApi.getIssuanceHash(this.debtOrder);

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
                    await this.adapter.returnCollateral(agreementId);
                }
            });

            afterAll(async () => {
                // Once the test has run, revert to a clean EVM state.
                await this.web3Utils.revertToSnapshot(this.snapshotId);
            });

            if (scenario.succeeds) {
                it("returns a valid transaction hash", async () => {
                    const txHash = await this.adapter.seizeCollateral(
                        scenario.givenAgreementId(agreementId),
                    );

                    expect(txHash.length).toEqual(66);
                });

                it("transfers the collateral to the creditor", async () => {
                    const collateralAmount = await this.collateralToken.balanceOf.callAsync(
                        this.debtOrder.creditor,
                    );

                    expect(collateralAmount).toEqual(
                        Units.scaleUp(scenario.collateralTerms.collateralAmount, new BigNumber(18)),
                    );
                });
            } else {
                it(`throws with message: ${scenario.error}`, async () => {
                    await expect(
                        this.adapter.seizeCollateral(scenario.givenAgreementId(agreementId)),
                    ).rejects.toThrow(scenario.error);
                });

                it("does not transfer the collateral to the creditor", async () => {
                    const collateralAmount = await this.collateralToken.balanceOf.callAsync(
                        this.debtOrder.creditor,
                    );

                    expect(collateralAmount.toNumber()).toEqual(0);
                });
            }
        });
    }
}
