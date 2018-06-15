"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
// External
var _ = require("lodash");
var singleLineString = require("single-line-string");
var bignumber_1 = require("../../utils/bignumber");
// Utils
var constants_1 = require("../../utils/constants");
var invariants_1 = require("../invariants");
var types_1 = require("../types");
var TRANSFER_GAS_MAXIMUM = 70000;
exports.TokenAPIErrors = {
    INSUFFICIENT_SENDER_BALANCE: function (address) {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SENDER with address ", " does not have sufficient balance in the specified token\n                         to execute this transfer."], ["SENDER with address ", " does not have sufficient balance in the specified token\n                         to execute this transfer."])), address);
    },
    INSUFFICIENT_SENDER_ALLOWANCE: function (address) {
        return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SENDER with address ", " does not have sufficient allowance in the specified token\n                         to execute this transfer."], ["SENDER with address ", " does not have sufficient allowance in the specified token\n                         to execute this transfer."])), address);
    },
    TOKEN_DOES_NOT_EXIST: function (tokenSymbol) {
        return singleLineString(templateObject_3 || (templateObject_3 = __makeTemplateObject(["TOKEN with symbol ", " does not exist in the token registry."], ["TOKEN with symbol ", " does not exist in the token registry."])), tokenSymbol);
    },
};
var TokenAPI = /** @class */ (function () {
    function TokenAPI(web3, contracts) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new invariants_1.Assertions(this.web3, this.contracts);
    }
    /**
     * Asynchronously transfer value denominated in the specified ERC20 token to
     * the address specified.
     *
     * @param  tokenAddress the address of the token being used.
     * @param  to           to whom the transfer is being made.
     * @param  value        the amount being transferred.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    TokenAPI.prototype.transferAsync = function (tokenAddress, to, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txOptions, tokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, TRANSFER_GAS_MAXIMUM, options)];
                    case 1:
                        txOptions = _a.sent();
                        return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.assert.token.hasSufficientBalance(tokenContract, options.from, value, exports.TokenAPIErrors.INSUFFICIENT_SENDER_BALANCE(options.from))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, tokenContract.transfer.sendTransactionAsync(to, value, txOptions)];
                }
            });
        });
    };
    /**
     * Asynchronously transfer the value amount in the token specified so long
     * as the sender of the message has received sufficient allowance on behalf
     * of `from` to do so.
     *
     * @param  tokenAddress the address of the token being used.
     * @param  from         from whom are the funds being transferred.
     * @param  to           to whom are the funds being transferred.
     * @param  value        the amount to be transferred.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    TokenAPI.prototype.transferFromAsync = function (tokenAddress, from, to, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txOptions, tokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, TRANSFER_GAS_MAXIMUM, options)];
                    case 1:
                        txOptions = _a.sent();
                        return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.assert.token.hasSufficientBalance(tokenContract, from, value, exports.TokenAPIErrors.INSUFFICIENT_SENDER_BALANCE(from))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.assert.token.hasSufficientAllowance(tokenContract, from, options.from, value, exports.TokenAPIErrors.INSUFFICIENT_SENDER_ALLOWANCE(from))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, tokenContract.transferFrom.sendTransactionAsync(from, to, value, txOptions)];
                }
            });
        });
    };
    /**
     * Asynchronously retrieve the balance of tokens for the owner specified.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  ownerAddress address of the owner for whom the balance is being requested.
     * @return              the number of tokens the owner is holding.
     */
    TokenAPI.prototype.getBalanceAsync = function (tokenAddress, ownerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 1:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.assert.token.implementsERC20(tokenContract)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, tokenContract.balanceOf.callAsync(ownerAddress)];
                }
            });
        });
    };
    /**
     * Asynchronously set an allowance to the `tokenTransferProxy`.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  allowance    the size of the allowance.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    TokenAPI.prototype.setProxyAllowanceAsync = function (tokenAddress, allowance, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txOptions, tokenContract, tokenTransferProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, TRANSFER_GAS_MAXIMUM, options)];
                    case 1:
                        txOptions = _a.sent();
                        return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.assert.token.implementsERC20(tokenContract)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.contracts.loadTokenTransferProxyAsync()];
                    case 4:
                        tokenTransferProxy = _a.sent();
                        return [2 /*return*/, tokenContract.approve.sendTransactionAsync(tokenTransferProxy.address, allowance, txOptions)];
                }
            });
        });
    };
    /**
     * Asynchronously set an unlimited proxy allowance to the `tokenTransferProxy`.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    TokenAPI.prototype.setUnlimitedProxyAllowanceAsync = function (tokenAddress, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenContract, unlimitedAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 1:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.assert.token.implementsERC20(tokenContract)];
                    case 2:
                        _a.sent();
                        unlimitedAllowance = new bignumber_1.BigNumber(2).pow(256).sub(1);
                        return [2 /*return*/, this.setProxyAllowanceAsync(tokenAddress, unlimitedAllowance, options)];
                }
            });
        });
    };
    /**
     * Asynchronously determine the allowance afforded to the
     * `tokenTransferProxy` allotted by the specified owner.
     *
     * @param  tokenAddress address of the ERC20 token.
     * @param  ownerAddress the owner who made the allowance allotment.
     * @return              the allowance allotted to the `tokenTransferProxy`.
     */
    TokenAPI.prototype.getProxyAllowanceAsync = function (tokenAddress, ownerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenContract, tokenTransferProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 1:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.assert.token.implementsERC20(tokenContract)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.contracts.loadTokenTransferProxyAsync()];
                    case 3:
                        tokenTransferProxy = _a.sent();
                        return [2 /*return*/, tokenContract.allowance.callAsync(ownerAddress, tokenTransferProxy.address)];
                }
            });
        });
    };
    /**
     * Returns an array of token attributes, including symbol and name, for tokens that are
     * listed in Dharma's token registry.
     *
     * @returns {Promise<TokenAttributes[]>}
     */
    TokenAPI.prototype.getSupportedTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tokenRegistry, tokenSymbolListLength, allTokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadTokenRegistry()];
                    case 1:
                        tokenRegistry = _a.sent();
                        return [4 /*yield*/, tokenRegistry.tokenSymbolListLength.callAsync()];
                    case 2:
                        tokenSymbolListLength = _a.sent();
                        return [4 /*yield*/, Promise.all(Array.from(Array(tokenSymbolListLength.toNumber()).keys()).map(function (tokenIndex) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, address, symbol, name, numDecimals;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, tokenRegistry.getTokenAttributesByIndex.callAsync(new bignumber_1.BigNumber(tokenIndex))];
                                        case 1:
                                            _a = _b.sent(), address = _a[0], symbol = _a[1], name = _a[2], numDecimals = _a[3];
                                            return [2 /*return*/, {
                                                    address: address,
                                                    symbol: symbol,
                                                    name: name,
                                                    numDecimals: numDecimals,
                                                }];
                                    }
                                });
                            }); }))];
                    case 3:
                        allTokens = _a.sent();
                        // Filter out tokens that have been disabled in dharma.js
                        return [2 /*return*/, _.filter(allTokens, function (token) {
                                return !constants_1.DISABLED_TOKEN_SYMBOLS.includes(token.symbol);
                            })];
                }
            });
        });
    };
    /**
     * Asynchronously retrieve the list of symbols of the tokens in the TokenRegistry.
     *
     * @returns {Promise<String[]>} the list of symbols of the tokens in the TokenRegistry.
     */
    TokenAPI.prototype.getTokenSymbolList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRegistry, tokenSymbolListLength, tokenSymbolList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadTokenRegistry()];
                    case 1:
                        tokenRegistry = _a.sent();
                        return [4 /*yield*/, tokenRegistry.tokenSymbolListLength.callAsync()];
                    case 2:
                        tokenSymbolListLength = _a.sent();
                        return [4 /*yield*/, Promise.all(Array.from(Array(tokenSymbolListLength.toNumber()).keys()).map(function (i) {
                                return tokenRegistry.tokenSymbolList.callAsync(new bignumber_1.BigNumber(i));
                            }))];
                    case 3:
                        tokenSymbolList = _a.sent();
                        // Filter out tokens that have been disabled in dharma.js
                        return [2 /*return*/, _.filter(tokenSymbolList, function (tokenSymbol) {
                                return !constants_1.DISABLED_TOKEN_SYMBOLS.includes(tokenSymbol);
                            })];
                }
            });
        });
    };
    /**
     * Asynchronously retrieve the number of decimal points used by the given token.
     *
     * @param  tokenSymbol symbol of the ERC20 token.
     * @return             the number of decimal points used by the given token.
     */
    TokenAPI.prototype.getNumDecimals = function (tokenSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            var registry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadTokenRegistry()];
                    case 1:
                        registry = _a.sent();
                        return [4 /*yield*/, this.assert.token.exists(tokenSymbol, registry, exports.TokenAPIErrors.TOKEN_DOES_NOT_EXIST(tokenSymbol))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, registry.getNumDecimalsFromSymbol.callAsync(tokenSymbol)];
                }
            });
        });
    };
    return TokenAPI;
}());
exports.TokenAPI = TokenAPI;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=token_api.js.map