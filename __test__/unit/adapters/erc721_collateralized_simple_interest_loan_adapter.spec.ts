// Given that we rely on having access to the deployed Dharma smart contracts,
// we unmock the Dharma smart contracts artifacts package to pull the most recently
// deployed contracts on the current network.
jest.unmock("@dharmaprotocol/contracts");

// Unmock the "fs-extra" package in order to give us
// access to the deployed TokenRegistry on the
// test chain.
jest.unmock("fs-extra");

// External libraries
import * as moment from "moment";
import * as Web3 from "web3";
// Utils
import { BigNumber } from "../../../utils/bignumber";
import * as Units from "../../../utils/units";
import { Web3Utils } from "../../../utils/web3_utils";
import { ACCOUNTS } from "../../accounts";
// Wrappers
import { DebtKernelContract, RepaymentRouterContract } from "../../../src/wrappers";
// Types
import { DEBT_ORDER_DATA_DEFAULTS, DebtOrderData, DebtRegistryEntry } from "../../../src/types";
// Adapters
import {
    ERC721CollateralizedSimpleInterestLoanAdapter,
    ERC721CollateralizedSimpleInterestLoanOrder,
    ERC721CollateralizedTermsContractParameters,
    ERC721CollateralizerAdapterErrors,
} from "../../../src/adapters/erc721_collateralized_simple_interest/loan_adapter";
// Loan terms
import { ERC721CollateralizedLoanTerms } from "../../../src/adapters/erc721_collateralized_simple_interest/loan_terms";
// Loan adapters
import {
    SimpleInterestAdapterErrors,
    SimpleInterestLoanAdapter,
} from "../../../src/adapters/simple_interest_loan_adapter";
// Contracts API
import { ContractsAPI, ContractsError } from "../../../src/apis/contracts_api";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);
const contracts = new ContractsAPI(web3);

const collateralizedSimpleInterestLoanAdapter = new ERC721CollateralizedSimpleInterestLoanAdapter(
    web3,
    contracts,
);
const collateralizedLoanTerms = new ERC721CollateralizedLoanTerms(web3, contracts);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

interface Scenario {
    unpackedParams: ERC721CollateralizedTermsContractParameters;
    packedParams: string;
}

