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
// constants
var constants_1 = require("../../utils/constants");
// libraries
var singleLineString = require("single-line-string");
var bignumber_1 = require("../../utils/bignumber");
// utils
var web3_utils_1 = require("../../utils/web3_utils");
var invariants_1 = require("../invariants");
// types
var collateralized_simple_interest_loan_adapter_1 = require("../adapters/collateralized_simple_interest_loan_adapter");
var simple_interest_loan_adapter_1 = require("../adapters/simple_interest_loan_adapter");
var REPAYMENT_GAS_MAXIMUM = 150000;
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
    UNKNOWN_LOAN_ADAPTER: function (termsContract) {
        return singleLineString(templateObject_4 || (templateObject_4 = __makeTemplateObject(["Associated loan adapter not found for terms contract at ", ""], ["Associated loan adapter not found for terms contract at ", ""])), termsContract);
    },
};
var ServicingAPI = /** @class */ (function () {
    function ServicingAPI(web3, contracts) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new invariants_1.Assertions(this.web3, this.contracts);
    }
    /**
     * Asynchronously issue a repayment towards a debt agreement.
     *
     * Note that the address of whoever is making the repayment must allot a
     * sufficient allowance (equal to or greater than the amount specified in
     * this call) to the `tokenTransferProxy` in order for this transaction to
     * succeed.
     *
     * @param  issuanceHash the hash of the issuance to which the repayment is being made.
     * @param  amount       the amount that is being repaid.
     * @param  tokenAddress the address of the token in which the repayment is being made.
     * @param  options      any parameters necessary to modify the transaction.
     * @return              the hash of the resulting transaction.
     */
    ServicingAPI.prototype.makeRepayment = function (issuanceHash, amount, tokenAddress, options) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionOptions, _a, debtToken, repaymentRouter, debtRegistry, tokenTransferProxy, repaymentToken, entry;
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
                        entry = _b.sent();
                        if (!(entry.version !== repaymentRouter.address)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.contracts.loadRepaymentRouterAtAsync(entry.version)];
                    case 8:
                        repaymentRouter = _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/, repaymentRouter.repay.sendTransactionAsync(issuanceHash, amount, tokenAddress, transactionOptions)];
                }
            });
        });
    };
    /**
     * Asynchronously retrieve the amount that has been repaid to date towards a
     * debt agreement.
     *
     * @param  issuanceHash the hash of the debt agreement.
     * @return              the amount that has been repaid to date.
     */
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
    /**
     * Asynchronously determine the expected value of repayments at a given
     * point in time for a given debt agreement.
     *
     * @param  issuanceHash the hash of a debt agreement.
     * @param  timestamp    the point in time at which the expected value is to be calculated.
     * @return              the expected value of repayments at the point in time specified.
     */
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
                        return [2 /*return*/, termsContract.getExpectedRepaymentValue.callAsync(issuanceHash, new bignumber_1.BigNumber(timestamp))];
                }
            });
        });
    };
    /**
     * Given an issuance hash, returns the amount that is expected to be repaid
     * per repayment period.
     *
     * @example
     * const amount = await dharma.servicing.getExpectedAmountPerRepayment(
     *   "0x069cb8891d9dbf02d89079a77169e0dc8bacda65"
     * );
     * amount.toNumber();
     * => 5500000000
     *
     * @param {string} issuanceHash
     * @returns {Promise<BigNumber>}
     */
    ServicingAPI.prototype.getExpectedAmountPerRepayment = function (issuanceHash) {
        return __awaiter(this, void 0, void 0, function () {
            var totalRepayment, debtRegistryEntry, termsContract, termsContractParameters, adapter, termLength;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.bytes32("issuanceHash", issuanceHash);
                        return [4 /*yield*/, this.getTotalExpectedRepayment(issuanceHash)];
                    case 1:
                        totalRepayment = _a.sent();
                        return [4 /*yield*/, this.getDebtRegistryEntry(issuanceHash)];
                    case 2:
                        debtRegistryEntry = _a.sent();
                        termsContract = debtRegistryEntry.termsContract, termsContractParameters = debtRegistryEntry.termsContractParameters;
                        return [4 /*yield*/, this.adapterForTermsContract(termsContract)];
                    case 3:
                        adapter = _a.sent();
                        termLength = adapter.unpackParameters(termsContractParameters).termLength;
                        return [2 /*return*/, new bignumber_1.BigNumber(totalRepayment.div(termLength))];
                }
            });
        });
    };
    /**
     * Given an issuanceHash, returns the total amount that the borrower is expected to
     * pay by the end of the associated terms agreement.
     *
     * @param issuanceHash
     */
    ServicingAPI.prototype.getTotalExpectedRepayment = function (issuanceHash) {
        return __awaiter(this, void 0, void 0, function () {
            var debtToken, debtRegistry, termsContractAddress, termsContract, termEnd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.bytes32("issuanceHash", issuanceHash);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtToken = _a.sent();
                        return [4 /*yield*/, this.assert.debtAgreement.exists(issuanceHash, debtToken, exports.ServicingAPIErrors.DEBT_AGREEMENT_NONEXISTENT(issuanceHash))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.contracts.loadDebtRegistryAsync()];
                    case 3:
                        debtRegistry = _a.sent();
                        return [4 /*yield*/, debtRegistry.getTermsContract.callAsync(issuanceHash)];
                    case 4:
                        termsContractAddress = _a.sent();
                        return [4 /*yield*/, this.contracts.loadTermsContractAsync(termsContractAddress)];
                    case 5:
                        termsContract = _a.sent();
                        return [4 /*yield*/, termsContract.getTermEndTimestamp.callAsync(issuanceHash)];
                    case 6:
                        termEnd = _a.sent();
                        return [2 /*return*/, termsContract.getExpectedRepaymentValue.callAsync(issuanceHash, termEnd)];
                }
            });
        });
    };
    /**
     * Asynchronously retrieve the `DebtRegistryEntry` instance mapped to the
     * issuance hash specified.
     *
     * @param  issuanceHash the id of the issuance to retrieve.
     * @return              the relevant `DebtRegistryEntry` instance .
     */
    ServicingAPI.prototype.getDebtRegistryEntry = function (issuanceHash) {
        return __awaiter(this, void 0, void 0, function () {
            var debtToken, debtRegistry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.bytes32("issuanceHash", issuanceHash);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtToken = _a.sent();
                        return [4 /*yield*/, this.assert.debtAgreement.exists(issuanceHash, debtToken, exports.ServicingAPIErrors.DEBT_AGREEMENT_NONEXISTENT(issuanceHash))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.contracts.loadDebtRegistryAsync()];
                    case 3:
                        debtRegistry = _a.sent();
                        return [2 /*return*/, debtRegistry.get.callAsync(issuanceHash)];
                }
            });
        });
    };
    /**
     * Given a debtor's account, returns a list of issuance hashes
     * corresponding to debts which the debtor has issued in the past.
     *
     * @param  account The debtor's account
     * @return         A list of issuance hashes of the debtor's debts
     */
    ServicingAPI.prototype.getDebtsAsync = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var debtRegistry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.address("account", account);
                        return [4 /*yield*/, this.contracts.loadDebtRegistryAsync()];
                    case 1:
                        debtRegistry = _a.sent();
                        return [2 /*return*/, debtRegistry.getDebtorsDebts.callAsync(account)];
                }
            });
        });
    };
    /**
     * Given a creditor's account, returns a list of issuance hashes
     * corresponding to debts which the creditor has invested in.
     *
     * @param account The creditor's account
     * @return        A list of issuance hashes of the creditor's investments
     */
    ServicingAPI.prototype.getInvestmentsAsync = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var debtToken, numInvestments, userDebtTokenIds, i, tokenId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.address("account", account);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtToken = _a.sent();
                        return [4 /*yield*/, debtToken.balanceOf.callAsync(account)];
                    case 2:
                        numInvestments = _a.sent();
                        userDebtTokenIds = [];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < numInvestments.toNumber())) return [3 /*break*/, 6];
                        return [4 /*yield*/, debtToken.tokenOfOwnerByIndex.callAsync(account, new bignumber_1.BigNumber(i))];
                    case 4:
                        tokenId = _a.sent();
                        userDebtTokenIds.push(tokenId);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, userDebtTokenIds.map(function (tokenId) { return "0x" + tokenId.toString(16).padStart(64, "0"); })];
                }
            });
        });
    };
    ServicingAPI.prototype.getRepaymentScheduleAsync = function (issuanceHash) {
        return __awaiter(this, void 0, void 0, function () {
            var debtRegistryEntry, termsContract, adapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.bytes32("issuanceHash", issuanceHash);
                        return [4 /*yield*/, this.getDebtRegistryEntry(issuanceHash)];
                    case 1:
                        debtRegistryEntry = _a.sent();
                        termsContract = debtRegistryEntry.termsContract;
                        return [4 /*yield*/, this.adapterForTermsContract(termsContract)];
                    case 2:
                        adapter = _a.sent();
                        return [2 /*return*/, adapter.getRepaymentSchedule(debtRegistryEntry)];
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
    ServicingAPI.prototype.adapterForTermsContract = function (termsContract) {
        return __awaiter(this, void 0, void 0, function () {
            var termsContractType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.getTermsContractType(termsContract)];
                    case 1:
                        termsContractType = _a.sent();
                        switch (termsContractType) {
                            case constants_1.TERMS_CONTRACT_TYPES.COLLATERALIZED_SIMPLE_INTEREST_LOAN:
                                return [2 /*return*/, new collateralized_simple_interest_loan_adapter_1.CollateralizedSimpleInterestLoanAdapter(this.web3, this.contracts)];
                            case constants_1.TERMS_CONTRACT_TYPES.SIMPLE_INTEREST_LOAN:
                                return [2 /*return*/, new simple_interest_loan_adapter_1.SimpleInterestLoanAdapter(this.web3, this.contracts)];
                        }
                        throw new Error(exports.ServicingAPIErrors.UNKNOWN_LOAN_ADAPTER(termsContract));
                }
            });
        });
    };
    return ServicingAPI;
}());
exports.ServicingAPI = ServicingAPI;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=servicing_api.js.map