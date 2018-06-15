"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETHEREUM_ADDRESS_ERRORS = {
    INVALID_ADDRESS: function (value) { return value + " is not a valid Ethereum address."; },
};
var EthereumAddress = /** @class */ (function () {
    function EthereumAddress(value) {
        if (!EthereumAddress.isValid(value)) {
            throw Error(exports.ETHEREUM_ADDRESS_ERRORS.INVALID_ADDRESS(value));
        }
        this.raw = value;
    }
    /**
     * Returns true if the provided value matches the format of an Ethereum address.
     *
     * @param {string} addressString
     * @returns {boolean}
     */
    EthereumAddress.isValid = function (value) {
        var addressRegex = new RegExp("^0x[a-fA-F0-9]{40}$");
        return value.match(addressRegex) !== null;
    };
    EthereumAddress.prototype.toString = function () {
        return this.raw;
    };
    return EthereumAddress;
}());
exports.EthereumAddress = EthereumAddress;
//# sourceMappingURL=ethereum_address.js.map