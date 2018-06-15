"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map = require("lodash.map");
// The repayment schedule is calculated on basis of how charta computes it,
// which simplifies the "months" unit as equal to 30 days.
var AMORTIZATION_UNIT_TO_SECONDS = {
    hours: 60 * 60,
    days: 60 * 60 * 24,
    weeks: 60 * 60 * 24 * 7,
    months: 60 * 60 * 24 * 30,
    years: 60 * 60 * 24 * 365,
};
/**
 * Given an amortization unit, term length, and issuance date
 * an instance of RepaymentSchedule can compute return a list of the dates for repayment.
 *
 * @example
 *  const currentTime = new BigNumber(Math.round(Date.now()/1000))
 *  const termLength = new BigNumber(1)
 *  const schedule = new RepaymentSchedule("months", termLength, currentTime)
 *
 *  // Usage
 *  schedule.toArray()
 *  => [1521506879]
 */
var RepaymentSchedule = /** @class */ (function () {
    function RepaymentSchedule(amortizationUnit, termLength, issuanceBlockTimestamp) {
        this.amortizationUnit = amortizationUnit;
        this.termLength = termLength;
        this.issuanceBlockTimestamp = issuanceBlockTimestamp;
        var repayments = new Array(this.numRepaymentsToReturn());
        var unitSeconds = this.unitInSeconds();
        var timestamp = this.issuanceBlockTimestamp;
        this.repaymentDates = map(repayments, function () { return (timestamp += unitSeconds); });
    }
    /**
     * Returns an array of dates (as unix timestamps) comprising the repayment schedule.
     *
     * @returns {Array<number>}
     */
    RepaymentSchedule.prototype.toArray = function () {
        return this.repaymentDates;
    };
    RepaymentSchedule.prototype.numRepaymentsToReturn = function () {
        return this.termLength.toNumber();
    };
    RepaymentSchedule.prototype.unitInSeconds = function () {
        return AMORTIZATION_UNIT_TO_SECONDS[this.amortizationUnit];
    };
    return RepaymentSchedule;
}());
exports.RepaymentSchedule = RepaymentSchedule;
//# sourceMappingURL=repayment_schedule.js.map