import { scenarioDefaults, SeizeCollateralScenario } from "./";

import { ACCOUNTS } from "__test__/accounts";

const defaultArgs = scenarioDefaults(ACCOUNTS);

// These tests all fail to seize the collateral.
defaultArgs.succeeds = false;

export const UNSUCCESSFUL_SEIZE_COLLATERAL_SCENARIOS: SeizeCollateralScenario[] = [
    {
        ...defaultArgs,
        description: "when the debt's term has lapsed and the debt has been paid",
        error: /not currently in a state of default when adjusted for grace period/,
    },
    {
        ...defaultArgs,
        description: "when the debt's term has not yet lapsed and the debt has been paid",
        termLapsed: false,
        error: /not currently in a state of default when adjusted for grace period/,
    },
    {
        ...defaultArgs,
        description: "when the grace period not yet lapsed and the debt has not been paid",
        debtRepaid: false,
        termLapsed: false,
    },
];
