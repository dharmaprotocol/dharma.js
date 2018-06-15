"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
var bignumber_1 = require("../../utils/bignumber");
var constants_1 = require("../../utils/constants");
var Token = /** @class */ (function () {
    function Token(symbol) {
        this.symbol = symbol;
        var registryData = constants_1.TOKEN_REGISTRY_TRACKED_TOKENS.find(function (tokenObject) { return tokenObject.symbol === symbol; });
        if (!registryData) {
            throw new Error("Cannot find token with given symbol in token registry");
        }
        this.numDecimals = new bignumber_1.BigNumber(registryData.decimals);
        this.name = registryData.name;
    }
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=token.js.map