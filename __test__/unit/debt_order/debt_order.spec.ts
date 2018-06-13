import { Dharma } from "../../../src/dharma";
import { DebtOrder, DebtOrderParams } from "../../../src/debt_order";

jest.mock("../../../src/dharma");

import { ACCOUNTS } from "__test__/accounts";
import { InterestRate, TimeInterval, TokenAmount } from "../../../src/types";

const debtor = ACCOUNTS[1];

// Create a mocked instance of Dharma.
const dharma = new Dharma({}, {});

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
