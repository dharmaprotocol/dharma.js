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
var bignumber_js_1 = require("bignumber.js");
var web3_utils_1 = require("../../utils/web3_utils");
var invariants_1 = require("../invariants");
var singleLineString = require("single-line-string");
var REPAYMENT_GAS_MAXIMUM = 100000;
exports.ServicingAPIErrors = {
    DEBT_AGREEMENT_NONEXISTENT: function (issuanceHash) {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Debt agreement with issuance hash ", " could not\n                         be found in the deployed debt registry"], ["Debt agreement with issuance hash ", " could not\n                         be found in the deployed debt registry"])), issuanceHash);
    },
    INSUFFICIENT_REPAYMENT_BALANCE: function () {
        return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Payer does not have sufficient balance in the specified token\n                         to execute this repayment."], ["Payer does not have sufficient balance in the specified token\n                         to execute this repayment."])));
    },
    INSUFFICIENT_REPAYMENT_ALLOWANCE: function () {
        return singleLineString(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Payer has not granted the token transfer proxy a sufficient\n                         allowance in the specified token to execute this repayment."], ["Payer has not granted the token transfer proxy a sufficient\n                         allowance in the specified token to execute this repayment."])));
    },
};
var ServicingAPI = /** @class */ (function () {
    function ServicingAPI(web3, contracts) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new invariants_1.Assertions(web3);
    }
    ServicingAPI.prototype.makeRepayment = function (issuanceHash, amount, tokenAddress, options) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionOptions, _a, debtToken, repaymentRouter, debtRegistry, tokenTransferProxy, repaymentToken, repaymentRouterAddress;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getTxDefaultOptions()];
                    case 1:
                        transactionOptions = _b.sent();
                        Object.assign(transactionOptions, options);
                        return [4 /*yield*/, this.contracts.loadDharmaContractsAsync()];
                    case 2:
                        _a = _b.sent(), debtToken = _a.debtToken, repaymentRouter = _a.repaymentRouter, debtRegistry = _a.debtRegistry, tokenTransferProxy = _a.tokenTransferProxy;
                        this.assert.schema.bytes32("issuanceHash", issuanceHash);
                        this.assert.schema.number("amount", amount);
                        this.assert.schema.address("tokenAddress", tokenAddress);
                        return [4 /*yield*/, this.assert.debtAgreement.exists(issuanceHash, debtToken, exports.ServicingAPIErrors.DEBT_AGREEMENT_NONEXISTENT(issuanceHash))];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.contracts.loadERC20TokenAsync(tokenAddress)];
                    case 4:
                        repaymentToken = _b.sent();
                        return [4 /*yield*/, this.assert.token.hasSufficientBalance(repaymentToken, transactionOptions.from, amount, exports.ServicingAPIErrors.INSUFFICIENT_REPAYMENT_BALANCE())];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.assert.token.hasSufficientAllowance(repaymentToken, transactionOptions.from, tokenTransferProxy.address, amount, exports.ServicingAPIErrors.INSUFFICIENT_REPAYMENT_ALLOWANCE())];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, debtRegistry.get.callAsync(issuanceHash)];
                    case 7:
                        repaymentRouterAddress = (_b.sent())[0];
                        if (!(repaymentRouterAddress !== repaymentRouter.address)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.contracts.loadRepaymentRouterAtAsync(repaymentRouterAddress)];
                    case 8:
                        repaymentRouter = _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/, repaymentRouter.repay.sendTransactionAsync(issuanceHash, amount, tokenAddress, transactionOptions)];
                }
            });
        });
    };
    ServicingAPI.prototype.getValueRepaid = function (issuanceHash) {
        return __awaiter(this, void 0, void 0, function () {
            var debtRegistry, termsContractAddress, termsContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.bytes32("issuanceHash", issuanceHash);
                        return [4 /*yield*/, this.contracts.loadDebtRegistryAsync()];
                    case 1:
                        debtRegistry = _a.sent();
                        return [4 /*yield*/, debtRegistry.getTerms.callAsync(issuanceHash)];
                    case 2:
                        termsContractAddress = (_a.sent())[0];
                        return [4 /*yield*/, this.contracts.loadTermsContractAsync(termsContractAddress)];
                    case 3:
                        termsContract = _a.sent();
                        return [2 /*return*/, termsContract.getValueRepaidToDate.callAsync(issuanceHash)];
                }
            });
        });
    };
    ServicingAPI.prototype.getExpectedValueRepaid = function (issuanceHash, timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var debtRegistry, termsContractAddress, termsContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.bytes32("issuanceHash", issuanceHash);
                        return [4 /*yield*/, this.contracts.loadDebtRegistryAsync()];
                    case 1:
                        debtRegistry = _a.sent();
                        return [4 /*yield*/, debtRegistry.getTermsContract.callAsync(issuanceHash)];
                    case 2:
                        termsContractAddress = _a.sent();
                        return [4 /*yield*/, this.contracts.loadTermsContractAsync(termsContractAddress)];
                    case 3:
                        termsContract = _a.sent();
                        return [2 /*return*/, termsContract.getExpectedRepaymentValue.callAsync(issuanceHash, new bignumber_js_1.BigNumber(timestamp))];
                }
            });
        });
    };
    ServicingAPI.prototype.getTxDefaultOptions = function () {
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
                                gas: REPAYMENT_GAS_MAXIMUM,
                            }];
                }
            });
        });
    };
    return ServicingAPI;
}());
exports.ServicingAPI = ServicingAPI;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=servicing_api.js.map