import { DebtOrder, DebtRegistryEntry } from "../types";

export abstract class BaseAdapter {
    public static conformsToAdapterInterface(object: any): object is BaseAdapter {
        return (
            "fromDebtOrder" in object &&
            "toDebtOrder" in object &&
            "fromDebtRegistryEntry" in object &&
            "getRepaymentSchedule" in object &&
            typeof object.fromDebtOrder === "function" &&
            typeof object.toDebtOrder === "function" &&
            typeof object.fromDebtRegistryEntry === "function" &&
            typeof object.getRepaymentSchedule === "function"
        );
    }

    public abstract async fromDebtOrder(debtOrder: DebtOrder.Instance): Promise<object>;
    public abstract async toDebtOrder(params: object): Promise<DebtOrder.Instance>;
    public abstract async fromDebtRegistryEntry(entry: DebtRegistryEntry): Promise<object>;
    public abstract getRepaymentSchedule(entry: DebtRegistryEntry): Array<number>;
}
