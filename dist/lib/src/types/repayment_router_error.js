"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var singleLineString = require("single-line-string");
var RepaymentRouterError;
(function (RepaymentRouterError) {
    RepaymentRouterError[RepaymentRouterError["DEBT_AGREEMENT_NONEXISTENT"] = 0] = "DEBT_AGREEMENT_NONEXISTENT";
    RepaymentRouterError[RepaymentRouterError["PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT"] = 1] = "PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT";
    RepaymentRouterError[RepaymentRouterError["REPAYMENT_REJECTED_BY_TERMS_CONTRACT"] = 2] = "REPAYMENT_REJECTED_BY_TERMS_CONTRACT";
})(RepaymentRouterError = exports.RepaymentRouterError || (exports.RepaymentRouterError = {}));
(function (RepaymentRouterError) {
    function messageForError(error) {
        switch (error) {
            case RepaymentRouterError.DEBT_AGREEMENT_NONEXISTENT:
                return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Debt agreement does not exist."], ["Debt agreement does not exist."])));
            case RepaymentRouterError.PAYER_BALANCE_OR_ALLOWANCE_INSUFFICIENT:
                return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Payer does not have sufficient balance or allowance."], ["Payer does not have sufficient balance or allowance."])));
            case RepaymentRouterError.REPAYMENT_REJECTED_BY_TERMS_CONTRACT:
                return singleLineString(templateObject_3 || (templateObject_3 = __makeTemplateObject(["The repayment was rejected by the terms contract."], ["The repayment was rejected by the terms contract."])));
        }
    }
    RepaymentRouterError.messageForError = messageForError;
})(RepaymentRouterError = exports.RepaymentRouterError || (exports.RepaymentRouterError = {}));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=repayment_router_error.js.map