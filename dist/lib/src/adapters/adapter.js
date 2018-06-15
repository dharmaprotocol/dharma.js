"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function conformsToAdapterInterface(object) {
    return ("fromDebtOrder" in object &&
        "toDebtOrder" in object &&
        "fromDebtRegistryEntry" in object &&
        "getRepaymentSchedule" in object &&
        "unpackParameters" in object &&
        typeof object.fromDebtOrder === "function" &&
        typeof object.toDebtOrder === "function" &&
        typeof object.fromDebtRegistryEntry === "function" &&
        typeof object.getRepaymentSchedule === "function" &&
        typeof object.unpackParameters === "function");
}
exports.conformsToAdapterInterface = conformsToAdapterInterface;
//# sourceMappingURL=adapter.js.map