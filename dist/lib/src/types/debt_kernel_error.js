"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var singleLineString = require("single-line-string");
var DebtKernelError;
(function (DebtKernelError) {
    // Debt has been already been issued
    DebtKernelError[DebtKernelError["DEBT_ISSUED"] = 0] = "DEBT_ISSUED";
    // Order has already expired
    DebtKernelError[DebtKernelError["ORDER_EXPIRED"] = 1] = "ORDER_EXPIRED";
    // Debt issuance associated with order has been cancelled
    DebtKernelError[DebtKernelError["ISSUANCE_CANCELLED"] = 2] = "ISSUANCE_CANCELLED";
    // Order has been cancelled
    DebtKernelError[DebtKernelError["ORDER_CANCELLED"] = 3] = "ORDER_CANCELLED";
    // Order parameters specify amount of creditor / debtor fees
    // that is not equivalent to the amount of underwriter / relayer fees
    DebtKernelError[DebtKernelError["ORDER_INVALID_INSUFFICIENT_OR_EXCESSIVE_FEES"] = 4] = "ORDER_INVALID_INSUFFICIENT_OR_EXCESSIVE_FEES";
    // Order parameters specify insufficient principal amount for
    // debtor to at least be able to meet his fees
    DebtKernelError[DebtKernelError["ORDER_INVALID_INSUFFICIENT_PRINCIPAL"] = 5] = "ORDER_INVALID_INSUFFICIENT_PRINCIPAL";
    // Order parameters specify non zero fee for an unspecified recipient
    DebtKernelError[DebtKernelError["ORDER_INVALID_UNSPECIFIED_FEE_RECIPIENT"] = 6] = "ORDER_INVALID_UNSPECIFIED_FEE_RECIPIENT";
    // Order signatures are mismatched / malformed
    DebtKernelError[DebtKernelError["ORDER_INVALID_NON_CONSENSUAL"] = 7] = "ORDER_INVALID_NON_CONSENSUAL";
    // Insufficient balance or allowance for principal token transfer
    DebtKernelError[DebtKernelError["CREDITOR_BALANCE_OR_ALLOWANCE_INSUFFICIENT"] = 8] = "CREDITOR_BALANCE_OR_ALLOWANCE_INSUFFICIENT";
})(DebtKernelError = exports.DebtKernelError || (exports.DebtKernelError = {}));
(function (DebtKernelError) {
    function messageForError(error) {
        switch (error) {
            case DebtKernelError.DEBT_ISSUED:
                return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Debt has been already been issued."], ["Debt has been already been issued."])));
            case DebtKernelError.ORDER_EXPIRED:
                return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Order has expired."], ["Order has expired."])));
            case DebtKernelError.ISSUANCE_CANCELLED:
                return singleLineString(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Debt issuance associated with order has been cancelled."], ["Debt issuance associated with order has been cancelled."])));
            case DebtKernelError.ORDER_CANCELLED:
                return singleLineString(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Order has been cancelled."], ["Order has been cancelled."])));
            case DebtKernelError.ORDER_INVALID_INSUFFICIENT_OR_EXCESSIVE_FEES:
                return singleLineString(templateObject_5 || (templateObject_5 = __makeTemplateObject(["Order parameters specify an amount of creditor / debtor fees\n                                        that is not equivalent to the amount of underwriter / relayer fees"], ["Order parameters specify an amount of creditor / debtor fees\n                                        that is not equivalent to the amount of underwriter / relayer fees"])));
            case DebtKernelError.ORDER_INVALID_INSUFFICIENT_PRINCIPAL:
                return singleLineString(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Order parameters specify insufficient principal amount for\n                                        debtor to at least be able to meet his or her fees."], ["Order parameters specify insufficient principal amount for\n                                        debtor to at least be able to meet his or her fees."])));
            case DebtKernelError.ORDER_INVALID_UNSPECIFIED_FEE_RECIPIENT:
                return singleLineString(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Order parameters specify non-zero fee for an unspecified recipient."], ["Order parameters specify non-zero fee for an unspecified recipient."])));
            case DebtKernelError.ORDER_INVALID_NON_CONSENSUAL:
                return singleLineString(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Order signatures are mismatched / malformed"], ["Order signatures are mismatched / malformed"])));
            case DebtKernelError.CREDITOR_BALANCE_OR_ALLOWANCE_INSUFFICIENT:
                return singleLineString(templateObject_9 || (templateObject_9 = __makeTemplateObject(["Insufficient balance or allowance for principal token transfer"], ["Insufficient balance or allowance for principal token transfer"])));
        }
    }
    DebtKernelError.messageForError = messageForError;
})(DebtKernelError = exports.DebtKernelError || (exports.DebtKernelError = {}));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=debt_kernel_error.js.map