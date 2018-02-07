import {
    SimpleInterestAdapter,
    SimpleInterestAdapterErrors,
    AmortizationUnitType,
} from "src/adapters/simple_interest_adapter";
import { ContractsAPI } from "src/apis";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const contracts = new ContractsAPI(web3);
const simpleInterestAdapter = new SimpleInterestAdapter(contracts);

describe("Simple Interest Terms Contract Adapter (Unit Tests)", () => {
    describe("#packParameters", () => {
        describe("...with total expected repayment > 2^128 - 1", () => {
            const expectedRepaymentValue = new BigNumber(3.5 * 10 ** 38);
            const amortizationUnitType = AmortizationUnitType.DAYS;
            const termLengthInAmortizationUnits = new BigNumber(7);

            test("should throw INVALID_EXPECTED_REPAYMENT_VALUE error", () => {
                expect(() => {
                    simpleInterestAdapter.packParameters(
                        expectedRepaymentValue,
                        amortizationUnitType,
                        termLengthInAmortizationUnits,
                    );
                }).toThrow(SimpleInterestAdapterErrors.INVALID_EXPECTED_REPAYMENT_VALUE());
            });
        });

        describe("...with total expected repayment < 0", () => {
            const expectedRepaymentValue = new BigNumber(-1);
            const amortizationUnitType = AmortizationUnitType.DAYS;
            const termLengthInAmortizationUnits = new BigNumber(7);

            test("should throw INVALID_EXPECTED_REPAYMENT_VALUE error", () => {
                expect(() => {
                    simpleInterestAdapter.packParameters(
                        expectedRepaymentValue,
                        amortizationUnitType,
                        termLengthInAmortizationUnits,
                    );
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_EXPECTED_REPAYMENT_VALUE());
            });
        });

        describe("...with amortization unit > 4", () => {
            const expectedRepaymentValue = new BigNumber(100);
            const amortizationUnitType = 5;
            const termLengthInAmortizationUnits = new BigNumber(7);

            test("should throw INVALID_AMORTIZATION_UNIT_TYPE error", () => {
                expect(() => {
                    simpleInterestAdapter.packParameters(
                        expectedRepaymentValue,
                        amortizationUnitType,
                        termLengthInAmortizationUnits,
                    );
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("...with amortization unit < 0", () => {
            const expectedRepaymentValue = new BigNumber(100);
            const amortizationUnitType = -1;
            const termLengthInAmortizationUnits = new BigNumber(7);

            test("should throw INVALID_AMORTIZATION_UNIT_TYPE error", () => {
                expect(() => {
                    simpleInterestAdapter.packParameters(
                        expectedRepaymentValue,
                        amortizationUnitType,
                        termLengthInAmortizationUnits,
                    );
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_AMORTIZATION_UNIT_TYPE());
            });
        });

        describe("...with term length > 2^120 - 1", () => {
            const expectedRepaymentValue = new BigNumber(100);
            const amortizationUnitType = 0;
            const termLengthInAmortizationUnits = new BigNumber(3.5 * 10 ** 38);

            test("should throw INVALID_TERM_LENGTH error", () => {
                expect(() => {
                    simpleInterestAdapter.packParameters(
                        expectedRepaymentValue,
                        amortizationUnitType,
                        termLengthInAmortizationUnits,
                    );
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
            });
        });

        describe("...with term length < 0", () => {
            const expectedRepaymentValue = new BigNumber(100);
            const amortizationUnitType = 0;
            const termLengthInAmortizationUnits = new BigNumber(-1);

            test("should throw INVALID_TERM_LENGTH error", () => {
                expect(() => {
                    simpleInterestAdapter.packParameters(
                        expectedRepaymentValue,
                        amortizationUnitType,
                        termLengthInAmortizationUnits,
                    );
                }).toThrowError(SimpleInterestAdapterErrors.INVALID_TERM_LENGTH());
            });
        });

        describe("...with valid expected repayment, amortization, and term length", () => {
            describe("Scenario #1", () => {
                const expectedRepaymentValue = new BigNumber(3.456 * 10 ** 18);
                const amortizationUnitType = AmortizationUnitType.DAYS;
                const termLengthInAmortizationUnits = new BigNumber(7);

                test("should return correctly packed hash", () => {
                    expect(
                        simpleInterestAdapter.packParameters(
                            expectedRepaymentValue,
                            amortizationUnitType,
                            termLengthInAmortizationUnits,
                        ),
                    ).toEqual("0x00000000000000002ff62db077c0000001000000000000000000000000000007");
                });
            });

            describe("Scenario #2", () => {
                const expectedRepaymentValue = new BigNumber(723489020 * 10 ** 18);
                const amortizationUnitType = AmortizationUnitType.YEARS;
                const termLengthInAmortizationUnits = new BigNumber(4);

                test("should return correctly packed hash", () => {
                    expect(
                        simpleInterestAdapter.packParameters(
                            expectedRepaymentValue,
                            amortizationUnitType,
                            termLengthInAmortizationUnits,
                        ),
                    ).toEqual("0x00000000025674c25cd7f81d0670000004000000000000000000000000000004");
                });
            });

            describe("Scenario #3", () => {
                const expectedRepaymentValue = new BigNumber(0.0000023232312 * 10 ** 18);
                const amortizationUnitType = AmortizationUnitType.MONTHS;
                const termLengthInAmortizationUnits = new BigNumber(12);

                test("should return correctly packed hash", () => {
                    expect(
                        simpleInterestAdapter.packParameters(
                            expectedRepaymentValue,
                            amortizationUnitType,
                            termLengthInAmortizationUnits,
                        ),
                    ).toEqual("0x00000000000000000000021ceb5ed3000300000000000000000000000000000c");
                });
            });
        });
    });
});
