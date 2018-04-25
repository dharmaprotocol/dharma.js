// Given that we rely on having access to the deployed Dharma smart contracts,
// we unmock the Dharma smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

// Unmock the "fs-extra" package in order to give us
// access to the deployed TokenRegistry on the
// test chain.
jest.unmock("fs-extra");

// libraries
import * as moment from "moment";
import * as Web3 from "web3";

// utils
import { BigNumber } from "../../../utils/bignumber";
import * as Units from "../../../utils/units";
import { Web3Utils } from "../../../utils/web3_utils";
import { ACCOUNTS } from "../../accounts";

// wrappers
import {
    CollateralizedSimpleInterestTermsContractContract,
    DebtKernelContract,
    ERC20Contract,
    RepaymentRouterContract,
} from "../../../src/wrappers";

// types
import { DebtOrder, DebtRegistryEntry } from "../../../src/types";

// adapters
import {
    CollateralizedSimpleInterestLoanAdapter,
    CollateralizedSimpleInterestLoanOrder,
    CollateralizedTermsContractParameters,
    CollateralizerAdapterErrors,
} from "../../../src/adapters/collateralized_simple_interest_loan_adapter";
import { CollateralizedLoanTerms } from "../../../src/adapters/collateralized_simple_interest_loan_terms";
import {
    SimpleInterestAdapterErrors,
    SimpleInterestLoanAdapter,
} from "../../../src/adapters/simple_interest_loan_adapter";

import { ContractsAPI, ContractsError } from "../../../src/apis/contracts_api";
import { TokenAPI } from "../../../src/apis";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);
const contracts = new ContractsAPI(web3);
const tokenApi = new TokenAPI(web3, contracts);

const collateralizedSimpleInterestLoanAdapter = new CollateralizedSimpleInterestLoanAdapter(
    web3,
    contracts,
    tokenApi,
);
const collateralizedLoanTerms = new CollateralizedLoanTerms(web3, contracts);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

const REP_TOKEN_SYMBOL = "REP";
const ZRX_TOKEN_SYMBOL = "ZRX";
const MKR_TOKEN_SYMBOL = "MKR";

interface Scenario {
    unpackedParams: CollateralizedTermsContractParameters;
    packedParams: string;
}

