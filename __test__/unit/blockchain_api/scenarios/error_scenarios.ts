import { DebtOrder, DebtKernelError, RepaymentRouterError } from "src/types";
import { BigNumber } from "utils/bignumber";

import {
    DebtKernelContract,
    RepaymentRouterContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

export interface DebtKernelErrorScenario {
    description: string;
    generateDebtOrder: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
        termsContract: SimpleInterestTermsContractContract,
    ) => DebtOrder.Instance;
    error?: DebtKernelError;
    signatories: {
        debtor: boolean;
        creditor: boolean;
        underwriter: boolean;
    };
    creditorBalance?: BigNumber;
    creditorAllowance?: BigNumber;
    beforeBlock?: (debtOrder: DebtOrder.Instance, debtKernel: DebtKernelContract) => Promise<any>;
}

export interface RepaymentRouterErrorScenario {
    description: string;
    error?: RepaymentRouterError;
    agreementExists: boolean;
    isPayerBalanceInsufficient: boolean;
    willTermsContractAcceptRepayment: boolean;
}

export const DEFAULT_REPAYMENT_ARGS = {
    agreementExists: true,
    isPayerBalanceInsufficient: false,
    willTermsContractAcceptRepayment: true,
};
