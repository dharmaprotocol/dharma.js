import { BigNumber } from "../../utils/bignumber";
// NOTE: The input's format only matters if the input is required (since, if an input
// is required by the schema but undefined, the validator will throw an error at another point.)
// Hence, we can skip validating format if the input is undefined.

export const bigNumberFormat = (input) => {
    const regex = RegExp("^\\d+(\\.\\d+)?$");

    return input === undefined || (isBigNumber(input) && regex.test(input.toString()));
};

export const wholeBigNumberFormat = (input) => {
    const regex = RegExp("^\\d+$");

    return input === undefined || (isBigNumber(input) && regex.test(input.toString()));
};

/**
 * NOTE: BigNumber.js is currently changing their API, and the method `isBigNumber` on instances
 * of BigNumber is deprecated. I.E. this will not be available in the next version (v6.0.)
 *
 * However, Truffle.js uses v5.0, and so we are dependent on v5.0 until Truffle upgrades.
 *
 * In version 6.0, this can be replaced with `BigNumber.isBigNumber(object);`
 *
 * @param object
 * @returns {boolean}
 */
function isBigNumber(object: any): boolean {
    return (
        // Note: when minified, properties such as isBigNumber can get renamed ("mangled"),
        // and so we add a function to our BigNumber wrapper called "conformsToBigNumber".
        object.isBigNumber ||
        (object.conformsToBigNumber === "Function" && object.conformsToBigNumber()) ||
        object instanceof BigNumber ||
        (object.constructor && object.constructor.name === "BigNumber")
    );
}
