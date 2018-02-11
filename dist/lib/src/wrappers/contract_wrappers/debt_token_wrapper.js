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
var tiny_promisify_1 = require("tiny-promisify");
var class_utils_1 = require("../../../utils/class_utils");
var DebtToken_1 = require("../../artifacts/ts/DebtToken");
var web3_wrapper_1 = require("@0xproject/web3-wrapper");
var base_contract_wrapper_1 = require("./base_contract_wrapper");
var DebtTokenContract = /** @class */ (function (_super) {
    __extends(DebtTokenContract, _super);
    function DebtTokenContract(web3ContractInstance, defaults) {
        var _this = _super.call(this, web3ContractInstance, defaults) || this;
        _this.getAuthorizedMintAgents = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.getAuthorizedMintAgents.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.name = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.name.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.getApproved = {
            callAsync: function (_tokenId, defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.getApproved.call, self.web3ContractInstance)(_tokenId)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.approve = {
            sendTransactionAsync: function (_to, _tokenId, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.approve.estimateGasAsync.bind(self, _to, _tokenId))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.approve, self.web3ContractInstance)(_to, _tokenId, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_to, _tokenId, txData) {
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.approve.estimateGas, self.web3ContractInstance)(_to, _tokenId, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_to, _tokenId, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.approve.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.implementsERC721 = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.implementsERC721.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.totalSupply = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.totalSupply.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.transferFrom = {
            sendTransactionAsync: function (_from, _to, _tokenId, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.transferFrom.estimateGasAsync.bind(self, _from, _to, _tokenId))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.transferFrom, self.web3ContractInstance)(_from, _to, _tokenId, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_from, _to, _tokenId, txData) {
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.transferFrom.estimateGas, self.web3ContractInstance)(_from, _to, _tokenId, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_from, _to, _tokenId, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.transferFrom.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.tokenOfOwnerByIndex = {
            callAsync: function (_owner, _index, defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.tokenOfOwnerByIndex.call, self.web3ContractInstance)(_owner, _index)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.unpause = {
            sendTransactionAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.unpause.estimateGasAsync.bind(self))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.unpause, self.web3ContractInstance)(txDataWithDefaults)];
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.unpause.estimateGas, self.web3ContractInstance)(txDataWithDefaults)];
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
                var abiEncodedTransactionData = self.web3ContractInstance.unpause.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.mint = {
            sendTransactionAsync: function (_owner, _tokenId, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.mint.estimateGasAsync.bind(self, _owner, _tokenId))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.mint, self.web3ContractInstance)(_owner, _tokenId, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_owner, _tokenId, txData) {
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.mint.estimateGas, self.web3ContractInstance)(_owner, _tokenId, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_owner, _tokenId, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.mint.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.paused = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.paused.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.ownerOf = {
            callAsync: function (_tokenId, defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.ownerOf.call, self.web3ContractInstance)(_tokenId)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.tokenMetadata = {
            callAsync: function (_tokenId, defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.tokenMetadata.call, self.web3ContractInstance)(_tokenId)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.balanceOf = {
            callAsync: function (_owner, defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.balanceOf.call, self.web3ContractInstance)(_owner)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.registry = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.registry.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.revokeMintAgentAuthorization = {
            sendTransactionAsync: function (_agent, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.revokeMintAgentAuthorization.estimateGasAsync.bind(self, _agent))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.revokeMintAgentAuthorization, self.web3ContractInstance)(_agent, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_agent, txData) {
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.revokeMintAgentAuthorization.estimateGas, self.web3ContractInstance)(_agent, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_agent, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.revokeMintAgentAuthorization.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.pause = {
            sendTransactionAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.pause.estimateGasAsync.bind(self))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.pause, self.web3ContractInstance)(txDataWithDefaults)];
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.pause.estimateGas, self.web3ContractInstance)(txDataWithDefaults)];
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
                var abiEncodedTransactionData = self.web3ContractInstance.pause.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.owner = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.owner.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.symbol = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.symbol.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.create = {
            sendTransactionAsync: function (_version, _beneficiary, _debtor, _underwriter, _underwriterRiskRating, _termsContract, _termsContractParameters, _salt, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.create.estimateGasAsync.bind(self, _version, _beneficiary, _debtor, _underwriter, _underwriterRiskRating, _termsContract, _termsContractParameters, _salt))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.create, self.web3ContractInstance)(_version, _beneficiary, _debtor, _underwriter, _underwriterRiskRating, _termsContract, _termsContractParameters, _salt, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_version, _beneficiary, _debtor, _underwriter, _underwriterRiskRating, _termsContract, _termsContractParameters, _salt, txData) {
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.create.estimateGas, self.web3ContractInstance)(_version, _beneficiary, _debtor, _underwriter, _underwriterRiskRating, _termsContract, _termsContractParameters, _salt, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_version, _beneficiary, _debtor, _underwriter, _underwriterRiskRating, _termsContract, _termsContractParameters, _salt, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.create.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.addAuthorizedMintAgent = {
            sendTransactionAsync: function (_agent, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.addAuthorizedMintAgent.estimateGasAsync.bind(self, _agent))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.addAuthorizedMintAgent, self.web3ContractInstance)(_agent, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_agent, txData) {
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.addAuthorizedMintAgent.estimateGas, self.web3ContractInstance)(_agent, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_agent, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.addAuthorizedMintAgent.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.transfer = {
            sendTransactionAsync: function (_to, _tokenId, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.transfer.estimateGasAsync.bind(self, _to, _tokenId))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.transfer, self.web3ContractInstance)(_to, _tokenId, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (_to, _tokenId, txData) {
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.transfer.estimateGas, self.web3ContractInstance)(_to, _tokenId, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (_to, _tokenId, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.transfer.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.numTokensTotal = {
            callAsync: function (defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.numTokensTotal.call, self.web3ContractInstance)()];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.getOwnerTokens = {
            callAsync: function (_owner, defaultBlock) {
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.getOwnerTokens.call, self.web3ContractInstance)(_owner)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.transferOwnership = {
            sendTransactionAsync: function (newOwner, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.transferOwnership.estimateGasAsync.bind(self, newOwner))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.transferOwnership, self.web3ContractInstance)(newOwner, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (newOwner, txData) {
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
                                return [4 /*yield*/, tiny_promisify_1.default(self.web3ContractInstance.transferOwnership.estimateGas, self.web3ContractInstance)(newOwner, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (newOwner, txData) {
                if (txData === void 0) { txData = {}; }
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.transferOwnership.getData();
                return abiEncodedTransactionData;
            },
        };
        class_utils_1.classUtils.bindAll(_this, ["web3ContractInstance", "defaults"]);
        return _this;
    }
    DebtTokenContract.deployed = function (web3, defaults) {
        return __awaiter(this, void 0, void 0, function () {
            var web3Wrapper, currentNetwork, abi, networks, contractAddress, contractExists, web3ContractInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(web3.currentProvider);
                        return [4 /*yield*/, web3Wrapper.getNetworkIdAsync()];
                    case 1:
                        currentNetwork = _a.sent();
                        abi = DebtToken_1.DebtToken.abi, networks = DebtToken_1.DebtToken.networks;
                        if (!networks[currentNetwork]) return [3 /*break*/, 3];
                        contractAddress = networks[currentNetwork].address;
                        return [4 /*yield*/, web3Wrapper.doesContractExistAtAddressAsync(contractAddress)];
                    case 2:
                        contractExists = _a.sent();
                        if (contractExists) {
                            web3ContractInstance = web3.eth.contract(abi).at(contractAddress);
                            return [2 /*return*/, new DebtTokenContract(web3ContractInstance, defaults)];
                        }
                        else {
                            throw new Error(base_contract_wrapper_1.CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtToken", currentNetwork));
                        }
                        return [3 /*break*/, 4];
                    case 3: throw new Error(base_contract_wrapper_1.CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtToken", currentNetwork));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DebtTokenContract.at = function (address, web3, defaults) {
        return __awaiter(this, void 0, void 0, function () {
            var web3Wrapper, abi, contractExists, currentNetwork, web3ContractInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(web3.currentProvider);
                        abi = DebtToken_1.DebtToken.abi;
                        return [4 /*yield*/, web3Wrapper.doesContractExistAtAddressAsync(address)];
                    case 1:
                        contractExists = _a.sent();
                        return [4 /*yield*/, web3Wrapper.getNetworkIdAsync()];
                    case 2:
                        currentNetwork = _a.sent();
                        if (contractExists) {
                            web3ContractInstance = web3.eth.contract(abi).at(address);
                            return [2 /*return*/, new DebtTokenContract(web3ContractInstance, defaults)];
                        }
                        else {
                            throw new Error(base_contract_wrapper_1.CONTRACT_WRAPPER_ERRORS.CONTRACT_NOT_FOUND_ON_NETWORK("DebtToken", currentNetwork));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return DebtTokenContract;
}(base_contract_wrapper_1.BaseContract)); // tslint:disable:max-file-line-count
exports.DebtTokenContract = DebtTokenContract;
//# sourceMappingURL=debt_token_wrapper.js.map