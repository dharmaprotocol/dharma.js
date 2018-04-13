import * as _ from "lodash";

import { defaultArgs, SeizeCollateralScenario } from "./";

// These tests all fail to seize the collateral.
const failArgs = _.clone(defaultArgs);
failArgs.succeeds = false;

export const UNSUCCESSFUL_SEIZE_COLLATERAL_SCENARIOS: SeizeCollateralScenario[] = [
    {
        ...failArgs,
        description: "when the debt's term has lapsed and the debt has been paid",
        error: /not currently in a state of default when adjusted for grace period/,
    },
    {
        ...failArgs,
        description: "when the debt's term has not yet lapsed and the debt has been paid",
        termLapsed: false,
        error: /not currently in a state of default when adjusted for grace period/,
    },
    {
        ...failArgs,
        description: "when the grace period not yet lapsed and the debt has not been paid",
        debtRepaid: false,
        termLapsed: false,
        error: /not currently in a state of default when adjusted for grace period/,
    },
    {
        ...failArgs,
        description: "when given a malformed agreement id",
        givenAgreementId: (agreementId: string) => "0x0001",
        error: /Expected agreementId to conform to schema/,
    },
    {
        ...failArgs,
        description: "when an agreement id that does not match a loan",
        // Use a randomly generated agreement ID.
        givenAgreementId: (agreementId: string) =>
            "0x21eee309abd17832e55d231fb4147334081ed6da543d226c035d4b2420c68a7f",
        error: /Collateral was not found for given agreement ID/,
    },
    {
        ...failArgs,
        description: "when the collateral has already been withdrawn",
        collateralWithdrawn: true,
        error: /Collateral was not found for given agreement ID/,
    },
];
