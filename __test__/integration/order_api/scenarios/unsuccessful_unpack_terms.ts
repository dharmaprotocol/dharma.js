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

// Errors
import { ContractsError } from "src/apis/contracts_api";

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
        termsContractParameters:
            "0x00000000002ff62db077c000000230f010007000000000000000000000000000",
        expirationTimestampInSec: new BigNumber(
            moment()
                .add(7, "days")
                .unix(),
        ),
        salt: new BigNumber(0),
    };
};

export const UNSUCCESSFUL_UNPACK_TERMS: UnpackTermsScenario[] = [
    {
        description: "terms contract is not associated with any of the dharma.js adapters",
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
                termsContract: ACCOUNTS[4].address,
            };
        },
        throws: true,
        errorType: "NO_ADAPTER_FOR_TERMS_CONTRACT",
        errorMessage: ContractsError.TERMS_CONTRACT_NOT_FOUND(ACCOUNTS[4].address),
    },
];
