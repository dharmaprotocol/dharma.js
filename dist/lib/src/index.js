"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var apis_1 = require("./apis");
var Dharma = /** @class */ (function () {
    function Dharma(web3Provider, config) {
        if (config === void 0) { config = {}; }
        this.web3 = new Web3(web3Provider);
        this.contracts = new apis_1.ContractsAPI(this.web3, config);
        this.servicing = new apis_1.ServicingAPI(this.web3, this.contracts);
        this.sign = new apis_1.SignerAPI(this.web3, this.contracts);
        this.order = new apis_1.OrderAPI(this.web3, this.contracts);
        this.adapters = new apis_1.AdaptersAPI(this.web3, this.contracts);
        this.token = new apis_1.TokenAPI(this.web3, this.contracts);
        this.blockchain = new apis_1.BlockchainAPI(this.web3);
    }
    return Dharma;
}());
exports.default = Dharma;
//# sourceMappingURL=index.js.map