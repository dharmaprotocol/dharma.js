import * as singleLineString from "single-line-string";

export enum RepaymentRouterError {
    DEBT_AGREEMENT_NONEXISTENT,
    PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT,
    PAYER_OWNERSHIP_OR_ROUTER_APPROVAL_MISSING,
    ROUTER_UNAUTHORIZED_TO_REPORT_REPAYMENT,
}

export namespace RepaymentRouterError {
    export function messageForError(error: RepaymentRouterError): string {
        switch (error) {
            case RepaymentRouterError.DEBT_AGREEMENT_NONEXISTENT:
                return singleLineString`Debt agreement does not exist.`;
            case RepaymentRouterError.PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT:
                return singleLineString`Payer does not have sufficient balance or allowance.`;
            case RepaymentRouterError.PAYER_OWNERSHIP_OR_ROUTER_APPROVAL_MISSING:
                return singleLineString`Payer has not granted sufficient approvals to route this payment.`;
            case RepaymentRouterError.ROUTER_UNAUTHORIZED_TO_REPORT_REPAYMENT:
                return singleLineString`Router unauthorized to report repayment.`;
        }
    }
}
