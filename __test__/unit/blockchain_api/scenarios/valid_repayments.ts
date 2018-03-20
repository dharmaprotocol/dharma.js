import { RepaymentRouterErrorScenario, DEFAULT_REPAYMENT_ARGS } from "./";

export const VALID_REPAYMENTS: RepaymentRouterErrorScenario[] = [
    {
        description: "a successful repayment is conducted",
        ...DEFAULT_REPAYMENT_ARGS,
    },
];
