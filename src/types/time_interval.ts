// External libraries
import * as moment from "moment";

// Utils
import { BigNumber } from "../../utils/bignumber";

/**
 * A list of options for specifying units of duration, in singular and plural forms,
 * ranging from "hours" as the smallest value to "years" as the largest.
 */
export type DurationUnit =
    | "hour"
    | "hours"
    | "day"
    | "days"
    | "month"
    | "months"
    | "year"
    | "years";

/**
 * A class used for representing and manipulating durations of time.
 */
export class TimeInterval {
    /**
     * A wrapper for a duration of time expressed as an amount (e.g. "5") and unit (e.g. "weeks"),
     * which can be used to create a representation of time relative to a blockchain timestamp.
     *
     * @example
     * const interval = new TimeInterval(3, "months");
     * => void
     *
     * @param {number} amount
     * @param {DurationUnit} unit
     */
    constructor(
        private readonly amount: number,
        private readonly unit: DurationUnit,
    ) {}

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
    public fromTimestamp(timestamp: BigNumber): BigNumber {
        // Find the UNIX timestamp in seconds for the intended expiration date.
        const currentDate = moment.unix(timestamp.toNumber());
        currentDate.add(this.amount, this.unit);

        const expirationInSeconds = currentDate.unix();

        return new BigNumber(expirationInSeconds);
    }
}
