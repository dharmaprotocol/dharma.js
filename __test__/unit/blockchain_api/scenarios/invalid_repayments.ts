import { RepaymentRouterError } from "src/types";
import { RepaymentRouterErrorScenario, DEFAULT_REPAYMENT_ARGS } from "./";

export const INVALID_REPAYMENT_SCENARIOS: RepaymentRouterErrorScenario[] = [
    {
        description: "the debt agreement does not exist",
        error: RepaymentRouterError.DEBT_AGREEMENT_NONEXISTENT,
        ...DEFAULT_REPAYMENT_ARGS,
        agreementExists: false,
    },
    {
        description: "the payer's balance is insufficient",
        error: RepaymentRouterError.PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT,
        ...DEFAULT_REPAYMENT_ARGS,
        isPayerBalanceInsufficient: true,
    },
];
