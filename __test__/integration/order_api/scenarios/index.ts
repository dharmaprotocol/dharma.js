// External
import { BigNumber } from "../../../../utils/bignumber";

// Wrappers
import {
    CollateralizedSimpleInterestTermsContractContract,
    DebtKernelContract,
    DummyTokenContract,
    RepaymentRouterContract,
    SimpleInterestTermsContractContract,
} from "../../../../src/wrappers";

// Scenarios
export { DESERIALIZE_ORDER_SCENARIOS } from "./deserialize_order";
export { INVALID_ISSUANCE_CANCELLATIONS } from "./invalid_issuance_cancellations";
export { INVALID_ORDER_CANCELLATIONS } from "./invalid_order_cancellations";
export { INVALID_ORDERS } from "./invalid_orders";
export { NONCONSENUAL_ORDERS } from "./nonconsensual_orders";
export { SERIALIZE_ORDER_SCENARIOS } from "./serialize_order";
export { SUCCESSFUL_ORDER_GENERATION } from "./successful_order_generation";
export { SUCCESSFUL_UNPACK_TERMS } from "./successful_unpack_terms";
export { UNSUCCESSFUL_ORDER_GENERATION } from "./unsuccessful_order_generation";
export { UNSUCCESSFUL_UNPACK_TERMS } from "./unsuccessful_unpack_terms";
export { VALID_ISSUANCE_CANCELLATIONS } from "./valid_issuance_cancellations";
export { VALID_ORDER_CANCELLATIONS } from "./valid_order_cancellations";
export { VALID_ORDERS } from "./valid_orders";

// Types
import { Adapter } from "../../../../src/adapters";
import { DebtOrder } from "../../../../src/types";

import { AdaptersAPI } from "../../../../src/apis";

export interface SerializeOrderScenario {
    input: DebtOrder;
    output: string;
}

export interface DeserializeOrderScenario {
    input: string;
    output: DebtOrder;
}

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
    adapter: (adaptersApi: AdaptersAPI) => Adapter;
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
