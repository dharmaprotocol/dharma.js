import { DebtOrder } from "../types";

export abstract class BaseAdapter {
    public abstract async generateAsync(params: object): Promise<DebtOrder>;
    public abstract async validateAsync(debtOrder: DebtOrder): Promise<void>;
}
