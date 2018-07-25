import * as Web3 from "web3";

import * as BigNumberLib from "bignumber.js";

// We instantiate web3 purely for the purpose of getting a BigNumber instance.
const web3 = new Web3();

// By default BigNumber's `toString` method converts to exponential notation if the value has
// more then 20 digits. We want to avoid this behavior, so we set EXPONENTIAL_AT to a high number
// BigNumber.config({
//     EXPONENTIAL_AT: 1000,
// });

/**
 * We use a wrapper for BigNumber, to prevent conflicts with Web3 and issues with
 * BigNumber minimization in production environments.
 */
class BigNumber  {
    public static random(decimalPlaces: number) {
        return BigNumberLib.BigNumber.random(decimalPlaces);
    }

    constructor(value: number | string | BigNumberLib.BigNumber, base?: number) {
        return web3.toBigNumber(value, base);
    }

    public isBigNumber() {
        return true;
    }
}

export { BigNumber };
