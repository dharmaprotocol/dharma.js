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
// External
var ethjsABI = require("ethjs-abi");
var assignDefaults = require("lodash.defaults");
var promisify = require("tiny-promisify");
var types_1 = require("../src/types");
function filterMethodABI(abi) {
    return abi.filter(function (abiDef) { return abiDef.type === "function"; });
}
function findMethod(abi, name, inputTypes) {
    var methodAbi = filterMethodABI(abi).find(function (abiDef) {
        var methodArgs = abiDef.inputs.map(function (input) { return input.type; }).join(",");
        return abiDef.name === name && methodArgs === inputTypes;
    });
    if (methodAbi) {
        return methodAbi;
    }
    throw new Error("Method: " + name + " with input types: " + inputTypes + " is not found");
}
// sendTransaction is a util function to send a transaction to any overloaded
// method of a contract.
// Truffle contract instance cannot handle overloaded methods
// (truffle will only handle the first implementation of the method).
function sendRawTransaction(web3, web3ContractInstance, methodName, inputTypes, inputVals, txData) {
    if (txData === void 0) { txData = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var abiMethod, encodedData;
        return __generator(this, function (_a) {
            abiMethod = findMethod(web3ContractInstance.abi, methodName, inputTypes);
            encodedData = ethjsABI.encodeMethod(abiMethod, inputVals);
            return [2 /*return*/, promisify(web3.eth.sendTransaction)(__assign({ data: encodedData }, txData, { to: web3ContractInstance.address }))];
        });
    });
}
exports.sendRawTransaction = sendRawTransaction;
function applyNetworkDefaults(debtOrderData, contracts) {
    return __awaiter(this, void 0, void 0, function () {
        var debtKernel, repaymentRouter, networkDefaults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contracts.loadDebtKernelAsync()];
                case 1:
                    debtKernel = _a.sent();
                    return [4 /*yield*/, contracts.loadRepaymentRouterAsync()];
                case 2:
                    repaymentRouter = _a.sent();
                    networkDefaults = __assign({}, types_1.DEBT_ORDER_DATA_DEFAULTS, { kernelVersion: debtKernel.address, issuanceVersion: repaymentRouter.address });
                    return [2 /*return*/, assignDefaults(debtOrderData, networkDefaults)];
            }
        });
    });
}
exports.applyNetworkDefaults = applyNetworkDefaults;
//# sourceMappingURL=transaction_utils.js.map