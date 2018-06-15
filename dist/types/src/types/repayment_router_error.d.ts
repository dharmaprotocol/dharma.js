export declare enum RepaymentRouterError {
    DEBT_AGREEMENT_NONEXISTENT = 0,
    PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT = 1,
    REPAYMENT_REJECTED_BY_TERMS_CONTRACT = 2,
}
export declare namespace RepaymentRouterError {
    function messageForError(error: RepaymentRouterError): string;
}
