import { DebtOrder } from "../types";
export declare abstract class BaseAdapter {
    abstract generateAsync(params: object): Promise<DebtOrder>;
    abstract validateAsync(debtOrder: DebtOrder): Promise<void>;
}
