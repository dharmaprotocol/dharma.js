// External libraries
import * as moment from "moment";

// Utils
import { BigNumber } from "../../utils/bignumber";

import { Dharma } from "../";

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
 * A class used for representing time as it would appear on the blockchain.
 */
export class Time {
    /**
     * Given some duration expressed as an amount (e.g. "5") and unit (e.g. "weeks"), creates the
     * a representation of an expiration time equal to the expected blockchain timestamp after that
     * duration has elapsed from the current time.
     *
     * Time.afterDuration(2, "hours");
     * => Promise<BigNumber>
     *
     * @param {Dharma} dharma
     * @param {number} amount
     * @param {DurationUnit} unit
     * @returns {Promise<BigNumber>}
     */
    public static async afterDuration(
        dharma: Dharma,
        amount: number,
        unit: DurationUnit,
    ): Promise<BigNumber> {
        const latestBlockTime = await dharma.blockchain.getCurrentBlockTime();

        // Find the UNIX timestamp in seconds for the intended expiration date.
        const currentDate = moment.unix(latestBlockTime);
        currentDate.add(amount, unit);
        const expirationInSeconds = currentDate.unix();

        return new BigNumber(expirationInSeconds);
    }

    /**
     * Given a string representation of a date, returns the UNIX timestamp in seconds.
     *
     * @example
     * const timestamp = Time.at("2013-02-08")
     * => { ... }
     *
     * timestamp.toNumber();
     * => 1360310400
     *
     * @param {string} dateInput
     * @returns {number}
     */
    public static at(dateInput: string): BigNumber {
        const date = moment(dateInput);
        const timestamp = date.unix();

        return new BigNumber(timestamp);
    }
}
