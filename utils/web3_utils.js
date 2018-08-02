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
exports.__esModule = true;
var promisify = require("tiny-promisify");
// Web3 1.0.0 and onwards is currently in beta, but has some
// useful utils builtin we like to leverage -- particularly
// a function for calculating hashes of tightly packed arguments
// in a manner that is identical to Solidity's methadology.
var Web3BetaUtils = require("web3-utils");
var Web3Utils = /** @class */ (function () {
    function Web3Utils(web3) {
        this.web3 = web3;
    }
    Web3Utils.soliditySHA3 = function () {
        var payload = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            payload[_i] = arguments[_i];
        }
        return Web3BetaUtils.soliditySha3.apply(Web3BetaUtils, payload);
    };
    Web3Utils.prototype.getNetworkIdAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, promisify(this.web3.version.getNetwork)()];
            });
        });
    };
    Web3Utils.prototype.getAvailableAddressesAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, promisify(this.web3.eth.getAccounts)()];
            });
        });
    };
    Web3Utils.prototype.doesContractExistAtAddressAsync = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var code, codeIsEmpty;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.web3.eth.getCode)(address)];
                    case 1:
                        code = _a.sent();
                        codeIsEmpty = /^0x0{0,40}$/i.test(code);
                        return [2 /*return*/, !codeIsEmpty];
                }
            });
        });
    };
    Web3Utils.prototype.getTransactionReceiptAsync = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, promisify(this.web3.eth.getTransactionReceipt)(txHash)];
            });
        });
    };
    Web3Utils.prototype.saveTestSnapshot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendJsonRpcRequestAsync("evm_snapshot", [])];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, parseInt(response.result, 16)];
                }
            });
        });
    };
    Web3Utils.prototype.revertToSnapshot = function (snapshotId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendJsonRpcRequestAsync("evm_revert", [snapshotId])];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.result];
                }
            });
        });
    };
    /**
     * Returns the current blocktime in seconds.
     *
     * @deprecated Extract this into Blockchain API.
     *
     * @returns {Promise<number>}
     */
    Web3Utils.prototype.getCurrentBlockTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentBlock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentBlock()];
                    case 1:
                        currentBlock = _a.sent();
                        return [2 /*return*/, currentBlock.timestamp];
                }
            });
        });
    };
    /**
     * @deprecated Extract this into Blockchain API.
     *
     * @returns {Promise<Web3.BlockWithoutTransactionData>}
     */
    Web3Utils.prototype.getCurrentBlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, promisify(this.web3.eth.getBlock)("latest")];
            });
        });
    };
    /**
     * Increases block time by the given number of seconds. Returns true
     * if the next block was mined successfully after increasing time.
     *
     * @param {number} seconds
     * @returns {Promise<boolean>}
     */
    Web3Utils.prototype.increaseTime = function (seconds) {
        return __awaiter(this, void 0, void 0, function () {
            var increaseTimeResponse, blockMineResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendJsonRpcRequestAsync("evm_increaseTime", [seconds])];
                    case 1:
                        increaseTimeResponse = _a.sent();
                        return [4 /*yield*/, this.mineBlock()];
                    case 2:
                        blockMineResponse = _a.sent();
                        return [2 /*return*/, !increaseTimeResponse["error"] && !blockMineResponse["error"]];
                }
            });
        });
    };
    /**
     * Mines a single block.
     *
     * @returns {Promise<"web3".Web3.JSONRPCResponsePayload>}
     */
    Web3Utils.prototype.mineBlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendJsonRpcRequestAsync("evm_mine", [])];
            });
        });
    };
    Web3Utils.prototype.sendJsonRpcRequestAsync = function (method, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, promisify(this.web3.currentProvider.sendAsync, {
                        context: this.web3.currentProvider
                    })({
                        jsonrpc: "2.0",
                        method: method,
                        params: params,
                        id: new Date().getTime()
                    })];
            });
        });
    };
    return Web3Utils;
}());
exports.Web3Utils = Web3Utils;
