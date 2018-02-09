"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = {
    id: "/Address",
    type: "string",
    pattern: "^0x[0-9a-f]{40}$",
};
exports.bytes32Schema = {
    id: "/Bytes32",
    type: "string",
    pattern: "^0x[0-9a-f]{64}$",
};
exports.numberSchema = {
    id: "/Number",
    type: "string",
    pattern: "^\\d+(\\.\\d+)?$",
};
//# sourceMappingURL=basic_type_schemas.js.map