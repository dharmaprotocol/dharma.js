// External
import { BigNumber } from "utils/bignumber";

// Wrappers
import {
    DebtKernelContract,
    RepaymentRouterContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
    CollateralizedSimpleInterestTermsContractContract,
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
import { SUCCESSFUL_UNPACK_TERMS } from "./successful_unpack_terms";
import { UNSUCCESSFUL_UNPACK_TERMS } from "./unsuccessful_unpack_terms";

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
        termsContract:
            | SimpleInterestTermsContractContract
            | CollateralizedSimpleInterestTermsContractContract,
    ) => DebtOrder;
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
    isCollateralized?: boolean;
    collateralBalance?: BigNumber;
    collateralAllowance?: BigNumber;
    collateralTokenIndex?: BigNumber;
    beforeBlock?: (debtOrder: DebtOrder, debtKernel: DebtKernelContract) => Promise<any>;
}

export interface OrderCancellationScenario {
    description: string;
    generateDebtOrder: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
    ) => DebtOrder;
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

export interface UnpackTermsScenario {
    description: string;
    termsContract: (
        simpleInterest: string,
        collateralizedSimpleInterest: string,
        other: string,
    ) => string;
    termsContractParameters: string;
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
    SUCCESSFUL_UNPACK_TERMS,
    UNSUCCESSFUL_UNPACK_TERMS,
};
