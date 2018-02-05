jest.unmock("fs-extra");

import { BigNumber } from "bignumber.js";
import { SignerAPI, SignerAPIErrors } from "src/apis/signer_api";
import * as Units from "utils/units";
import moment from "moment";
import Web3 from "web3";
import { signatureUtils } from "utils/signature_utils";

// We import modules from the beta web3 >1.0 packages for testing purposes only
import Web3Utils from "web3-utils";

import { ACCOUNTS, NULL_ADDRESS } from "../accounts";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);

let orderSigner = new SignerAPI(web3);

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
    termsContractParameters: web3.sha3("bytes32proxy"),
    expirationTimestampInSec: new BigNumber(moment().seconds()),
    salt: new BigNumber(0),
};

describe("Order Signer (Unit Tests)", () => {
    describe("Sign order as debtor", () => {
        // TODO: Add tests for when debtor's account is locked.  Problem I'm facing right now is
        //      that ganache-cli's implementation of personal_unlockAccount is broken:
        //      https://github.com/trufflesuite/ganache-cli/issues/405
        //
        // describe("...with debtor's private key unavailable or locked", () => {
        //     beforeAll(async () => {
        //         await promisify(web3.personal.lockAccount)(debtOrder.debtor);
        //     });
        //
        //     afterAll(async () => {
        //         await promisify(web3.personal.unlockAccount)(debtOrder.debtor);
        //     });
        //
        //     test("throws INVALID_SIGNING_KEY error", async () => {
        //         await expect(orderSigner.asDebtor(debtOrder)).rejects
        //             .toThrow(SignerAPIErrors.INVALID_SIGNING_KEY(debtOrder.debtor));
        //     });
        // });

        describe("...with debtor's address set to 0x", () => {
            let debtOrderWithNullDebtor = Object.assign({}, debtOrder);
            debtOrderWithNullDebtor.debtor = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(orderSigner.asDebtor(debtOrderWithNullDebtor)).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS),
                );
            });
        });

        describe("...with debtor's address not owned by user", () => {
            let debtOrderWithExternalDebtor = Object.assign({}, debtOrder);
            debtOrderWithExternalDebtor.debtor = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(orderSigner.asDebtor(debtOrderWithExternalDebtor)).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(debtOrderWithExternalDebtor.debtor),
                );
            });
        });

        describe("...with debtor's private key available and unlocked", () => {
            test("returns valid signature", async () => {
                const ecdsaSignature = await orderSigner.asDebtor(debtOrder);

                const debtOrderHash = Web3Utils.soliditySha3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySha3(
                        debtOrder.issuanceVersion,
                        debtOrder.debtor,
                        debtOrder.underwriter,
                        debtOrder.underwriterRiskRating,
                        debtOrder.termsContract,
                        debtOrder.termsContractParameters,
                        debtOrder.salt,
                    ),
                    debtOrder.underwriterFee,
                    debtOrder.principalAmount,
                    debtOrder.principalToken,
                    debtOrder.debtorFee,
                    debtOrder.creditorFee,
                    debtOrder.relayer,
                    debtOrder.relayerFee,
                    debtOrder.expirationTimestampInSec,
                );

                expect(
                    signatureUtils.isValidSignature(
                        debtOrderHash,
                        ecdsaSignature,
                        debtOrder.debtor,
                    ),
                ).toBeTruthy();
            });
        });
    });

    describe("Sign order as creditor", () => {
        // TODO: Add tests for when creditor's account is locked.  Problem I'm facing right now is
        //      that ganache-cli's implementation of personal_unlockAccount is broken:
        //      https://github.com/trufflesuite/ganache-cli/issues/405

        describe("...with creditor's address set to 0x", () => {
            let debtOrderWithNullCreditor = Object.assign({}, debtOrder);
            debtOrderWithNullCreditor.creditor = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(orderSigner.asCreditor(debtOrderWithNullCreditor)).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS),
                );
            });
        });

        describe("...with creditor's address not owned by user", () => {
            let debtOrderWithExternalCreditor = Object.assign({}, debtOrder);
            debtOrderWithExternalCreditor.creditor = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(orderSigner.asCreditor(debtOrderWithExternalCreditor)).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(debtOrderWithExternalCreditor.creditor),
                );
            });
        });

        describe("...with creditor's private key available and unlocked", () => {
            test("returns valid signature", async () => {
                const ecdsaSignature = await orderSigner.asCreditor(debtOrder);

                const debtOrderHash = Web3Utils.soliditySha3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySha3(
                        debtOrder.issuanceVersion,
                        debtOrder.debtor,
                        debtOrder.underwriter,
                        debtOrder.underwriterRiskRating,
                        debtOrder.termsContract,
                        debtOrder.termsContractParameters,
                        debtOrder.salt,
                    ),
                    debtOrder.underwriterFee,
                    debtOrder.principalAmount,
                    debtOrder.principalToken,
                    debtOrder.debtorFee,
                    debtOrder.creditorFee,
                    debtOrder.relayer,
                    debtOrder.relayerFee,
                    debtOrder.expirationTimestampInSec,
                );

                expect(
                    signatureUtils.isValidSignature(
                        debtOrderHash,
                        ecdsaSignature,
                        debtOrder.creditor,
                    ),
                ).toBeTruthy();
            });
        });
    });

    describe("Sign order as underwriter", () => {
        // TODO: Add tests for when underwriter's account is locked.  Problem I'm facing right now is
        //      that ganache-cli's implementation of personal_unlockAccount is broken:
        //      https://github.com/trufflesuite/ganache-cli/issues/405

        describe("...with underwriter's address set to 0x", () => {
            let debtOrderWithNullUnderwriter = Object.assign({}, debtOrder);
            debtOrderWithNullUnderwriter.underwriter = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asUnderwriter(debtOrderWithNullUnderwriter),
                ).rejects.toThrow(SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS));
            });
        });

        describe("...with underwriter's address not owned by user", () => {
            let debtOrderWithExternalUnderwriter = Object.assign({}, debtOrder);
            debtOrderWithExternalUnderwriter.underwriter =
                "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asUnderwriter(debtOrderWithExternalUnderwriter),
                ).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(
                        debtOrderWithExternalUnderwriter.underwriter,
                    ),
                );
            });
        });

        describe("...with underwriter's private key available and unlocked", () => {
            test("returns valid signature", async () => {
                const ecdsaSignature = await orderSigner.asUnderwriter(debtOrder);

                const debtOrderHash = Web3Utils.soliditySha3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySha3(
                        debtOrder.issuanceVersion,
                        debtOrder.debtor,
                        debtOrder.underwriter,
                        debtOrder.underwriterRiskRating,
                        debtOrder.termsContract,
                        debtOrder.termsContractParameters,
                        debtOrder.salt,
                    ),
                    debtOrder.underwriterFee,
                    debtOrder.principalAmount,
                    debtOrder.principalToken,
                    debtOrder.expirationTimestampInSec,
                );

                expect(
                    signatureUtils.isValidSignature(
                        debtOrderHash,
                        ecdsaSignature,
                        debtOrder.underwriter,
                    ),
                ).toBeTruthy();
            });
        });
    });
});
