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
var wrappers_1 = require("../wrappers");
var DebtTokenAssertions = /** @class */ (function () {
    function DebtTokenAssertions() {
    }
    DebtTokenAssertions.prototype.exists = function (debtTokenContract, tokenID, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, debtTokenContract.exists.callAsync(tokenID)];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DebtTokenAssertions.prototype.onlyOwner = function (debtTokenContract, tokenID, account, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenOwner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, debtTokenContract.ownerOf.callAsync(tokenID)];
                    case 1:
                        tokenOwner = _a.sent();
                        if (tokenOwner !== account) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DebtTokenAssertions.prototype.notOwner = function (debtTokenContract, tokenID, account, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenOwner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, debtTokenContract.ownerOf.callAsync(tokenID)];
                    case 1:
                        tokenOwner = _a.sent();
                        if (tokenOwner === account) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DebtTokenAssertions.prototype.canBeTransferredByAccount = function (debtTokenContract, tokenID, account, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenOwner, tokensApprovedAddress, isApprovedForAll, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, debtTokenContract.ownerOf.callAsync(tokenID)];
                    case 1:
                        tokenOwner = _a.sent();
                        return [4 /*yield*/, debtTokenContract.getApproved.callAsync(tokenID)];
                    case 2:
                        tokensApprovedAddress = _a.sent();
                        return [4 /*yield*/, debtTokenContract.isApprovedForAll.callAsync(tokenOwner, account)];
                    case 3:
                        isApprovedForAll = _a.sent();
                        if (tokenOwner !== account && tokensApprovedAddress !== account && !isApprovedForAll) {
                            throw new Error(errorMessage);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        throw new Error(errorMessage);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DebtTokenAssertions.prototype.canBeReceivedByAccountWithData = function (web3, tokenID, recipient, sender, data, errorMessage) {
        if (data === void 0) { data = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var utils, isRecipientContract, EMPTY_TX_DEFAULTS, erc721Receiver, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utils = new web3_utils_1.Web3Utils(web3);
                        return [4 /*yield*/, utils.doesContractExistAtAddressAsync(recipient)];
                    case 1:
                        isRecipientContract = _a.sent();
                        if (!isRecipientContract) return [3 /*break*/, 6];
                        EMPTY_TX_DEFAULTS = {};
                        return [4 /*yield*/, wrappers_1.ERC721ReceiverContract.at(recipient, web3, EMPTY_TX_DEFAULTS)];
                    case 2:
                        erc721Receiver = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, erc721Receiver.onERC721Received.callAsync(sender, tokenID, data)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        throw new Error(errorMessage);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return DebtTokenAssertions;
}());
exports.DebtTokenAssertions = DebtTokenAssertions;
//# sourceMappingURL=debt_token.js.map