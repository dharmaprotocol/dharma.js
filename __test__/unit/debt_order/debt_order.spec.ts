// Internal dependencies
import { Dharma } from "../../../src/dharma";

// Mock the dependency
jest.mock("../../../src/dharma");

// Types
import { ValidDebtOrderParams } from "./scenarios/valid_debt_order_params";

// Test runners
import { CreateRunner } from "./runners/create";

// Create a mocked instance of Dharma.
const dharma = new Dharma({}, {});

describe("Debt Order (Unit)", () => {
    describe("#create", () => {
        const createRunner = new CreateRunner(dharma);

        createRunner.testCreate.bind(this);

        ValidDebtOrderParams.forEach(createRunner.testCreate);
    });
});
