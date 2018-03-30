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
    CollateralizedSimpleInterestLoanAdapter,
    CollateralizedLoanTerms,
    CollateralizedAdapterErrors,
    CollateralizedTermsContractParameters,
    CollateralizedSimpleInterestLoanOrder,
} from "src/adapters/collateralized_simple_interest_loan_adapter";

import { ContractsAPI, ContractsError } from "src/apis/contracts_api";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const web3Utils = new Web3Utils(web3);
const contracts = new ContractsAPI(web3);

const collateralizedSimpleInterestLoanAdapter = new CollateralizedSimpleInterestLoanAdapter(
    web3,
    contracts,
);
const collateralizedLoanTerms = new CollateralizedLoanTerms(web3, contracts);

const TX_DEFAULTS = { from: ACCOUNTS[0].address, gas: 4712388 };

describe("Collateralized Simple Interest Terms Contract Interface (Unit Tests)", () => {
    let snapshotId: number;

    beforeEach(async () => {
        snapshotId = await web3Utils.saveTestSnapshot();
    });

    afterEach(async () => {
        await web3Utils.revertToSnapshot(snapshotId);
    });

    const defaultLoanParams = {
        collateralTokenIndex: new BigNumber(0), // REP's index in the Token Registry is 0.
        collateralAmount: new BigNumber(3.5 * 10 ** 18),
        gracePeriodInDays: new BigNumber(5),
    };

    describe("#packParameters", () => {
        describe("...with invalid collateral token index", () => {
            test("should throw INVALID_TOKEN_INDEX error", () => {
                const invalidCollateralTokenIndex = new BigNumber(300);

                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...defaultLoanParams,
                        collateralTokenIndex: invalidCollateralTokenIndex,
                    });
                }).toThrow(
                    CollateralizedAdapterErrors.INVALID_TOKEN_INDEX(invalidCollateralTokenIndex),
                );
            });
        });
        describe("...with collateral amount > 2^92 - 1", () => {
            test("should throw COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...defaultLoanParams,
                        collateralAmount: new BigNumber(3.5 * 10 ** 38),
                    });
                }).toThrow(CollateralizedAdapterErrors.COLLATERAL_AMOUNT_EXCEEDS_MAXIMUM());
            });
        });
        describe("...with collateral amount < 0", () => {
            test("should throw COLLATERAL_AMOUNT_IS_NEGATIVE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...defaultLoanParams,
                        collateralAmount: new BigNumber(-1),
                    });
                }).toThrow(CollateralizedAdapterErrors.COLLATERAL_AMOUNT_IS_NEGATIVE());
            });
        });
        describe("...with collateral amount containing decimals", () => {
            test("should throw INVALID_DECIMAL_VALUE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...defaultLoanParams,
                        collateralAmount: new BigNumber(100.4567),
                    });
                }).toThrowError(CollateralizedAdapterErrors.INVALID_DECIMAL_VALUE());
            });
        });
        describe("...with grace period in days < 0", () => {
            test("should throw INVALID_INTEREST_RATE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...defaultLoanParams,
                        gracePeriodInDays: new BigNumber(-1),
                    });
                }).toThrowError(CollateralizedAdapterErrors.GRACE_PERIOD_IS_NEGATIVE());
            });
        });
        describe("...with grace period in days > 255", () => {
            test("should throw INVALID_INTEREST_RATE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...defaultLoanParams,
                        gracePeriodInDays: new BigNumber(256),
                    });
                }).toThrowError(CollateralizedAdapterErrors.GRACE_PERIOD_EXCEEDS_MAXIMUM());
            });
        });
        describe("...with grace period containing decimals", () => {
            test("should throw INVALID_DECIMAL_VALUE error", () => {
                expect(() => {
                    collateralizedLoanTerms.packParameters({
                        ...defaultLoanParams,
                        gracePeriodInDays: new BigNumber(1.567),
                    });
                }).toThrowError(CollateralizedAdapterErrors.INVALID_DECIMAL_VALUE());
            });
        });
        describe("...with valid collateral token index, collateral amount, and grace period in days", () => {
            describe("Scenario #1", () => {
                test("should return correctly packed parameters", () => {
                    expect(collateralizedLoanTerms.packParameters(defaultLoanParams)).toEqual(
                        "0x000000000000000000000000000000000000000000000030927f74c9de000005",
                    );
                });
            });
            describe("Scenario #2", () => {
                const collateralTokenIndex = new BigNumber(1);
                const collateralAmount = new BigNumber(723489020 * 10 ** 18);
                const gracePeriodInDays = new BigNumber(30);

                test("should return correctly packed parameters", () => {
                    expect(
                        collateralizedLoanTerms.packParameters({
                            collateralTokenIndex,
                            collateralAmount,
                            gracePeriodInDays,
                        }),
                    ).toEqual("0x00000000000000000000000000000000000000125674c25cd7f81d067000001e");
                });
            });
            describe("Scenario #3", () => {
                const collateralTokenIndex = new BigNumber(8);
                const collateralAmount = new BigNumber(1212234234 * 10 ** 18);
                const gracePeriodInDays = new BigNumber(90);

                test("should return correctly packed parameters", () => {
                    expect(
                        collateralizedLoanTerms.packParameters({
                            collateralTokenIndex,
                            collateralAmount,
                            gracePeriodInDays,
                        }),
                    ).toEqual("0x0000000000000000000000000000000000000083eabc9580d20c1abba800005a");
                });
            });
        });
    });
});
