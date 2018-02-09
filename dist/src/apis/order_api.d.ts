import Web3 from "web3";
import { DebtOrder, TxData } from "../types";
import { ContractsAPI } from ".";
export declare const OrderAPIErrors: {
    EXPIRED: () => any;
    INVALID_UNDERWRITER_FEE: () => any;
    INVALID_RELAYER_FEE: () => any;
    INVALID_DEBTOR_FEE: () => any;
    INVALID_FEES: () => any;
    ORDER_CANCELLED: () => any;
    CREDITOR_BALANCE_INSUFFICIENT: () => any;
    CREDITOR_ALLOWANCE_INSUFFICIENT: () => any;
    ISSUANCE_CANCELLED: () => any;
    DEBT_ORDER_ALREADY_ISSUED: () => any;
    INVALID_DEBTOR_SIGNATURE: () => any;
    INVALID_CREDITOR_SIGNATURE: () => any;
    INVALID_UNDERWRITER_SIGNATURE: () => any;
};
export declare class OrderAPI {
    private web3;
    private assert;
    private contracts;
    constructor(web3: Web3, contracts: ContractsAPI);
    fillAsync(debtOrder: DebtOrder, options?: TxData): Promise<string>;
    private assertValidityInvariantsAsync(debtOrder, debtKernel, debtToken);
    private assertConsensualityInvariants(debtOrder, transactionOptions);
    private assertExternalBalanceAndAllowanceInvariantsAsync(debtOrder, tokenTransferProxy, transactionOptions);
    private getTxDefaultOptions();
}
