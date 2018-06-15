"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var apis_1 = require("./apis");
var Types = require("./types");
exports.Types = Types;
var Dharma = /** @class */ (function () {
    function Dharma(web3Provider, addressBook) {
        if (addressBook === void 0) { addressBook = {}; }
        this.web3 = new Web3(web3Provider);
        this.contracts = new apis_1.ContractsAPI(this.web3, addressBook);
        this.servicing = new apis_1.ServicingAPI(this.web3, this.contracts);
        this.sign = new apis_1.SignerAPI(this.web3, this.contracts);
        this.adapters = new apis_1.AdaptersAPI(this.web3, this.contracts);
        this.order = new apis_1.OrderAPI(this.web3, this.contracts, this.adapters);
        this.token = new apis_1.TokenAPI(this.web3, this.contracts);
        this.blockchain = new apis_1.BlockchainAPI(this.web3, this.contracts);
        this.logs = new apis_1.LogsAPI(this.web3, this.contracts);
    }
    return Dharma;
}());
exports.Dharma = Dharma;
//# sourceMappingURL=dharma.js.map