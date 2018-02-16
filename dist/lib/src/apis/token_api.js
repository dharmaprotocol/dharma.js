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
var web3_utils_1 = require("../../utils/web3_utils");
var bignumber_js_1 = require("bignumber.js");
var TRANSFER_GAS_MAXIMUM = 70000;
var TokenAPI = /** @class */ (function () {
    function TokenAPI(web3, contracts) {
        this.web3 = web3;
        this.contracts = contracts;
    }
    TokenAPI.prototype.transferAsync = function (tokenAddress, to, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionOptions, tokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTxDefaultOptions()];
                    case 1:
                        transactionOptions = _a.sent();
                        Object.assign(transactionOptions, options);
                        return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [2 /*return*/, tokenContract.transfer.sendTransactionAsync(to, value, transactionOptions)];
                }
            });
        });
    };
    TokenAPI.prototype.transferFromAsync = function (tokenAddress, from, to, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionOptions, tokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTxDefaultOptions()];
                    case 1:
                        transactionOptions = _a.sent();
                        Object.assign(transactionOptions, options);
                        return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [2 /*return*/, tokenContract.transferFrom.sendTransactionAsync(from, to, value, transactionOptions)];
                }
            });
        });
    };
    TokenAPI.prototype.getBalanceAsync = function (tokenAddress, ownerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 1:
                        tokenContract = _a.sent();
                        return [2 /*return*/, tokenContract.balanceOf.callAsync(ownerAddress)];
                }
            });
        });
    };
    TokenAPI.prototype.setProxyAllowanceAsync = function (tokenAddress, allowance, options) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionOptions, tokenContract, tokenTransferProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTxDefaultOptions()];
                    case 1:
                        transactionOptions = _a.sent();
                        Object.assign(transactionOptions, options);
                        return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.contracts.loadTokenTransferProxyAsync()];
                    case 3:
                        tokenTransferProxy = _a.sent();
                        return [2 /*return*/, tokenContract.approve.sendTransactionAsync(tokenTransferProxy.address, allowance, transactionOptions)];
                }
            });
        });
    };
    TokenAPI.prototype.setUnlimitedProxyAllowanceAsync = function (tokenAddress, options) {
        return __awaiter(this, void 0, void 0, function () {
            var unlimitedAllowance;
            return __generator(this, function (_a) {
                unlimitedAllowance = new bignumber_js_1.BigNumber(2).pow(256).sub(1);
                return [2 /*return*/, this.setProxyAllowanceAsync(tokenAddress, unlimitedAllowance, options)];
            });
        });
    };
    TokenAPI.prototype.getProxyAllowanceAsync = function (tokenAddress, ownerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenContract, tokenTransferProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 1:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.contracts.loadTokenTransferProxyAsync()];
                    case 2:
                        tokenTransferProxy = _a.sent();
                        return [2 /*return*/, tokenContract.allowance.callAsync(ownerAddress, tokenTransferProxy.address)];
                }
            });
        });
    };
    TokenAPI.prototype.getTxDefaultOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var web3Utils, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web3Utils = new web3_utils_1.Web3Utils(this.web3);
                        return [4 /*yield*/, web3Utils.getAvailableAddressesAsync()];
                    case 1:
                        accounts = _a.sent();
                        // TODO: Add fault tolerance to scenario in which not addresses are available
                        return [2 /*return*/, {
                                from: accounts[0],
                                gas: TRANSFER_GAS_MAXIMUM,
                            }];
                }
            });
        });
    };
    return TokenAPI;
}());
exports.TokenAPI = TokenAPI;
//# sourceMappingURL=token_api.js.map