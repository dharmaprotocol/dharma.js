import { BigNumber } from "utils/bignumber";
import { DebtOrderWrapper } from "src/wrappers";
import * as Units from "utils/units";
import * as moment from "moment";
import * as Web3 from "web3";
import { Web3Utils } from "utils/web3_utils";

import { ACCOUNTS } from "../accounts";

let debtOrderWrapper: DebtOrderWrapper;

// For the unit test's purposes, we use arbitrary
// addresses for all debt order fields that expect addresses.
let debtOrder = {
    kernelVersion: ACCOUNTS[0].address,
    issuanceVersion: ACCOUNTS[1].address,
    principalAmount: Units.ether(1),
    principalToken: ACCOUNTS[2].address,
    debtor: ACCOUNTS[3].address,
    debtorFee: Units.ether(0.001),
    creditor: ACCOUNTS[4].address,
    creditorFee: Units.ether(0.001),
    relayer: ACCOUNTS[5].address,
    relayerFee: Units.ether(0.001),
    underwriter: ACCOUNTS[6].address,
    underwriterFee: Units.ether(0.001),
    underwriterRiskRating: Units.percent(0.001),
    termsContract: ACCOUNTS[7].address,
    termsContractParameters: ACCOUNTS[8].address,
    expirationTimestampInSec: new BigNumber(moment().seconds()),
    issuanceBlockTimestamp: new BigNumber(moment().unix()),
    salt: new BigNumber(0),
};

describe("Debt Order Wrapper (Unit Tests)", () => {
    beforeAll(() => {
        debtOrderWrapper = new DebtOrderWrapper(debtOrder);
    });

    describe("#getIssuanceCommitment", () => {
        test("returns correct subset of debt order as defined in whitepaper", () => {
            expect(debtOrderWrapper.getIssuanceCommitment()).toEqual({
                version: debtOrder.issuanceVersion,
                beneficiary: debtOrder.creditor,
                underwriter: debtOrder.underwriter,
                underwriterRiskRating: debtOrder.underwriterRiskRating,
                termsContract: debtOrder.termsContract,
                termsContractParameters: debtOrder.termsContractParameters,
                issuanceBlockTimestamp: debtOrder.issuanceBlockTimestamp,
            });
        });
    });

    describe("#getIssuanceCommitmentHash", () => {
        test("returns correctly hashed issuance commitment as defined in whitepaper", () => {
            expect(debtOrderWrapper.getIssuanceCommitmentHash()).toBe(
                Web3Utils.soliditySHA3(
                    debtOrder.issuanceVersion,
                    debtOrder.creditor,
                    debtOrder.underwriter,
                    debtOrder.underwriterRiskRating,
                    debtOrder.termsContract,
                    debtOrder.termsContractParameters,
                    debtOrder.issuanceBlockTimestamp,
                ),
            );
        });
    });

    describe("#getHash", () => {
        test("returns correctly hashed debt order as defined in whitepaper", () => {
            expect(debtOrderWrapper.getHash()).toBe(
                Web3Utils.soliditySHA3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySHA3(
                        debtOrder.issuanceVersion,
                        debtOrder.creditor,
                        debtOrder.underwriter,
                        debtOrder.underwriterRiskRating,
                        debtOrder.termsContract,
                        debtOrder.termsContractParameters,
                        debtOrder.issuanceBlockTimestamp,
                    ),
                    debtOrder.underwriterFee,
                    debtOrder.principalAmount,
                    debtOrder.principalToken,
                    debtOrder.debtorFee,
                    debtOrder.creditorFee,
                    debtOrder.relayer,
                    debtOrder.relayerFee,
                    debtOrder.expirationTimestampInSec,
                ),
            );
        });
    });

    describe("#getDebtAgreementId", () => {
        test("returns issuance commitment hash cast to BigNumber", () => {
            expect(debtOrderWrapper.getDebtAgreementId()).toEqual(
                new BigNumber(debtOrderWrapper.getHash()),
            );
        });
    });

    describe("#getDebtorCommitmentHash", () => {
        test("returns #getHash alias", () => {
            expect(debtOrderWrapper.getDebtorCommitmentHash()).toBe(debtOrderWrapper.getHash());
        });
    });

    describe("#getCreditorCommitmentHash", () => {
        test("returns #getHash alias", () => {
            expect(debtOrderWrapper.getCreditorCommitmentHash()).toBe(debtOrderWrapper.getHash());
        });
    });

    describe("#getUnderwriterCommitmentHash", () => {
        test("returns correctly hashed underwriter commitment as defined in whitepaper", () => {
            expect(debtOrderWrapper.getUnderwriterCommitmentHash()).toEqual(
                Web3Utils.soliditySHA3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySHA3(
                        debtOrder.issuanceVersion,
                        debtOrder.creditor,
                        debtOrder.underwriter,
                        debtOrder.underwriterRiskRating,
                        debtOrder.termsContract,
                        debtOrder.termsContractParameters,
                        debtOrder.issuanceBlockTimestamp,
                    ),
                    debtOrder.underwriterFee,
                    debtOrder.principalAmount,
                    debtOrder.principalToken,
                    debtOrder.expirationTimestampInSec,
                ),
            );
        });
    });
});
