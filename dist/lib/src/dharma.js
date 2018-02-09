"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = require("web3");
var apis_1 = require("./apis");
var Dharma = (function () {
    function Dharma(web3Provider, config) {
        this.web3 = new web3_1.default(web3Provider);
        this.sign = new apis_1.SignerAPI(this.web3);
        this.contracts = new apis_1.ContractsAPI(this.web3, config);
        this.order = new apis_1.OrderAPI(this.web3, this.contracts);
        this.adapters = new apis_1.AdaptersAPI(this.web3, this.contracts);
    }
    return Dharma;
}());
exports.default = Dharma;
//# sourceMappingURL=dharma.js.map