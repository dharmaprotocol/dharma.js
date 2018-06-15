"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Assertions
var account_1 = require("./account");
var adapter_1 = require("./adapter");
var debt_agreement_1 = require("./debt_agreement");
var debt_token_1 = require("./debt_token");
var order_1 = require("./order");
var schema_1 = require("./schema");
var token_1 = require("./token");
var Assertions = /** @class */ (function () {
    function Assertions(web3, contracts) {
        this.contracts = contracts;
        this.account = new account_1.AccountAssertions();
        this.adapter = new adapter_1.AdapterAssertions();
        this.order = new order_1.OrderAssertions(web3, this.contracts);
        this.token = new token_1.TokenAssertions();
        this.schema = new schema_1.SchemaAssertions();
        this.debtToken = new debt_token_1.DebtTokenAssertions();
        this.debtAgreement = new debt_agreement_1.DebtAgreementAssertions();
    }
    return Assertions;
}());
exports.Assertions = Assertions;
//# sourceMappingURL=index.js.map