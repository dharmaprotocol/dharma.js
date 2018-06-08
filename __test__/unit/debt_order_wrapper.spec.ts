import * as moment from "moment";

import { BigNumber } from "../../utils/bignumber";
import * as Units from "../../utils/units";
import { Web3Utils } from "../../utils/web3_utils";

import { DebtOrderDataWrapper } from "../../src/wrappers";

import { ACCOUNTS } from "../accounts";

let debtOrderDataWrapper: DebtOrderDataWrapper;

// For the unit test's purposes, we use arbitrary
// addresses for all debt order fields that expect addresses.
const debtOrderData = {
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
    salt: new BigNumber(0),
};

describe("Debt Order Wrapper (Unit Tests)", () => {
    beforeAll(() => {
        debtOrderDataWrapper = new DebtOrderDataWrapper(debtOrderData);
    });

    describe("#getIssuanceCommitment", () => {
        test("returns correct subset of debt order as defined in whitepaper", () => {
            expect(debtOrderDataWrapper.getIssuanceCommitment()).toEqual({
                issuanceVersion: debtOrderData.issuanceVersion,
                debtor: debtOrderData.debtor,
                underwriter: debtOrderData.underwriter,
                underwriterRiskRating: debtOrderData.underwriterRiskRating,
                termsContract: debtOrderData.termsContract,
                termsContractParameters: debtOrderData.termsContractParameters,
                salt: debtOrderData.salt,
            });
        });
    });

    describe("#getIssuanceCommitmentHash", () => {
        test("returns correctly hashed issuance commitment as defined in whitepaper", () => {
            expect(debtOrderDataWrapper.getIssuanceCommitmentHash()).toBe(
                Web3Utils.soliditySHA3(
                    debtOrderData.issuanceVersion,
                    debtOrderData.debtor,
                    debtOrderData.underwriter,
                    debtOrderData.underwriterRiskRating,
                    debtOrderData.termsContract,
                    debtOrderData.termsContractParameters,
                    debtOrderData.salt,
                ),
            );
        });
    });

    describe("#getHash", () => {
        test("returns correctly hashed debt order as defined in whitepaper", () => {
            expect(debtOrderDataWrapper.getHash()).toBe(
                Web3Utils.soliditySHA3(
                    debtOrderData.kernelVersion,
                    Web3Utils.soliditySHA3(
                        debtOrderData.issuanceVersion,
                        debtOrderData.debtor,
                        debtOrderData.underwriter,
                        debtOrderData.underwriterRiskRating,
                        debtOrderData.termsContract,
                        debtOrderData.termsContractParameters,
                        debtOrderData.salt,
                    ),
                    debtOrderData.underwriterFee,
                    debtOrderData.principalAmount,
                    debtOrderData.principalToken,
                    debtOrderData.debtorFee,
                    debtOrderData.creditorFee,
                    debtOrderData.relayer,
                    debtOrderData.relayerFee,
                    debtOrderData.expirationTimestampInSec,
                ),
            );
        });
    });

    describe("#getDebtAgreementId", () => {
        test("returns issuance commitment hash cast to BigNumber", () => {
            expect(debtOrderDataWrapper.getDebtAgreementId()).toEqual(
                new BigNumber(debtOrderDataWrapper.getHash()),
            );
        });
    });

    describe("#getDebtorCommitmentHash", () => {
        test("returns #getHash alias", () => {
            expect(debtOrderDataWrapper.getDebtorCommitmentHash()).toBe(
                debtOrderDataWrapper.getHash(),
            );
        });
    });

    describe("#getCreditorCommitmentHash", () => {
        test("returns #getHash alias", () => {
            expect(debtOrderDataWrapper.getCreditorCommitmentHash()).toBe(
                debtOrderDataWrapper.getHash(),
            );
        });
    });

    describe("#getUnderwriterCommitmentHash", () => {
        test("returns correctly hashed underwriter commitment as defined in whitepaper", () => {
            expect(debtOrderDataWrapper.getUnderwriterCommitmentHash()).toEqual(
                Web3Utils.soliditySHA3(
                    debtOrderData.kernelVersion,
                    Web3Utils.soliditySHA3(
                        debtOrderData.issuanceVersion,
                        debtOrderData.debtor,
                        debtOrderData.underwriter,
                        debtOrderData.underwriterRiskRating,
                        debtOrderData.termsContract,
                        debtOrderData.termsContractParameters,
                        debtOrderData.salt,
                    ),
                    debtOrderData.underwriterFee,
                    debtOrderData.principalAmount,
                    debtOrderData.principalToken,
                    debtOrderData.expirationTimestampInSec,
                ),
            );
        });
    });
});
