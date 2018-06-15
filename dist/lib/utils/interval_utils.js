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
var IntervalManager = /** @class */ (function () {
    function IntervalManager() {
        this.intervals = {};
        this._intervalCallback = this._intervalCallback.bind(this);
        this._timeoutCallback = this._timeoutCallback.bind(this);
    }
    IntervalManager.prototype.setInterval = function (intervalId, onCallback, onTimeout, intervalMs, timeoutMs) {
        this.intervals[intervalId] = {
            onCallback: onCallback,
            onTimeout: onTimeout,
            intervalMs: intervalMs,
            timeoutMs: timeoutMs,
        };
        setTimeout(this._intervalCallback(intervalId).bind(this), intervalMs);
        setTimeout(this._timeoutCallback(intervalId).bind(this), timeoutMs);
    };
    IntervalManager.prototype.clearInterval = function (intervalId) {
        if (intervalId in this.intervals) {
            delete this.intervals[intervalId];
        }
    };
    IntervalManager.prototype._intervalCallback = function (intervalId) {
        var _this = this;
        return function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, onCallback, intervalMs, continueInterval;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(intervalId in this.intervals)) return [3 /*break*/, 2];
                        _a = this.intervals[intervalId], onCallback = _a.onCallback, intervalMs = _a.intervalMs;
                        return [4 /*yield*/, onCallback()];
                    case 1:
                        continueInterval = _b.sent();
                        if (continueInterval) {
                            setTimeout(this._intervalCallback(intervalId), intervalMs);
                        }
                        else {
                            this.clearInterval(intervalId);
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
    };
    IntervalManager.prototype._timeoutCallback = function (intervalId) {
        var _this = this;
        return function () { return __awaiter(_this, void 0, void 0, function () {
            var onTimeout;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(intervalId in this.intervals)) return [3 /*break*/, 2];
                        onTimeout = this.intervals[intervalId].onTimeout;
                        return [4 /*yield*/, onTimeout()];
                    case 1:
                        _a.sent();
                        this.clearInterval(intervalId);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
    };
    return IntervalManager;
}());
exports.IntervalManager = IntervalManager;
//# sourceMappingURL=interval_utils.js.map