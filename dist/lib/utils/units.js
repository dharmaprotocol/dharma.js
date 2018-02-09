"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("./bignumber");
var ether = function (decimalAmount) {
    return new bignumber_1.BigNumber(decimalAmount * (Math.pow(10, 18)));
};
exports.ether = ether;
var gwei = function (decimalAmount) {
    return new bignumber_1.BigNumber(decimalAmount * (Math.pow(10, 9)));
};
exports.gwei = gwei;
var percent = function (decimalAmount) {
    return new bignumber_1.BigNumber((decimalAmount / 100) * (Math.pow(10, 9)));
};
exports.percent = percent;
//# sourceMappingURL=units.js.map