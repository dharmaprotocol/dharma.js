import { DebtOrderData, DebtRegistryEntry } from "../types";
import { CollateralizedSimpleInterestLoanOrder } from "./collateralized_simple_interest_loan_adapter";
import { SimpleInterestLoanOrder } from "./simple_interest_loan_adapter";

export interface Adapter {
    fromDebtOrderData: (
        debtOrder: DebtOrderData,
    ) => Promise<SimpleInterestLoanOrder | CollateralizedSimpleInterestLoanOrder>;
    toDebtOrderData: (params: object) => Promise<DebtOrderData>;
    fromDebtRegistryEntry: (entry: DebtRegistryEntry) => Promise<object>;
    getRepaymentSchedule: (entry: DebtRegistryEntry) => number[];
    unpackParameters: (packedParams: string) => object;
    validateAsync: (
        order: SimpleInterestLoanOrder | CollateralizedSimpleInterestLoanOrder,
    ) => Promise<void>;
}

export function conformsToAdapterInterface(object: any): object is Adapter {
    return (
        "fromDebtOrderData" in object &&
        "toDebtOrderData" in object &&
        "fromDebtRegistryEntry" in object &&
        "getRepaymentSchedule" in object &&
        "unpackParameters" in object &&
        typeof object.fromDebtOrderData === "function" &&
        typeof object.toDebtOrderData === "function" &&
        typeof object.fromDebtRegistryEntry === "function" &&
        typeof object.getRepaymentSchedule === "function" &&
        typeof object.unpackParameters === "function"
    );
}
