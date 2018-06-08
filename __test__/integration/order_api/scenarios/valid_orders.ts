import { ACCOUNTS } from "__test__/accounts";
import * as moment from "moment";
import { DebtOrderData } from "src/types";
import {
    CollateralizedSimpleInterestTermsContractContract,
    DebtKernelContract,
    DummyTokenContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";
import { BigNumber } from "utils/bignumber";
import { NULL_ADDRESS, NULL_BYTES32 } from "utils/constants";
import * as Units from "utils/units";
import { FillScenario } from "./";

export const VALID_ORDERS: FillScenario[] = [
    {
        description: "valid order with underwriter unspecified",
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
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
                termsContract: termsContract.address,
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
        description: "valid order using collateralized terms contract",
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: CollateralizedSimpleInterestTermsContractContract,
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
                termsContract: termsContract.address,
                termsContractParameters:
                    "0x000000003635c9adc5dea000000003e8300020200000008ac7230489e800005a",
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
        isCollateralized: true,
        collateralBalance: Units.ether(10),
        collateralAllowance: Units.ether(10),
        collateralTokenIndex: new BigNumber(2),
    },
    {
        description: "valid order with relayer unspecified",
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
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
                termsContract: termsContract.address,
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
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                creditor: ACCOUNTS[2].address,
                termsContract: termsContract.address,
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
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
        ) => {
            return {
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                creditor: ACCOUNTS[2].address,
                termsContract: termsContract.address,
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
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
        ) => {
            return {
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                creditor: ACCOUNTS[2].address,
                termsContract: termsContract.address,
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
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
        ) => {
            return {
                principalAmount: Units.ether(1),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                creditor: ACCOUNTS[2].address,
                termsContract: termsContract.address,
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
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
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
                termsContract: termsContract.address,
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
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
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
                termsContract: termsContract.address,
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
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
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
                termsContract: termsContract.address,
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
        generateDebtOrderData: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
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
                termsContract: termsContract.address,
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
