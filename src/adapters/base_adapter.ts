import { DebtOrder } from "../types";

export abstract class BaseAdapter {
    public abstract async generateAsync(params: object): Promise<DebtOrder.Instance>;
    public abstract async validateAsync(debtOrder: DebtOrder.Instance): Promise<void>;
}
