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
    {
        ...defaultArgs,
        description: "when given a malformed agreement id",
        givenAgreementId: (agreementId: string) => "0x0001",
        error: /Expected agreementId to conform to schema/,
    },
    {
        ...defaultArgs,
        description: "when an agreement id that does not match a loan",
        // Use a randomly generated agreement ID.
        givenAgreementId: (agreementId: string) =>
            "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f",
        error: /Collateral was not found for given agreement ID/,
    },
    {
        ...defaultArgs,
        description: "when the collateral has already been withdrawn",
        collateralWithdrawn: true,
        error: /Collateral was not found for given agreement ID/,
    },
];
