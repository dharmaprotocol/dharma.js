"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_1 = require("./account");
var token_1 = require("./token");
var order_1 = require("./order");
var schema_1 = require("./schema");
var debt_agreement_1 = require("./debt_agreement");
var Assertions = /** @class */ (function () {
    function Assertions(web3) {
        this.web3 = web3;
        this.account = new account_1.AccountAssertions(this.web3);
        this.order = new order_1.OrderAssertions(this.web3);
        this.token = new token_1.TokenAssertions();
        this.schema = new schema_1.SchemaAssertions();
        this.debtAgreement = new debt_agreement_1.DebtAgreementAssertions(this.web3);
    }
    return Assertions;
}());
exports.Assertions = Assertions;
//# sourceMappingURL=index.js.map