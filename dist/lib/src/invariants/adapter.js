"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adapters_1 = require("../adapters");
var AdapterAssertions = /** @class */ (function () {
    function AdapterAssertions() {
    }
    AdapterAssertions.prototype.conformsToInterface = function (object, errorMessage) {
        if (!adapters_1.conformsToAdapterInterface(object)) {
            throw new Error(errorMessage);
        }
    };
    return AdapterAssertions;
}());
exports.AdapterAssertions = AdapterAssertions;
//# sourceMappingURL=adapter.js.map