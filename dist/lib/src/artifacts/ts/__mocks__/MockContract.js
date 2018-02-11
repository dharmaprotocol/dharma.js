"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockContract = (function () {
    function MockContract() {
    }
    MockContract.mock = function (abi, networks) {
        MockContract.abi = abi;
        MockContract.networks = networks;
    };
    return MockContract;
}());
exports.MockContract = MockContract;
//# sourceMappingURL=MockContract.js.map