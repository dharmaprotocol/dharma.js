import * as Units from "utils/units";
import * as moment from "moment";
import { BigNumber } from "utils/bignumber";
import { ACCOUNTS } from "__test__/accounts";
import { NULL_BYTES32, NULL_ADDRESS } from "utils/constants";

import { DebtKernelError, DebtOrder } from "src/types";
import {
    DebtOrderWrapper,
    DebtKernelContract,
    RepaymentRouterContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

import { DebtKernelErrorScenario } from "./error_scenarios";

export const INVALID_ORDERS: DebtKernelErrorScenario[] = [
    {
        description: "where principal < debtor fee",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            termsContract: SimpleInterestTermsContractContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(0.49),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[1].address,
                debtorFee: Units.ether(0.51),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.001),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.001),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.51),
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
        error: DebtKernelError.ORDER_INVALID_INSUFFICIENT_PRINCIPAL,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
    },
    {
        description: "with no underwriter but with underwriter fee",
        generateDebtOrder: (
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
                underwriter: NULL_ADDRESS,
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
        error: DebtKernelError.ORDER_INVALID_UNSPECIFIED_FEE_RECIPIENT,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: false,
        },
    },
    {
        description: "with a relayer fee but no assigned relayer",
        generateDebtOrder: (
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
                relayer: NULL_ADDRESS,
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
        error: DebtKernelError.ORDER_INVALID_UNSPECIFIED_FEE_RECIPIENT,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
    },
    {
        description: "creditor + debtor fee does not equal underwriter + relayer fee",
        generateDebtOrder: (
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
                relayerFee: Units.ether(0.004),
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
        error: DebtKernelError.ORDER_INVALID_INSUFFICIENT_OR_EXCESSIVE_FEES,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
    },
    {
        description: "order has already expired",
        generateDebtOrder: (
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
                        .subtract(7, "days")
                        .unix(),
                ),
                salt: new BigNumber(0),
            };
        },
        error: DebtKernelError.ORDER_EXPIRED,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
    },
    {
        description: "non-consensual order",
        generateDebtOrder: (
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
        error: DebtKernelError.ORDER_INVALID_NON_CONSENSUAL,
        signatories: {
            debtor: false,
            creditor: false,
            underwriter: false,
        },
    },
    {
        description: "insufficient balance",
        generateDebtOrder: (
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
        error: DebtKernelError.CREDITOR_BALANCE_OR_ALLOWANCE_INSUFFICIENT,
        creditorBalance: Units.ether(0),
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
    },
    {
        description: "order has been cancelled",
        generateDebtOrder: (
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
        error: DebtKernelError.ORDER_CANCELLED,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        beforeBlock: async (
            debtOrder: DebtOrder.DebtOrderInterface,
            debtKernel: DebtKernelContract,
        ) => {
            const debtOrderWrapper = new DebtOrderWrapper(debtOrder);

            await debtKernel.cancelDebtOrder.sendTransactionAsync(
                debtOrderWrapper.getOrderAddresses(),
                debtOrderWrapper.getOrderValues(),
                debtOrderWrapper.getOrderBytes32(),
                { from: debtOrder.debtor },
            );
        },
    },
    {
        description: "order has already been filled",
        generateDebtOrder: (
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
        error: DebtKernelError.DEBT_ISSUED,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        beforeBlock: async (
            debtOrder: DebtOrder.DebtOrderInterface,
            debtKernel: DebtKernelContract,
        ) => {
            const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

            return await debtKernel.fillDebtOrder.sendTransactionAsync(
                debtOrderWrapped.getCreditor(),
                debtOrderWrapped.getOrderAddresses(),
                debtOrderWrapped.getOrderValues(),
                debtOrderWrapped.getOrderBytes32(),
                debtOrderWrapped.getSignaturesV(),
                debtOrderWrapped.getSignaturesR(),
                debtOrderWrapped.getSignaturesS(),
                { from: debtOrderWrapped.getCreditor() },
            );
        },
    },
    {
        description: "issuance has been canceled",
        generateDebtOrder: (
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
        error: DebtKernelError.ISSUANCE_CANCELLED,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        beforeBlock: async (
            debtOrder: DebtOrder.DebtOrderInterface,
            debtKernel: DebtKernelContract,
        ) => {
            return await debtKernel.cancelIssuance.sendTransactionAsync(
                debtOrder.issuanceVersion,
                debtOrder.debtor,
                debtOrder.termsContract,
                debtOrder.termsContractParameters,
                debtOrder.underwriter,
                debtOrder.underwriterRiskRating,
                debtOrder.salt,
                { from: debtOrder.debtor },
            );
        },
    },
];
