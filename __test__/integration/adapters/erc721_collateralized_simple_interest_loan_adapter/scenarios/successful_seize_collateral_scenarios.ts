import { defaultArgs, SeizeCollateralScenario } from "./";

export const SUCCESSFUL_SEIZE_COLLATERAL_SCENARIOS: SeizeCollateralScenario[] = [
    {
        ...defaultArgs,
        description: "when the debt has not been paid",
        debtRepaid: false,
    },
];
