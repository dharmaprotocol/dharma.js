import { DebtKernelContract, RepaymentRouterContract, DummyTokenContract } from "src/wrappers";
import { VALID_ORDERS } from "./valid_orders";
import { INVALID_ORDERS } from "./invalid_orders";
import { NONCONSENUAL_ORDERS } from "./nonconsensual_orders";
import * as Units from "utils/units";
import { NULL_ADDRESS, NULL_BYTES32 } from "utils/constants";
import * as moment from "moment";
import { BigNumber } from "bignumber.js";
import { DebtOrder } from "src/types";
import { ACCOUNTS } from "../../accounts";

export interface FillScenario {
    description: string;
    generateDebtOrder: (
        debtKernel: DebtKernelContract,
        repaymentRouter: RepaymentRouterContract,
        principalToken: DummyTokenContract,
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

export { VALID_ORDERS, INVALID_ORDERS, NONCONSENUAL_ORDERS };
