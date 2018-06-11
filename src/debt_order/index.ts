import * as _ from "lodash";
import * as moment from "moment";

import { BigNumber } from "../../utils/bignumber";

import { Dharma } from "../";

import { DebtOrderData, ECDSASignature, InterestRate, Term, TokenAmount } from "../types";

import { BLOCK_TIME_ESTIMATE_SECONDS } from "../../utils/constants";

/**
 * A list of options for specifying in units of duration, in singular and plural forms,
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

export interface FillParameters {
    creditorAddress: string;
}

export class DebtOrder {
    private debtOrderData: DebtOrderData = {};

    constructor(
        private dharma: Dharma,
        private principal: TokenAmount,
        private collateral: TokenAmount,
        private interestRate: InterestRate,
        private term: Term,
    ) {
        this.debtOrderData.principalAmount = principal.rawAmount;
        this.debtOrderData.principalToken = principal.tokenSymbol;
    }

    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @returns {Promise<boolean>}
     */
    public async isExpired(): Promise<boolean> {
        // This timestamp comes from the blockchain.
        const expirationTimestamp: BigNumber = this.debtOrderData.expirationTimestampInSec;
        // We compare this timestamp to the expected timestamp of the next block.
        const latestBlockTime = await this.getCurrentBlocktime();
        const approximateNextBlockTime = latestBlockTime + BLOCK_TIME_ESTIMATE_SECONDS;

        return expirationTimestamp.lt(approximateNextBlockTime);
    }

    /**
     * Given some duration expressed as an amount (e.g. "5") and unit (e.g. "weeks"), sets the
     * DebtOrder's expiration equal to the expected blockchain timestamp after that duration
     * has elapsed from the current time.
     *
     * @example
     * order.setExpiration(5, "days");
     * => Promise<void>
     *
     * order.setExpiration(2, "hours");
     * => Promise<void>
     *
     * order.setExpiration(1, "year");
     * => Promise<void>
     *
     * @param {number} amount
     * @param {DurationUnit} unit
     * @returns {Promise<void>}
     */
    public async setExpiration(amount: number, unit: DurationUnit): Promise<void> {
        const latestBlockTime = await this.getCurrentBlocktime();

        // Find the UNIX timestamp in seconds for the intended expiration date.
        const currentDate = moment.unix(latestBlockTime);
        const expirationDate = currentDate.add(amount, unit);
        const expirationInSeconds = expirationDate.unix();

        this.debtOrderData.expirationTimestampInSec = new BigNumber(expirationInSeconds);
    }

    public isSignedByUnderwriter(): boolean {
        return !_.isEmpty(this.debtOrderData.underwriterSignature);
    }

    public isSignedByDebtor(): boolean {
        return !_.isEmpty(this.debtOrderData.debtorSignature);
    }

    public async signAsUnderwriter() {
        if (this.isSignedByUnderwriter()) {
            return;
        }

        this.debtOrderData.underwriterSignature = await this.dharma.sign.asUnderwriter(
            this.debtOrderData,
            true,
        );
    }

    public async signAsDebtor() {
        if (this.isSignedByDebtor()) {
            return;
        }

        this.debtOrderData.debtorSignature = await this.dharma.sign.asDebtor(
            this.debtOrderData,
            true,
        );
    }

    public async isCancelled(): Promise<boolean> {
        return this.dharma.order.isCancelled(this.debtOrderData);
    }

    public async cancel(): Promise<string> {
        return this.dharma.order.cancelOrderAsync(this.debtOrderData);
    }

    public async isFilled(): Promise<boolean> {
        return this.dharma.order.checkOrderFilledAsync(this.debtOrderData);
    }

    public async fill(parameters: FillParameters): Promise<string> {
        this.debtOrderData.creditor = parameters.creditorAddress;

        this.debtOrderData.creditorSignature = await this.signAsCreditor();

        return this.dharma.order.fillAsync(this.debtOrderData);
    }

    private isSignedByCreditor(): boolean {
        return !_.isEmpty(this.debtOrderData.creditorSignature);
    }

    private async signAsCreditor(): Promise<ECDSASignature> {
        if (this.isSignedByCreditor()) {
            return this.debtOrderData.creditorSignature;
        }

        this.debtOrderData.creditorSignature = await this.dharma.sign.asCreditor(
            this.debtOrderData,
            true,
        );

        return this.debtOrderData.creditorSignature;
    }

    private serialize(): DebtOrderData {
        return this.debtOrderData;
    }

    private async getCurrentBlocktime(): Promise<number> {
        return this.dharma.blockchain.getCurrentBlockTime();
    }
}
