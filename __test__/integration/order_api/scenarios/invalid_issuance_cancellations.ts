import { ACCOUNTS } from "__test__/accounts";
import * as moment from "moment";
import { OrderAPIErrors } from "src/apis/order_api";
import { DebtKernelContract, DummyTokenContract, RepaymentRouterContract } from "src/wrappers";
import { BigNumber } from "utils/bignumber";
import { NULL_BYTES32 } from "utils/constants";
import * as Units from "utils/units";
import { IssuanceCancellationScenario } from "./";

export const INVALID_ISSUANCE_CANCELLATIONS: IssuanceCancellationScenario[] = [
    {
        description: "Canceller is creditor",
        generateDebtOrderData: (
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
        canceller: ACCOUNTS[2].address,
        successfullyCancels: false,
        orderAlreadyCancelled: false,
        issuanceAlreadyCancelled: false,
        errorType: "UNAUTHORIZED_ISSUANCE_CANCELLATION",
        errorMessage: OrderAPIErrors.UNAUTHORIZED_ISSUANCE_CANCELLATION(),
    },
    {
        description: "Canceller is relayer",
        generateDebtOrderData: (
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
                underwriter: ACCOUNTS[3].address,
                underwriterFee: Units.ether(0.001),
                underwriterRiskRating: Units.percent(0.4),
                relayer: ACCOUNTS[4].address,
                relayerFee: Units.ether(0.001),
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
        canceller: ACCOUNTS[4].address,
        successfullyCancels: false,
        orderAlreadyCancelled: false,
        issuanceAlreadyCancelled: false,
        errorType: "UNAUTHORIZED_ISSUANCE_CANCELLATION",
        errorMessage: OrderAPIErrors.UNAUTHORIZED_ISSUANCE_CANCELLATION(),
    },
    {
        description: "Debt issuance commitment has already been cancelled",
        generateDebtOrderData: (
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
                underwriter: ACCOUNTS[3].address,
                underwriterFee: Units.ether(0.001),
                underwriterRiskRating: Units.percent(0.4),
                relayer: ACCOUNTS[4].address,
                relayerFee: Units.ether(0.001),
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
        canceller: ACCOUNTS[1].address,
        successfullyCancels: false,
        orderAlreadyCancelled: false,
        issuanceAlreadyCancelled: true,
        errorType: "ISSUANCE_ALREADY_CANCELLED",
        errorMessage: OrderAPIErrors.ISSUANCE_ALREADY_CANCELLED(),
    },
];
