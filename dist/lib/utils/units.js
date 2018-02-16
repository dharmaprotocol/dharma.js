"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("./bignumber");
var ether = function (decimalAmount) {
    var decimalBigNumber = new bignumber_1.BigNumber(decimalAmount);
    var weiInEther = new bignumber_1.BigNumber(Math.pow(10, 18));
    return decimalBigNumber.times(weiInEther);
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