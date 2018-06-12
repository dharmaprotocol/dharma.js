// External libraries
import * as moment from "moment";

// Utils
import { BigNumber } from "../../utils/bignumber";
import { Dharma } from "../index";

/**
 * A list of options for specifying units of duration, in singular and plural forms,
 * ranging from hours as the smallest value to years as the largest.
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
 * A class used for representing expiration time as it would appear on the blockchain.
 */
export class ExpirationTime {
    /**
     * Given some duration expressed as an amount (e.g. "5") and unit (e.g. "weeks"), creates the
     * a representation of an expiration time equal to the expected blockchain timestamp after that
     * duration has elapsed from the current time.
     *
     * @example
     * const expiration = new ExpirationTime(5, "days");
     * => void
     *
     * expiration.toBigNumber();
     * => Promise<BigNumber>
     *
     * new ExpirationTime(2, "hours");
     * => void
     *
     * new ExpirationTime(1, "year");
     * => void
     *
     * @param {Dharma} dharma
     * @param {number} amount
     * @param {DurationUnit} unit
     * @returns {Promise<void>}
     */
    constructor(
        private readonly dharma: Dharma,
        private readonly amount: number,
        private readonly unit: DurationUnit,
    ) {}

    /**
     * Returns the expiration time in seconds as a BigNumber.
     *
     * @returns {BigNumber}
     */
    public async toBigNumber(): Promise<BigNumber> {
        const latestBlockTime = await this.getCurrentBlocktime();

        // Find the UNIX timestamp in seconds for the intended expiration date.
        const currentDate = moment.unix(latestBlockTime);
        const expirationDate = currentDate.add(this.amount, this.unit);
        const expirationInSeconds = expirationDate.unix();

        return new BigNumber(expirationInSeconds);
    }

    private async getCurrentBlocktime(): Promise<number> {
        return this.dharma.blockchain.getCurrentBlockTime();
    }
}
