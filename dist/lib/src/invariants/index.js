"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_1 = require("./account");
var order_1 = require("./order");
var schema_1 = require("./schema");
var Assertions = (function () {
    function Assertions(web3) {
        this.web3 = web3;
        this.account = new account_1.AccountAssertions(this.web3);
        this.order = new order_1.OrderAssertions(this.web3);
        this.schema = new schema_1.SchemaAssertions();
    }
    return Assertions;
}());
exports.Assertions = Assertions;
//# sourceMappingURL=index.js.map