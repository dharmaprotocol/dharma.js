// External
import { BigNumber } from "bignumber.js";
import * as moment from "moment";

// Wrappers
import {
    DebtKernelContract,
    RepaymentRouterContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

// Test Utils
import * as Units from "utils/units";
import { ACCOUNTS } from "__test__/accounts";
import { NULL_BYTES32 } from "utils/constants";

// Scenario
import { UnpackTermsScenario } from "./";

const defaultDebtOrder = (
    debtKernel: DebtKernelContract,
    repaymentRouter: RepaymentRouterContract,
    principalToken: DummyTokenContract,
    simpleInterestTermsContract: SimpleInterestTermsContractContract,
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
        termsContract: simpleInterestTermsContract.address,
        termsContractParameters: NULL_BYTES32,
        expirationTimestampInSec: new BigNumber(
            moment()
                .add(7, "days")
                .unix(),
        ),
        salt: new BigNumber(0),
    };
};

export const SUCCESSFUL_UNPACK_TERMS: UnpackTermsScenario[] = [
    {
        description: "terms contract corresponds to simple interest and parameters valid",
        generateDebtOrder: (
            debtKernel: DebtKernelContract,
            repaymentRouter: RepaymentRouterContract,
            principalToken: DummyTokenContract,
            simpleInterestTermsContract: SimpleInterestTermsContractContract,
        ) => {
            return {
                ...defaultDebtOrder(
                    debtKernel,
                    repaymentRouter,
                    principalToken,
                    simpleInterestTermsContract,
                ),
                termsContractParameters:
                    "0x00000000002ff62db077c000000230f010007000000000000000000000000000",
            };
        },
        throws: false,
        expectedParameters: {
            principalTokenIndex: new BigNumber(0), // REP's index in the Token Registry is 0
            principalAmount: new BigNumber(3.456 * 10 ** 18), // Principal Amount: 3.456e18
            interestRate: new BigNumber(14.36), // Interest Rate: 14.36%
            amortizationUnit: "days", // Daily installments
            termLength: new BigNumber(7), // 7 day term
        },
    },
];
