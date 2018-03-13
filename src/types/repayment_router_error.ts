import * as singleLineString from "single-line-string";

export enum ReypaymentRouterError {
    DEBT_AGREEMENT_NONEXISTENT,
    PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT,
    PAYER_OWNERSHIP_OR_ROUTER_APPROVAL_MISSING,
    ROUTER_UNAUTHORIZED_TO_REPORT_REPAYMENT,
}

export namespace ReypaymentRouterError {
    export function messageForError(error: ReypaymentRouterError): string {
        switch (error) {
            case ReypaymentRouterError.DEBT_AGREEMENT_NONEXISTENT:
                return singleLineString`Debt agreement does not exist.`;
            case ReypaymentRouterError.PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT:
                return singleLineString`Payer does not have sufficient balance or allowance.`;
            case ReypaymentRouterError.PAYER_OWNERSHIP_OR_ROUTER_APPROVAL_MISSING:
                return singleLineString`Payer has not granted sufficient approvals to route this payment.`;
            case ReypaymentRouterError.ROUTER_UNAUTHORIZED_TO_REPORT_REPAYMENT:
                return singleLineString`Router unauthorized to report repayment.`;
        }
    }
}
