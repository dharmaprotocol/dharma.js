"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var debt_kernel_error_1 = require("./debt_kernel_error");
var logging_1 = require("./logging");
var repayment_router_error_1 = require("./repayment_router_error");
var Origin;
(function (Origin) {
    Origin[Origin["DebtKernel"] = 0] = "DebtKernel";
    Origin[Origin["RepaymentRouter"] = 1] = "RepaymentRouter";
})(Origin || (Origin = {}));
var ErrorParser = /** @class */ (function () {
    function ErrorParser(contractAddressBook) {
        var _this = this;
        this.contractAddressBook = contractAddressBook;
        this.parseDecodedLogs = function (logs) {
            return _.chain(logs)
                .compact() // filter out any undefined values
                .filter(_this.isParseableEntry) // filter out any non-parseable entries
                .flatMap(_this.parseEntry) // parse out errors
                .value();
        };
        this.isParseableEntry = function (log) {
            return log.hasOwnProperty("name");
        };
        this.parseEntry = function (entry) {
            if (entry.name === logging_1.Logging.LOG_ERROR_NAME) {
                var origin_1 = _this.parseOrigin(entry);
                return _.chain(entry.events)
                    .map(_this.parseErrorID) // pull out error ids
                    .filter(function (n) { return n != null; }) // filter out undefined values
                    .map(function (n) { return _this.messageForErrorWithID(n, origin_1); }) // pull human-readable messages for each error id
                    .value();
            }
            else {
                return [];
            }
        };
        this.parseOrigin = function (entry) {
            if (entry.address === _this.contractAddressBook.debtKernel) {
                return Origin.DebtKernel;
            }
            else if (entry.address === _this.contractAddressBook.repaymentRouter) {
                return Origin.RepaymentRouter;
            }
        };
        this.messageForErrorWithID = function (id, origin) {
            switch (origin) {
                case Origin.DebtKernel:
                    return debt_kernel_error_1.DebtKernelError.messageForError(id);
                case Origin.RepaymentRouter:
                    return repayment_router_error_1.RepaymentRouterError.messageForError(id);
            }
        };
        this.parseErrorID = function (event) {
            return event.name === logging_1.Logging.ERROR_ID ? Number(event.value) : undefined;
        };
        this.contractAddressBook = contractAddressBook;
    }
    return ErrorParser;
}());
exports.ErrorParser = ErrorParser;
//# sourceMappingURL=error_parser.js.map