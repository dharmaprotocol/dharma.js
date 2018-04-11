import { defaultArgs, ReturnCollateralScenario } from "./";

export const SUCCESSFUL_RETURN_COLLATERAL_SCENARIOS: ReturnCollateralScenario[] = [
    {
        ...defaultArgs,
        description: "when the debt's term has lapsed and the debt has been paid",
    },
    {
        ...defaultArgs,
        description: "when the debt's term has not yet lapsed and the debt has been paid",
        termLapsed: false,
    },
];
