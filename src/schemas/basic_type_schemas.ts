export const addressSchema = {
    id: "/Address",
    type: "string",
    pattern: "^0x[0-9a-fA-F]{40}$",
};

export const bytes32Schema = {
    id: "/Bytes32",
    type: "string",
    pattern: "^0x[0-9a-fA-F]{64}$",
};

export const numberSchema = {
    id: "/Number",
    type: "string",
    pattern: "^\\d+(\\.\\d+)?$",
};

export const wholeNumberSchema = {
    id: "/WholeNumber",
    type: "string",
    pattern: "^\\d+$",
};
