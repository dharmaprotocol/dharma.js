import { DebtOrderData, DebtRegistryEntry } from "../types";
import { CollateralizedSimpleInterestLoanOrder } from "./collateralized_simple_interest_loan_adapter";
import { SimpleInterestLoanOrder } from "./simple_interest_loan_adapter";
export interface Adapter {
    fromDebtOrder: (debtOrder: DebtOrderData) => Promise<SimpleInterestLoanOrder | CollateralizedSimpleInterestLoanOrder>;
    toDebtOrder: (params: object) => Promise<DebtOrderData>;
    fromDebtRegistryEntry: (entry: DebtRegistryEntry) => Promise<object>;
    getRepaymentSchedule: (entry: DebtRegistryEntry) => number[];
    unpackParameters: (packedParams: string) => object;
    validateAsync: (order: SimpleInterestLoanOrder | CollateralizedSimpleInterestLoanOrder) => Promise<void>;
}
export declare function conformsToAdapterInterface(object: any): object is Adapter;
