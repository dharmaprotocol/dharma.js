// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

export async function testCollateral(dharma: Dharma, params: DebtOrderParams) {
    let debtOrder: DebtOrder;

    beforeEach(async () => {
        debtOrder = await DebtOrder.create(dharma, params);
    });

    describe("#isCollateralSeizable", () => {
        test("calls #canSeizeCollateral", async () => {
            const spy = jest.spyOn(
                dharma.adapters.collateralizedSimpleInterestLoan,
                "canSeizeCollateral",
            );
            spy.mockImplementation(async () => {});

            await debtOrder.isCollateralSeizable();

            expect(spy).toBeCalled();

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe("#isCollateralReturnable", () => {});

    describe("#isCollateralWithdrawn", () => {});

    describe("#returnCollateral", () => {});

    describe("#seizeCollateral", () => {});
}
