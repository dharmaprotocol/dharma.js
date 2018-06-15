"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = {
    id: "/Address",
    type: "string",
    pattern: "^0x[0-9a-fA-F]{40}$",
};
exports.bytes32Schema = {
    id: "/Bytes32",
    type: "string",
    pattern: "^0x[0-9a-fA-F]{64}$",
};
exports.bytesSchema = {
    id: "/Bytes",
    type: "string",
    pattern: "^0x[0-9a-fA-F]*$",
};
exports.numberSchema = {
    id: "/Number",
    type: "object",
    // Ensures that the object meets the validator.customFormats.BigNumber format.
    format: "BigNumber",
};
exports.wholeNumberSchema = {
    id: "/WholeNumber",
    type: "object",
    format: "wholeBigNumber",
};
//# sourceMappingURL=basic_type_schemas.js.map