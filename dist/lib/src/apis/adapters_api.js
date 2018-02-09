"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adapters_1 = require("../adapters");
var AdaptersAPI = (function () {
    function AdaptersAPI(web3, contractsApi) {
        this.web3 = web3;
        this.contracts = contractsApi;
        this.simpleInterestLoan = new adapters_1.SimpleInterestLoanAdapter(this.web3, this.contracts);
    }
    return AdaptersAPI;
}());
exports.AdaptersAPI = AdaptersAPI;
//# sourceMappingURL=adapters_api.js.map