import { DebtOrderData } from "../../../../src/types";

import { OrderAPI } from "../../../../src/apis";
import { DeserializeOrderScenario, SerializeOrderScenario } from "../scenarios";

export class SerializationScenarioRunner {
    public orderApi: OrderAPI;

    constructor() {
        this.testSerializeScenario = this.testSerializeScenario.bind(this);
        this.testDeserializeScenario = this.testDeserializeScenario.bind(this);
    }

    public testDeserializeScenario(scenario: DeserializeOrderScenario) {
        describe("when given a JSON string of a debt order", () => {
            test("it returns a valid DebtOrder", async () => {
                const input = scenario.input;
                const debtOrderData = scenario.output;

                expect(this.orderApi.deserialize(input)).toEqual(debtOrderData);
            });
        });
    }

    public testSerializeScenario(scenario: SerializeOrderScenario) {
        describe("when given a debt order", () => {
            test("it returns the debt order as a JSON string", async () => {
                const debtOrderData = scenario.input;
                const expected = scenario.output;

                expect(this.orderApi.serialize(debtOrderData)).toEqual(expected);
            });
        });
    }
}
