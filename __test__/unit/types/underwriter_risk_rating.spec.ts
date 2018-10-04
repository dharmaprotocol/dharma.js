import { UnderwriterRiskRating } from "../../../src/types";

import { UNDERWRITER_RISK_RATING_SCALING_FACTOR } from "../../../src/types/underwriter_risk_rating";

import { BigNumber } from "../../../utils/bignumber";

describe("UnderwriterRiskRating (Unit)", () => {
    const unscaled = 3.4;
    const scaled = new BigNumber(unscaled).mul(UNDERWRITER_RISK_RATING_SCALING_FACTOR);

    describe("instantiation with unscaled value", () => {
        const underwriterRiskRating = new UnderwriterRiskRating(unscaled);

        test("should expose a scaled version of the risk rating", () => {
            expect(underwriterRiskRating.scaled).toEqual(scaled);
        });

        test("should expose an unscaled version of the risk rating", () => {
            expect(underwriterRiskRating.unscaled).toEqual(unscaled);
        });
    });

    describe("instantiation with scaled value", () => {
        const underwriterRiskRating = new UnderwriterRiskRating(scaled);

        test("should expose a scaled version of the risk rating", () => {
            expect(underwriterRiskRating.scaled).toEqual(scaled);
        });

        test("should expose an unscaled version of the risk rating", () => {
            expect(underwriterRiskRating.unscaled).toEqual(unscaled);
        });
    });
});
