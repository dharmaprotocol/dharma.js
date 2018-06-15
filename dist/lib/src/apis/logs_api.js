"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ABIDecoder = require("abi-decoder");
var _ = require("lodash");
var types_1 = require("../types");
var web3_utils_1 = require("../../utils/web3_utils");
var LogsAPI = /** @class */ (function () {
    function LogsAPI(web3, contracts) {
        this.web3Utils = new web3_utils_1.Web3Utils(web3);
        this.web3 = web3;
        this.contracts = contracts;
    }
    /**
     * @example
     * // Get all "LogLoanOrderFilled" events between blocks 0 and 300.
     * await dharma.logs.get(["LogLoanOrderFilled"], { from: 0, to: 300 });
     *
     * // Get the last 10 "LogLoanOrderFilled" events between blocks 0 and 300.
     * await dharma.logs.get(["LogLoanOrderFilled"], { from: 0, to: 300, limit: 10 });
     *
     * // Get the last 10 "LogLoanOrderFilled" events.
     * await dharma.logs.get(["LogLoanOrderFilled"], { limit: 10 });
     *
     * // Get the last 10 "LogLoanOrderFilled" or "LogLoanOrderCancelled" events that occurred.
     * await dharma.logs.get(["LogLoanOrderFilled", "LogLoanOrderCancelled"], { limit: 10 });
     *
     * // Get all of the "LogLoanOrderFilled" events.
     * await dharma.logs.get(["LogLoanOrderFilled"]);
     *
     * // Get all of the "LogLoanOrderFilled" events.
     * await dharma.logs.get("LogLoanOrderFilled");
     *
     * @param {string | string[]} eventNames
     * @param {GetEventOptions} options
     * @returns {Promise<any>}
     */
    LogsAPI.prototype.get = function (eventNames, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var fromBlock, limit, toBlock, eventToContract, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromBlock = options.fromBlock, limit = options.limit, toBlock = options.toBlock;
                        if (limit === 0) {
                            return [2 /*return*/, []];
                        }
                        eventNames = _.castArray(eventNames);
                        return [4 /*yield*/, this.getEventToContractsMap()];
                    case 1:
                        eventToContract = _a.sent();
                        events = [];
                        return [4 /*yield*/, Promise.all(eventNames.map(function (eventName) { return __awaiter(_this, void 0, void 0, function () {
                                var contractWrapper, contract;
                                return __generator(this, function (_a) {
                                    contractWrapper = eventToContract[eventName];
                                    ABIDecoder.addABI(contractWrapper.abi);
                                    contract = this.web3.eth
                                        .contract(contractWrapper.abi)
                                        .at(contractWrapper.address);
                                    return [2 /*return*/, new Promise(function (resolve) {
                                            var eventsWatcher = contract.allEvents({
                                                fromBlock: fromBlock || 0,
                                                toBlock: toBlock || "latest",
                                            });
                                            eventsWatcher.get(function (error, logs) {
                                                var filteredEvents = _.filter(logs, function (log) { return log.event === eventName; });
                                                events = events.concat(filteredEvents);
                                                ABIDecoder.removeABI(contractWrapper.abi);
                                                resolve();
                                            });
                                            eventsWatcher.stopWatching();
                                        })];
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        if (limit) {
                            return [2 /*return*/, _.take(events, limit)];
                        }
                        else {
                            return [2 /*return*/, events];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a list of events that are obtainable from Dharma Protocol contracts.
     *
     * @example
     * dharma.logs.list()
     * => [
     *  "LogDebtOrderFilled",
     *  "LogIssuanceCancelled",
     *  "LogDebtOrderCancelled",
     *  "LogError",
     *  "Pause",
     *  ...
     * ]
     *
     * @returns {string[]}
     */
    LogsAPI.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eventToContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEventToContractsMap()];
                    case 1:
                        eventToContract = _a.sent();
                        return [2 /*return*/, Object.keys(eventToContract)];
                }
            });
        });
    };
    /**
     * Asynchronously retrieve any error logs that might have occurred during a
     * given transaction. These errors are returned as human-readable strings.
     *
     * @param  txHash the hash of the transaction for which error logs are being queried.
     * @return        the errors encountered (as human-readable strings).
     */
    LogsAPI.prototype.getErrorLogs = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var receipt, _a, debtKernel, repaymentRouter, decodedLogs, parser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.web3Utils.getTransactionReceiptAsync(txHash)];
                    case 1:
                        receipt = _b.sent();
                        return [4 /*yield*/, this.contracts.loadDharmaContractsAsync()];
                    case 2:
                        _a = _b.sent(), debtKernel = _a.debtKernel, repaymentRouter = _a.repaymentRouter;
                        decodedLogs = ABIDecoder.decodeLogs(receipt.logs);
                        parser = new types_1.ErrorParser({
                            debtKernel: debtKernel.address,
                            repaymentRouter: repaymentRouter.address,
                        });
                        return [2 /*return*/, parser.parseDecodedLogs(decodedLogs)];
                }
            });
        });
    };
    /**
     * TODO: Add watch function.
     *
     * @example
     * // Get a listener for "LogLoanOrderFilled" events
     * dharma.logs.watch("LogLoanOrderFilled");
     *
     * @param {string | string[]} eventNames
     * @returns {Promise<any>}
     *
     * public watch(eventNames: string | string[]): Promise<any>;
     */
    /**
     * Creates a mapping of event names to the contract where they originate.
     *
     * @example
     * getEventToContractsMap();
     * => { "LogDebtOrderFilled" => DebtKernel, ... }
     *
     * @returns {Promise<object>}
     */
    LogsAPI.prototype.getEventToContractsMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contractWrappers, eventToContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContractWrappers()];
                    case 1:
                        contractWrappers = _a.sent();
                        eventToContract = {};
                        contractWrappers.forEach(function (wrapper) {
                            var filteredEvents = _.filter(wrapper.abi, function (element) { return element.type === "event"; });
                            filteredEvents.forEach(function (event) {
                                eventToContract[event.name] = wrapper;
                            });
                        });
                        return [2 /*return*/, eventToContract];
                }
            });
        });
    };
    LogsAPI.prototype.getContractWrappers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, debtKernel, debtRegistry, debtToken, repaymentRouter, tokenTransferProxy, collateralizer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadDharmaContractsAsync()];
                    case 1:
                        _a = _b.sent(), debtKernel = _a.debtKernel, debtRegistry = _a.debtRegistry, debtToken = _a.debtToken, repaymentRouter = _a.repaymentRouter, tokenTransferProxy = _a.tokenTransferProxy, collateralizer = _a.collateralizer;
                        return [2 /*return*/, [
                                debtKernel,
                                debtRegistry,
                                debtToken,
                                repaymentRouter,
                                tokenTransferProxy,
                                collateralizer,
                            ]];
                }
            });
        });
    };
    return LogsAPI;
}());
exports.LogsAPI = LogsAPI;
//# sourceMappingURL=logs_api.js.map