describe("ERC721 Collateralized Terms Contract Interface (Unit Tests)", () => {
    let snapshotId: number;

    beforeEach(async () => {
        snapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(snapshotId);
    });

    const scenario1: Scenario = {
        unpackedParams: {
            erc721ContractIndex: new BigNumber(0),
            tokenReference: new BigNumber(0),
            isEnumerable: new BigNumber(1),
        },
        packedParams: "0x0000000000000000000000000000000000000000000000000000000000000001",
    };

    const scenario2: Scenario = {
        unpackedParams: {
            erc721ContractIndex: new BigNumber(0),
            tokenReference: new BigNumber(0),
            isEnumerable: new BigNumber(0),
        },
        packedParams: "0x0000000000000000000000000000000000000000000000000000000000000000",
    };

    const scenario3: Scenario = {
        unpackedParams: {
            erc721ContractIndex: new BigNumber(0),
            tokenReference: new BigNumber(1),
            isEnumerable: new BigNumber(0),
        },
        packedParams: "0x0000000000000000000000000000000000000000000000000000000000000010",
    };

    const scenario4: Scenario = {
        unpackedParams: {
            erc721ContractIndex: new BigNumber(0),
            tokenReference: new BigNumber(1),
            isEnumerable: new BigNumber(1),
        },
        packedParams: "0x0000000000000000000000000000000000000000000000000000000000000011",
    };

    describe("#packParameters", () => {
        describe("with an invalid contract index", () => {
            test("should throw INVALID_TOKEN_INDEX error", async () => {
                // If there is 1 token contract in the registry, its index will be 0, and so on.
                const invalidERC721ContractIndex = new BigNumber(-1);

                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        erc721ContractIndex: invalidERC721ContractIndex,
                    });
                }).toThrow(
                    ERC721CollateralizerAdapterErrors.INVALID_CONTRACT_INDEX(
                        invalidERC721ContractIndex,
                    ),
                );
            });
        });

        describe("with an invalid isEnumerable", () => {
            test("should throw INVALID_IS_ENUMERABLE_FLAG error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        isEnumerable: new BigNumber(2),
                    });
                }).toThrow(ERC721CollateralizerAdapterErrors.INVALID_IS_ENUMERABLE_FLAG());
            });
        });

        describe("...with invalid token reference", () => {
            test("should throw INVALID_TOKEN_REFERENCE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...scenario1.unpackedParams,
                        tokenReference: new BigNumber(-1),
                    });
                }).toThrow(ERC721CollateralizerAdapterErrors.INVALID_TOKEN_REFERENCE());
            });
        });

        describe("...with valid ERC721 contract index, token reference, and isEnumerable", () => {
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

            describe("Scenario #4", () => {
                test("should return correctly packed parameters", () => {
                    expect(
                        collateralizedLoanTerms.packParameters(scenario4.unpackedParams),
                    ).toEqual(scenario4.packedParams);
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
    });
});

describe("Collateralized Simple Interest Loan Adapter (Unit Tests)", () => {
    interface AdapterScenario {
        debtOrderData: DebtOrderData;
        fullLoanOrder: ERC721CollateralizedSimpleInterestLoanOrder;
        minimalLoanOrder: ERC721CollateralizedSimpleInterestLoanOrder;
        entry: DebtRegistryEntry;
    }

    let scenario1: AdapterScenario;
    let scenario2: AdapterScenario;
    let scenario3: AdapterScenario;

    beforeAll(async () => {
        const debtKernel = await DebtKernelContract.deployed(web3, TX_DEFAULTS);
        const repaymentRouter = await RepaymentRouterContract.deployed(web3, TX_DEFAULTS);
        const termsContract = await contracts.loadERC721CollateralizedSimpleInterestTermsContract(
            TX_DEFAULTS,
        );

        const tokenSymbols = await Promise.all(
            [0, 1, 2].map((index) => contracts.getTokenSymbolByIndexAsync(new BigNumber(index))),
        );

        const tokenAddresses = await Promise.all(
            tokenSymbols.map((symbol) => contracts.getTokenAddressBySymbolAsync(symbol)),
        );

        const principalAmountForScenario1 = new BigNumber(1000 * 10 ** 18);
        const principalAmountForScenario2 = new BigNumber(12 * 10 ** 18);
        const principalAmountForScenario3 = new BigNumber(50 * 10 ** 18);

        const debtOrderDataBase = {
            ...DEBT_ORDER_DATA_DEFAULTS,
            kernelVersion: debtKernel.address,
            issuanceVersion: repaymentRouter.address,
            termsContract: termsContract.address,
        };

        const debtOrderDataForScenario1 = {
            ...debtOrderDataBase,
            principalAmount: principalAmountForScenario1,
            principalToken: tokenAddresses[0],
            termsContractParameters:
                "0x000000003635c9adc5dea000000003e830002000000000000000000000000001",
        };

        const debtOrderDataForScenario2 = {
            ...debtOrderDataBase,
            principalAmount: principalAmountForScenario2,
            principalToken: tokenAddresses[1],
            termsContractParameters:
            // Token Reference is 1; isEnumerable is true.
                "0x0100000000a688906bd8b000000004b040003000000000000000000000000011",
        };

        const debtOrderDataForScenario3 = {
            ...debtOrderDataBase,
            principalAmount: principalAmountForScenario3,
            principalToken: tokenAddresses[2],
            termsContractParameters:
            // Token Reference is 0; isEnumerable is false.
                "0x0200000002b5e3af16b18800000007d02000a000000000000000000000000000",
        };

        const loanOrderParamsForScenario1 = {
            principalTokenSymbol: tokenSymbols[0],
            principalAmount: principalAmountForScenario1,
            interestRate: new BigNumber(0.1),
            amortizationUnit: SimpleInterestLoanAdapter.Installments.MONTHLY,
            termLength: new BigNumber(2),
            // TODO: Pull this dynamically?
            erc721Symbol: "MET",
            tokenReference: new BigNumber(0),
            isEnumerable: true,
        };

        // Token reference of 1
        const loanOrderParamsForScenario2 = {
            principalTokenSymbol: tokenSymbols[1],
            principalAmount: principalAmountForScenario2,
            interestRate: new BigNumber(0.12),
            amortizationUnit: SimpleInterestLoanAdapter.Installments.YEARLY,
            termLength: new BigNumber(3),
            erc721Symbol: "MET",
            tokenReference: new BigNumber(1),
            isEnumerable: true,
        };

        // isEnumerable is false
        const loanOrderParamsForScenario3 = {
            principalTokenSymbol: tokenSymbols[2],
            principalAmount: principalAmountForScenario3,
            interestRate: new BigNumber(0.2),
            amortizationUnit: SimpleInterestLoanAdapter.Installments.WEEKLY,
            termLength: new BigNumber(10),
            erc721Symbol: "MET",
            tokenReference: new BigNumber(0),
            isEnumerable: false,
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
            debtOrderData: debtOrderDataForScenario1,
            fullLoanOrder: {
                ...debtOrderDataForScenario1,
                ...loanOrderParamsForScenario1,
            },
            minimalLoanOrder: loanOrderParamsForScenario1,
            entry: {
                ...debtRegistryEntryBase,
                termsContractParameters: debtOrderDataForScenario1.termsContractParameters,
            },
        };
        scenario2 = {
            debtOrderData: debtOrderDataForScenario2,
            fullLoanOrder: {
                ...debtOrderDataForScenario2,
                ...loanOrderParamsForScenario2,
            },
            minimalLoanOrder: loanOrderParamsForScenario2,
            entry: {
                ...debtRegistryEntryBase,
                termsContractParameters: debtOrderDataForScenario2.termsContractParameters,
            },
        };
        scenario3 = {
            debtOrderData: debtOrderDataForScenario3,
            fullLoanOrder: {
                ...debtOrderDataForScenario3,
                ...loanOrderParamsForScenario3,
            },
            minimalLoanOrder: loanOrderParamsForScenario3,
            entry: {
                ...debtRegistryEntryBase,
                termsContractParameters: debtOrderDataForScenario3.termsContractParameters,
            },
        };
    });

    describe("#toDebtOrder", () => {
        describe("collateralized simple interest loan's required parameter is missing or malformed", () => {
            describe("`erc721Symbol` is missing", () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder({
                            ...scenario1.minimalLoanOrder,
                            erc721Symbol: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "erc721Symbol"');
                });
            });
            describe("`erc721Symbol` is not tracked by Token Registry", () => {
                test("should throw CANNOT_FIND_TOKEN_WITH_SYMBOL", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder({
                            ...scenario1.minimalLoanOrder,
                            erc721Symbol: "XXX", // XXX is not tracked in our test env's registry
                        }),
                    ).rejects.toThrow(ContractsError.CANNOT_FIND_TOKEN_WITH_SYMBOL("XXX"));
                });
            });
            describe("`tokenReference` is missing", async () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder({
                            ...scenario1.minimalLoanOrder,
                            tokenReference: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "tokenReference"');
                });
            });
            describe("`isEnumerable` is missing", async () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder({
                            ...scenario1.minimalLoanOrder,
                            isEnumerable: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "isEnumerable"');
                });
            });
        });

        describe("erc721 collateralized simple interest loan's " +
            "required parameters are present and well-formed ", () => {
            describe("Scenario #1", () => {
                test("should return debt order with correctly packed values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder(
                            scenario1.minimalLoanOrder,
                        ),
                    ).resolves.toEqual(scenario1.debtOrderData);
                });
            });

            describe("Scenario #2", () => {
                test("should return debt order with correctly packed values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder(
                            scenario2.minimalLoanOrder,
                        ),
                    ).resolves.toEqual(scenario2.debtOrderData);
                });
            });

            describe("Scenario #3", () => {
                test("should return debt order with correctly packed values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.toDebtOrder(
                            scenario3.minimalLoanOrder,
                        ),
                    ).resolves.toEqual(scenario3.debtOrderData);
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
                            ...scenario1.debtOrderData,
                            termsContract: "invalid terms contract",
                        }),
                    ).rejects.toThrow("instance.termsContract does not match pattern");
                });
            });

            describe("missing termsContract", () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrderData,
                            termsContract: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "termsContract"');
                });
            });

            describe("missing termsContractParameters", () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrderData,
                            termsContractParameters: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "termsContractParameters"');
                });
            });

            describe("missing principalAmount", async () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrderData,
                            principalAmount: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "principalAmount"');
                });
            });

            describe("missing principalToken", async () => {
                test("should throw DOES_NOT_CONFORM_TO_SCHEMA", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                            ...scenario1.debtOrderData,
                            principalToken: undefined,
                        }),
                    ).rejects.toThrow('instance requires property "principalToken"');
                });
            });
        });

        describe("terms contract does not match principal token's " +
            "associated `ERC721CollateralizedSimpleInterestTermsContract`", () => {
            test("should throw MISMATCHED_TOKEN_SYMBOL", async () => {
                const principalTokenSymbol = await contracts.getTokenSymbolByIndexAsync(
                    new BigNumber(1),
                );

                await expect(
                    collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                        ...scenario1.debtOrderData,
                        // // the principal token index is encoded as 1 instead of 0.
                        termsContractParameters:
                            "0x010000003635c9adc5dea000000003e830002000000000000000000000000001",
                    }),
                ).rejects.toThrow(
                    ERC721CollateralizerAdapterErrors.MISMATCHED_TOKEN_SYMBOL(
                        scenario1.debtOrderData.principalToken,
                        principalTokenSymbol,
                    ),
                );
            });
        });

        describe("terms contract params contains token index out of bounds", () => {
            test("should throw CANNOT_FIND_TOKEN_WITH_INDEX", async () => {
                await expect(
                    collateralizedSimpleInterestLoanAdapter.fromDebtOrder({
                        ...scenario1.debtOrderData,
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
                        ...scenario1.debtOrderData,
                        // The amortization unit is encoded as 6 (which is invalid) instead of 3.
                        termsContractParameters:
                            "0x000000003635c9adc5dea000000003e8600020200000008ac7230489e800005a",
                    }),
                ).rejects.toThrow(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("debt order is valid and well-formed", () => {
            describe("Scenario #1", () => {
                test("should return `ERC721CollateralizedSimpleInterestLoanOrder` with correctly unpacked values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder(
                            scenario1.debtOrderData,
                        ),
                    ).resolves.toEqual(scenario1.fullLoanOrder);
                });
            });
            describe("Scenario #2", () => {
                test("should return `ERC721CollateralizedSimpleInterestLoanOrder` with correctly unpacked values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder(
                            scenario2.debtOrderData,
                        ),
                    ).resolves.toEqual(scenario2.fullLoanOrder);
                });
            });
            describe("Scenario #3", () => {
                test("should return `ERC721CollateralizedSimpleInterestLoanOrder` with correctly unpacked values", async () => {
                    await expect(
                        collateralizedSimpleInterestLoanAdapter.fromDebtOrder(
                            scenario3.debtOrderData,
                        ),
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
                    ERC721CollateralizerAdapterErrors.MISMATCHED_TERMS_CONTRACT(INVALID_ADDRESS),
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
