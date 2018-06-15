"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("../../utils/bignumber");
var InterestRate = /** @class */ (function () {
    function InterestRate(value) {
        this.percent = value;
        this.raw = new bignumber_1.BigNumber(value);
    }
    InterestRate.fromRaw = function (value) {
        return new InterestRate(value.toNumber());
    };
    return InterestRate;
}());
exports.InterestRate = InterestRate;
//# sourceMappingURL=interest_rate.js.map