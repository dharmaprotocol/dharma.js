// NOTE: The input's format only matters if the input is required (since, if an input
// is required by the schema but undefined, the validator will throw an error at another point.)
// Hence, we can skip validating format if the input is undefined.

export const bigNumberFormat = function(input) {
    const regex = RegExp("^\\d+(\\.\\d+)?$");
    return input === undefined || (input.isBigNumber && regex.test(input.toString()));
};

export const wholeBigNumberFormat = function(input) {
    const regex = RegExp("^\\d+$");
    return input === undefined || (input.isBigNumber && regex.test(input.toString()));
};
