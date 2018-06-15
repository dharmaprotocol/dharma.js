"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var bignumber_1 = require("../../utils/bignumber");
var constants_1 = require("../../utils/constants");
var types_1 = require("../types");
var wrappers_1 = require("../wrappers");
var SALT_DECIMALS = 20;
var DebtOrder = /** @class */ (function () {
    function DebtOrder(dharma, params, data) {
        this.dharma = dharma;
        this.params = params;
        this.data = data;
    }
    DebtOrder.create = function (dharma, params) {
        return __awaiter(this, void 0, void 0, function () {
            var principal, collateral, interestRate, termLength, debtorAddress, expiresIn, currentBlocktime, _a, expirationTimestampInSec, loanOrder, data, debtKernel, repaymentRouter, salt, debtOrderConstructorParams, debtOrder;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        principal = params.principal, collateral = params.collateral, interestRate = params.interestRate, termLength = params.termLength, debtorAddress = params.debtorAddress, expiresIn = params.expiresIn;
                        _a = bignumber_1.BigNumber.bind;
                        return [4 /*yield*/, dharma.blockchain.getCurrentBlockTime()];
                    case 1:
                        currentBlocktime = new (_a.apply(bignumber_1.BigNumber, [void 0, _b.sent()]))();
                        expirationTimestampInSec = expiresIn.fromTimestamp(currentBlocktime);
                        loanOrder = {
                            principalAmount: principal.rawAmount,
                            principalTokenSymbol: principal.tokenSymbol,
                            interestRate: interestRate.raw,
                            amortizationUnit: termLength.getAmortizationUnit(),
                            termLength: new bignumber_1.BigNumber(termLength.amount),
                            collateralTokenSymbol: collateral.tokenSymbol,
                            collateralAmount: collateral.rawAmount,
                            gracePeriodInDays: new bignumber_1.BigNumber(0),
                            expirationTimestampInSec: expirationTimestampInSec,
                        };
                        return [4 /*yield*/, dharma.adapters.collateralizedSimpleInterestLoan.toDebtOrder(loanOrder)];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, dharma.contracts.loadDebtKernelAsync()];
                    case 3:
                        debtKernel = _b.sent();
                        return [4 /*yield*/, dharma.contracts.loadRepaymentRouterAsync()];
                    case 4:
                        repaymentRouter = _b.sent();
                        salt = this.generateSalt();
                        data.debtor = debtorAddress.toString();
                        data.kernelVersion = debtKernel.address;
                        data.issuanceVersion = repaymentRouter.address;
                        data.salt = salt;
                        debtOrderConstructorParams = __assign({}, params, { expiresAt: expirationTimestampInSec.toNumber() });
                        delete debtOrderConstructorParams.expiresIn;
                        debtOrder = new DebtOrder(dharma, debtOrderConstructorParams, data);
                        return [4 /*yield*/, debtOrder.signAsDebtor()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, debtOrder];
                }
            });
        });
    };
    DebtOrder.load = function (dharma, data) {
        return __awaiter(this, void 0, void 0, function () {
            var loanOrder, principal, collateral, interestRate, termLength, debtorAddress, debtOrderParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dharma.adapters.collateralizedSimpleInterestLoan.fromDebtOrder(data)];
                    case 1:
                        loanOrder = _a.sent();
                        principal = types_1.TokenAmount.fromRaw(loanOrder.principalAmount, loanOrder.principalTokenSymbol);
                        collateral = types_1.TokenAmount.fromRaw(loanOrder.collateralAmount, loanOrder.collateralTokenSymbol);
                        interestRate = types_1.InterestRate.fromRaw(loanOrder.interestRate);
                        termLength = new types_1.TimeInterval(loanOrder.termLength.toNumber(), loanOrder.amortizationUnit);
                        debtorAddress = new types_1.EthereumAddress(loanOrder.debtor);
                        debtOrderParams = {
                            principal: principal,
                            collateral: collateral,
                            interestRate: interestRate,
                            termLength: termLength,
                            expiresAt: loanOrder.expirationTimestampInSec.toNumber(),
                            debtorAddress: debtorAddress,
                        };
                        return [2 /*return*/, new DebtOrder(dharma, debtOrderParams, data)];
                }
            });
        });
    };
    DebtOrder.generateSalt = function () {
        return bignumber_1.BigNumber.random(SALT_DECIMALS).times(new bignumber_1.BigNumber(10).pow(SALT_DECIMALS));
    };
    /**
     * Eventually returns true if the current debt order will be expired for the next block.
     *
     * @returns {Promise<boolean>}
     */
    DebtOrder.prototype.isExpired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var expirationTimestamp, latestBlockTime, approximateNextBlockTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expirationTimestamp = this.data.expirationTimestampInSec;
                        return [4 /*yield*/, this.getCurrentBlocktime()];
                    case 1:
                        latestBlockTime = _a.sent();
                        approximateNextBlockTime = latestBlockTime + constants_1.BLOCK_TIME_ESTIMATE_SECONDS;
                        return [2 /*return*/, expirationTimestamp.lt(approximateNextBlockTime)];
                }
            });
        });
    };
    DebtOrder.prototype.isSignedByDebtor = function () {
        return this.data.debtorSignature !== constants_1.NULL_ECDSA_SIGNATURE;
    };
    DebtOrder.prototype.signAsDebtor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isSignedByDebtor()) {
                            return [2 /*return*/];
                        }
                        _a = this.data;
                        return [4 /*yield*/, this.dharma.sign.asDebtor(this.data, false)];
                    case 1:
                        _a.debtorSignature = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Eventually returns true if the current debt order has been cancelled.
     *
     * @example
     * await debtOrder.isCancelled();
     * => true
     *
     * @returns {Promise<boolean>}
     */
    DebtOrder.prototype.isCancelled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.order.isCancelled(this.data)];
            });
        });
    };
    /**
     * Attempts to cancel the current debt order. A debt order can be cancelled by the debtor
     * if it is open and unfilled.
     *
     * @example
     * await debtOrder.cancelAsDebtor();
     * => "0x000..."
     *
     * @returns {Promise<string>} the transaction hash
     */
    DebtOrder.prototype.cancelAsDebtor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.order.cancelOrderAsync(this.data, {
                        from: this.data.debtor,
                    })];
            });
        });
    };
    DebtOrder.prototype.isFilled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.order.checkOrderFilledAsync(this.data)];
            });
        });
    };
    DebtOrder.prototype.fillAsCreditor = function (creditorAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.data.creditor = creditorAddress.toString();
                        return [4 /*yield*/, this.signAsCreditor()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.dharma.order.fillAsync(this.data, { from: this.data.creditor })];
                }
            });
        });
    };
    /**
     * Makes a repayment on the loan, with the default payment amount being the
     * expected size of a single installment given the principal, interest rate,
     * and terms.
     *
     * @example
     * order.makeRepayment();
     * => Promise<string>
     *
     * const outstandingAmount = await order.getOutstandingAmount();
     * order.makeRepayment(outstandingAmount);
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the transaction to make the repayment
     */
    DebtOrder.prototype.makeRepayment = function (repaymentAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var agreementId, tokenSymbol, principalTokenAddressString, rawRepaymentAmount, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        agreementId = this.getAgreementId();
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [4 /*yield*/, this.dharma.contracts.getTokenAddressBySymbolAsync(tokenSymbol)];
                    case 1:
                        principalTokenAddressString = _b.sent();
                        if (!repaymentAmount) return [3 /*break*/, 2];
                        _a = repaymentAmount.rawAmount;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.dharma.servicing.getExpectedAmountPerRepayment(agreementId)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        rawRepaymentAmount = _a;
                        return [2 /*return*/, this.dharma.servicing.makeRepayment(agreementId, rawRepaymentAmount, principalTokenAddressString)];
                }
            });
        });
    };
    DebtOrder.prototype.isCollateralWithdrawn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.isCollateralWithdrawn(this.getAgreementId())];
            });
        });
    };
    DebtOrder.prototype.isCollateralSeizable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.canSeizeCollateral(this.getAgreementId())];
            });
        });
    };
    DebtOrder.prototype.isCollateralReturnable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.canReturnCollateral(this.getAgreementId())];
            });
        });
    };
    /**
     * Returns the collateral and sends it to the debtor.
     * This will fail if the collateral is not returnable.
     *
     * @example
     * order.returnCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the transaction to return the collateral
     */
    DebtOrder.prototype.returnCollateral = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.returnCollateralAsync(this.getAgreementId())];
            });
        });
    };
    /**
     * Seizes the collateral and sends it to the creditor.
     * This will fail if the collateral is not seizable.
     *
     * @example
     * order.seizeCollateral();
     * => Promise<string>
     *
     * @returns {Promise<string>} the hash of the transaction to seize the collateral
     */
    DebtOrder.prototype.seizeCollateral = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.adapters.collateralizedSimpleInterestLoan.seizeCollateralAsync(this.getAgreementId())];
            });
        });
    };
    /**
     * Returns the total amount expected to be repaid.
     *
     * @example
     * order.getTotalExpectedRepaymentAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    DebtOrder.prototype.getTotalExpectedRepaymentAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var agreementId, totalExpectedRepaymentAmount, tokenSymbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agreementId = this.getAgreementId();
                        return [4 /*yield*/, this.dharma.servicing.getTotalExpectedRepayment(agreementId)];
                    case 1:
                        totalExpectedRepaymentAmount = _a.sent();
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [2 /*return*/, types_1.TokenAmount.fromRaw(totalExpectedRepaymentAmount, tokenSymbol)];
                }
            });
        });
    };
    /**
     * Returns the outstanding balance of the loan.
     *
     * @example
     * order.getOutstandingAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    DebtOrder.prototype.getOutstandingAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalExpectedRepaymentAmount, repaidAmount, outstandingAmount, tokenSymbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTotalExpectedRepaymentAmount()];
                    case 1:
                        totalExpectedRepaymentAmount = _a.sent();
                        return [4 /*yield*/, this.getRepaidAmount()];
                    case 2:
                        repaidAmount = _a.sent();
                        outstandingAmount = totalExpectedRepaymentAmount.rawAmount.minus(repaidAmount.rawAmount);
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [2 /*return*/, types_1.TokenAmount.fromRaw(outstandingAmount, tokenSymbol)];
                }
            });
        });
    };
    /**
     * Returns the total amount repaid so far.
     *
     * @example
     * order.getRepaidAmount();
     * => Promise<TokenAmount>
     *
     * @returns {Promise<TokenAmount>}
     */
    DebtOrder.prototype.getRepaidAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var agreementId, repaidAmount, tokenSymbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agreementId = this.getAgreementId();
                        return [4 /*yield*/, this.dharma.servicing.getValueRepaid(agreementId)];
                    case 1:
                        repaidAmount = _a.sent();
                        tokenSymbol = this.params.principal.tokenSymbol;
                        return [2 /*return*/, types_1.TokenAmount.fromRaw(repaidAmount, tokenSymbol)];
                }
            });
        });
    };
    DebtOrder.prototype.isSignedByCreditor = function () {
        return this.data.creditorSignature !== constants_1.NULL_ECDSA_SIGNATURE;
    };
    DebtOrder.prototype.signAsCreditor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isSignedByCreditor()) {
                            return [2 /*return*/];
                        }
                        _a = this.data;
                        return [4 /*yield*/, this.dharma.sign.asCreditor(this.data, false)];
                    case 1:
                        _a.creditorSignature = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DebtOrder.prototype.getAgreementId = function () {
        return new wrappers_1.DebtOrderDataWrapper(this.data).getIssuanceCommitmentHash();
    };
    DebtOrder.prototype.serialize = function () {
        return this.data;
    };
    DebtOrder.prototype.getCurrentBlocktime = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dharma.blockchain.getCurrentBlockTime()];
            });
        });
    };
    return DebtOrder;
}());
exports.DebtOrder = DebtOrder;
//# sourceMappingURL=index.js.map