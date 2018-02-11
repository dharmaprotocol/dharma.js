"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../utils/constants");
var AccountAssertions = /** @class */ (function () {
    function AccountAssertions(web3) {
        this.web3 = web3;
    }
    AccountAssertions.prototype.notNull = function (account, errorMessage) {
        if (account === constants_1.NULL_ADDRESS) {
            throw new Error(errorMessage);
        }
    };
    return AccountAssertions;
}());
exports.AccountAssertions = AccountAssertions;
//# sourceMappingURL=account.js.map