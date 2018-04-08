import { BigNumber } from "bignumber.js";
// NOTE: The input's format only matters if the input is required (since, if an input
// is required by the schema but undefined, the validator will throw an error at another point.)
// Hence, we can skip validating format if the input is undefined.

export const bigNumberFormat = function(input) {
    const regex = RegExp("^\\d+(\\.\\d+)?$");

    return input === undefined || (isBigNumber(input) && regex.test(input.toString()));
};

export const wholeBigNumberFormat = function(input) {
    const regex = RegExp("^\\d+$");
    return input === undefined || (input.isBigNumber && regex.test(input.toString()));
};

/**
 * NOTE: BigNumber.js is currently changing their API, and the method `isBigNumber` on instances
 * of BigNumber is deprecated. I.E. this will not be available in the next version (v6.0.)
 *
 * However, Truffe.js uses v5.0, and so we are dependent on v5.0 until Truffle upgrades.
 *
 * In version 6.0, this can be replaced with `BigNumber.isBigNumber(object);`
 *
 * @param object
 * @returns {boolean}
 */
function isBigNumber(object: any): boolean {
    return (
        object.isBigNumber ||
        object instanceof BigNumber ||
        (object.constructor && object.constructor.name === "BigNumber")
    );
}
