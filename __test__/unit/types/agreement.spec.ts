import * as moment from "moment";

// Internal dependencies
import { Dharma, Web3 } from "../../../src";
import { Agreement, BaseLoanConstructorParams } from "../../../src/loan/agreement";
import { DebtOrderData, InterestRate, TimeInterval, TokenAmount } from "../../../src/types";

// Utils
import { BigNumber } from "../../../utils/bignumber";
import * as Units from "../../../utils/units";
import { ACCOUNTS } from "../../accounts";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const dharma = new Dharma(provider);

describe("Agreement (Unit)", () => {
    class MockAgreement extends Agreement {
        constructor(
            public dharmaInstance: Dharma,
            public params: BaseLoanConstructorParams,
            public data: DebtOrderData,
        ) {
            super(dharmaInstance, params, data);
        }
    }

    const constructorParams: BaseLoanConstructorParams = {
        principal: new TokenAmount(5, "REP"),
        collateral: new TokenAmount(10, "WETH"),
        interestRate: new InterestRate(10),
        termLength: new TimeInterval(5, "weeks"),
        expiresAt: 1000000000,
    };

    const debtOrderData: DebtOrderData = {
        kernelVersion: ACCOUNTS[0].address,
        issuanceVersion: ACCOUNTS[1].address,
        principalAmount: Units.ether(1),
        principalToken: ACCOUNTS[2].address,
        debtor: ACCOUNTS[3].address,
        debtorFee: Units.ether(0.001),
        debtorSignature: {
            r: "someString",
            s: "anotherString",
            v: 27,
        },
        creditor: ACCOUNTS[4].address,
        creditorFee: Units.ether(0.001),
        relayer: ACCOUNTS[5].address,
        relayerFee: Units.ether(0.001),
        underwriter: ACCOUNTS[6].address,
        underwriterFee: Units.ether(0.001),
        underwriterRiskRating: Units.percent(0.001),
        termsContract: ACCOUNTS[7].address,
        termsContractParameters: ACCOUNTS[8].address,
        expirationTimestampInSec: new BigNumber(11),
        salt: new BigNumber(0),
    };

    describe("instantiation", () => {
        test("should return an Agreement", () => {
            const agreement = new MockAgreement(dharma, constructorParams, debtOrderData);

            expect(agreement instanceof Agreement).toBeTruthy();
        });
    });

    describe("#getAgreementId", () => {
        test("should return the agreementId", () => {
            const agreement = new MockAgreement(dharma, constructorParams, debtOrderData);

            expect(agreement.getAgreementId()).toEqual(
                "0x6bbe6d0b0516ff9d9bcb84a69cfeb9857a21b3ce090f3230722ee781508097cb",
            );
        });
    });

    describe("#toJSON", () => {
        test("should return the JSON representation of the debt order data", () => {
            const agreement = new MockAgreement(dharma, constructorParams, debtOrderData);

            expect(agreement.toJSON()).toEqual({
                creditor: debtOrderData.creditor,
                creditorFee: "1000000000000000",
                creditorSignature: undefined,
                debtor: debtOrderData.debtor,
                debtorFee: "1000000000000000",
                debtorSignature: debtOrderData.debtorSignature,
                expirationTimestampInSec: "11",
                issuanceVersion: debtOrderData.issuanceVersion,
                kernelVersion: debtOrderData.kernelVersion,
                principalAmount: "1000000000000000000",
                principalToken: debtOrderData.principalToken,
                relayer: debtOrderData.relayer,
                relayerFee: "1000000000000000",
                salt: "0",
                termsContract: debtOrderData.termsContract,
                termsContractParameters: debtOrderData.termsContractParameters,
                underwriter: debtOrderData.underwriter,
                underwriterFee: "1000000000000000",
                underwriterRiskRating: "10000",
                underwriterSignature: undefined,
            });
        });
    });
});
