import * as singleLineString from "single-line-string";

export enum DebtKernelError {
    // Debt has been already been issued
    DEBT_ISSUED,
    // Order has already expired
    ORDER_EXPIRED,
    // Debt issuance associated with order has been cancelled
    ISSUANCE_CANCELLED,
    // Order has been cancelled
    ORDER_CANCELLED,
    // Order parameters specify amount of creditor / debtor fees
    // that is not equivalent to the amount of underwriter / relayer fees
    ORDER_INVALID_INSUFFICIENT_OR_EXCESSIVE_FEES,
    // Order parameters specify insufficient principal amount for
    // debtor to at least be able to meet his fees
    ORDER_INVALID_INSUFFICIENT_PRINCIPAL,
    // Order parameters specify non zero fee for an unspecified recipient
    ORDER_INVALID_UNSPECIFIED_FEE_RECIPIENT,
    // Order signatures are mismatched / malformed
    ORDER_INVALID_NON_CONSENSUAL,
    // Insufficient balance or allowance for principal token transfer
    CREDITOR_BALANCE_OR_ALLOWANCE_INSUFFICIENT,
}

export namespace DebtKernelError {
    export function messageForError(error: DebtKernelError): string {
        switch (error) {
            case DebtKernelError.DEBT_ISSUED:
                return singleLineString`Debt has been already been issued.`;
            case DebtKernelError.ORDER_EXPIRED:
                return singleLineString`Order has expired.`;
            case DebtKernelError.ISSUANCE_CANCELLED:
                return singleLineString`Debt issuance associated with order has been cancelled.`;
            case DebtKernelError.ORDER_CANCELLED:
                return singleLineString`Order has been cancelled.`;
            case DebtKernelError.ORDER_INVALID_INSUFFICIENT_OR_EXCESSIVE_FEES:
                return singleLineString`Order parameters specify an amount of creditor / debtor fees
                                        that is not equivalent to the amount of underwriter / relayer fees`;
            case DebtKernelError.ORDER_INVALID_INSUFFICIENT_PRINCIPAL:
                return singleLineString`Order parameters specify insufficient principal amount for
                                        debtor to at least be able to meet his or her fees.`;
            case DebtKernelError.ORDER_INVALID_UNSPECIFIED_FEE_RECIPIENT:
                return singleLineString`Order parameters specify non-zero fee for an unspecified recipient.`;
            case DebtKernelError.ORDER_INVALID_NON_CONSENSUAL:
                return singleLineString`Order signatures are mismatched / malformed`;
            case DebtKernelError.CREDITOR_BALANCE_OR_ALLOWANCE_INSUFFICIENT:
                return singleLineString`Insufficient balance or allowance for principal token transfer`;
        }
    }
}
