import * as Web3 from "web3";
import { DebtOrder, IssuanceCommitment, TxData } from "../types";
import { ContractsAPI } from ".";
export declare const OrderAPIErrors: {
    EXPIRED: () => any;
    INVALID_UNDERWRITER_FEE: () => any;
    INVALID_RELAYER_FEE: () => any;
    INVALID_DEBTOR_FEE: () => any;
    INVALID_FEES: () => any;
    ORDER_CANCELLED: () => any;
    ORDER_ALREADY_CANCELLED: () => any;
    UNAUTHORIZED_ORDER_CANCELLATION: () => any;
    UNAUTHORIZED_ISSUANCE_CANCELLATION: () => any;
    CREDITOR_BALANCE_INSUFFICIENT: () => any;
    CREDITOR_ALLOWANCE_INSUFFICIENT: () => any;
    ISSUANCE_CANCELLED: () => any;
    ISSUANCE_ALREADY_CANCELLED: () => any;
    DEBT_ORDER_ALREADY_FILLED: () => any;
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
    cancelOrderAsync(debtOrder: DebtOrder, options?: TxData): Promise<string>;
    cancelIssuanceAsync(issuanceCommitment: IssuanceCommitment, transactionOptions: TxData): Promise<string>;
    private assertValidityInvariantsAsync(debtOrder, debtKernel, debtToken);
    private assertConsensualityInvariants(debtOrder, transactionOptions);
    private assertExternalBalanceAndAllowanceInvariantsAsync(debtOrder, tokenTransferProxy, transactionOptions);
    private getTxDefaultOptions();
}
