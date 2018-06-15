"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../utils/constants");
var AccountAssertions = /** @class */ (function () {
    function AccountAssertions() {
    }
    AccountAssertions.prototype.notNull = function (account, errorMessage) {
        if (account === constants_1.NULL_ADDRESS) {
            throw new Error(errorMessage);
        }
    };
    AccountAssertions.prototype.notSender = function (account, txOptions, errorMessage) {
        if (account === txOptions.from) {
            throw new Error(errorMessage);
        }
    };
    return AccountAssertions;
}());
exports.AccountAssertions = AccountAssertions;
//# sourceMappingURL=account.js.map