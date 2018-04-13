import { IssuanceCancellationScenario } from "./";
import { DebtKernelContract, RepaymentRouterContract, DummyTokenContract } from "src/wrappers";
import * as Units from "utils/units";
import { ACCOUNTS } from "__test__/accounts";
import { NULL_BYTES32 } from "utils/constants";
import * as moment from "moment";
import { BigNumber } from "utils/bignumber";

export const VALID_ISSUANCE_CANCELLATIONS: IssuanceCancellationScenario[] = [
    {
        description: "Canceller is debtor and issuance has not already been cancelled",
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
                debtorFee: Units.ether(0.002),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.002),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.002),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.002),
                underwriterRiskRating: Units.percent(0.5),
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
        description: "Canceller is underwriter and issuance has not already been cancelled",
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
                debtorFee: Units.ether(0.002),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.002),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.002),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.002),
                underwriterRiskRating: Units.percent(0.5),
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
        successfullyCancels: true,
        orderAlreadyCancelled: false,
        issuanceAlreadyCancelled: false,
    },
    {
        description: "Canceller is debtor and order (but not issuance) has already been cancelled",
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
                debtorFee: Units.ether(0.002),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.002),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.002),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.002),
                underwriterRiskRating: Units.percent(0.5),
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
        orderAlreadyCancelled: true,
        issuanceAlreadyCancelled: false,
    },
    {
        description:
            "Canceller is underwriter and order (but not issuance) has already been cancelled",
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
                debtorFee: Units.ether(0.002),
                creditor: ACCOUNTS[2].address,
                creditorFee: Units.ether(0.002),
                relayer: ACCOUNTS[3].address,
                relayerFee: Units.ether(0.002),
                underwriter: ACCOUNTS[4].address,
                underwriterFee: Units.ether(0.002),
                underwriterRiskRating: Units.percent(0.5),
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
        successfullyCancels: true,
        orderAlreadyCancelled: true,
        issuanceAlreadyCancelled: false,
    },
];
