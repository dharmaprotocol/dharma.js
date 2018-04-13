import { OrderCancellationScenario } from "./";
import { DebtKernelContract, RepaymentRouterContract, DummyTokenContract } from "src/wrappers";
import * as Units from "utils/units";
import { ACCOUNTS } from "__test__/accounts";
import { NULL_BYTES32 } from "utils/constants";
import * as moment from "moment";
import { BigNumber } from "utils/bignumber";
import { OrderAPIErrors } from "src/apis/order_api";

export const VALID_ORDER_CANCELLATIONS: OrderCancellationScenario[] = [
    {
        description: "Canceller is debtor and order has not already been cancelled (Order #1)",
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
        canceller: ACCOUNTS[1].address,
        successfullyCancels: true,
        orderAlreadyCancelled: false,
        issuanceAlreadyCancelled: false,
    },
    {
        description: "Canceller is debtor and order has not already been cancelled (Order #2)",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                kernelVersion: debtKernel.address,
                issuanceVersion: repaymentRouter.address,
                principalAmount: Units.ether(3),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[4].address,
                debtorFee: Units.ether(0),
                creditor: ACCOUNTS[5].address,
                creditorFee: Units.ether(0),
                termsContract: ACCOUNTS[6].address,
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
        successfullyCancels: true,
        orderAlreadyCancelled: false,
        issuanceAlreadyCancelled: false,
    },
    {
        description: "Canceller is debtor and order has not already been cancelled (Order #3)",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
        ) => {
            return {
                principalAmount: Units.ether(100),
                principalToken: principalToken.address,
                debtor: ACCOUNTS[6].address,
                debtorFee: Units.ether(0),
                creditor: ACCOUNTS[7].address,
                creditorFee: Units.ether(0),
                termsContract: ACCOUNTS[6].address,
                termsContractParameters: NULL_BYTES32,
                expirationTimestampInSec: new BigNumber(
                    moment()
                        .add(31, "days")
                        .unix(),
                ),
                salt: new BigNumber(18),
            };
        },
        canceller: ACCOUNTS[6].address,
        successfullyCancels: true,
        orderAlreadyCancelled: false,
        issuanceAlreadyCancelled: false,
    },
];
