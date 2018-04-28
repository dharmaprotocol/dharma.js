import { DebtOrder, DebtRegistryEntry } from "../types";
import { CollateralizedSimpleInterestLoanOrder } from "./collateralized_simple_interest_loan_adapter";
import { SimpleInterestLoanOrder } from "./simple_interest_loan_adapter";

export namespace Adapter {
    export interface Interface {
        fromDebtOrder: (
            debtOrder: DebtOrder.Instance,
        ) => Promise<SimpleInterestLoanOrder | CollateralizedSimpleInterestLoanOrder>;
        toDebtOrder: (params: object) => Promise<DebtOrder.Instance>;
        fromDebtRegistryEntry: (entry: DebtRegistryEntry) => Promise<object>;
        getRepaymentSchedule: (entry: DebtRegistryEntry) => number[];
        unpackParameters: (packedParams: string) => object;
        validateAsync: (
            order: SimpleInterestLoanOrder | CollateralizedSimpleInterestLoanOrder,
        ) => Promise<void>;
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
