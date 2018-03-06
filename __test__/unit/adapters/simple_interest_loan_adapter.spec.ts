import {
    SimpleInterestLoanAdapter,
    SimpleInterestLoanTerms,
    SimpleInterestAdapterErrors,
    AmortizationUnit,
} from "src/adapters/simple_interest_loan_adapter";
import { ContractsAPI, ContractsError } from "src/apis/contracts_api";
import * as Web3 from "web3";
import { BigNumber } from "utils/bignumber";
import * as Units from "utils/units";
import { TokenRegistryContract, TermsContractRegistryContract } from "src/wrappers";
import { ACCOUNTS } from "../../accounts";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const contracts = new ContractsAPI(web3);
const simpleInterestLoanAdapter = new SimpleInterestLoanAdapter(web3, contracts);
const simpleInterestLoanTerms = new SimpleInterestLoanTerms(web3);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

// Given that we rely on having access to the deployed Dharma smart contracts,
// we unmock the Dharma smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

// Unmock the "fs-extra" package in order to give us
// access to the deployed TokenRegistry on the
// test chain.
jest.unmock("fs-extra");

describe("Simple Interest Terms Contract Interface (Unit Tests)", () => {
    describe("#packParameters", () => {
        describe("...with total expected repayment > 2^128 - 1", () => {
            const totalExpectedRepayment = new BigNumber(3.5 * 10 ** 38);
            const amortizationUnit = SimpleInterestLoanAdapter.Installments.DAILY;
            const termLength = new BigNumber(7);

            test("should throw INVALID_EXPECTED_REPAYMENT_VALUE error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        totalExpectedRepayment,
                        amortizationUnit,
                        termLength,
                    });
                }).toThrow(SimpleInterestAdapterErrors.INVALID_EXPECTED_REPAYMENT_VALUE());
            });
        });

        describe("...with total expected repayment < 0", () => {
            const totalExpectedRepayment = new BigNumber(-1);
            const amortizationUnit = SimpleInterestLoanAdapter.Installments.DAILY;
            const termLength = new BigNumber(7);

            test("should throw INVALID_EXPECTED_REPAYMENT_VALUE error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        totalExpectedRepayment,
                        amortizationUnit,
                        termLength,
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_EXPECTED_REPAYMENT_VALUE());
            });
        });

        describe("...with non-existent amortization unit", () => {
            const totalExpectedRepayment = new BigNumber(100);
            const amortizationUnit = "every decade" as AmortizationUnit;
            const termLength = new BigNumber(7);

            test("should throw INVALID_AMORTIZATION_UNIT_TYPE error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        totalExpectedRepayment,
                        amortizationUnit,
                        termLength,
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("...with term length > 2^120 - 1", () => {
            const totalExpectedRepayment = new BigNumber(100);
            const amortizationUnit = SimpleInterestLoanAdapter.Installments.DAILY;
            const termLength = new BigNumber(3.5 * 10 ** 38);

            test("should throw INVALID_TERM_LENGTH error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        totalExpectedRepayment,
                        amortizationUnit,
                        termLength,
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
            });
        });

        describe("...with term length < 0", () => {
            const totalExpectedRepayment = new BigNumber(100);
            const amortizationUnit = SimpleInterestLoanAdapter.Installments.DAILY;
            const termLength = new BigNumber(-1);

            test("should throw INVALID_TERM_LENGTH error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        totalExpectedRepayment,
                        amortizationUnit,
                        termLength,
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
            });
        });

        describe("...with term length not specified in whole numbers", () => {
            const totalExpectedRepayment = new BigNumber(100);
            const amortizationUnit = SimpleInterestLoanAdapter.Installments.DAILY;
            const termLength = new BigNumber(1.3);

            test("should throw INVALID_TERM_LENGTH error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        totalExpectedRepayment,
                        amortizationUnit,
                        termLength,
                    });
                }).toThrowError(/Expected termLength to conform to schema \/WholeNumber/);
            });
        });

        describe("...with valid expected repayment, amortization, and term length", () => {
            describe("Scenario #1", () => {
                const totalExpectedRepayment = new BigNumber(3.456 * 10 ** 18);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.DAILY;
                const termLength = new BigNumber(7);

                test("should return correctly packed parameters", () => {
                    expect(
                        simpleInterestLoanTerms.packParameters({
                            totalExpectedRepayment,
                            amortizationUnit,
                            termLength,
                        }),
                    ).toEqual("0x00000000000000002ff62db077c0000001000000000000000000000000000007");
                });
            });

            describe("Scenario #2", () => {
                const totalExpectedRepayment = new BigNumber(723489020 * 10 ** 18);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.YEARLY;
                const termLength = new BigNumber(4);

                test("should return correctly packed parameters", () => {
                    expect(
                        simpleInterestLoanTerms.packParameters({
                            totalExpectedRepayment,
                            amortizationUnit,
                            termLength,
                        }),
                    ).toEqual("0x00000000025674c25cd7f81d0670000004000000000000000000000000000004");
                });
            });

            describe("Scenario #3", () => {
                const totalExpectedRepayment = new BigNumber(0.0000023232312 * 10 ** 18);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.MONTHLY;
                const termLength = new BigNumber(12);

                test("should return correctly packed parameters", () => {
                    expect(
                        simpleInterestLoanTerms.packParameters({
                            totalExpectedRepayment,
                            amortizationUnit,
                            termLength,
                        }),
                    ).toEqual("0x00000000000000000000021ceb5ed3000300000000000000000000000000000c");
                });
            });
        });
    });

    describe("#unpackParameters", () => {
        describe("...with amortization unit > 4", () => {
            const termsContractParameters =
                "0x00000000025674c25cd7f81d0670000005000000000000000000000000000004";

            test("should throw INVALID_AMORTIZATION_UNIT_TYPE error", () => {
                expect(() => {
                    simpleInterestLoanTerms.unpackParameters(termsContractParameters);
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("...with value that has too few bytes", () => {
            const termsContractParameters = "0x00000000025674c25cd7f81d067000000500000000000004";

            test("should throw INVALID_PACKED_PARAMETERS error", () => {
                expect(() => {
                    simpleInterestLoanTerms.unpackParameters(termsContractParameters);
                }).toThrowError(
                    /Expected termsContractParametersPacked to conform to schema \/Bytes32/,
                );
            });
        });

        describe("...with value that has too many bytes", () => {
            const termsContractParameters =
                "0x00000000000000002ff62db077c000000100000000000000000000000000000007";

            test("should throw INVALID_PACKED_PARAMETERS error", () => {
                expect(() => {
                    simpleInterestLoanTerms.unpackParameters(termsContractParameters);
                }).toThrowError(
                    /Expected termsContractParametersPacked to conform to schema \/Bytes32/,
                );
            });
        });

        describe("...with value that includes non-hexadecimal characters", () => {
            const termsContractParameters =
                "0x00000000000000002ff62db077c0000001000000000000z00000000000000007";

            test("should throw INVALID_PACKED_PARAMETERS error", () => {
                expect(() => {
                    simpleInterestLoanTerms.unpackParameters(termsContractParameters);
                }).toThrowError(
                    /Expected termsContractParametersPacked to conform to schema \/Bytes32/,
                );
            });
        });

        describe("...with termsContractParameters string", () => {
            describe("Scenario #1", () => {
                const parameters =
                    "0x00000000000000002ff62db077c0000001000000000000000000000000000007";
                const unpackedParameters = {
                    totalExpectedRepayment: new BigNumber(3.456 * 10 ** 18),
                    amortizationUnit: SimpleInterestLoanAdapter.Installments.DAILY,
                    termLength: new BigNumber(7),
                };

                test("should return correctly unpacked parameters", () => {
                    expect(simpleInterestLoanTerms.unpackParameters(parameters)).toEqual(
                        unpackedParameters,
                    );
                });
            });

            describe("Scenario #2", () => {
                const parameters =
                    "0x00000000025674c25cd7f81d0670000004000000000000000000000000000004";
                const unpackedParameters = {
                    totalExpectedRepayment: new BigNumber(723489020 * 10 ** 18),
                    amortizationUnit: SimpleInterestLoanAdapter.Installments.YEARLY,
                    termLength: new BigNumber(4),
                };

                test("should return correctly unpacked parameters", () => {
                    expect(simpleInterestLoanTerms.unpackParameters(parameters)).toEqual(
                        unpackedParameters,
                    );
                });
            });

            describe("Scenario #3", () => {
                const parameters =
                    "0x00000000000000000000021ceb5ed3000300000000000000000000000000000c";
                const unpackedParameters = {
                    totalExpectedRepayment: new BigNumber(0.0000023232312 * 10 ** 18),
                    amortizationUnit: SimpleInterestLoanAdapter.Installments.MONTHLY,
                    termLength: new BigNumber(12),
                };

                test("should return correctly unpacked parameters", () => {
                    expect(simpleInterestLoanTerms.unpackParameters(parameters)).toEqual(
                        unpackedParameters,
                    );
                });
            });
        });
    });
});

describe("Simple Interest Loan Adapter (Unit Tests)", async () => {
    let principalTokenAddress: string;

    beforeAll(async () => {
        const dummyTokenRegistry = await TokenRegistryContract.deployed(web3, TX_DEFAULTS);
        principalTokenAddress = await dummyTokenRegistry.getTokenAddress.callAsync("REP");
    });

    describe("#toDebtOrder", () => {
        describe("simple interest loan's required parameter is missing or malformed", () => {
            describe("principalToken missing", () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: undefined,
                            interestRate: new BigNumber(0.14),
                            amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKS,
                            termLength: new BigNumber(2),
                        }),
                    ).rejects.toThrow('instance requires property "principalToken"');
                });
            });

            describe("principalToken malformed", () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: principalTokenAddress.substr(5),
                            interestRate: new BigNumber(0.14),
                            amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKS,
                            termLength: new BigNumber(2),
                        }),
                    ).rejects.toThrow("instance.principalToken does not match pattern");
                });
            });

            describe("principalAmount missing", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount: undefined,
                            principalToken: principalTokenAddress,
                            interestRate: new BigNumber(0.14),
                            amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKS,
                            termLength: new BigNumber(2),
                        }),
                    ).rejects.toThrow('instance requires property "principalAmount"');
                });
            });

            describe("interestRate missing", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: principalTokenAddress,
                            interestRate: undefined,
                            amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKS,
                            termLength: new BigNumber(2),
                        }),
                    ).rejects.toThrow('instance requires property "interestRate"');
                });
            });

            describe("amortizationUnit missing", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: principalTokenAddress,
                            interestRate: new BigNumber(0.14),
                            amortizationUnit: undefined,
                            termLength: new BigNumber(2),
                        }),
                    ).rejects.toThrow('instance requires property "amortizationUnit"');
                });
            });

            describe("amortizationUnit not one of hours|days|months|years", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: principalTokenAddress,
                            interestRate: new BigNumber(0.14),
                            amortizationUnit: "decades" as AmortizationUnit,
                            termLength: new BigNumber(2),
                        }),
                    ).rejects.toThrow("instance.amortizationUnit does not match pattern");
                });
            });

            describe("termLength missing", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: principalTokenAddress,
                            interestRate: new BigNumber(0.14),
                            amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKLY,
                            termLength: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "termLength"');
                });
            });
        });

        describe("simple interest terms contract not deployed for given token address", () => {
            const fakePrincipalToken = ACCOUNTS[0].address;

            it("should throw PRINCIPAL_TOKEN_NOT_SUPPORTED", async () => {
                await expect(
                    simpleInterestLoanAdapter.toDebtOrder({
                        principalAmount: Units.ether(1),
                        principalToken: fakePrincipalToken,
                        interestRate: new BigNumber(0.14),
                        amortizationUnit: SimpleInterestLoanAdapter.Installments.DAILY,
                        termLength: new BigNumber(2),
                    }),
                ).rejects.toThrow(
                    ContractsError.SIMPLE_INTEREST_TERMS_CONTRACT_NOT_SUPPORTED(fakePrincipalToken),
                );
            });
        });

        describe("simple interest loan's required parameters are present and well formed ", () => {
            let simpleInterestTermsContractAddress: string;

            beforeAll(async () => {
                const termsContractRegistry = await TermsContractRegistryContract.deployed(
                    web3,
                    TX_DEFAULTS,
                );
                simpleInterestTermsContractAddress = await termsContractRegistry.getSimpleInterestTermsContractAddress.callAsync(
                    principalTokenAddress,
                );
            });

            describe("Scenario #1", () => {
                const principalAmount = Units.ether(1);
                const interestRate = new BigNumber(0.14);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.WEEKLY;
                const termLength = new BigNumber(2);

                it("should return debt order with correctly packed values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount,
                            principalToken: principalTokenAddress,
                            interestRate,
                            amortizationUnit,
                            termLength,
                        }),
                    ).resolves.toEqual({
                        principalAmount,
                        principalToken: principalTokenAddress,
                        termsContract: simpleInterestTermsContractAddress,
                        termsContractParameters:
                            "0x00000000000000000fd217f5c3f2000002000000000000000000000000000002",
                    });
                });
            });

            describe("Scenario #2", () => {
                const principalAmount = Units.ether(0.3);
                const interestRate = new BigNumber(1.678);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.YEARLY;
                const termLength = new BigNumber(1);

                it("should return debt order with correctly packed values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount,
                            principalToken: principalTokenAddress,
                            interestRate,
                            amortizationUnit,
                            termLength,
                        }),
                    ).resolves.toEqual({
                        principalAmount,
                        principalToken: principalTokenAddress,
                        termsContract: simpleInterestTermsContractAddress,
                        termsContractParameters:
                            "0x00000000000000000b26400b1c8c800004000000000000000000000000000001",
                    });
                });
            });

            describe("Scenario #3", () => {
                const principalAmount = Units.ether(200000);
                const interestRate = new BigNumber(0.0001);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.MONTHLY;
                const termLength = new BigNumber(12);

                it("should return debt order with correctly packed values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount,
                            principalToken: principalTokenAddress,
                            interestRate,
                            amortizationUnit,
                            termLength,
                        }),
                    ).resolves.toEqual({
                        principalAmount,
                        principalToken: principalTokenAddress,
                        termsContract: simpleInterestTermsContractAddress,
                        termsContractParameters:
                            "0x0000000000002a5b1b1e089f00d000000300000000000000000000000000000c",
                    });
                });
            });
        });
    });

    describe("#fromDebtToken()", () => {
        let simpleInterestTermsContractAddress: string;

        beforeAll(async () => {
            const termsContractRegistry = await TermsContractRegistryContract.deployed(
                web3,
                TX_DEFAULTS,
            );
            simpleInterestTermsContractAddress = await termsContractRegistry.getSimpleInterestTermsContractAddress.callAsync(
                principalTokenAddress,
            );
        });

        describe("argument does not conform to the DebtOrderWithTermsSpecified schema", () => {
            describe("malformed terms contract / terms contract parameters", () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: principalTokenAddress,
                            termsContract: "invalid terms contract",
                            termsContractParameters: "invalid terms contract parameters",
                        }),
                    ).rejects.toThrow("instance.termsContract does not match pattern");
                });
            });

            describe("missing termsContract", () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: principalTokenAddress,
                            termsContractParameters:
                                "0x0000000000002a5b1b1e089f00d000000300000000000000000000000000000c",
                        }),
                    ).rejects.toThrow('instance requires property "termsContract"');
                });
            });

            describe("missing termsContractParameters", () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount: Units.ether(1),
                            principalToken: principalTokenAddress,
                            termsContract: ACCOUNTS[0].address,
                        }),
                    ).rejects.toThrow('instance requires property "termsContractParameters"');
                });
            });

            describe("missing principalAmount", async () => {
                await expect(
                    simpleInterestLoanAdapter.fromDebtOrder({
                        principalToken: principalTokenAddress,
                        termsContract: ACCOUNTS[0].address,
                        termsContractParameters:
                            "0x0000000000002a5b1b1e089f00d000000300000000000000000000000000000c",
                    }),
                ).rejects.toThrow('instance requires property "principalAmount"');
            });

            describe("missing principalToken", async () => {
                await expect(
                    simpleInterestLoanAdapter.fromDebtOrder({
                        principalAmount: Units.ether(1),
                        termsContract: ACCOUNTS[0].address,
                        termsContractParameters:
                            "0x0000000000002a5b1b1e089f00d000000300000000000000000000000000000c",
                    }),
                ).rejects.toThrow('instance requires property "principalToken"');
            });
        });

        describe("terms contract does not match principal token's associated SimpleInterestTermsContract", () => {
            it("should throw INVALID_TERMS_CONTRACT", async () => {
                await expect(
                    simpleInterestLoanAdapter.fromDebtOrder({
                        principalToken: principalTokenAddress,
                        principalAmount: Units.ether(1),
                        termsContract: ACCOUNTS[0].address,
                        termsContractParameters:
                            "0x0000000000002a5b1b1e089f00d000000300000000000000000000000000000c",
                    }),
                ).rejects.toThrow(
                    SimpleInterestAdapterErrors.INVALID_TERMS_CONTRACT(
                        principalTokenAddress,
                        ACCOUNTS[0].address,
                    ),
                );
            });
        });

        describe("amortization specified in termsContractParameters is of invalid type", () => {
            it("should throw INVALID_AMORTIZATION_UNIT_TYPE", async () => {
                await expect(
                    simpleInterestLoanAdapter.fromDebtOrder({
                        principalToken: principalTokenAddress,
                        principalAmount: Units.ether(1),
                        termsContract: simpleInterestTermsContractAddress,
                        termsContractParameters:
                            "0x0000000000002a5b1b1e089f00d000000600000000000000000000000000000c",
                    }),
                ).rejects.toThrow(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("debt order is valid and well-formed", () => {
            let principalToken;
            let termsContract;

            beforeAll(() => {
                principalToken = principalTokenAddress;
                termsContract = simpleInterestTermsContractAddress;
            });

            describe("Scenario #1", () => {
                const principalAmount = Units.ether(1);
                const interestRate = new BigNumber(0.14);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.WEEKLY;
                const termLength = new BigNumber(2);
                const termsContractParameters =
                    "0x00000000000000000fd217f5c3f2000002000000000000000000000000000002";

                it("should return SimpleInterestLoanOrder with correctly unpacked values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount,
                            principalToken,
                            termsContract,
                            termsContractParameters,
                        }),
                    ).resolves.toEqual({
                        principalAmount,
                        principalToken,
                        termsContract,
                        termsContractParameters,
                        interestRate,
                        amortizationUnit,
                        termLength,
                    });
                });
            });

            describe("Scenario #2", () => {
                const principalAmount = Units.ether(0.3);
                const interestRate = new BigNumber(1.678);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.YEARLY;
                const termLength = new BigNumber(1);
                const termsContractParameters =
                    "0x00000000000000000b26400b1c8c800004000000000000000000000000000001";

                it("should return SimpleInterestLoanOrder with correctly unpacked values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount,
                            principalToken,
                            termsContract,
                            termsContractParameters,
                        }),
                    ).resolves.toEqual({
                        principalAmount,
                        principalToken,
                        termsContract,
                        termsContractParameters,
                        interestRate,
                        amortizationUnit,
                        termLength,
                    });
                });
            });

            describe("Scenario #3", () => {
                const principalAmount = Units.ether(200000);
                const interestRate = new BigNumber(0.0001);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.MONTHLY;
                const termLength = new BigNumber(12);
                const termsContractParameters =
                    "0x0000000000002a5b1b1e089f00d000000300000000000000000000000000000c";

                it("should return SimpleInterestLoanOrder with correctly unpacked values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount,
                            principalToken,
                            termsContract,
                            termsContractParameters,
                        }),
                    ).resolves.toEqual({
                        principalAmount,
                        principalToken,
                        termsContract,
                        termsContractParameters,
                        interestRate,
                        amortizationUnit,
                        termLength,
                    });
                });
            });
        });
    });
});
