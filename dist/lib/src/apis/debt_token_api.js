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
var singleLineString = require("single-line-string");
// Types
var types_1 = require("../types");
// Utils
var invariants_1 = require("../invariants");
var ERC721_TRANSFER_GAS_MAXIMUM = 200000;
exports.DebtTokenAPIErrors = {
    ONLY_OWNER: function (account) { return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        Specified debt token does not belong to account ", "\n    "], ["\n        Specified debt token does not belong to account ", "\n    "])), account); },
    NOT_OWNER: function () { return singleLineString(templateObject_2 || (templateObject_2 = __makeTemplateObject(["The recipient cannot be the owner of the debt token."], ["The recipient cannot be the owner of the debt token."]))); },
    TOKEN_WITH_ID_DOES_NOT_EXIST: function () { return singleLineString(templateObject_3 || (templateObject_3 = __makeTemplateObject(["The debt token specified does not exist."], ["The debt token specified does not exist."]))); },
    ACCOUNT_UNAUTHORIZED_TO_TRANSFER: function (account) { return singleLineString(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        Transaction sender ", " neither owns the specified token nor is approved to transfer it.\n    "], ["\n        Transaction sender ", " neither owns the specified token nor is approved to transfer it.\n    "])), account); },
    RECIPIENT_WONT_RECOGNIZE_TOKEN: function (recipient) { return singleLineString(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        Recipient ", " is a contract that does not implement the\n        ERC721Receiver interface, and therefore cannot have ERC721 tokens\n        transferred to it.\n    "], ["\n        Recipient ", " is a contract that does not implement the\n        ERC721Receiver interface, and therefore cannot have ERC721 tokens\n        transferred to it.\n    "])), recipient); },
    OWNER_CANNOT_BE_OPERATOR: function () { return singleLineString(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Owner cannot list themselves as operator."], ["Owner cannot list themselves as operator."]))); },
};
var DebtTokenAPI = /** @class */ (function () {
    function DebtTokenAPI(web3, contracts) {
        this.web3 = web3;
        this.contracts = contracts;
        this.assert = new invariants_1.Assertions(web3, this.contracts);
    }
    DebtTokenAPI.prototype.balanceOf = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Assert owner is a valid address.
                        this.assert.schema.address("owner", owner);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        return [2 /*return*/, debtTokenContract.balanceOf.callAsync(owner)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.ownerOf = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Assert token is valid.
                        this.assert.schema.wholeNumber("tokenID", tokenID);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        // Assert token exists.
                        return [4 /*yield*/, this.assert.debtToken.exists(debtTokenContract, tokenID, exports.DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST())];
                    case 2:
                        // Assert token exists.
                        _a.sent();
                        return [2 /*return*/, debtTokenContract.ownerOf.callAsync(tokenID)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.exists = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Assert token is valid.
                        this.assert.schema.wholeNumber("tokenID", tokenID);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        return [2 /*return*/, debtTokenContract.exists.callAsync(tokenID)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.approveAsync = function (to, tokenID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract, txOptions, from;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Assert `to` is a valid address.
                        this.assert.schema.address("to", to);
                        // Assert token is valid.
                        this.assert.schema.wholeNumber("tokenID", tokenID);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, ERC721_TRANSFER_GAS_MAXIMUM, options)];
                    case 2:
                        txOptions = _a.sent();
                        from = txOptions.from;
                        // Ensure the token exists.
                        return [4 /*yield*/, this.assert.debtToken.exists(debtTokenContract, tokenID, exports.DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST())];
                    case 3:
                        // Ensure the token exists.
                        _a.sent();
                        // Ensure the owner of the token is the one invoking `approve`
                        return [4 /*yield*/, this.assert.debtToken.onlyOwner(debtTokenContract, tokenID, from, exports.DebtTokenAPIErrors.ONLY_OWNER(from))];
                    case 4:
                        // Ensure the owner of the token is the one invoking `approve`
                        _a.sent();
                        // Ensure the approvee is not the owner.
                        return [4 /*yield*/, this.assert.debtToken.notOwner(debtTokenContract, tokenID, to, exports.DebtTokenAPIErrors.NOT_OWNER())];
                    case 5:
                        // Ensure the approvee is not the owner.
                        _a.sent();
                        return [2 /*return*/, debtTokenContract.approve.sendTransactionAsync(to, tokenID, txOptions)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.getApproved = function (tokenID) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Assert token is valid.
                        this.assert.schema.wholeNumber("tokenID", tokenID);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        // Assert token exists.
                        return [4 /*yield*/, this.assert.debtToken.exists(debtTokenContract, tokenID, exports.DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST())];
                    case 2:
                        // Assert token exists.
                        _a.sent();
                        return [2 /*return*/, debtTokenContract.getApproved.callAsync(tokenID)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.setApprovalForAllAsync = function (operator, approved, options) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract, txOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, ERC721_TRANSFER_GAS_MAXIMUM, options)];
                    case 2:
                        txOptions = _a.sent();
                        this.assert.schema.address("operator", operator);
                        if (operator === txOptions.from) {
                            throw new Error(exports.DebtTokenAPIErrors.OWNER_CANNOT_BE_OPERATOR());
                        }
                        return [2 /*return*/, debtTokenContract.setApprovalForAll.sendTransactionAsync(operator, approved, txOptions)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.isApprovedForAll = function (owner, operator) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert.schema.address("operator", operator);
                        this.assert.schema.address("owner", owner);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        return [2 /*return*/, debtTokenContract.isApprovedForAll.callAsync(owner, operator)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.transferAsync = function (to, tokenID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var debtTokenContract, txOptions, owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateTransferArguments(to, tokenID);
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 1:
                        debtTokenContract = _a.sent();
                        return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, ERC721_TRANSFER_GAS_MAXIMUM, options)];
                    case 2:
                        txOptions = _a.sent();
                        return [4 /*yield*/, this.assertTransferValid(debtTokenContract, to, tokenID, txOptions)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.ownerOf(tokenID)];
                    case 4:
                        owner = _a.sent();
                        return [2 /*return*/, debtTokenContract.safeTransferFrom.sendTransactionAsync(owner, to, tokenID, "", txOptions)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.transferFromAsync = function (from, to, tokenID, data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txOptions, debtTokenContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateTransferFromArguments(from, to, tokenID, data);
                        return [4 /*yield*/, types_1.TransactionOptions.generateTxOptions(this.web3, ERC721_TRANSFER_GAS_MAXIMUM, options)];
                    case 1:
                        txOptions = _a.sent();
                        return [4 /*yield*/, this.contracts.loadDebtTokenAsync()];
                    case 2:
                        debtTokenContract = _a.sent();
                        return [4 /*yield*/, this.assertTransferFromValid(debtTokenContract, from, to, tokenID, data, txOptions)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, debtTokenContract.safeTransferFrom.sendTransactionAsync(from, to, tokenID, data, txOptions)];
                }
            });
        });
    };
    DebtTokenAPI.prototype.assertTransferValid = function (debtTokenContract, to, tokenID, txOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Assert token exists
                    return [4 /*yield*/, this.assert.debtToken.exists(debtTokenContract, tokenID, exports.DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST())];
                    case 1:
                        // Assert token exists
                        _a.sent();
                        // Assert that message sender can transfer said token
                        return [4 /*yield*/, this.assert.debtToken.canBeTransferredByAccount(debtTokenContract, tokenID, txOptions.from, exports.DebtTokenAPIErrors.ACCOUNT_UNAUTHORIZED_TO_TRANSFER(txOptions.from))];
                    case 2:
                        // Assert that message sender can transfer said token
                        _a.sent();
                        // Assert that `to` can be the recipient of an ERC721 token
                        return [4 /*yield*/, this.assert.debtToken.canBeReceivedByAccountWithData(this.web3, tokenID, to, txOptions.from, "", exports.DebtTokenAPIErrors.RECIPIENT_WONT_RECOGNIZE_TOKEN(to))];
                    case 3:
                        // Assert that `to` can be the recipient of an ERC721 token
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DebtTokenAPI.prototype.assertTransferFromValid = function (debtTokenContract, from, to, tokenID, data, txOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Assert token exists
                    return [4 /*yield*/, this.assert.debtToken.exists(debtTokenContract, tokenID, exports.DebtTokenAPIErrors.TOKEN_WITH_ID_DOES_NOT_EXIST())];
                    case 1:
                        // Assert token exists
                        _a.sent();
                        // Assert token belongs to `from`
                        return [4 /*yield*/, this.assert.debtToken.onlyOwner(debtTokenContract, tokenID, from, exports.DebtTokenAPIErrors.ONLY_OWNER(from))];
                    case 2:
                        // Assert token belongs to `from`
                        _a.sent();
                        // Assert that message sender can transfer said token
                        return [4 /*yield*/, this.assert.debtToken.canBeTransferredByAccount(debtTokenContract, tokenID, txOptions.from, exports.DebtTokenAPIErrors.ACCOUNT_UNAUTHORIZED_TO_TRANSFER(txOptions.from))];
                    case 3:
                        // Assert that message sender can transfer said token
                        _a.sent();
                        // Assert that `to` can be the recipient of an ERC721 token
                        return [4 /*yield*/, this.assert.debtToken.canBeReceivedByAccountWithData(this.web3, tokenID, to, from, data, exports.DebtTokenAPIErrors.RECIPIENT_WONT_RECOGNIZE_TOKEN(to))];
                    case 4:
                        // Assert that `to` can be the recipient of an ERC721 token
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DebtTokenAPI.prototype.validateTransferArguments = function (to, tokenID) {
        this.assert.schema.address("to", to);
        this.assert.schema.wholeNumber("tokenID", tokenID);
    };
    DebtTokenAPI.prototype.validateTransferFromArguments = function (from, to, tokenID, data) {
        this.validateTransferArguments(to, tokenID);
        this.assert.schema.address("from", from);
        if (data) {
            this.assert.schema.bytes("data", data);
        }
    };
    return DebtTokenAPI;
}());
exports.DebtTokenAPI = DebtTokenAPI;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=debt_token_api.js.map