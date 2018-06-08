import * as moment from "moment";
import * as Web3 from "web3";
import { ContractsAPI } from "../../src/apis";
import { SignerAPI, SignerAPIErrors } from "../../src/apis/signer_api";
import { BigNumber } from "../../utils/bignumber";
import { SignatureUtils } from "../../utils/signature_utils";
import * as Units from "../../utils/units";

import { Web3Utils } from "../../utils/web3_utils";

import { ACCOUNTS, NULL_ADDRESS } from "../accounts";

// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const contractsApi = new ContractsAPI(web3);
const orderSigner = new SignerAPI(web3, contractsApi);

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
    termsContractParameters: web3.sha3("bytes32proxy"),
    expirationTimestampInSec: new BigNumber(moment().seconds()),
    salt: new BigNumber(0),
};

// TODO: Add test coverage for the requirement that non-required debt order values
//  be merged with defaults before signing.
describe("Order Signer (Unit Tests)", () => {
    describe("Sign order as debtor", () => {
        // TODO: Add tests for when debtor's account is locked.  Problem I'm facing right now is
        //      that ganache-cli's implementation of personal_unlockAccount is broken:
        //      https://github.com/trufflesuite/ganache-cli/issues/405
        //
        // describe("...with debtor's private key unavailable or locked", () => {
        //     beforeAll(async () => {
        //         await promisify(web3.personal.lockAccount)(debtOrderData.debtor);
        //     });
        //
        //     afterAll(async () => {
        //         await promisify(web3.personal.unlockAccount)(debtOrderData.debtor);
        //     });
        //
        //     test("throws INVALID_SIGNING_KEY error", async () => {
        //         await expect(orderSigner.asDebtor(debtOrderData)).rejects
        //             .toThrow(SignerAPIErrors.INVALID_SIGNING_KEY(debtOrderData.debtor));
        //     });
        // });

        describe("...with required parameters missing or malformed", () => {
            describe("missing debtor address", () => {
                const debtOrderDataUndefinedDebtor = { ...debtOrderData };
                debtOrderDataUndefinedDebtor.debtor = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataUndefinedDebtor, false),
                    ).rejects.toThrow(/requires property "debtor"/);
                });
            });

            describe("malformed debtor address", () => {
                const debtOrderDataMalformedDebtor = { ...debtOrderData };
                debtOrderDataMalformedDebtor.debtor = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataMalformedDebtor, false),
                    ).rejects.toThrow(/\.debtor does not match pattern/);
                });
            });

            describe("missing principal amount", () => {
                const debtOrderDataUndefinedPrincipal = { ...debtOrderData };
                debtOrderDataUndefinedPrincipal.principalAmount = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataUndefinedPrincipal, false),
                    ).rejects.toThrow(/requires property "principalAmount"/);
                });
            });

            describe("malformed principal amount", () => {
                const debtOrderDataMalformedPrincipal: any = { ...debtOrderData };
                debtOrderDataMalformedPrincipal.principalAmount = 14;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataMalformedPrincipal, false),
                    ).rejects.toThrow(
                        /\.principalAmount does not conform to the "BigNumber" format/,
                    );
                });
            });

            describe("missing principal token", () => {
                const debtOrderDataMissingPrincipalToken = { ...debtOrderData };
                debtOrderDataMissingPrincipalToken.principalToken = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataMissingPrincipalToken, false),
                    ).rejects.toThrow(/requires property "principalToken"/);
                });
            });

            describe("malformed principal token", () => {
                const debtOrderDataMalformedPrincipalToken: any = { ...debtOrderData };
                debtOrderDataMalformedPrincipalToken.principalToken = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataMalformedPrincipalToken, false),
                    ).rejects.toThrow(/\.principalToken does not match pattern/);
                });
            });

            describe("missing terms contract", () => {
                const debtOrderDataUndefinedTermsContract: any = { ...debtOrderData };
                debtOrderDataUndefinedTermsContract.termsContract = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataUndefinedTermsContract, false),
                    ).rejects.toThrow(/requires property "termsContract"/);
                });
            });

            describe("malformed terms contract", () => {
                const debtOrderDataMalformedTermsContract: any = { ...debtOrderData };
                debtOrderDataMalformedTermsContract.termsContract = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataMalformedTermsContract, false),
                    ).rejects.toThrow(/\.termsContract does not match pattern/);
                });
            });

            describe("missing terms contract parameters", () => {
                const debtOrderDataUndefinedTermsContractParams: any = {
                    ...debtOrderData,
                };
                debtOrderDataUndefinedTermsContractParams.termsContractParameters = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataUndefinedTermsContractParams, false),
                    ).rejects.toThrow(/requires property "termsContractParameters"/);
                });
            });

            describe("malformed terms contract", () => {
                const debtOrderDataMalformedTermsContractParams: any = {
                    ...debtOrderData,
                };
                debtOrderDataMalformedTermsContractParams.termsContractParameters =
                    "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderDataMalformedTermsContractParams, false),
                    ).rejects.toThrow(/\.termsContractParameters does not match pattern/);
                });
            });
        });

        describe("...with debtor's address set to 0x", () => {
            const debtOrderDataWithNullDebtor = { ...debtOrderData };
            debtOrderDataWithNullDebtor.debtor = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asDebtor(debtOrderDataWithNullDebtor, false),
                ).rejects.toThrow(SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS));
            });
        });

        describe("...with debtor's address not owned by user", () => {
            const debtOrderDataWithExternalDebtor = { ...debtOrderData };
            debtOrderDataWithExternalDebtor.debtor = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asDebtor(debtOrderDataWithExternalDebtor, false),
                ).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(debtOrderDataWithExternalDebtor.debtor),
                );
            });
        });

        describe("...with debtor's private key available and unlocked", () => {
            let debtOrderDataHash: string;

            beforeAll(() => {
                debtOrderDataHash = Web3Utils.soliditySHA3(
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
                );
            });

            describe("on signing client that expects hashed message w/ personal message prefix", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asDebtor(debtOrderData, true);

                    // Given that our test environment (namely, Ganache) is a client that
                    // prepends the personal message prefix on the user's behalf, the correctly
                    // produced signature in this test environment will actually
                    // redundantly prepend a personal message prefix to the payload
                    // twice.  Thus, to test for correctness as best we can, we redundantly prefix
                    // and hash the debtOrderDataHash -- once below, and again in the `isValidSignature`
                    // mtheod.
                    const prefixedDebtOrderHash = SignatureUtils.addPersonalMessagePrefix(
                        debtOrderDataHash,
                    );

                    expect(
                        SignatureUtils.isValidSignature(
                            prefixedDebtOrderHash,
                            ecdsaSignature,
                            debtOrderData.debtor,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });

            describe("on signing client that adds personal message prefix on user's behalf", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asDebtor(debtOrderData, false);

                    expect(
                        SignatureUtils.isValidSignature(
                            debtOrderDataHash,
                            ecdsaSignature,
                            debtOrderData.debtor,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });
        });
    });

    describe("Sign order as creditor", () => {
        // TODO: Add tests for when creditor's account is locked.  Problem I'm facing right now is
        //      that ganache-cli's implementation of personal_unlockAccount is broken:
        //      https://github.com/trufflesuite/ganache-cli/issues/405

        describe("...with required parameters missing or malformed", () => {
            describe("missing debtor address", () => {
                const debtOrderDataUndefinedDebtor = { ...debtOrderData };
                debtOrderDataUndefinedDebtor.debtor = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataUndefinedDebtor, false),
                    ).rejects.toThrow(/requires property "debtor"/);
                });
            });

            describe("malformed debtor address", () => {
                const debtOrderDataMalformedDebtor = { ...debtOrderData };
                debtOrderDataMalformedDebtor.debtor = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataMalformedDebtor, false),
                    ).rejects.toThrow(/\.debtor does not match pattern/);
                });
            });

            describe("missing creditor address", () => {
                const debtOrderDataUndefinedCreditor = { ...debtOrderData };
                debtOrderDataUndefinedCreditor.creditor = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataUndefinedCreditor, false),
                    ).rejects.toThrow(/requires property "creditor"/);
                });
            });

            describe("malformed creditor address", () => {
                const debtOrderDataMalformedCreditor = { ...debtOrderData };
                debtOrderDataMalformedCreditor.creditor = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataMalformedCreditor, false),
                    ).rejects.toThrow(/\.creditor does not match pattern/);
                });
            });

            describe("missing principal amount", () => {
                const debtOrderDataUndefinedPrincipal = { ...debtOrderData };
                debtOrderDataUndefinedPrincipal.principalAmount = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataUndefinedPrincipal, false),
                    ).rejects.toThrow(/requires property "principalAmount"/);
                });
            });

            // TODO: Check more precisely for numbers being of type BigNumber
            // describe("malformed principal amount", () => {
            //     let debtOrderDataMalformedPrincipal: any = Object.assign({}, debtOrderData);
            //     debtOrderDataMalformedPrincipal.principalAmount = 14;
            //
            //     test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
            //         await expect(orderSigner.asCreditor(debtOrderDataMalformedPrincipal)).rejects
            //             .toThrow(/\.principalAmount is not of type BigNumber/);
            //     });
            // });

            describe("missing principal token", () => {
                const debtOrderDataMissingPrincipalToken = { ...debtOrderData };
                debtOrderDataMissingPrincipalToken.principalToken = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataMissingPrincipalToken, false),
                    ).rejects.toThrow(/requires property "principalToken"/);
                });
            });

            describe("malformed principal token", () => {
                const debtOrderDataMalformedPrincipalToken: any = { ...debtOrderData };
                debtOrderDataMalformedPrincipalToken.principalToken = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataMalformedPrincipalToken, false),
                    ).rejects.toThrow(/\.principalToken does not match pattern/);
                });
            });

            describe("missing terms contract", () => {
                const debtOrderDataUndefinedTermsContract: any = { ...debtOrderData };
                debtOrderDataUndefinedTermsContract.termsContract = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataUndefinedTermsContract, false),
                    ).rejects.toThrow(/requires property "termsContract"/);
                });
            });

            describe("malformed terms contract", () => {
                const debtOrderDataMalformedTermsContract: any = { ...debtOrderData };
                debtOrderDataMalformedTermsContract.termsContract = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataMalformedTermsContract, false),
                    ).rejects.toThrow(/\.termsContract does not match pattern/);
                });
            });

            describe("missing terms contract parameters", () => {
                const debtOrderDataUndefinedTermsContractParams: any = {
                    ...debtOrderData,
                };
                debtOrderDataUndefinedTermsContractParams.termsContractParameters = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataUndefinedTermsContractParams, false),
                    ).rejects.toThrow(/requires property "termsContractParameters"/);
                });
            });

            describe("malformed terms contract", () => {
                const debtOrderDataMalformedTermsContractParams: any = {
                    ...debtOrderData,
                };
                debtOrderDataMalformedTermsContractParams.termsContractParameters =
                    "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderDataMalformedTermsContractParams, false),
                    ).rejects.toThrow(/\.termsContractParameters does not match pattern/);
                });
            });
        });

        describe("...with creditor's address set to 0x", () => {
            const debtOrderDataWithNullCreditor = { ...debtOrderData };
            debtOrderDataWithNullCreditor.creditor = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asCreditor(debtOrderDataWithNullCreditor, false),
                ).rejects.toThrow(SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS));
            });
        });

        describe("...with creditor's address not owned by user", () => {
            const debtOrderDataWithExternalCreditor = { ...debtOrderData };
            debtOrderDataWithExternalCreditor.creditor =
                "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asCreditor(debtOrderDataWithExternalCreditor, false),
                ).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(debtOrderDataWithExternalCreditor.creditor),
                );
            });
        });

        describe("...with creditor's private key available and unlocked", () => {
            let debtOrderDataHash: string;

            beforeAll(() => {
                debtOrderDataHash = Web3Utils.soliditySHA3(
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
                );
            });

            describe("on signing client that expects hashed message w/ personal message prefix", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asCreditor(debtOrderData, true);

                    // Given that our test environment (namely, Ganache) is a client that
                    // prepends the personal message prefix on the user's behalf, the correctly
                    // produced signature in this test environment will actually
                    // redundantly prepend a personal message prefix to the payload
                    // twice.  Thus, to test for correctness as best we can, we redundantly prefix
                    // and hash the debtOrderDataHash -- once below, and again in the `isValidSignature`
                    // mtheod.
                    const prefixedDebtOrderHash = SignatureUtils.addPersonalMessagePrefix(
                        debtOrderDataHash,
                    );

                    expect(
                        SignatureUtils.isValidSignature(
                            prefixedDebtOrderHash,
                            ecdsaSignature,
                            debtOrderData.creditor,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });

            describe("on signing client that adds personal message prefix on user's behalf", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asCreditor(debtOrderData, false);

                    expect(
                        SignatureUtils.isValidSignature(
                            debtOrderDataHash,
                            ecdsaSignature,
                            debtOrderData.creditor,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });
        });
    });

    describe("Sign order as underwriter", () => {
        // TODO: Add tests for when underwriter's account is locked.  Problem I'm facing right now is
        //      that ganache-cli's implementation of personal_unlockAccount is broken:
        //      https://github.com/trufflesuite/ganache-cli/issues/405

        describe("...with required parameters missing or malformed", () => {
            describe("missing debtor address", () => {
                const debtOrderDataUndefinedDebtor = { ...debtOrderData };
                debtOrderDataUndefinedDebtor.debtor = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataUndefinedDebtor, false),
                    ).rejects.toThrow(/requires property "debtor"/);
                });
            });

            describe("malformed debtor address", () => {
                const debtOrderDataMalformedDebtor = { ...debtOrderData };
                debtOrderDataMalformedDebtor.debtor = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataMalformedDebtor, false),
                    ).rejects.toThrow(/\.debtor does not match pattern/);
                });
            });

            describe("missing principal amount", () => {
                const debtOrderDataUndefinedPrincipal = { ...debtOrderData };
                debtOrderDataUndefinedPrincipal.principalAmount = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataUndefinedPrincipal, false),
                    ).rejects.toThrow(/requires property "principalAmount"/);
                });
            });

            // TODO: Check more precisely for numbers being of type BigNumber
            // describe("malformed principal amount", () => {
            //     let debtOrderDataMalformedPrincipal: any = Object.assign({}, debtOrderData);
            //     debtOrderDataMalformedPrincipal.principalAmount = 14;
            //
            //     test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
            //         await expect(orderSigner.asUnderwriter(debtOrderDataMalformedPrincipal)).rejects
            //             .toThrow(/\.principalAmount is not of type BigNumber/);
            //     });
            // });

            describe("missing principal token", () => {
                const debtOrderDataMissingPrincipalToken = { ...debtOrderData };
                debtOrderDataMissingPrincipalToken.principalToken = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataMissingPrincipalToken, false),
                    ).rejects.toThrow(/requires property "principalToken"/);
                });
            });

            describe("malformed principal token", () => {
                const debtOrderDataMalformedPrincipalToken: any = { ...debtOrderData };
                debtOrderDataMalformedPrincipalToken.principalToken = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataMalformedPrincipalToken, false),
                    ).rejects.toThrow(/\.principalToken does not match pattern/);
                });
            });

            describe("missing terms contract", () => {
                const debtOrderDataUndefinedTermsContract: any = { ...debtOrderData };
                debtOrderDataUndefinedTermsContract.termsContract = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataUndefinedTermsContract, false),
                    ).rejects.toThrow(/requires property "termsContract"/);
                });
            });

            describe("malformed terms contract", () => {
                const debtOrderDataMalformedTermsContract: any = { ...debtOrderData };
                debtOrderDataMalformedTermsContract.termsContract = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataMalformedTermsContract, false),
                    ).rejects.toThrow(/\.termsContract does not match pattern/);
                });
            });

            describe("missing terms contract parameters", () => {
                const debtOrderDataUndefinedTermsContractParams: any = {
                    ...debtOrderData,
                };
                debtOrderDataUndefinedTermsContractParams.termsContractParameters = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataUndefinedTermsContractParams, false),
                    ).rejects.toThrow(/requires property "termsContractParameters"/);
                });
            });

            describe("malformed terms contract", () => {
                const debtOrderDataMalformedTermsContractParams: any = {
                    ...debtOrderData,
                };
                debtOrderDataMalformedTermsContractParams.termsContractParameters =
                    "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderDataMalformedTermsContractParams, false),
                    ).rejects.toThrow(/\.termsContractParameters does not match pattern/);
                });
            });
        });

        describe("...with underwriter's address set to 0x", () => {
            const debtOrderDataWithNullUnderwriter = { ...debtOrderData };
            debtOrderDataWithNullUnderwriter.underwriter = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asUnderwriter(debtOrderDataWithNullUnderwriter, false),
                ).rejects.toThrow(SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS));
            });
        });

        describe("...with underwriter's address not owned by user", () => {
            const debtOrderDataWithExternalUnderwriter = { ...debtOrderData };
            debtOrderDataWithExternalUnderwriter.underwriter =
                "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asUnderwriter(debtOrderDataWithExternalUnderwriter, false),
                ).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(
                        debtOrderDataWithExternalUnderwriter.underwriter,
                    ),
                );
            });
        });

        describe("...with underwriter's private key available and unlocked", () => {
            let underwriterCommitmentHash: string;

            beforeAll(() => {
                underwriterCommitmentHash = Web3Utils.soliditySHA3(
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
                );
            });

            describe("on signing client that expects hashed message w/ personal message prefix", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asUnderwriter(debtOrderData, true);

                    // Given that our test environment (namely, Ganache) is a client that
                    // prepends the personal message prefix on the user's behalf, the correctly
                    // produced signature in this test environment will actually
                    // redundantly prepend a personal message prefix to the payload
                    // twice.  Thus, to test for correctness as best we can, we redundantly prefix
                    // and hash the debtOrderDataHash -- once below, and again in the `isValidSignature`
                    // mtheod.
                    const prefixedCommitmentHash = SignatureUtils.addPersonalMessagePrefix(
                        underwriterCommitmentHash,
                    );

                    expect(
                        SignatureUtils.isValidSignature(
                            prefixedCommitmentHash,
                            ecdsaSignature,
                            debtOrderData.underwriter,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });

            describe("on signing client that adds personal message prefix on user's behalf", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asUnderwriter(debtOrderData, false);

                    expect(
                        SignatureUtils.isValidSignature(
                            underwriterCommitmentHash,
                            ecdsaSignature,
                            debtOrderData.underwriter,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });
        });
    });
});
