import {
    DebtKernelContract,
    RepaymentRouterContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
    CollateralizedSimpleInterestTermsContractContract,
} from "src/wrappers";
import * as Units from "utils/units";
import * as moment from "moment";
import { DebtOrder } from "src/types";
import { DebtOrderWrapper } from "src/wrappers";
import { BigNumber } from "utils/bignumber";
import { ACCOUNTS } from "__test__/accounts";
import { NULL_ADDRESS, NULL_BYTES32 } from "utils/constants";
import { OrderAPIErrors } from "src/apis/order_api";

import { FillScenario } from "./";

export const INVALID_ORDERS: FillScenario[] = [
    {
        description: "with principal < debtor fee",
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
                underwriterFee: Units.ether(0.511),
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
        successfullyFills: false,
        errorType: "INVALID_DEBTOR_FEE",
        errorMessage: OrderAPIErrors.INVALID_DEBTOR_FEE(),
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
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: false,
        },
        successfullyFills: false,
        errorType: "INVALID_UNDERWRITER_FEE",
        errorMessage: OrderAPIErrors.INVALID_UNDERWRITER_FEE(),
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
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        successfullyFills: false,
        errorType: "INVALID_RELAYER_FEE",
        errorMessage: OrderAPIErrors.INVALID_RELAYER_FEE(),
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
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        successfullyFills: false,
        errorType: "INVALID_FEES",
        errorMessage: OrderAPIErrors.INVALID_FEES(),
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
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        successfullyFills: false,
        errorType: "EXPIRED",
        errorMessage: OrderAPIErrors.EXPIRED(),
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
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        successfullyFills: false,
        errorType: "DEBT_ORDER_CANCELLED",
        errorMessage: OrderAPIErrors.ORDER_CANCELLED(),
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
        filler: ACCOUNTS[2].address,
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        successfullyFills: false,
        errorType: "DEBT_ORDER_ALREADY_FILLED",
        errorMessage: OrderAPIErrors.DEBT_ORDER_ALREADY_FILLED(),
        beforeBlock: async (
            debtOrder: DebtOrder.DebtOrderInterface,
            debtKernel: DebtKernelContract,
        ) => {
            const debtOrderWrapped = new DebtOrderWrapper(debtOrder);

            await debtKernel.fillDebtOrder.sendTransactionAsync(
                debtOrderWrapped.getCreditor(),
                debtOrderWrapped.getOrderAddresses(),
                debtOrderWrapped.getOrderValues(),
                debtOrderWrapped.getOrderBytes32(),
                debtOrderWrapped.getSignaturesV(),
                debtOrderWrapped.getSignaturesR(),
                debtOrderWrapped.getSignaturesS(),
                { from: debtOrder.creditor },
            );
        },
    },
    {
        description: "collateral allowance is insufficient",
        generateDebtOrder: (
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
                /**
                 * Principal token index is 0
                 * Principal Amount: 1e18
                 * Interest Rate: 0.1%
                 * Monthly installments
                 * 7 day term length
                 * 10 units of collateral
                 * Collateral token index is 2
                 * Grace period is 90 days
                 */
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
        successfullyFills: false,
        errorType: "INSUFFICIENT_COLLATERALIZER_ALLOWANCE",
        errorMessage: OrderAPIErrors.INSUFFICIENT_COLLATERALIZER_ALLOWANCE(),
        isCollateralized: true,
        collateralBalance: Units.ether(10),
        // Collateral allowance is insufficient by 1 unit.
        collateralAllowance: Units.ether(9),
        collateralTokenIndex: new BigNumber(2),
    },
    {
        description: "collateral balance is insufficient",
        generateDebtOrder: (
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
                /**
                 * Principal token index is 0
                 * Principal Amount: 1e18
                 * Interest Rate: 0.1%
                 * Monthly installments
                 * 7 day term length
                 * 10 units of collateral
                 * Collateral token index is 2
                 * Grace period is 90 days
                 */
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
        successfullyFills: false,
        errorType: "INSUFFICIENT_COLLATERALIZER_BALANCE",
        errorMessage: OrderAPIErrors.INSUFFICIENT_COLLATERALIZER_BALANCE(),
        isCollateralized: true,
        // Collateral balance is insufficient by 1 unit.
        collateralBalance: Units.ether(9),
        collateralAllowance: Units.ether(10),
        collateralTokenIndex: new BigNumber(2),
    },
];
