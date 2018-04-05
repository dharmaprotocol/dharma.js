// External
import { BigNumber } from "bignumber.js";

// Wrappers
import {
    DebtKernelContract,
    RepaymentRouterContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";

// Scenarios
import { VALID_ORDERS } from "./valid_orders";
import { INVALID_ORDERS } from "./invalid_orders";
import { NONCONSENUAL_ORDERS } from "./nonconsensual_orders";
import { VALID_ORDER_CANCELLATIONS } from "./valid_order_cancellations";
import { VALID_ISSUANCE_CANCELLATIONS } from "./valid_issuance_cancellations";
import { INVALID_ORDER_CANCELLATIONS } from "./invalid_order_cancellations";
import { INVALID_ISSUANCE_CANCELLATIONS } from "./invalid_issuance_cancellations";
import { SUCCESSFUL_ORDER_GENERATION } from "./successful_order_generation";
import { UNSUCCESSFUL_ORDER_GENERATION } from "./unsuccessful_order_generation";

// Types
import { DebtOrder } from "src/types";
import { Adapter } from "src/adapters";
import { AdaptersAPI } from "src/apis";

export interface FillScenario {
    description: string;
    generateDebtOrder: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
        termsContract: SimpleInterestTermsContractContract,
    ) => DebtOrder.Instance;
    filler: string;
    signatories: {
        debtor: boolean;
        creditor: boolean;
        underwriter: boolean;
    };
    successfullyFills: boolean;
    creditorBalance?: BigNumber;
    creditorAllowance?: BigNumber;
    errorType?: string;
    errorMessage?: string;
    beforeBlock?: (debtOrder: DebtOrder.Instance, debtKernel: DebtKernelContract) => Promise<any>;
}

export interface OrderCancellationScenario {
    description: string;
    generateDebtOrder: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
    ) => DebtOrder.Instance;
    canceller: string;
    successfullyCancels: boolean;
    orderAlreadyCancelled: boolean;
    issuanceAlreadyCancelled: boolean;
    errorType?: string;
    errorMessage?: string;
}

// For naming clarity, we duplicate and rename the OrderCancellationScenario
// interface as an IssuanceCancellationScenario
export interface IssuanceCancellationScenario extends OrderCancellationScenario {}

export interface OrderGenerationScenario {
    description: string;
    adapter: (adaptersApi: AdaptersAPI) => Adapter.Interface;
    inputParameters: object;
    throws: boolean;
    errorType?: string;
    errorMessage?: string;
}

export interface UnpackParametersScenario {
    description: string;
    debtOrder: (defaultDebtOrder: DebtOrder.Instance) => DebtOrder.Instance;
    throws: boolean;
    expectedParameters?: object;
    errorType?: string;
    errorMessage?: string;
}

export {
    VALID_ORDERS,
    INVALID_ORDERS,
    VALID_ORDER_CANCELLATIONS,
    VALID_ISSUANCE_CANCELLATIONS,
    INVALID_ORDER_CANCELLATIONS,
    INVALID_ISSUANCE_CANCELLATIONS,
    NONCONSENUAL_ORDERS,
    SUCCESSFUL_ORDER_GENERATION,
    UNSUCCESSFUL_ORDER_GENERATION,
};