describe("Collateralized Terms Contract Interface (Unit Tests)", () => {
    let snapshotId: number;

    beforeEach(async () => {
        snapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(snapshotId);
    });

    const scenario1: Scenario = {
        unpackedParams: {
            collateralTokenIndex: new BigNumber(0),
            collateralAmount: new BigNumber(3),
            gracePeriodInDays: new BigNumber(5),
        },
        packedParams: "0x0000000000000000000000000000000000000000000000000000000000000305",
    };

    const scenario2: Scenario = {
        unpackedParams: {
            collateralTokenIndex: new BigNumber(1),
            collateralAmount: new BigNumber(723489020),
            gracePeriodInDays: new BigNumber(30),
        },
        packedParams: "0x0000000000000000000000000000000000000010000000000000002b1f90fc1e",
    };

    const scenario3: Scenario = {
        unpackedParams: {
            collateralTokenIndex: new BigNumber(8),
            collateralAmount: new BigNumber(1212234234),
            gracePeriodInDays: new BigNumber(90),
        },
        packedParams: "0x000000000000000000000000000000000000008000000000000000484139fa5a",
    };

    describe("#packParameters", () => {
        describe("...with invalid collateral token index", () => {
            test("should throw INVALID_TOKEN_INDEX error", () => {
                const invalidCollateralTokenIndex = new BigNumber(300);

                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        collateralTokenIndex: invalidCollateralTokenIndex,
                    });
                }).toThrow(
                    CollateralizerAdapterErrors.INVALID_TOKEN_INDEX(invalidCollateralTokenIndex),
                );
            });
        });
        describe("...with collateral amount > 2^92 - 1", () => {
            test("should throw COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        collateralAmount: new BigNumber(3.5 * 10 ** 38),
                    });
                }).toThrow(CollateralizerAdapterErrors.COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM());
            });
        });
        describe("...with collateral amount < 0", () => {
            test("should throw COLLATERAL_AMOUNT_IS_NEGATIVE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        collateralAmount: new BigNumber(-1),
                    });
                }).toThrow(CollateralizerAdapterErrors.COLLATERAL_AMOUNT_IS_NEGATIVE());
            });
        });
        describe("...with collateral amount containing decimals", () => {
            test("should throw INVALID_DECIMAL_VALUE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        collateralAmount: new BigNumber(100.4567),
                    });
                }).toThrowError(CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
            });
        });
        describe("...with grace period in days < 0", () => {
            test("should throw GRACE_PERIOD_IS_NEGATIVE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        gracePeriodInDays: new BigNumber(-1),
                    });
                }).toThrowError(CollateralizerAdapterErrors.GRACE_PERIOD_IS_NEGATIVE());
            });
        });
        describe("...with grace period in days > 255", () => {
            test("should throw GRACE_PERIOD_EXCEEDS_MAXIMUM error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        gracePeriodInDays: new BigNumber(256),
                    });
                }).toThrowError(CollateralizerAdapterErrors.GRACE_PERIOD_EXCEEDS_MAXIMUM());
            });
        });
        describe("...with grace period containing decimals", () => {
            test("should throw INVALID_DECIMAL_VALUE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        gracePeriodInDays: new BigNumber(1.567),
                    });
                }).toThrowError(CollateralizerAdapterErrors.INVALID_DECIMAL_VALUE());
            });
        });
        describe("...with valid collateral token index, collateral amount, and grace period in days", () => {
            describe("Scenario #1", () => {
                test("should return correctly packed parameters", () => {
                    expect(
                        collateralizedLoanTerms.packParameters(scenario1.unpackedParams),
                    ).toEqual(scenario1.packedParams);
                });
            });
            describe("Scenario #2", () => {
                test("should return correctly packed parameters", () => {
                    expect(
                        collateralizedLoanTerms.packParameters(scenario2.unpackedParams),
                    ).toEqual(scenario2.packedParams);
                });
            });
            describe("Scenario #3", () => {
                test("should return correctly packed parameters", () => {
                    expect(
                        collateralizedLoanTerms.packParameters(scenario3.unpackedParams),
                    ).toEqual(scenario3.packedParams);
                });
            });
        });
    });

    describe("#unpackParameters", () => {
        describe("...with value that has too few bytes", () => {
            const termsContractParameters = "0x" + "f".repeat(63);

            test("should throw INVALID_PACKED_PARAMETERS error", () => {
                expect(() => {
                    collateralizedLoanTerms.unpackParameters(termsContractParameters);
                }).toThrowError(/Expected packedParams to conform to schema \/Bytes32/);
            });
        });
        describe("...with value that has too many bytes", () => {
            const termsContractParameters = "0x" + "f".repeat(65);

            test("should throw INVALID_PACKED_PARAMETERS error", () => {
                expect(() => {
                    collateralizedLoanTerms.unpackParameters(termsContractParameters);
                }).toThrowError(/Expected packedParams to conform to schema \/Bytes32/);
            });
        });
        describe("...with value that includes non-hexadecimal characters", () => {
            const termsContractParameters = "0x" + "z".repeat(64);

            test("should throw INVALID_PACKED_PARAMETERS error", () => {
                expect(() => {
                    collateralizedLoanTerms.unpackParameters(termsContractParameters);
                }).toThrowError(/Expected packedParams to conform to schema \/Bytes32/);
            });
        });
    });
    describe("...with valid termsContractParameters string", () => {
        describe("Scenario #1", () => {
            test("should return correctly unpacked parameters", () => {
                expect(collateralizedLoanTerms.unpackParameters(scenario1.packedParams)).toEqual(
                    scenario1.unpackedParams,
                );
            });
        });
        describe("Scenario #2", () => {
            test("should return correctly unpacked parameters", () => {
                expect(collateralizedLoanTerms.unpackParameters(scenario2.packedParams)).toEqual(
                    scenario2.unpackedParams,
                );
            });
        });
        describe("Scenario #3", () => {
            test("should return correctly unpacked parameters", () => {
                expect(collateralizedLoanTerms.unpackParameters(scenario3.packedParams)).toEqual(
                    scenario3.unpackedParams,
                );
            });
        });
    });
});

