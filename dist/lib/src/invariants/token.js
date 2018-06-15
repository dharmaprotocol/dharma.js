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
var constants_1 = require("../../utils/constants");
var singleLineString = require("single-line-string");
exports.TokenAssertionErrors = {
    MISSING_ERC20_METHOD: function (address) {
        return singleLineString(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Contract at ", " does not implement ERC20 interface."], ["Contract at ", " does not implement ERC20 interface."])), address);
    },
};
var TokenAssertions = /** @class */ (function () {
    function TokenAssertions() {
    }
    TokenAssertions.prototype.exists = function (tokenSymbol, tokenRegistry, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokenRegistry.getTokenAddressBySymbol.callAsync(tokenSymbol)];
                    case 1:
                        tokenAddress = _a.sent();
                        if (tokenAddress === constants_1.NULL_ADDRESS) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Throws if the given candidateContract does not respond to some methods from the ERC20 interface.
    // TODO: This could be made more complete by comparing the ERC20 interface to the candidate's properties.
    TokenAssertions.prototype.implementsERC20 = function (candidate) {
        return __awaiter(this, void 0, void 0, function () {
            var address, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = candidate.address;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // NOTE: Needs to check more methods to validate complete ERC20 interface.
                        return [4 /*yield*/, candidate.balanceOf.callAsync(address)];
                    case 2:
                        // NOTE: Needs to check more methods to validate complete ERC20 interface.
                        _a.sent();
                        return [4 /*yield*/, candidate.totalSupply.callAsync()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error(exports.TokenAssertionErrors.MISSING_ERC20_METHOD(address));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TokenAssertions.prototype.hasSufficientBalance = function (principalToken, payer, balanceRequired, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var payerBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, principalToken.balanceOf.callAsync(payer)];
                    case 1:
                        payerBalance = _a.sent();
                        if (payerBalance.lt(balanceRequired)) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenAssertions.prototype.hasSufficientAllowance = function (principalToken, payer, target, allowanceRequired, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var payerAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, principalToken.allowance.callAsync(payer, target)];
                    case 1:
                        payerAllowance = _a.sent();
                        if (payerAllowance.lt(allowanceRequired)) {
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return TokenAssertions;
}());
exports.TokenAssertions = TokenAssertions;
var templateObject_1;
//# sourceMappingURL=token.js.map