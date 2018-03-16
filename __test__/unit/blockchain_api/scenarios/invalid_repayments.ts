import { RepaymentRouterError } from "src/types";
import { RepaymentRouterErrorScenario } from "./";

export const INVALID_REPAYMENT_SCENARIOS: RepaymentRouterErrorScenario[] = [
    {
        description: "the debt agreement does not exist",
        error: RepaymentRouterError.DEBT_AGREEMENT_NONEXISTENT,
        agreementExists: false,
    },
];
