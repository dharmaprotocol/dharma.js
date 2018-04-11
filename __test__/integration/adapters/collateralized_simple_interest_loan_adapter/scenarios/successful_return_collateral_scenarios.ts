import { scenarioDefaults, ReturnCollateralScenario } from "./";

import { ACCOUNTS } from "__test__/accounts";

const defaultArgs = scenarioDefaults(ACCOUNTS);

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
