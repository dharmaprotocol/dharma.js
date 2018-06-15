"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
var bignumber_1 = require("../../utils/bignumber");
// Types
var types_1 = require("../types");
var TokenAmount = /** @class */ (function () {
    function TokenAmount(amount, symbol) {
        this.token = new types_1.Token(symbol);
        this.rawAmount = TokenAmount.convertToRaw(new bignumber_1.BigNumber(amount), this.token.numDecimals);
    }
    TokenAmount.fromRaw = function (rawAmount, symbol) {
        var token = new types_1.Token(symbol);
        var decimalAmount = TokenAmount.convertToDecimal(rawAmount, token.numDecimals);
        return new TokenAmount(decimalAmount, symbol);
    };
    TokenAmount.convertToRaw = function (decimalAmount, numDecimals) {
        return decimalAmount.mul(new bignumber_1.BigNumber(10).pow(numDecimals.toNumber()));
    };
    TokenAmount.convertToDecimal = function (rawAmount, numDecimals) {
        return rawAmount.div(new bignumber_1.BigNumber(10).pow(numDecimals.toNumber())).toNumber();
    };
    Object.defineProperty(TokenAmount.prototype, "tokenNumDecimals", {
        get: function () {
            return this.token.numDecimals.toNumber();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenAmount.prototype, "tokenName", {
        get: function () {
            return this.token.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenAmount.prototype, "tokenSymbol", {
        get: function () {
            return this.token.symbol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenAmount.prototype, "decimalAmount", {
        get: function () {
            return TokenAmount.convertToDecimal(this.rawAmount, this.token.numDecimals);
        },
        enumerable: true,
        configurable: true
    });
    TokenAmount.prototype.toString = function () {
        return this.decimalAmount + " " + this.token.symbol;
    };
    return TokenAmount;
}());
exports.TokenAmount = TokenAmount;
//# sourceMappingURL=token_amount.js.map