import { BigNumber } from "utils/bignumber";
import { ContractsAPI } from "src/apis";
import { SignerAPI, SignerAPIErrors } from "src/apis/signer_api";
import * as Units from "utils/units";
import * as moment from "moment";
import * as Web3 from "web3";
import { SignatureUtils } from "utils/signature_utils";

import { Web3Utils } from "utils/web3_utils";

import { ACCOUNTS, NULL_ADDRESS } from "../accounts";

// Given that this is an integration test, we unmock the Dharma
// smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const contractsApi = new ContractsAPI(web3);
let orderSigner = new SignerAPI(web3, contractsApi);

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

        describe("...with required parameters missing or malformed", () => {
            describe("missing debtor address", () => {
                let debtOrderUndefinedDebtor = Object.assign({}, debtOrder);
                debtOrderUndefinedDebtor.debtor = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderUndefinedDebtor, false),
                    ).rejects.toThrow(/requires property "debtor"/);
                });
            });

            describe("malformed debtor address", () => {
                let debtOrderMalformedDebtor = Object.assign({}, debtOrder);
                debtOrderMalformedDebtor.debtor = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderMalformedDebtor, false),
                    ).rejects.toThrow(/\.debtor does not match pattern/);
                });
            });

            describe("missing principal amount", () => {
                let debtOrderUndefinedPrincipal = Object.assign({}, debtOrder);
                debtOrderUndefinedPrincipal.principalAmount = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderUndefinedPrincipal, false),
                    ).rejects.toThrow(/requires property "principalAmount"/);
                });
            });

            describe("malformed principal amount", () => {
                let debtOrderMalformedPrincipal: any = Object.assign({}, debtOrder);
                debtOrderMalformedPrincipal.principalAmount = 14;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderMalformedPrincipal, false),
                    ).rejects.toThrow(
                        /\.principalAmount does not conform to the "BigNumber" format/,
                    );
                });
            });

            describe("missing principal token", () => {
                let debtOrderMissingPrincipalToken = Object.assign({}, debtOrder);
                debtOrderMissingPrincipalToken.principalToken = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderMissingPrincipalToken, false),
                    ).rejects.toThrow(/requires property "principalToken"/);
                });
            });

            describe("malformed principal token", () => {
                let debtOrderMalformedPrincipalToken: any = Object.assign({}, debtOrder);
                debtOrderMalformedPrincipalToken.principalToken = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderMalformedPrincipalToken, false),
                    ).rejects.toThrow(/\.principalToken does not match pattern/);
                });
            });

            describe("missing terms contract", () => {
                let debtOrderUndefinedTermsContract: any = Object.assign({}, debtOrder);
                debtOrderUndefinedTermsContract.termsContract = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderUndefinedTermsContract, false),
                    ).rejects.toThrow(/requires property "termsContract"/);
                });
            });

            describe("malformed terms contract", () => {
                let debtOrderMalformedTermsContract: any = Object.assign({}, debtOrder);
                debtOrderMalformedTermsContract.termsContract = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderMalformedTermsContract, false),
                    ).rejects.toThrow(/\.termsContract does not match pattern/);
                });
            });

            describe("missing terms contract parameters", () => {
                let debtOrderUndefinedTermsContractParams: any = Object.assign({}, debtOrder);
                debtOrderUndefinedTermsContractParams.termsContractParameters = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderUndefinedTermsContractParams, false),
                    ).rejects.toThrow(/requires property "termsContractParameters"/);
                });
            });

            describe("malformed terms contract", () => {
                let debtOrderMalformedTermsContractParams: any = Object.assign({}, debtOrder);
                debtOrderMalformedTermsContractParams.termsContractParameters = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asDebtor(debtOrderMalformedTermsContractParams, false),
                    ).rejects.toThrow(/\.termsContractParameters does not match pattern/);
                });
            });
        });

        describe("...with debtor's address set to 0x", () => {
            let debtOrderWithNullDebtor = Object.assign({}, debtOrder);
            debtOrderWithNullDebtor.debtor = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(orderSigner.asDebtor(debtOrderWithNullDebtor, false)).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS),
                );
            });
        });

        describe("...with debtor's address not owned by user", () => {
            let debtOrderWithExternalDebtor = Object.assign({}, debtOrder);
            debtOrderWithExternalDebtor.debtor = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asDebtor(debtOrderWithExternalDebtor, false),
                ).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(debtOrderWithExternalDebtor.debtor),
                );
            });
        });

        describe("...with debtor's private key available and unlocked", () => {
            let debtOrderHash: string;

            beforeAll(() => {
                debtOrderHash = Web3Utils.soliditySHA3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySHA3(
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
            });

            describe("on signing client that expects hashed message w/ personal message prefix", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asDebtor(debtOrder, true);

                    // Given that our test environment (namely, Ganache) is a client that
                    // prepends the personal message prefix on the user's behalf, the correctly
                    // produced signature in this test environment will actually
                    // redundantly prepend a personal message prefix to the payload
                    // twice.  Thus, to test for correctness as best we can, we redundantly prefix
                    // and hash the debtOrderHash -- once below, and again in the `isValidSignature`
                    // mtheod.
                    const prefixedDebtOrderHash = SignatureUtils.addPersonalMessagePrefix(
                        debtOrderHash,
                    );

                    expect(
                        SignatureUtils.isValidSignature(
                            prefixedDebtOrderHash,
                            ecdsaSignature,
                            debtOrder.debtor,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });

            describe("on signing client that adds personal message prefix on user's behalf", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asDebtor(debtOrder, false);

                    expect(
                        SignatureUtils.isValidSignature(
                            debtOrderHash,
                            ecdsaSignature,
                            debtOrder.debtor,
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
                let debtOrderUndefinedDebtor = Object.assign({}, debtOrder);
                debtOrderUndefinedDebtor.debtor = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderUndefinedDebtor, false),
                    ).rejects.toThrow(/requires property "debtor"/);
                });
            });

            describe("malformed debtor address", () => {
                let debtOrderMalformedDebtor = Object.assign({}, debtOrder);
                debtOrderMalformedDebtor.debtor = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderMalformedDebtor, false),
                    ).rejects.toThrow(/\.debtor does not match pattern/);
                });
            });

            describe("missing creditor address", () => {
                let debtOrderUndefinedCreditor = Object.assign({}, debtOrder);
                debtOrderUndefinedCreditor.creditor = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderUndefinedCreditor, false),
                    ).rejects.toThrow(/requires property "creditor"/);
                });
            });

            describe("malformed creditor address", () => {
                let debtOrderMalformedCreditor = Object.assign({}, debtOrder);
                debtOrderMalformedCreditor.creditor = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderMalformedCreditor, false),
                    ).rejects.toThrow(/\.creditor does not match pattern/);
                });
            });

            describe("missing principal amount", () => {
                let debtOrderUndefinedPrincipal = Object.assign({}, debtOrder);
                debtOrderUndefinedPrincipal.principalAmount = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderUndefinedPrincipal, false),
                    ).rejects.toThrow(/requires property "principalAmount"/);
                });
            });

            // TODO: Check more precisely for numbers being of type BigNumber
            // describe("malformed principal amount", () => {
            //     let debtOrderMalformedPrincipal: any = Object.assign({}, debtOrder);
            //     debtOrderMalformedPrincipal.principalAmount = 14;
            //
            //     test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
            //         await expect(orderSigner.asCreditor(debtOrderMalformedPrincipal)).rejects
            //             .toThrow(/\.principalAmount is not of type BigNumber/);
            //     });
            // });

            describe("missing principal token", () => {
                let debtOrderMissingPrincipalToken = Object.assign({}, debtOrder);
                debtOrderMissingPrincipalToken.principalToken = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderMissingPrincipalToken, false),
                    ).rejects.toThrow(/requires property "principalToken"/);
                });
            });

            describe("malformed principal token", () => {
                let debtOrderMalformedPrincipalToken: any = Object.assign({}, debtOrder);
                debtOrderMalformedPrincipalToken.principalToken = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderMalformedPrincipalToken, false),
                    ).rejects.toThrow(/\.principalToken does not match pattern/);
                });
            });

            describe("missing terms contract", () => {
                let debtOrderUndefinedTermsContract: any = Object.assign({}, debtOrder);
                debtOrderUndefinedTermsContract.termsContract = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderUndefinedTermsContract, false),
                    ).rejects.toThrow(/requires property "termsContract"/);
                });
            });

            describe("malformed terms contract", () => {
                let debtOrderMalformedTermsContract: any = Object.assign({}, debtOrder);
                debtOrderMalformedTermsContract.termsContract = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderMalformedTermsContract, false),
                    ).rejects.toThrow(/\.termsContract does not match pattern/);
                });
            });

            describe("missing terms contract parameters", () => {
                let debtOrderUndefinedTermsContractParams: any = Object.assign({}, debtOrder);
                debtOrderUndefinedTermsContractParams.termsContractParameters = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderUndefinedTermsContractParams, false),
                    ).rejects.toThrow(/requires property "termsContractParameters"/);
                });
            });

            describe("malformed terms contract", () => {
                let debtOrderMalformedTermsContractParams: any = Object.assign({}, debtOrder);
                debtOrderMalformedTermsContractParams.termsContractParameters = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asCreditor(debtOrderMalformedTermsContractParams, false),
                    ).rejects.toThrow(/\.termsContractParameters does not match pattern/);
                });
            });
        });

        describe("...with creditor's address set to 0x", () => {
            let debtOrderWithNullCreditor = Object.assign({}, debtOrder);
            debtOrderWithNullCreditor.creditor = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asCreditor(debtOrderWithNullCreditor, false),
                ).rejects.toThrow(SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS));
            });
        });

        describe("...with creditor's address not owned by user", () => {
            let debtOrderWithExternalCreditor = Object.assign({}, debtOrder);
            debtOrderWithExternalCreditor.creditor = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asCreditor(debtOrderWithExternalCreditor, false),
                ).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(debtOrderWithExternalCreditor.creditor),
                );
            });
        });

        describe("...with creditor's private key available and unlocked", () => {
            let debtOrderHash: string;

            beforeAll(() => {
                debtOrderHash = Web3Utils.soliditySHA3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySHA3(
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
            });

            describe("on signing client that expects hashed message w/ personal message prefix", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asCreditor(debtOrder, true);

                    // Given that our test environment (namely, Ganache) is a client that
                    // prepends the personal message prefix on the user's behalf, the correctly
                    // produced signature in this test environment will actually
                    // redundantly prepend a personal message prefix to the payload
                    // twice.  Thus, to test for correctness as best we can, we redundantly prefix
                    // and hash the debtOrderHash -- once below, and again in the `isValidSignature`
                    // mtheod.
                    const prefixedDebtOrderHash = SignatureUtils.addPersonalMessagePrefix(
                        debtOrderHash,
                    );

                    expect(
                        SignatureUtils.isValidSignature(
                            prefixedDebtOrderHash,
                            ecdsaSignature,
                            debtOrder.creditor,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });

            describe("on signing client that adds personal message prefix on user's behalf", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asCreditor(debtOrder, false);

                    expect(
                        SignatureUtils.isValidSignature(
                            debtOrderHash,
                            ecdsaSignature,
                            debtOrder.creditor,
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
                let debtOrderUndefinedDebtor = Object.assign({}, debtOrder);
                debtOrderUndefinedDebtor.debtor = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderUndefinedDebtor, false),
                    ).rejects.toThrow(/requires property "debtor"/);
                });
            });

            describe("malformed debtor address", () => {
                let debtOrderMalformedDebtor = Object.assign({}, debtOrder);
                debtOrderMalformedDebtor.debtor = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderMalformedDebtor, false),
                    ).rejects.toThrow(/\.debtor does not match pattern/);
                });
            });

            describe("missing principal amount", () => {
                let debtOrderUndefinedPrincipal = Object.assign({}, debtOrder);
                debtOrderUndefinedPrincipal.principalAmount = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderUndefinedPrincipal, false),
                    ).rejects.toThrow(/requires property "principalAmount"/);
                });
            });

            // TODO: Check more precisely for numbers being of type BigNumber
            // describe("malformed principal amount", () => {
            //     let debtOrderMalformedPrincipal: any = Object.assign({}, debtOrder);
            //     debtOrderMalformedPrincipal.principalAmount = 14;
            //
            //     test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
            //         await expect(orderSigner.asUnderwriter(debtOrderMalformedPrincipal)).rejects
            //             .toThrow(/\.principalAmount is not of type BigNumber/);
            //     });
            // });

            describe("missing principal token", () => {
                let debtOrderMissingPrincipalToken = Object.assign({}, debtOrder);
                debtOrderMissingPrincipalToken.principalToken = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderMissingPrincipalToken, false),
                    ).rejects.toThrow(/requires property "principalToken"/);
                });
            });

            describe("malformed principal token", () => {
                let debtOrderMalformedPrincipalToken: any = Object.assign({}, debtOrder);
                debtOrderMalformedPrincipalToken.principalToken = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderMalformedPrincipalToken, false),
                    ).rejects.toThrow(/\.principalToken does not match pattern/);
                });
            });

            describe("missing terms contract", () => {
                let debtOrderUndefinedTermsContract: any = Object.assign({}, debtOrder);
                debtOrderUndefinedTermsContract.termsContract = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderUndefinedTermsContract, false),
                    ).rejects.toThrow(/requires property "termsContract"/);
                });
            });

            describe("malformed terms contract", () => {
                let debtOrderMalformedTermsContract: any = Object.assign({}, debtOrder);
                debtOrderMalformedTermsContract.termsContract = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderMalformedTermsContract, false),
                    ).rejects.toThrow(/\.termsContract does not match pattern/);
                });
            });

            describe("missing terms contract parameters", () => {
                let debtOrderUndefinedTermsContractParams: any = Object.assign({}, debtOrder);
                debtOrderUndefinedTermsContractParams.termsContractParameters = undefined;

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderUndefinedTermsContractParams, false),
                    ).rejects.toThrow(/requires property "termsContractParameters"/);
                });
            });

            describe("malformed terms contract", () => {
                let debtOrderMalformedTermsContractParams: any = Object.assign({}, debtOrder);
                debtOrderMalformedTermsContractParams.termsContractParameters = "0x12345malformed";

                test("throws DOES_NOT_CONFORM_TO_SCHEMA error", async () => {
                    await expect(
                        orderSigner.asUnderwriter(debtOrderMalformedTermsContractParams, false),
                    ).rejects.toThrow(/\.termsContractParameters does not match pattern/);
                });
            });
        });

        describe("...with underwriter's address set to 0x", () => {
            let debtOrderWithNullUnderwriter = Object.assign({}, debtOrder);
            debtOrderWithNullUnderwriter.underwriter = NULL_ADDRESS;

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asUnderwriter(debtOrderWithNullUnderwriter, false),
                ).rejects.toThrow(SignerAPIErrors.INVALID_SIGNING_KEY(NULL_ADDRESS));
            });
        });

        describe("...with underwriter's address not owned by user", () => {
            let debtOrderWithExternalUnderwriter = Object.assign({}, debtOrder);
            debtOrderWithExternalUnderwriter.underwriter =
                "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";

            test("throws INVALID_SIGNING_KEY error", async () => {
                await expect(
                    orderSigner.asUnderwriter(debtOrderWithExternalUnderwriter, false),
                ).rejects.toThrow(
                    SignerAPIErrors.INVALID_SIGNING_KEY(
                        debtOrderWithExternalUnderwriter.underwriter,
                    ),
                );
            });
        });

        describe("...with underwriter's private key available and unlocked", () => {
            let underwriterCommitmentHash: string;

            beforeAll(() => {
                underwriterCommitmentHash = Web3Utils.soliditySHA3(
                    debtOrder.kernelVersion,
                    Web3Utils.soliditySHA3(
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
            });

            describe("on signing client that expects hashed message w/ personal message prefix", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asUnderwriter(debtOrder, true);

                    // Given that our test environment (namely, Ganache) is a client that
                    // prepends the personal message prefix on the user's behalf, the correctly
                    // produced signature in this test environment will actually
                    // redundantly prepend a personal message prefix to the payload
                    // twice.  Thus, to test for correctness as best we can, we redundantly prefix
                    // and hash the debtOrderHash -- once below, and again in the `isValidSignature`
                    // mtheod.
                    const prefixedCommitmentHash = SignatureUtils.addPersonalMessagePrefix(
                        underwriterCommitmentHash,
                    );

                    expect(
                        SignatureUtils.isValidSignature(
                            prefixedCommitmentHash,
                            ecdsaSignature,
                            debtOrder.underwriter,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });

            describe("on signing client that adds personal message prefix on user's behalf", () => {
                test("returns valid signature", async () => {
                    const ecdsaSignature = await orderSigner.asUnderwriter(debtOrder, false);

                    expect(
                        SignatureUtils.isValidSignature(
                            underwriterCommitmentHash,
                            ecdsaSignature,
                            debtOrder.underwriter,
                            true,
                        ),
                    ).toBeTruthy();
                });
            });
        });
    });
});
