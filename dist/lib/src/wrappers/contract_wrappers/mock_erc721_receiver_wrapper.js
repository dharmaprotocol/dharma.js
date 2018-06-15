"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var promisify = require("tiny-promisify");
var class_utils_1 = require("../../../utils/class_utils");
var web3_utils_1 = require("../../../utils/web3_utils");
var contracts_1 = require("@dharmaprotocol/contracts");
var base_contract_wrapper_1 = require("./base_contract_wrapper");
var MockERC721ReceiverContract = /** @class */ (function (_super) {
    __extends(MockERC721ReceiverContract, _super);
    function MockERC721ReceiverContract(web3ContractInstance, defaults) {
        var _this = _super.call(this, web3ContractInstance, defaults) || this;
        _this.getMockReturnValue = {
            callAsync: function (functionName, argsSignature, defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, promisify(self.web3ContractInstance.getMockReturnValue.call, self.web3ContractInstance)(functionName, argsSignature)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.setReturnValueForERC721ReceivedHook = {
            sendTransactionAsync: function (_returnValue, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.setReturnValueForERC721ReceivedHook.estimateGasAsync.bind(self, _returnValue))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.setReturnValueForERC721ReceivedHook, self.web3ContractInstance)(_returnValue, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_returnValue, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.setReturnValueForERC721ReceivedHook.estimateGas, self.web3ContractInstance)(_returnValue, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_returnValue, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.setReturnValueForERC721ReceivedHook.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.setShouldRevert = {
            sendTransactionAsync: function (_shouldRevert, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.setShouldRevert.estimateGasAsync.bind(self, _shouldRevert))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.setShouldRevert, self.web3ContractInstance)(_shouldRevert, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_shouldRevert, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.setShouldRevert.estimateGas, self.web3ContractInstance)(_shouldRevert, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_shouldRevert, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.setShouldRevert.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.mockReturnValue = {
            sendTransactionAsync: function (functionName, argsSignature, returnValue, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.mockReturnValue.estimateGasAsync.bind(self, functionName, argsSignature, returnValue))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.mockReturnValue, self.web3ContractInstance)(functionName, argsSignature, returnValue, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (functionName, argsSignature, returnValue, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.mockReturnValue.estimateGas, self.web3ContractInstance)(functionName, argsSignature, returnValue, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (functionName, argsSignature, returnValue, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.mockReturnValue.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.wasOnERC721ReceivedCalledWith = {
            callAsync: function (_address, _tokenId, _data, defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, promisify(self.web3ContractInstance.wasOnERC721ReceivedCalledWith.call, self.web3ContractInstance)(_address, _tokenId, _data)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.reset = {
            sendTransactionAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.reset.estimateGasAsync.bind(self))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.reset, self.web3ContractInstance)(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.reset.estimateGas, self.web3ContractInstance)(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.reset.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.onERC721Received = {
            sendTransactionAsync: function (_address, _tokenId, _data, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.onERC721Received.estimateGasAsync.bind(self, _address, _tokenId, _data))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.onERC721Received, self.web3ContractInstance)(_address, _tokenId, _data, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_address, _tokenId, _data, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, promisify(self.web3ContractInstance.onERC721Received.estimateGas, self.web3ContractInstance)(_address, _tokenId, _data, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_address, _tokenId, _data, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.onERC721Received.getData();
                return abiEncodedTransactionData;
            },
        };
        class_utils_1.classUtils.bindAll(_this, ["web3ContractInstance", "defaults"]);
        return _this;
    }
    MockERC721ReceiverContract.deployed = function (web3, defaults) {
        return __awaiter(this, void 0, void 0, function () {
            var web3Utils, currentNetwork, abi, networks, contractAddress, contractExists, web3ContractInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web3Utils = new web3_utils_1.Web3Utils(web3);
                        return [4 /*yield*/, web3Utils.getNetworkIdAsync()];
                    case 1:
                        currentNetwork = _a.sent();
                        abi = contracts_1.MockERC721Receiver.abi, networks = contracts_1.MockERC721Receiver.networks;
                        if (!networks[currentNetwork]) return [3 /*break*/, 3];
                        contractAddress = networks[currentNetwork].address;
                        return [4 /*yield*/, web3Utils.doesContractExistAtAddressAsync(contractAddress)];
                    case 2:
                        contractExists = _a.sent();
                        if (contractExists) {
                            web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                            return [2 /*return*/, new MockERC721ReceiverContract(web3ContractInstance, defaults)];
                        }
                        else {
                            throw new Error(base_contract_wrapper_1.CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtKernel", currentNetwork));
                        }
                        return [3 /*break*/, 4];
                    case 3: throw new Error(base_contract_wrapper_1.CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("MockERC721Receiver", currentNetwork));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MockERC721ReceiverContract.at = function (address, web3, defaults) {
        return __awaiter(this, void 0, void 0, function () {
            var web3Utils, abi, contractExists, currentNetwork, web3ContractInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web3Utils = new web3_utils_1.Web3Utils(web3);
                        abi = contracts_1.MockERC721Receiver.abi;
                        return [4 /*yield*/, web3Utils.doesContractExistAtAddressAsync(address)];
                    case 1:
                        contractExists = _a.sent();
                        return [4 /*yield*/, web3Utils.getNetworkIdAsync()];
                    case 2:
                        currentNetwork = _a.sent();
                        if (contractExists) {
                            web3ContractInstance = web3.eth.contract(abi).at(address);
                            return [2 /*return*/, new MockERC721ReceiverContract(web3ContractInstance, defaults)];
                        }
                        else {
                            throw new Error(base_contract_wrapper_1.CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("MockERC721Receiver", currentNetwork));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return MockERC721ReceiverContract;
}(base_contract_wrapper_1.BaseContract)); // tslint:disable:max-file-line-count
exports.MockERC721ReceiverContract = MockERC721ReceiverContract;
//# sourceMappingURL=mock_erc721_receiver_wrapper.js.map