describe("Collateralized Simple Interest Loan Adapter (Unit Tests)", () => {
    interface AdapterScenario {
        debtOrder: DebtOrder.Instance;
        fullLoanOrder: CollateralizedSimpleInterestLoanOrder;
        minimalLoanOrder: CollateralizedSimpleInterestLoanOrder;
        entry: DebtRegistryEntry;
    }

    let scenario1: AdapterScenario;
    let scenario2: AdapterScenario;
    let scenario3: AdapterScenario;

    beforeAll(async () => {
        const debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS);
        const repaymentRouter = await RepaymentRouterContract.deployed(web3, TX_DEFAULTS);
        const termsContract = await contracts.loadCollateralizedSimpleInterestTermsContract(
            TX_DEFAULTS,
        );

        const tokenSymbols = await Promise.all(
            [0, 1, 2].map((index) => contracts.getTokenSymbolByIndexAsync(new BigNumber(index))),
        );

        const tokenAddresses = await Promise.all(
            tokenSymbols.map((symbol) => contracts.getTokenAddressBySymbolAsync(symbol)),
        );

        const principalAmountForScenario1 = new BigNumber(1000);
        const principalAmountForScenario2 = new BigNumber(12);
        const principalAmountForScenario3 = new BigNumber(50);

        const debtOrderBase = {
            ...DebtOrder.DEFAULTS,
            kernelVersion: debtKernel.address,
            issuanceVersion: repaymentRouter.address,
            termsContract: termsContract.address,
        };

        const debtOrderForScenario1 = {
            ...debtOrderBase,
            principalAmount: Units.scaleUp(principalAmountForScenario1, new BigNumber(18)),
            principalToken: tokenAddresses[0],
            termsContractParameters:
                "0x000000003635c9adc5dea000000003e8300020200000008ac7230489e800005a",
        };

        const debtOrderForScenario2 = {
            ...debtOrderBase,
            principalAmount: Units.scaleUp(principalAmountForScenario2, new BigNumber(18)),
            principalToken: tokenAddresses[1],
            termsContractParameters:
                "0x0100000000a688906bd8b000000004b0400030000000004563918244f4000078",
        };

        const debtOrderForScenario3 = {
            ...debtOrderBase,
            principalAmount: Units.scaleUp(principalAmountForScenario3, new BigNumber(18)),
            principalToken: tokenAddresses[2],
            termsContractParameters:
                "0x0200000002b5e3af16b18800000007d02000a010000001bc16d674ec8000000a",
        };

        const loanOrderParamsForScenario1 = {
            principalTokenSymbol: tokenSymbols[0],
            principalAmount: principalAmountForScenario1,
            interestRate: new BigNumber(0.1),
            amortizationUnit: SimpleInterestLoanAdapter.Installments.MONTHLY,
            termLength: new BigNumber(2),
            collateralTokenSymbol: tokenSymbols[2],
            collateralAmount: new BigNumber(10),
            gracePeriodInDays: new BigNumber(90),
        };

        const loanOrderParamsForScenario2 = {
            principalTokenSymbol: tokenSymbols[1],
            principalAmount: principalAmountForScenario2,
            interestRate: new BigNumber(0.12),
            amortizationUnit: SimpleInterestLoanAdapter.Installments.YEARLY,
            termLength: new BigNumber(3),
            collateralTokenSymbol: tokenSymbols[0],
            collateralAmount: new BigNumber(5),
            gracePeriodInDays: new BigNumber(120),
        };

        const loanOrderParamsForScenario3 = {
            principalTokenSymbol: tokenSymbols[2],
            principalAmount: principalAmountForScenario3,
            interestRate: new BigNumber(0.2),
            amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKLY,
            termLength: new BigNumber(10),
            collateralTokenSymbol: tokenSymbols[1],
            collateralAmount: new BigNumber(32),
            gracePeriodInDays: new BigNumber(10),
        };

        const debtRegistryEntryBase = {
            version: repaymentRouter.address,
            beneficiary: ACCOUNTS[0].address,
            underwriter: ACCOUNTS[1].address,
            underwriterRiskRating: Units.percent(0.1),
            termsContract: termsContract.address,
            issuanceBlockTimestamp: new BigNumber(moment().unix()),
        };

        scenario1 = {
            debtOrder: debtOrderForScenario1,
            fullLoanOrder: {
                ...debtOrderForScenario1,
                ...loanOrderParamsForScenario1,
            },
            minimalLoanOrder: loanOrderParamsForScenario1,
            entry: {
                ...debtRegistryEntryBase,
                termsContractParameters: debtOrderForScenario1.termsContractParameters,
            },
        };
        scenario2 = {
            debtOrder: debtOrderForScenario2,
            fullLoanOrder: {
                ...debtOrderForScenario2,
                ...loanOrderParamsForScenario2,
            },
            minimalLoanOrder: loanOrderParamsForScenario2,
            entry: {
                ...debtRegistryEntryBase,
                termsContractParameters: debtOrderForScenario2.termsContractParameters,
            },
        };
        scenario3 = {
            debtOrder: debtOrderForScenario3,
            fullLoanOrder: {
                ...debtOrderForScenario3,
                ...loanOrderParamsForScenario3,
            },
            minimalLoanOrder: loanOrderParamsForScenario3,
            entry: {
                ...debtRegistryEntryBase,
                termsContractParameters: debtOrderForScenario3.termsContractParameters,
            },
        };
    });

    describe("#toDebtOrder", () => {
        describe("collateralized simple interest loan's required parameter is missing or malformed", () => {
            describe("`collateralTokenSymbol` is missing", () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder({
                            ...scenario1.minimalLoanOrder,
                            collateralTokenSymbol: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "collateralTokenSymbol"');
                });
            });
            describe("`collateralTokenSymbol` is not tracked by Token Registry", () => {
                test("should throw CANNOT_FIND_TOKEN_WITH_SYMBOL", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder({
                            ...scenario1.minimalLoanOrder,
                            collateralTokenSymbol: "XXX", // XXX is not tracked in our test env's registry
                        }),
                    ).rejects.toThrow(ContractsError.CANNOT_FIND_TOKEN_WITH_SYMBOL("XXX"));
                });
            });
            describe("`collateralAmount` is missing", async () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder({
                            ...scenario1.minimalLoanOrder,
                            collateralAmount: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "collateralAmount"');
                });
            });
            describe("`gracePeriodInDays` is missing", async () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder({
                            ...scenario1.minimalLoanOrder,
                            gracePeriodInDays: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "gracePeriodInDays"');
                });
            });
        });

        describe("collateralized simple interest loan's required parameters are present and well-formed ", () => {
            describe("Scenario #1", () => {
                test("should return debt order with correctly packed values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder(
                            scenario1.minimalLoanOrder,
                        ),
                    ).resolves.toEqual(scenario1.debtOrder);
                });
            });
            describe("Scenario #2", () => {
                test("should return debt order with correctly packed values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder(
                            scenario2.minimalLoanOrder,
                        ),
                    ).resolves.toEqual(scenario2.debtOrder);
                });
            });
            describe("Scenario #3", () => {
                test("should return debt order with correctly packed values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder(
                            scenario3.minimalLoanOrder,
                        ),
                    ).resolves.toEqual(scenario3.debtOrder);
                });
            });
        });
    });

    describe("#fromDebtOrder()", () => {
        describe("argument does not conform to the DebtOrderWithTermsSpecified schema", () => {
            describe("malformed terms contract", () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrder,
                            termsContract: "invalid terms contract",
                        }),
                    ).rejects.toThrow("instance.termsContract does not match pattern");
                });
            });

            describe("missing termsContract", () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrder,
                            termsContract: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "termsContract"');
                });
            });

            describe("missing termsContractParameters", () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrder,
                            termsContractParameters: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "termsContractParameters"');
                });
            });

            describe("missing principalAmount", async () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrder,
                            principalAmount: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "principalAmount"');
                });
            });

            describe("missing principalToken", async () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrder,
                            principalToken: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "principalToken"');
                });
            });
        });

        describe("terms contract does not match principal token's associated `CollateralizedSimpleInterestTermsContract`", () => {
            test("should throw MISMATCHED_TOKEN_SYMBOL", async () => {
                const principalTokenSymbol = await contracts.getTokenSymbolByIndexAsync(
                    new BigNumber(1),
                );

                await expect(
                    collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                        ...scenario1.debtOrder,
                        // the principal token index is encoded as 1 instead of 0.
                        termsContractParameters:
                            "0x010000003635c9adc5dea000000003e8300020200000008ac7230489e800005a",
                    }),
                ).rejects.toThrow(
                    CollateralizerAdapterErrors.MISMATCHED_TOKEN_SYMBOL(
                        scenario1.debtOrder.principalToken,
                        principalTokenSymbol,
                    ),
                );
            });
        });

        describe("terms contract params contains token index out of bounds", () => {
            test("should throw CANNOT_FIND_TOKEN_WITH_INDEX", async () => {
                await expect(
                    collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                        ...scenario1.debtOrder,
                        // the principal token index is encoded as 255, which does not map to any
                        // token listed in our `TokenRegistry`
                        termsContractParameters:
                            "0xff0000003635c9adc5dea000000003e8300020200000008ac7230489e800005a",
                    }),
                ).rejects.toThrow(ContractsError.CANNOT_FIND_TOKEN_WITH_INDEX(255));
            });
        });

        describe("amortization specified in termsContractParameters is of invalid type", () => {
            it("should throw INVALID_AMORTIZATION_UNIT_TYPE", async () => {
                await expect(
                    collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                        ...scenario1.debtOrder,
                        // The amortization unit is encoded as 6 (which is invalid) instead of 3.
                        termsContractParameters:
                            "0x000000003635c9adc5dea000000003e8600020200000008ac7230489e800005a",
                    }),
                ).rejects.toThrow(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("debt order is valid and well-formed", () => {
            describe("Scenario #1", () => {
                test("should return `CollateralizedSimpleInterestLoanOrder` with correctly unpacked values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder(scenario1.debtOrder),
                    ).resolves.toEqual(scenario1.fullLoanOrder);
                });
            });
            describe("Scenario #2", () => {
                test("should return `CollateralizedSimpleInterestLoanOrder` with correctly unpacked values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder(scenario2.debtOrder),
                    ).resolves.toEqual(scenario2.fullLoanOrder);
                });
            });
            describe("Scenario #3", () => {
                test("should return `CollateralizedSimpleInterestLoanOrder` with correctly unpacked values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder(scenario3.debtOrder),
                    ).resolves.toEqual(scenario3.fullLoanOrder);
                });
            });
        });
    });
    describe("#fromDebtRegistryEntry", () => {
        describe("no principal token tracked at that index", () => {
            it("should throw CANNOT_FIND_TOKEN_WITH_INDEX", async () => {
                await expect(
                    collateralizedSimpleInterestLoanAdapter.fromDebtRegistryEntry({
                        ...scenario1.entry,
                        // Our test environment does not track a token at index 255 (which is packed
                        // into the first byte of the parameters)
                        termsContractParameters:
                            "0xff000000000de0b6b3a764000000057820002000000000000000000000000000",
                    }),
                ).rejects.toThrow(ContractsError.CANNOT_FIND_TOKEN_WITH_INDEX(255));
            });
        });

        describe("refers to incorrect terms contract", () => {
            test("should throw MISMATCHED_TERMS_CONTRACT", async () => {
                // We choose an arbitrary address to represent
                // a different terms contract's address.
                const INVALID_ADDRESS = ACCOUNTS[3].address;

                await expect(
                    collateralizedSimpleInterestLoanAdapter.fromDebtRegistryEntry({
                        ...scenario1.entry,
                        termsContract: INVALID_ADDRESS,
                    }),
                ).rejects.toThrow(
                    CollateralizerAdapterErrors.MISMATCHED_TERMS_CONTRACT(INVALID_ADDRESS),
                );
            });
        });

        describe("entry parameters are valid", () => {
            describe("Scenario #1:", () => {
                test("should return correct collateralized simple interest loan order", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtRegistryEntry(
                            scenario1.entry,
                        ),
                    ).resolves.toEqual(scenario1.minimalLoanOrder);
                });
            });
            describe("Scenario #2:", () => {
                test("should return correct collateralized simple interest loan order", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtRegistryEntry(
                            scenario2.entry,
                        ),
                    ).resolves.toEqual(scenario2.minimalLoanOrder);
                });
            });
            describe("Scenario #3:", () => {
                test("should return correct collateralized simple interest loan order", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtRegistryEntry(
                            scenario3.entry,
                        ),
                    ).resolves.toEqual(scenario3.minimalLoanOrder);
                });
            });
        });
    });
});
