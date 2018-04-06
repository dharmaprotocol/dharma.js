import { scenarioDefaults, ReturnCollateralScenario } from "./";

import { ACCOUNTS } from "__test__/accounts";

const defaultArgs = scenarioDefaults(ACCOUNTS);

// These tests all fail to return the collateral.
defaultArgs.succeeds = false;

export const UNSUCCESSFUL_RETURN_COLLATERAL_SCENARIOS: ReturnCollateralScenario[] = [
    {
        ...defaultArgs,
        description: "when the debt's term has lapsed and the debt is in a state of default",
        debtRepaid: false,
        error: /Debt has not been fully repaid for loan with agreement ID/,
    },
    {
        ...defaultArgs,
        description: "when the debt's term has not lapsed and the debt is in a state of default",
        debtRepaid: false,
        termLapsed: false,
        error: /Debt has not been fully repaid for loan with agreement ID/,
    },
];
