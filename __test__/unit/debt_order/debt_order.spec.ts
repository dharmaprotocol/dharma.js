// Internal dependencies
import { Dharma } from "../../../src/dharma";

// Mock the dependency
jest.mock("../../../src/dharma");

// Debt Order
import { DebtOrder, DebtOrderParams } from "../../../src/debt_order";

// Types
import { InterestRate, TimeInterval, TokenAmount } from "../../../src/types";

// Test utils
import { ACCOUNTS } from "../../accounts";

const debtor = ACCOUNTS[1];

// Create a mocked instance of Dharma.
const dharma = new Dharma({}, {});

/**
 * A set of params to test initialization.
 *
 * @type DebtOrderParams
 */
const defaultParams: DebtOrderParams = {
    principal: new TokenAmount(5, "REP"),
    collateral: new TokenAmount(10, "WETH"),
    interestRate: new InterestRate(12.3),
    termLength: new TimeInterval(6, "months"),
    debtorAddress: debtor.address,
    expiresIn: new TimeInterval(5, "days"),
};

describe("Debt Order (Unit)", () => {
    describe("#create", () => {
        describe(`when given ${JSON.stringify(defaultParams)}`, async () => {
            let debtOrder: DebtOrder;

            beforeAll(async () => {
                debtOrder = await DebtOrder.create(dharma, defaultParams);
            });

            it("eventually returns an instance of DebtOrder", async () => {
                expect(typeof debtOrder).toBe(DebtOrder);
            });
        });
    });
});
