// Scenarios
import { ReturnCollateralScenario } from "../scenarios";

import { BaseCollateralRunner } from "./base_collateral_runner";
import { ERC721CollateralizerContract } from "../../../../../src/wrappers";

const TX_MAX_GAS = 600000;

export class ReturnCollateralRunner extends BaseCollateralRunner {
    public testScenario(scenario: ReturnCollateralScenario) {
        let agreementId;
        let collateralizer: ERC721CollateralizerContract;

        describe(scenario.description, () => {
            beforeAll(async () => {
                const tokenId = await this.initializeWrappers(scenario);

                this.snapshotId = await this.web3Utils.saveTestSnapshot();

                // We fill a generic collateralized loan order, against which
                // we can test making repayments and returning collateral.
                await this.generateAndFillOrder(scenario, tokenId);

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
                    await this.adapter.returnCollateralAsync(agreementId, {
                        gas: TX_MAX_GAS,
                    });
                }

                collateralizer = await this.contractsApi.loadERC721CollateralizerAsync();
            });

            afterAll(async () => {
                // Once the test has run, revert to a clean EVM state.
                await this.web3Utils.revertToSnapshot(this.snapshotId);
            });

            if (scenario.succeeds) {
                it("returns a valid transaction hash", async () => {
                    const txHash = await this.adapter.returnCollateralAsync(
                        scenario.givenAgreementId(agreementId),
                        {
                            gas: TX_MAX_GAS,
                        },
                    );

                    expect(txHash.length).toEqual(66);
                });

                it("transfers collateral back to the debtor", async () => {
                    const owner = await this.collateralToken.ownerOf.callAsync(
                        scenario.collateralTerms.tokenReference,
                    );

                    expect(owner).toEqual(this.debtOrderData.debtor);
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
                        this.adapter.returnCollateralAsync(scenario.givenAgreementId(agreementId), {
                            gas: TX_MAX_GAS,
                        }),
                    ).rejects.toThrow(scenario.error);
                });

                if (!scenario.collateralWithdrawn) {
                    it("does not transfer collateral back to the debtor", async () => {
                        const owner = await this.collateralToken.ownerOf.callAsync(
                            scenario.collateralTerms.tokenReference,
                        );

                        const collateralizer = await this.contractsApi.loadERC721CollateralizerAsync();

                        expect(owner).toEqual(collateralizer.address);
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
