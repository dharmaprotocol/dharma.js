// libraries
import * as Web3 from "web3";
import * as moment from "moment";

// utils
import { BigNumber } from "utils/bignumber";
import { ACCOUNTS } from "../../accounts";
import * as Units from "utils/units";
import { Web3Utils } from "utils/web3_utils";

// wrappers
import {
    DebtKernelContract,
    ERC20Contract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

// types
import { DebtOrder, DebtRegistryEntry } from "src/types";

// adapters
import {
    SimpleInterestLoanAdapter,
    SimpleInterestLoanOrder,
    SimpleInterestAdapterErrors,
    AmortizationUnit,
} from "src/adapters/simple_interest_loan_adapter";

import { ContractsAPI, ContractsError } from "src/apis/contracts_api";
import { TokenAPI } from "src/apis";
import { SimpleInterestLoanTerms } from "../../../src/adapters/simple_interest_loan_terms";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);
const contracts = new ContractsAPI(web3);
const tokenApi = new TokenAPI(web3, contracts);
const simpleInterestLoanAdapter = new SimpleInterestLoanAdapter(web3, contracts, tokenApi);
const simpleInterestLoanTerms = new SimpleInterestLoanTerms(web3, contracts);

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
    let snapshotId: number;

    beforeEach(async () => {
        snapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(snapshotId);
    });

    const defaultLoanParams = {
        principalTokenIndex: new BigNumber(0), // REP's index in the Token Registry is 0
        principalAmount: new BigNumber(3.456 * 10 ** 18), // Principal Amount: 3.456e18
        interestRate: new BigNumber(14.36), // Interest Rate: 14.36%
        amortizationUnit: SimpleInterestLoanAdapter.Installments.DAILY, // Daily installments
        termLength: new BigNumber(7), // 7 day term
    };

    describe("#packParameters", () => {
        describe("...with invalid principal token index", () => {
            // 300 is an invalid principal token index, given that we cannot encode
            // values greater than 255 in the terms contract parameters
            const invalidPrincipalTokenIndex = new BigNumber(300);

            test("should throw INVALID_TOKEN_INDEX error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        principalTokenIndex: invalidPrincipalTokenIndex,
                    });
                }).toThrow(
                    SimpleInterestAdapterErrors.INVALID_TOKEN_INDEX(invalidPrincipalTokenIndex),
                );
            });
        });

        describe("...with principal amount > 2^96 - 1", () => {
            test("should throw INVALID_PRINCIPAL_AMOUNT error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        principalAmount: new BigNumber(3.5 * 10 ** 38),
                    });
                }).toThrow(SimpleInterestAdapterErrors.INVALID_PRINCIPAL_AMOUNT());
            });
        });

        describe("...with principal amount < 0", () => {
            test("should throw INVALID_PRINCIPAL_AMOUNT error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        principalAmount: new BigNumber(-1),
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_PRINCIPAL_AMOUNT());
            });
        });

        describe("...with interest rate > 1677.7216%", () => {
            test("should throw INVALID_INTEREST_RATE error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        interestRate: new BigNumber(1677.7217),
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_INTEREST_RATE());
            });
        });

        describe("...with interest rate < 0", () => {
            test("should throw INVALID_INTEREST_RATE error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        interestRate: new BigNumber(-1),
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_INTEREST_RATE());
            });
        });

        describe("...where interest rate has more than 4 decimal places", () => {
            test("should throw INVALID_INTEREST_RATE error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        interestRate: new BigNumber(5.20035),
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_INTEREST_RATE());
            });
        });

        describe("...with non-existent amortization unit", () => {
            test("should throw INVALID_AMORTIZATION_UNIT_TYPE error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        amortizationUnit: "every decade" as AmortizationUnit,
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("...with term length > 2^120 - 1", () => {
            test("should throw INVALID_TERM_LENGTH error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        termLength: new BigNumber(3.5 * 10 ** 38),
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
            });
        });

        describe("...with term length < 0", () => {
            test("should throw INVALID_TERM_LENGTH error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        termLength: new BigNumber(-1),
                    });
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
            });
        });

        describe("...with term length not specified in whole numbers", () => {
            test("should throw INVALID_TERM_LENGTH error", () => {
                expect(() => {
                    simpleInterestLoanTerms.packParameters({
                        ...defaultLoanParams,
                        termLength: new BigNumber(1.3),
                    });
                }).toThrowError(/Expected termLength to conform to schema \/WholeNumber/);
            });
        });

        describe("...with valid principal amount, interest rate, amortization, and term length", () => {
            describe("Scenario #1", () => {
                test("should return correctly packed parameters", () => {
                    expect(simpleInterestLoanTerms.packParameters(defaultLoanParams)).toEqual(
                        "0x00000000002ff62db077c000000230f010007000000000000000000000000000",
                    );
                });
            });

            describe("Scenario #2", () => {
                const principalTokenIndex = new BigNumber(1);
                const principalAmount = new BigNumber(723489020 * 10 ** 18);
                const interestRate = new BigNumber(0.012);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.YEARLY;
                const termLength = new BigNumber(4);

                test("should return correctly packed parameters", () => {
                    expect(
                        simpleInterestLoanTerms.packParameters({
                            principalTokenIndex,
                            principalAmount,
                            interestRate,
                            amortizationUnit,
                            termLength,
                        }),
                    ).toEqual("0x01025674c25cd7f81d0670000000007840004000000000000000000000000000");
                });
            });

            describe("Scenario #3", () => {
                const principalTokenIndex = new BigNumber(2);
                const principalAmount = new BigNumber(0.0000023232312 * 10 ** 18);
                const interestRate = new BigNumber(90.2321);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.MONTHLY;
                const termLength = new BigNumber(12);

                test("should return correctly packed parameters", () => {
                    expect(
                        simpleInterestLoanTerms.packParameters({
                            principalTokenIndex,
                            principalAmount,
                            interestRate,
                            amortizationUnit,
                            termLength,
                        }),
                    ).toEqual("0x02000000000000021ceb5ed3000dc4b13000c000000000000000000000000000");
                });
            });
        });
    });

    describe("#unpackParameters", () => {
        describe("...with amortization unit > 4", () => {
            const termsContractParameters =
                "0x0000000025674c25cd7f81d06700000050004000000000000000000000000000";

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
                    "0x00000000002ff62db077c000000230f010007000000000000000000000000000";

                test("should return correctly unpacked parameters", () => {
                    expect(simpleInterestLoanTerms.unpackParameters(parameters)).toEqual(
                        defaultLoanParams,
                    );
                });
            });

            describe("Scenario #2", () => {
                const parameters =
                    "0x01025674c25cd7f81d0670000000007840004000000000000000000000000000";
                const unpackedParameters = {
                    principalTokenIndex: new BigNumber(1),
                    principalAmount: new BigNumber(723489020 * 10 ** 18),
                    interestRate: new BigNumber(0.012),
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
                    "0x05000000000000021ceb5ed3000dc4b13000c000000000000000000000000000";
                const unpackedParameters = {
                    principalTokenIndex: new BigNumber(5),
                    principalAmount: new BigNumber(0.0000023232312 * 10 ** 18),
                    interestRate: new BigNumber(90.2321),
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
    let debtKernelAddress: string;
    let repaymentRouterAddress: string;

    let defaultLoanOrder: SimpleInterestLoanOrder;

    beforeAll(async () => {
        const debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS);
        const repaymentRouter = await RepaymentRouterContract.deployed(web3, TX_DEFAULTS);

        debtKernelAddress = debtKernel.address;
        repaymentRouterAddress = repaymentRouter.address;

        defaultLoanOrder = {
            principalAmount: Units.ether(1),
            principalTokenSymbol: "REP",
            interestRate: new BigNumber(0.14),
            amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKLY,
            termLength: new BigNumber(2),
        };
    });

    describe("#toDebtOrder", () => {
        describe("simple interest loan's required parameter is missing or malformed", () => {
            describe("principalTokenSymbol missing", () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            ...defaultLoanOrder,
                            principalTokenSymbol: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "principalTokenSymbol"');
                });
            });

            describe("principalTokenSymbol is not tracked by Token Registry", () => {
                it("should throw PRINCIPAL_TOKEN_NOT_SUPPORTED", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            ...defaultLoanOrder,
                            principalTokenSymbol: "XXX", // XXX is not tracked in our test env's registry
                        }),
                    ).rejects.toThrow(ContractsError.CANNOT_FIND_TOKEN_WITH_SYMBOL("XXX"));
                });
            });

            describe("principalAmount missing", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            ...defaultLoanOrder,
                            principalAmount: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "principalAmount"');
                });
            });

            describe("interestRate missing", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            ...defaultLoanOrder,
                            interestRate: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "interestRate"');
                });
            });

            describe("amortizationUnit missing", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            ...defaultLoanOrder,
                            amortizationUnit: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "amortizationUnit"');
                });
            });

            describe("amortizationUnit not one of hours|days|months|years", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            ...defaultLoanOrder,
                            amortizationUnit: "decades" as AmortizationUnit,
                        }),
                    ).rejects.toThrow("instance.amortizationUnit does not match pattern");
                });
            });

            describe("termLength missing", async () => {
                it("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            ...defaultLoanOrder,
                            termLength: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "termLength"');
                });
            });
        });

        describe("simple interest loan's required parameters are present and well formed ", () => {
            let simpleInterestTermsContract: SimpleInterestTermsContractContract;
            let principalToken: ERC20Contract;
            let principalTokenIndex: BigNumber;

            beforeAll(async () => {
                simpleInterestTermsContract = await contracts.loadSimpleInterestTermsContract(
                    TX_DEFAULTS,
                );
            });

            describe("Scenario #1", () => {
                const principalAmount = new BigNumber(1);
                const interestRate = new BigNumber(0.14);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.WEEKLY;
                const termLength = new BigNumber(2);

                beforeAll(async () => {
                    principalToken = await contracts.loadTokenBySymbolAsync("REP", TX_DEFAULTS);
                    principalTokenIndex = await contracts.getTokenIndexBySymbolAsync("REP");
                });

                it("should return debt order with correctly packed values", async () => {
                    const encodedIndex = principalTokenIndex.toString().padStart(2, "0");
                    const termsContractParameters = `0x${encodedIndex}000000000de0b6b3a764000000057820002000000000000000000000000000`;

                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount,
                            principalTokenSymbol: "REP",
                            interestRate,
                            amortizationUnit,
                            termLength,
                        }),
                    ).resolves.toEqual({
                        ...DebtOrder.DEFAULTS,
                        kernelVersion: debtKernelAddress,
                        issuanceVersion: repaymentRouterAddress,
                        principalAmount: Units.scaleUp(principalAmount, new BigNumber(18)),
                        principalToken: principalToken.address,
                        termsContract: simpleInterestTermsContract.address,
                        termsContractParameters,
                    });
                });
            });

            describe("Scenario #2", () => {
                const principalAmount = new BigNumber(0.3);
                const interestRate = new BigNumber(1.678);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.YEARLY;
                const termLength = new BigNumber(1);

                beforeAll(async () => {
                    principalToken = await contracts.loadTokenBySymbolAsync("MKR", TX_DEFAULTS);
                    principalTokenIndex = await contracts.getTokenIndexBySymbolAsync("MKR");
                });

                it("should return debt order with correctly packed values", async () => {
                    const encodedIndex = principalTokenIndex.toString().padStart(2, "0");
                    const termsContractParameters = `0x${encodedIndex}000000000429d069189e000000418c40001000000000000000000000000000`;

                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount,
                            principalTokenSymbol: "MKR",
                            interestRate,
                            amortizationUnit,
                            termLength,
                        }),
                    ).resolves.toEqual({
                        ...DebtOrder.DEFAULTS,
                        kernelVersion: debtKernelAddress,
                        issuanceVersion: repaymentRouterAddress,
                        principalAmount: Units.scaleUp(principalAmount, new BigNumber(18)),
                        principalToken: principalToken.address,
                        termsContract: simpleInterestTermsContract.address,
                        termsContractParameters,
                    });
                });
            });

            describe("Scenario #3", () => {
                const principalAmount = new BigNumber(200000);
                const interestRate = new BigNumber(0.0001);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.MONTHLY;
                const termLength = new BigNumber(12);

                beforeAll(async () => {
                    principalToken = await contracts.loadTokenBySymbolAsync("ZRX", TX_DEFAULTS);
                    principalTokenIndex = await contracts.getTokenIndexBySymbolAsync("ZRX");
                });

                it("should return debt order with correctly packed values", async () => {
                    const encodedIndex = principalTokenIndex.toString().padStart(2, "0");
                    const termsContractParameters = `0x${encodedIndex}00002a5a058fc295ed0000000000013000c000000000000000000000000000`;

                    await expect(
                        simpleInterestLoanAdapter.toDebtOrder({
                            principalAmount,
                            principalTokenSymbol: "ZRX",
                            interestRate,
                            amortizationUnit,
                            termLength,
                        }),
                    ).resolves.toEqual({
                        ...DebtOrder.DEFAULTS,
                        kernelVersion: debtKernelAddress,
                        issuanceVersion: repaymentRouterAddress,
                        principalAmount: Units.scaleUp(principalAmount, new BigNumber(18)),
                        principalToken: principalToken.address,
                        termsContract: simpleInterestTermsContract.address,
                        termsContractParameters,
                    });
                });
            });
        });
    });

    describe("#getRepaymentSchedule", () => {
        let simpleInterestTermsContractAddress: string;
        let termsContract;

        beforeAll(async () => {
            const simpleInterestTermsContract = await contracts.loadSimpleInterestTermsContract();
            simpleInterestTermsContractAddress = simpleInterestTermsContract.address;

            termsContract = simpleInterestTermsContractAddress;
        });

        describe("when the schedule is across 2 weeks", () => {
            test("it returns a list of 2 unix timestamps 1 week apart", async () => {
                const principalTokenIndex = new BigNumber(0);
                const principalAmount = new BigNumber(1);
                const interestRate = new BigNumber(1.23);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.WEEKLY;
                const termLength = new BigNumber(2);
                const contractTermsParameters = simpleInterestLoanTerms.packParameters({
                    principalTokenIndex,
                    principalAmount,
                    interestRate,
                    amortizationUnit,
                    termLength,
                });

                const issuanceTime = moment().unix();

                // Mock a debt registry entry that has some issuance time and the terms parameters.
                const debtRegistryEntry = {
                    version: "0",
                    beneficiary: "0",
                    underwriter: "0",
                    underwriterRiskRating: new BigNumber(0),
                    termsContract: termsContract,
                    termsContractParameters: contractTermsParameters,
                    issuanceBlockTimestamp: new BigNumber(issuanceTime),
                };

                const scheduleList = simpleInterestLoanAdapter.getRepaymentSchedule(
                    debtRegistryEntry,
                );

                expect(scheduleList).toEqual([
                    moment
                        .unix(issuanceTime)
                        .add(1, "week")
                        .unix(),
                    moment
                        .unix(issuanceTime)
                        .add(2, "weeks")
                        .unix(),
                ]);
            });
        });
    });

    describe("#fromDebtOrder()", () => {
        let simpleInterestTermsContractAddress: string;
        let principalTokenAddress: string;

        beforeAll(async () => {
            const simpleInterestTermsContract = await contracts.loadSimpleInterestTermsContract();
            simpleInterestTermsContractAddress = simpleInterestTermsContract.address;

            principalTokenAddress = await contracts.getTokenAddressBySymbolAsync("REP");
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

        describe("amortization specified in termsContractParameters is of invalid type", () => {
            it("should throw INVALID_AMORTIZATION_UNIT_TYPE", async () => {
                await expect(
                    simpleInterestLoanAdapter.fromDebtOrder({
                        principalToken: principalTokenAddress,
                        principalAmount: Units.ether(1),
                        termsContract: simpleInterestTermsContractAddress,
                        termsContractParameters:
                            "0x0000000000002a5b1b1e089f00d000006000c000000000000000000000000000",
                    }),
                ).rejects.toThrow(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("debt order is valid and well-formed", () => {
            let principalTokenSymbol;
            let principalToken;
            let termsContract;

            beforeAll(() => {
                termsContract = simpleInterestTermsContractAddress;
            });

            describe("Scenario #1", () => {
                const principalAmount = Units.ether(1);
                const interestRate = new BigNumber(0.14);
                const amortizationUnit = SimpleInterestLoanAdapter.Installments.WEEKLY;
                const termLength = new BigNumber(2);
                const termsContractParameters =
                    "0x00000000000de0b6b3a764000000057820002000000000000000000000000000";

                beforeAll(async () => {
                    const principalTokenIndex = new BigNumber(termsContractParameters.substr(2, 2));

                    principalTokenSymbol = await contracts.getTokenSymbolByIndexAsync(
                        principalTokenIndex,
                    );
                    principalToken = await contracts.getTokenAddressBySymbolAsync(
                        principalTokenSymbol,
                    );
                });

                it("should return SimpleInterestLoanOrder with correctly unpacked values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount,
                            principalToken,
                            termsContract,
                            termsContractParameters,
                        }),
                    ).resolves.toEqual({
                        principalAmount: Units.scaleDown(principalAmount, new BigNumber(18)),
                        principalToken,
                        principalTokenSymbol,
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
                    "0x01000000000429d069189e000000418c40001000000000000000000000000000";

                beforeAll(async () => {
                    const principalTokenIndex = new BigNumber(termsContractParameters.substr(2, 2));

                    principalTokenSymbol = await contracts.getTokenSymbolByIndexAsync(
                        principalTokenIndex,
                    );
                    principalToken = await contracts.getTokenAddressBySymbolAsync(
                        principalTokenSymbol,
                    );
                });

                it("should return SimpleInterestLoanOrder with correctly unpacked values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount,
                            principalToken,
                            termsContract,
                            termsContractParameters,
                        }),
                    ).resolves.toEqual({
                        principalAmount: Units.scaleDown(principalAmount, new BigNumber(18)),
                        principalToken,
                        principalTokenSymbol,
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
                    "0x0200002a5a058fc295ed0000000000013000c000000000000000000000000000";

                beforeAll(async () => {
                    const principalTokenIndex = new BigNumber(termsContractParameters.substr(2, 2));

                    principalTokenSymbol = await contracts.getTokenSymbolByIndexAsync(
                        principalTokenIndex,
                    );
                    principalToken = await contracts.getTokenAddressBySymbolAsync(
                        principalTokenSymbol,
                    );
                });

                it("should return SimpleInterestLoanOrder with correctly unpacked values", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtOrder({
                            principalAmount,
                            principalToken,
                            termsContract,
                            termsContractParameters,
                        }),
                    ).resolves.toEqual({
                        principalAmount: Units.scaleDown(principalAmount, new BigNumber(18)),
                        principalToken,
                        principalTokenSymbol,
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

    describe("#fromDebtRegistryEntry", () => {
        let termsContract: SimpleInterestTermsContractContract;
        let defaultDebtRegistryEntry: DebtRegistryEntry;

        beforeAll(async () => {
            termsContract = await contracts.loadSimpleInterestTermsContract();

            defaultDebtRegistryEntry = {
                version: repaymentRouterAddress,
                issuanceBlockTimestamp: new BigNumber(moment().unix()),
                beneficiary: ACCOUNTS[0].address,
                underwriter: ACCOUNTS[1].address,
                underwriterRiskRating: Units.percent(0.1),
                termsContract: termsContract.address,
                termsContractParameters:
                    "0x00000000000de0b6b3a764000000057820002000000000000000000000000000",
            };
        });

        describe("no principal token tracked at that index", () => {
            it("should throw CANNOT_FIND_TOKEN_WITH_INDEX", async () => {
                await expect(
                    simpleInterestLoanAdapter.fromDebtRegistryEntry({
                        ...defaultDebtRegistryEntry,
                        // Our test environment does not track a token at index 5 (which is packed
                        // into the first byte of the parameters)
                        termsContractParameters:
                            "0xff000000000de0b6b3a764000000057820002000000000000000000000000000",
                    }),
                ).rejects.toThrow(ContractsError.CANNOT_FIND_TOKEN_WITH_INDEX(255));
            });
        });

        describe("refers to incorrect terms contract", () => {
            it("should throw MISMATCHED_TERMS_CONTRACT", async () => {
                // We choose an arbitrary address to represent
                // a different terms contract's address.
                const nonSimpleInterestTermsContract = ACCOUNTS[3].address;

                await expect(
                    simpleInterestLoanAdapter.fromDebtRegistryEntry({
                        ...defaultDebtRegistryEntry,
                        termsContract: nonSimpleInterestTermsContract,
                    }),
                ).rejects.toThrow(
                    SimpleInterestAdapterErrors.MISMATCHED_TERMS_CONTRACT(
                        nonSimpleInterestTermsContract,
                    ),
                );
            });
        });

        describe("invalid amorization unit type", () => {
            it("should throw INVALID_AMORTIZATION_UNIT_TYPE", async () => {
                await expect(
                    simpleInterestLoanAdapter.fromDebtRegistryEntry({
                        ...defaultDebtRegistryEntry,
                        termsContractParameters:
                            "0x00000000000de0b6b3a764000000057850002000000000000000000000000000",
                    }),
                ).rejects.toThrow(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("entry parameters are valid", () => {
            describe("Scenario #1:", () => {
                let expectedLoanOrder: SimpleInterestLoanOrder;

                beforeAll(async () => {
                    const { termsContractParameters } = defaultDebtRegistryEntry;

                    const principalTokenIndex = new BigNumber(termsContractParameters.substr(2, 2));
                    const principalTokenSymbol = await contracts.getTokenSymbolByIndexAsync(
                        principalTokenIndex,
                    );

                    expectedLoanOrder = {
                        principalAmount: new BigNumber(1),
                        principalTokenSymbol,
                        interestRate: new BigNumber(0.14),
                        amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKLY,
                        termLength: new BigNumber(2),
                    };
                });

                it("should return correct simple interest loan order", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtRegistryEntry(defaultDebtRegistryEntry),
                    ).resolves.toEqual(expectedLoanOrder);
                });
            });

            describe("Scenario #2:", () => {
                let expectedLoanOrder: SimpleInterestLoanOrder;
                const termsContractParameters =
                    "0x01000000000429d069189e000000418c40001000000000000000000000000000";

                beforeAll(async () => {
                    const principalTokenIndex = new BigNumber(termsContractParameters.substr(2, 2));
                    const principalTokenSymbol = await contracts.getTokenSymbolByIndexAsync(
                        principalTokenIndex,
                    );

                    expectedLoanOrder = {
                        principalAmount: new BigNumber(0.3),
                        principalTokenSymbol,
                        interestRate: new BigNumber(1.678),
                        amortizationUnit: SimpleInterestLoanAdapter.Installments.YEARLY,
                        termLength: new BigNumber(1),
                    };
                });

                it("should return correct simple interest loan order", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtRegistryEntry({
                            ...defaultDebtRegistryEntry,
                            termsContractParameters,
                        }),
                    ).resolves.toEqual(expectedLoanOrder);
                });
            });

            describe("Scenario #3:", () => {
                let expectedLoanOrder: SimpleInterestLoanOrder;
                const termsContractParameters =
                    "0x0200002a5a058fc295ed0000000000013000c000000000000000000000000000";

                beforeAll(async () => {
                    const principalTokenIndex = new BigNumber(termsContractParameters.substr(2, 2));
                    const principalTokenSymbol = await contracts.getTokenSymbolByIndexAsync(
                        principalTokenIndex,
                    );

                    expectedLoanOrder = {
                        principalAmount: new BigNumber(200000),
                        principalTokenSymbol,
                        interestRate: new BigNumber(0.0001),
                        amortizationUnit: SimpleInterestLoanAdapter.Installments.MONTHLY,
                        termLength: new BigNumber(12),
                    };
                });

                it("should return correct simple interest loan order", async () => {
                    await expect(
                        simpleInterestLoanAdapter.fromDebtRegistryEntry({
                            ...defaultDebtRegistryEntry,
                            termsContractParameters,
                        }),
                    ).resolves.toEqual(expectedLoanOrder);
                });
            });
        });
    });
});
