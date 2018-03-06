import {
    DebtKernelContract,
    RepaymentRouterContract,
    DummyTokenContract,
    SimpleInterestTermsContractContract,
} from "src/wrappers";
import { VALID_ORDERS } from "./valid_orders";
import { INVALID_ORDERS } from "./invalid_orders";
import { NONCONSENUAL_ORDERS } from "./nonconsensual_orders";
import { VALID_ORDER_CANCELLATIONS } from "./valid_order_cancellations";
import { VALID_ISSUANCE_CANCELLATIONS } from "./valid_issuance_cancellations";
import { INVALID_ORDER_CANCELLATIONS } from "./invalid_order_cancellations";
import { INVALID_ISSUANCE_CANCELLATIONS } from "./invalid_issuance_cancellations";

import * as Units from "utils/units";
import { NULL_ADDRESS, NULL_BYTES32 } from "utils/constants";
import * as moment from "moment";
import { BigNumber } from "bignumber.js";
import { DebtOrder } from "src/types";

export interface FillScenario {
    description: string;
    generateDebtOrder: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
        termsContract: SimpleInterestTermsContractContract,
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

export {
    VALID_ORDERS,
    INVALID_ORDERS,
    VALID_ORDER_CANCELLATIONS,
    VALID_ISSUANCE_CANCELLATIONS,
    INVALID_ORDER_CANCELLATIONS,
    INVALID_ISSUANCE_CANCELLATIONS,
    NONCONSENUAL_ORDERS,
};
