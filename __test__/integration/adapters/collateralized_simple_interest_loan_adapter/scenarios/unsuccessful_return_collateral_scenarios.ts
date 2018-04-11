import { defaultArgs, ReturnCollateralScenario } from "./";

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
