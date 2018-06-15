"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// External libraries
var moment = require("moment");
// Utils
var bignumber_1 = require("../../utils/bignumber");
var DURATION_TO_AMORTIZATION_UNIT = {
    hour: "hours",
    day: "days",
    week: "weeks",
    month: "months",
    year: "years",
};
/**
 * A wrapper for a duration of time expressed as an amount (e.g. "5") and unit (e.g. "weeks").
 */
var TimeInterval = /** @class */ (function () {
    /**
     * Given an amount (e.g. 1) and a unit of time (e.g. "year"), creates a representation of
     * that duration of time.
     *
     * @example
     * const interval = new TimeInterval(3, "months");
     * => { amount: 3, unit: "months", ... }
     *
     * @param {number} amount
     * @param {DurationUnit} unit
     */
    function TimeInterval(amount, unit) {
        this.amount = amount;
        this.unit = unit;
    }
    /**
     * Given a UNIX timestamp (e.g. blocktime), returns a UNIX timestamp in seconds
     * that is equal to the time interval beyond that given timestamp.
     *
     * @example
     * // Set up a TimeInterval instance.
     * const interval = new TimeInterval(3, "months");
     * => void
     *
     * // Use the blockchain API to get the current blocktime.
     * const currentBlocktime = await dharma.blockchain.getCurrentBlockTime();
     * => 1528841218
     *
     * // Use the TimeInterval instance to find out what the blocktime will be after the interval.
     * await interval.fromTimestamp(currentBlocktime);
     * => 1536790111
     *
     * @param {BigNumber} timestamp
     * @returns {BigNumber}
     */
    TimeInterval.prototype.fromTimestamp = function (timestamp) {
        var currentDate = moment.unix(timestamp.toNumber());
        currentDate.add(this.amount, this.unit);
        var expirationInSeconds = currentDate.unix();
        return new bignumber_1.BigNumber(expirationInSeconds);
    };
    TimeInterval.prototype.getAmortizationUnit = function () {
        return DURATION_TO_AMORTIZATION_UNIT[this.unit] || this.unit;
    };
    return TimeInterval;
}());
exports.TimeInterval = TimeInterval;
//# sourceMappingURL=time_interval.js.map