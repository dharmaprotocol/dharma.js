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
var wrappers_1 = require("../wrappers");
var constants_1 = require("../../utils/constants");
var singleLineString = require("single-line-string");
exports.ContractsError = {
    SIMPLE_INTEREST_TERMS_CONTRACT_NOT_SUPPORTED: function (principalToken) {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SimpleInterestTermsContract not supported for principal token at\n                address ", ""], ["SimpleInterestTermsContract not supported for principal token at\n                address ", ""])), principalToken);
    },
    CANNOT_FIND_TOKEN_WITH_SYMBOL: function (symbol) {
        return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Could not find token associated with symbol ", "."], ["Could not find token associated with symbol ", "."])), symbol);
    },
};
var ContractsAPI = /** @class */ (function () {
    function ContractsAPI(web3, config) {
        if (config === void 0) { config = {}; }
        this.web3 = web3;
        this.config = config;
        this.cache = {};
    }
    ContractsAPI.prototype.loadDharmaContractsAsync = function (transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var debtKernel, debtToken, repaymentRouter, tokenTransferProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadDebtKernelAsync(transactionOptions)];
                    case 1:
                        debtKernel = _a.sent();
                        return [4 /*yield*/, this.loadDebtTokenAsync(transactionOptions)];
                    case 2:
                        debtToken = _a.sent();
                        return [4 /*yield*/, this.loadRepaymentRouterAsync(transactionOptions)];
                    case 3:
                        repaymentRouter = _a.sent();
                        return [4 /*yield*/, this.loadTokenTransferProxyAsync(transactionOptions)];
                    case 4:
                        tokenTransferProxy = _a.sent();
                        return [2 /*return*/, { debtKernel: debtKernel, debtToken: debtToken, repaymentRouter: repaymentRouter, tokenTransferProxy: tokenTransferProxy }];
                }
            });
        });
    };
    ContractsAPI.prototype.loadDebtKernelAsync = function (transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var debtKernel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (constants_1.DEBT_KERNEL_CONTRACT_CACHE_KEY in this.cache) {
                            return [2 /*return*/, this.cache[constants_1.DEBT_KERNEL_CONTRACT_CACHE_KEY]];
                        }
                        if (!this.config.kernelAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, wrappers_1.DebtKernelContract.at(this.config.kernelAddress, this.web3, transactionOptions)];
                    case 1:
                        debtKernel = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, wrappers_1.DebtKernelContract.deployed(this.web3, transactionOptions)];
                    case 3:
                        debtKernel = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.cache[constants_1.DEBT_KERNEL_CONTRACT_CACHE_KEY] = debtKernel;
                        return [2 /*return*/, debtKernel];
                }
            });
        });
    };
    ContractsAPI.prototype.loadDebtTokenAsync = function (transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var debtToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (constants_1.DEBT_TOKEN_CONTRACT_CACHE_KEY in this.cache) {
                            return [2 /*return*/, this.cache[constants_1.DEBT_TOKEN_CONTRACT_CACHE_KEY]];
                        }
                        if (!this.config.kernelAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, wrappers_1.DebtTokenContract.at(this.config.tokenAddress, this.web3, transactionOptions)];
                    case 1:
                        debtToken = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, wrappers_1.DebtTokenContract.deployed(this.web3, transactionOptions)];
                    case 3:
                        debtToken = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.cache[constants_1.DEBT_TOKEN_CONTRACT_CACHE_KEY] = debtToken;
                        return [2 /*return*/, debtToken];
                }
            });
        });
    };
    ContractsAPI.prototype.loadRepaymentRouterAsync = function (transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var repaymentRouter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (constants_1.REPAYMENT_ROUTER_CONTRACT_CACHE_KEY in this.cache) {
                            return [2 /*return*/, this.cache[constants_1.REPAYMENT_ROUTER_CONTRACT_CACHE_KEY]];
                        }
                        if (!this.config.repaymentRouterAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, wrappers_1.RepaymentRouterContract.at(this.config.repaymentRouterAddress, this.web3, transactionOptions)];
                    case 1:
                        repaymentRouter = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, wrappers_1.RepaymentRouterContract.deployed(this.web3, transactionOptions)];
                    case 3:
                        repaymentRouter = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.cache[constants_1.REPAYMENT_ROUTER_CONTRACT_CACHE_KEY] = repaymentRouter;
                        return [2 /*return*/, repaymentRouter];
                }
            });
        });
    };
    ContractsAPI.prototype.loadTokenTransferProxyAsync = function (transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenTransferProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (constants_1.TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY in this.cache) {
                            return [2 /*return*/, this.cache[constants_1.TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY]];
                        }
                        if (!this.config.tokenTransferProxyAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, wrappers_1.TokenTransferProxyContract.at(this.config.tokenTransferProxyAddress, this.web3, transactionOptions)];
                    case 1:
                        tokenTransferProxy = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, wrappers_1.TokenTransferProxyContract.deployed(this.web3, transactionOptions)];
                    case 3:
                        tokenTransferProxy = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.cache[constants_1.TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY] = tokenTransferProxy;
                        return [2 /*return*/, tokenTransferProxy];
                }
            });
        });
    };
    ContractsAPI.prototype.loadERC20TokenAsync = function (tokenAddress, transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, tokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = this.getERC20TokenCacheKey(tokenAddress);
                        if (!(cacheKey in this.cache)) return [3 /*break*/, 1];
                        return [2 /*return*/, this.cache[cacheKey]];
                    case 1: return [4 /*yield*/, wrappers_1.ERC20Contract.at(tokenAddress, this.web3, transactionOptions)];
                    case 2:
                        tokenContract = _a.sent();
                        this.cache[cacheKey] = tokenContract;
                        return [2 /*return*/, tokenContract];
                }
            });
        });
    };
    ContractsAPI.prototype.loadTermsContractRegistry = function (transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var termsContractRegistry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (constants_1.TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY in this.cache) {
                            return [2 /*return*/, this.cache[constants_1.TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY]];
                        }
                        return [4 /*yield*/, wrappers_1.TermsContractRegistryContract.deployed(this.web3, transactionOptions)];
                    case 1:
                        termsContractRegistry = _a.sent();
                        this.cache[constants_1.TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY] = termsContractRegistry;
                        return [2 /*return*/, termsContractRegistry];
                }
            });
        });
    };
    ContractsAPI.prototype.loadSimpleInterestTermsContract = function (tokenAddress, transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, termsContractRegistry, simpleInterestTermsContractAddress, simpleInterestTermsContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = this.getSimpleInterestTermsContractCacheKey(tokenAddress);
                        if (!(cacheKey in this.cache)) return [3 /*break*/, 1];
                        return [2 /*return*/, this.cache[cacheKey]];
                    case 1: return [4 /*yield*/, this.loadTermsContractRegistry(transactionOptions)];
                    case 2:
                        termsContractRegistry = _a.sent();
                        return [4 /*yield*/, termsContractRegistry.getSimpleInterestTermsContractAddress.callAsync(tokenAddress)];
                    case 3:
                        simpleInterestTermsContractAddress = _a.sent();
                        if (simpleInterestTermsContractAddress === constants_1.NULL_ADDRESS) {
                            throw new Error(exports.ContractsError.SIMPLE_INTEREST_TERMS_CONTRACT_NOT_SUPPORTED(tokenAddress));
                        }
                        return [4 /*yield*/, wrappers_1.SimpleInterestTermsContractContract.at(simpleInterestTermsContractAddress, this.web3, transactionOptions)];
                    case 4:
                        simpleInterestTermsContract = _a.sent();
                        this.cache[cacheKey] = simpleInterestTermsContract;
                        return [2 /*return*/, simpleInterestTermsContract];
                }
            });
        });
    };
    ContractsAPI.prototype.loadTokenRegistry = function (transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRegistryContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (constants_1.TOKEN_REGISTRY_CONTRACT_CACHE_KEY in this.cache) {
                            return [2 /*return*/, this.cache[constants_1.TOKEN_REGISTRY_CONTRACT_CACHE_KEY]];
                        }
                        if (!this.config.tokenRegistryAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, wrappers_1.TokenRegistryContract.at(this.config.tokenRegistryAddress, this.web3, transactionOptions)];
                    case 1:
                        tokenRegistryContract = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, wrappers_1.TokenRegistryContract.deployed(this.web3, transactionOptions)];
                    case 3:
                        tokenRegistryContract = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.cache[constants_1.TOKEN_REGISTRY_CONTRACT_CACHE_KEY] = tokenRegistryContract;
                        return [2 /*return*/, tokenRegistryContract];
                }
            });
        });
    };
    ContractsAPI.prototype.getTokenAddressBySymbolAsync = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRegistryContract, tokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadTokenRegistry({})];
                    case 1:
                        tokenRegistryContract = _a.sent();
                        return [4 /*yield*/, tokenRegistryContract.getTokenAddress.callAsync(symbol)];
                    case 2:
                        tokenAddress = _a.sent();
                        if (tokenAddress === constants_1.NULL_ADDRESS) {
                            throw new Error(exports.ContractsError.CANNOT_FIND_TOKEN_WITH_SYMBOL(symbol));
                        }
                        return [2 /*return*/, tokenAddress];
                }
            });
        });
    };
    ContractsAPI.prototype.loadTokenBySymbolAsync = function (symbol, transactionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTokenAddressBySymbolAsync(symbol)];
                    case 1:
                        tokenAddress = _a.sent();
                        return [2 /*return*/, this.loadERC20TokenAsync(tokenAddress, transactionOptions)];
                }
            });
        });
    };
    ContractsAPI.prototype.getERC20TokenCacheKey = function (tokenAddress) {
        return "ERC20_" + tokenAddress;
    };
    ContractsAPI.prototype.getSimpleInterestTermsContractCacheKey = function (tokenAddress) {
        return "SimpleInterestTermsContract_" + tokenAddress;
    };
    return ContractsAPI;
}());
exports.ContractsAPI = ContractsAPI;
var templateObject_1, templateObject_2;
//# sourceMappingURL=contracts_api.js.map