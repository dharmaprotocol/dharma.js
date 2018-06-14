// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../../src/debt_order";

// Import Dharma for typing-checking.
import { Dharma } from "../../../../src";

export async function testSignAsUnderwriter(dharma: Dharma, params: DebtOrderParams) {

    describe("when the order does not have an underwriter address", () => {
        let debtOrder: DebtOrder;

        beforeAll(async () => {
            debtOrder = await DebtOrder.create(dharma, params);
        });

        it("it throws an error", async () => {
            const expectedError = "Unable to sign debt order because private key associated with " +
                "0x0000000000000000000000000000000000000000 is invalid or unavailable";

            await expect(
                debtOrder.signAsUnderwriter(),
            ).rejects.toThrow(expectedError);
        });

        it("it calls dharma.sign.asUnderwriter", async () => {
            const spy = jest.spyOn(dharma.sign, "asUnderwriter");

            try {
                await debtOrder.signAsUnderwriter();
            } catch (e) {
                // Let it fail silently while we test that the intended function was called.
            }

            expect(spy).toHaveBeenCalled();
        });
    });
}
