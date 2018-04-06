import { DebtOrder, DebtRegistryEntry } from "../types";

export namespace Adapter {
    export interface Interface {
        fromDebtOrder: (debtOrder: DebtOrder.Instance) => Promise<object>;
        toDebtOrder: (params: object) => Promise<DebtOrder.Instance>;
        fromDebtRegistryEntry: (entry: DebtRegistryEntry) => Promise<object>;
        getRepaymentSchedule: (entry: DebtRegistryEntry) => Array<number>;
        unpackParameters: (packedParams: string) => object;
    }

    export function conformsToAdapterInterface(object: any): object is Interface {
        return (
            "fromDebtOrder" in object &&
            "toDebtOrder" in object &&
            "fromDebtRegistryEntry" in object &&
            "getRepaymentSchedule" in object &&
            "unpackParameters" in object &&
            typeof object.fromDebtOrder === "function" &&
            typeof object.toDebtOrder === "function" &&
            typeof object.fromDebtRegistryEntry === "function" &&
            typeof object.getRepaymentSchedule === "function" &&
            typeof object.unpackParameters === "function"
        );
    }
}
