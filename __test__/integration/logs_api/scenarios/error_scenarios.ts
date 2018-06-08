import { DebtKernelError, DebtOrderData, RepaymentRouterError } from "src/types";
import { BigNumber } from "utils/bignumber";

import {
    DebtKernelContract,
    DummyTokenContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

export interface DebtKernelErrorScenario {
    description: string;
    generateDebtOrderData: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
        termsContract: SimpleInterestTermsContractContract,
    ) => DebtOrderData;
    error?: DebtKernelError;
    signatories: {
        debtor: boolean;
        creditor: boolean;
        underwriter: boolean;
    };
    creditorBalance?: BigNumber;
    creditorAllowance?: BigNumber;
    beforeBlock?: (debtOrderData: DebtOrderData, debtKernel: DebtKernelContract) => Promise<any>;
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
