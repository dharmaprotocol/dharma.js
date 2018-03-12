import { DebtOrder, DebtKernelError } from "src/types";

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
    ) => DebtOrder;
    error: DebtKernelError;
}