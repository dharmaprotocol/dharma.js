// External libraries
import * as moment from "moment";

// Wrappers
import {
    DebtKernelContract,
    DummyTokenContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
} from "../../../../src/wrappers";

// Utils
import { BigNumber } from "../../../../utils/bignumber";
import { NULL_BYTES32 } from "../../../../utils/constants";
import * as Units from "../../../../utils/units";

import { ACCOUNTS } from "../../../accounts";

import { FillScenario } from "./";

import { VALID_ORDERS } from "./valid_orders";

export const READY_TO_FILL_SCENARIOS: FillScenario[] = VALID_ORDERS.concat([
    {
        description: "valid order, without creditor signature",
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
            debtor: true,
            creditor: false,
            underwriter: true,
        },
        successfullyFills: true,
    },
]);
