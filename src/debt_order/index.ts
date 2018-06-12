import * as _ from "lodash";
import * as moment from "moment";
import { BigNumber } from "../../utils/bignumber";

import { Dharma } from "../";
import { CollateralizedSimpleInterestLoanOrder } from "../adapters/collateralized_simple_interest_loan_adapter";
import { DebtOrderData, ECDSASignature, InterestRate, Term, TokenAmount } from "../types";
import { DebtOrderDataWrapper } from "../wrappers";

export interface DebtOrderParams {
    principal: TokenAmount;
    collateral: TokenAmount;
    interestRate: InterestRate;
    term: Term;
    debtorAddress: string;
}

import { BLOCK_TIME_ESTIMATE_SECONDS } from "../../utils/constants";

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

export interface FillParameters {
    creditorAddress: string;
}

export class DebtOrder {
    public static async create(dharma: Dharma, params: DebtOrderParams): Promise<DebtOrder> {
        const { principal, collateral, interestRate, term, debtorAddress } = params;

        const loanOrder: CollateralizedSimpleInterestLoanOrder = {
            principalAmount: principal.rawAmount,
            principalTokenSymbol: principal.tokenSymbol,
            interestRate: interestRate.raw,
            amortizationUnit: term.unit,
            termLength: term.getLength(),
            collateralTokenSymbol: principal.tokenSymbol,
            collateralAmount: collateral.rawAmount,
            gracePeriodInDays: new BigNumber(0),
        };

        const data = await dharma.adapters.collateralizedSimpleInterestLoan.toDebtOrder(loanOrder);
        data.debtor = debtorAddress;

        const debtOrder = new DebtOrder(dharma, params, data);

        await debtOrder.signAsDebtor();

        return debtOrder;
    }

    private constructor(
        private dharma: Dharma,
        private params: DebtOrderParams,
        private data: DebtOrderData,
    ) {}

    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @returns {Promise<boolean>}
     */
    public async isExpired(): Promise<boolean> {
        // This timestamp comes from the blockchain.
        const expirationTimestamp: BigNumber = this.data.expirationTimestampInSec;
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

        this.data.expirationTimestampInSec = new BigNumber(expirationInSeconds);
    }

    public isSignedByUnderwriter(): boolean {
        return !_.isEmpty(this.data.underwriterSignature);
    }

    public isSignedByDebtor(): boolean {
        return !_.isEmpty(this.data.debtorSignature);
    }

    public async signAsUnderwriter() {
        if (this.isSignedByUnderwriter()) {
            return;
        }

        this.data.underwriterSignature = await this.dharma.sign.asUnderwriter(this.data, true);
    }

    public async signAsDebtor() {
        if (this.isSignedByDebtor()) {
            return;
        }

        this.data.debtorSignature = await this.dharma.sign.asDebtor(this.data, true);
    }

    public async isCancelled(): Promise<boolean> {
        return this.dharma.order.isCancelled(this.data);
    }

    public async cancel(): Promise<string> {
        return this.dharma.order.cancelOrderAsync(this.data);
    }

    public async isFilled(): Promise<boolean> {
        return this.dharma.order.checkOrderFilledAsync(this.data);
    }

    public async fill(parameters: FillParameters): Promise<string> {
        this.data.creditor = parameters.creditorAddress;

        await this.signAsCreditor();

        return this.dharma.order.fillAsync(this.data);
    }

    public async isCollateralWithdrawn(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.isCollateralWithdrawn(
            this.getAgreementId(),
        );
    }

    public async isCollateralSeizable(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.canSeizeCollateral(
            this.getAgreementId(),
        );
    }

    public async isCollateralReturnable(): Promise<boolean> {
        return this.dharma.adapters.collateralizedSimpleInterestLoan.canReturnCollateral(
            this.getAgreementId(),
        );
    }

    private isSignedByCreditor(): boolean {
        return !_.isEmpty(this.data.creditorSignature);
    }

    private async signAsCreditor(): Promise<void> {
        if (this.isSignedByCreditor()) {
            return;
        }

        this.data.creditorSignature = await this.dharma.sign.asCreditor(this.data, true);
    }

    private getAgreementId(): string {
        return new DebtOrderDataWrapper(this.debtOrderData).getHash();
    }

    private serialize(): DebtOrderData {
        return this.data;
    }

    private async getCurrentBlocktime(): Promise<number> {
        return this.dharma.blockchain.getCurrentBlockTime();
    }
}
