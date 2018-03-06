import { DebtKernelContract, RepaymentRouterContract, DummyTokenContract } from "src/wrappers";
import * as Units from "utils/units";
import { NULL_ADDRESS, NULL_BYTES32 } from "utils/constants";
import * as moment from "moment";
import { BigNumber } from "bignumber.js";
import { DebtOrder } from "src/types";
import { ACCOUNTS } from "__test__/accounts";
import { FillScenario } from "./";

export const VALID_ORDERS: FillScenario[] = [
    {
        description: "valid order with underwriter unspecified",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                debtorFee: Units.ether(0.001),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.001),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.002),
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: false,
        },
        successfullyFills: true,
    },
    {
        description: "valid order with relayer unspecified",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                debtorFee: Units.ether(0.001),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.001),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.002),
                underwriterRiskRating: Units.percent(0.001),
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        successfullyFills: true,
    },
    {
        description: "valid order with neither underwriter nor relayer specified",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                creditor: ACCOUNTS[2].address,
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: false,
        },
        successfullyFills: true,
    },
    {
        description: "valid order with neither kernelVersion nor issuanceVersion specified",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                creditor: ACCOUNTS[2].address,
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: false,
        },
        successfullyFills: true,
    },
    {
        description: "valid order with no expiration specified",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                creditor: ACCOUNTS[2].address,
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: false,
        },
        successfullyFills: true,
    },
    {
        description: "valid order with no salt specified",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                creditor: ACCOUNTS[2].address,
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
            };
        },
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: false,
        },
        successfullyFills: true,
    },
    {
        description: "missing debtor signature but submitted by debtor",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                debtorFee: Units.ether(0.001),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.001),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.001),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.001),
                underwriterRiskRating: Units.percent(0.001),
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[1].address,
        signatories: {
            debtor: false,
            creditor: true,
            underwriter: true,
        },
        successfullyFills: true,
    },
    {
        description: "missing creditor signature but submitted by creditor",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                debtorFee: Units.ether(0.001),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.001),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.001),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.001),
                underwriterRiskRating: Units.percent(0.001),
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        successfullyFills: true,
    },
    {
        description: "missing underwriter signature but submitted by underwriter",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                debtorFee: Units.ether(0.001),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.001),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.001),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.001),
                underwriterRiskRating: Units.percent(0.001),
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[4].address,
        signatories: {
            debtor: true,
            creditor: true,
            underwriter: false,
        },
        successfullyFills: true,
    },
    {
        description:
            "all signatures present, submitted by neither creditor, debtor, nor underwriter",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                debtorFee: Units.ether(0.001),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.001),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.001),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.001),
                underwriterRiskRating: Units.percent(0.001),
                termsContract: ACCOUNTS[5].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        filler: ACCOUNTS[6].address,
        signatories: {
            debtor: true,
            creditor: true,
            underwriter: true,
        },
        successfullyFills: true,
    },
];
