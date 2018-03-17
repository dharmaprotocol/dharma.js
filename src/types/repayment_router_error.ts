import * as singleLineString from "single-line-string";

export enum RepaymentRouterError {
    DEBT_AGREEMENT_NONEXISTENT,
    PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT,
    REPAYMENT_REJECTED_BY_TERMS_CONTRACT,
}

export namespace RepaymentRouterError {
    export function messageForError(error: RepaymentRouterError): string {
        switch (error) {
            case RepaymentRouterError.DEBT_AGREEMENT_NONEXISTENT:
                return singleLineString`Debt agreement does not exist.`;
            case RepaymentRouterError.PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT:
                return singleLineString`Payer does not have sufficient balance or allowance.`;
            case RepaymentRouterError.REPAYMENT_REJECTED_BY_TERMS_CONTRACT:
                return singleLineString`The repayment was rejected by the terms contract.`;
        }
    }
}
