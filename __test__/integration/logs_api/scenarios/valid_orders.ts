import { ACCOUNTS } from "__test__/accounts";
import * as moment from "moment";
import { BigNumber } from "utils/bignumber";
import { NULL_ADDRESS, NULL_BYTES32 } from "utils/constants";
import * as Units from "utils/units";

import { DebtKernelError, DebtOrderData } from "src/types";
import {
    DebtKernelContract,
    DebtOrderDataWrapper,
    DummyTokenContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

import { DebtKernelErrorScenario } from "./error_scenarios";

export const VALID_ORDERS: DebtKernelErrorScenario[] = [
    {
        description: "order is valid",
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
        signatories: {
            debtor: true,
            creditor: false,
            underwriter: true,
        },
    },
];
