export declare const DebtRegistry: {
    "contractName": string;
    "abi": ({
        "constant": boolean;
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "name": string;
        "outputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "stateMutability": string;
        "type": string;
        anonymous?: undefined;
    } | {
        "anonymous": boolean;
        "inputs": {
            "indexed": boolean;
            "name": string;
            "type": string;
        }[];
        "name": string;
        "type": string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
    })[];
    "bytecode": string;
    "deployedBytecode": string;
    "sourceMap": string;
    "deployedSourceMap": string;
    "source": string;
    "sourcePath": string;
    "ast": {
        "attributes": {
            "absolutePath": string;
            "exportedSymbols": {
                "DebtRegistry": number[];
            };
        };
        "children": ({
            "attributes": {
                "literals": string[];
                SourceUnit?: undefined;
                absolutePath?: undefined;
                file?: undefined;
                scope?: undefined;
                symbolAliases?: undefined;
                unitAlias?: undefined;
                contractDependencies?: undefined;
                contractKind?: undefined;
                documentation?: undefined;
                fullyImplemented?: undefined;
                linearizedBaseContracts?: undefined;
                name?: undefined;
            };
            "id": number;
            "name": string;
            "src": string;
            children?: undefined;
        } | {
            "attributes": {
                "SourceUnit": number;
                "absolutePath": string;
                "file": string;
                "scope": number;
                "symbolAliases": any[];
                "unitAlias": string;
                literals?: undefined;
                contractDependencies?: undefined;
                contractKind?: undefined;
                documentation?: undefined;
                fullyImplemented?: undefined;
                linearizedBaseContracts?: undefined;
                name?: undefined;
            };
            "id": number;
            "name": string;
            "src": string;
            children?: undefined;
        } | {
            "attributes": {
                "contractDependencies": number[];
                "contractKind": string;
                "documentation": string;
                "fullyImplemented": boolean;
                "linearizedBaseContracts": number[];
                "name": string;
                "scope": number;
                literals?: undefined;
                SourceUnit?: undefined;
                absolutePath?: undefined;
                file?: undefined;
                symbolAliases?: undefined;
                unitAlias?: undefined;
            };
            "children": ({
                "attributes": {
                    "arguments": any[];
                    canonicalName?: undefined;
                    name?: undefined;
                    scope?: undefined;
                    visibility?: undefined;
                    constant?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    modifiers?: undefined;
                };
                "children": {
                    "attributes": {
                        "contractScope": any;
                        "name": string;
                        "referencedDeclaration": number;
                        "type": string;
                    };
                    "id": number;
                    "name": string;
                    "src": string;
                }[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "children": ({
                    "attributes": {
                        "contractScope": any;
                        "name": string;
                        "referencedDeclaration": number;
                        "type": string;
                    };
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "attributes": {
                        "name": string;
                        "type": string;
                        contractScope?: undefined;
                        referencedDeclaration?: undefined;
                    };
                    "id": number;
                    "name": string;
                    "src": string;
                })[];
                "id": number;
                "name": string;
                "src": string;
                attributes?: undefined;
            } | {
                "attributes": {
                    "canonicalName": string;
                    "name": string;
                    "scope": number;
                    "visibility": string;
                    arguments?: undefined;
                    constant?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    modifiers?: undefined;
                };
                "children": {
                    "attributes": {
                        "constant": boolean;
                        "name": string;
                        "scope": number;
                        "stateVariable": boolean;
                        "storageLocation": string;
                        "type": string;
                        "value": any;
                        "visibility": string;
                    };
                    "children": {
                        "attributes": {
                            "name": string;
                            "type": string;
                        };
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                }[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "name": string;
                    "scope": number;
                    "stateVariable": boolean;
                    "storageLocation": string;
                    "type": string;
                    "value": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    modifiers?: undefined;
                };
                "children": {
                    "attributes": {
                        "type": string;
                    };
                    "children": ({
                        "attributes": {
                            "name": string;
                            "type": string;
                            contractScope?: undefined;
                            referencedDeclaration?: undefined;
                        };
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "attributes": {
                            "contractScope": any;
                            "name": string;
                            "referencedDeclaration": number;
                            "type": string;
                        };
                        "id": number;
                        "name": string;
                        "src": string;
                    })[];
                    "id": number;
                    "name": string;
                    "src": string;
                }[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "name": string;
                    "scope": number;
                    "stateVariable": boolean;
                    "storageLocation": string;
                    "type": string;
                    "value": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    modifiers?: undefined;
                };
                "children": {
                    "attributes": {
                        "contractScope": any;
                        "name": string;
                        "referencedDeclaration": number;
                        "type": string;
                    };
                    "id": number;
                    "name": string;
                    "src": string;
                }[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "anonymous": boolean;
                    "name": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    scope?: undefined;
                    visibility?: undefined;
                    constant?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    modifiers?: undefined;
                };
                "children": {
                    "children": {
                        "attributes": {
                            "constant": boolean;
                            "indexed": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "name": string;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                }[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "name": string;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    scope?: undefined;
                    constant?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    modifiers?: undefined;
                };
                "children": ({
                    "attributes": {
                        "parameters": any[];
                    };
                    "children": any[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": ({
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    isStructConstructorCall?: undefined;
                                    lValueRequested?: undefined;
                                    names?: undefined;
                                    type_conversion?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "isStructConstructorCall": boolean;
                                    "lValueRequested": boolean;
                                    "names": any[];
                                    "type": string;
                                    "type_conversion": boolean;
                                    overloadedDeclarations?: undefined;
                                    referencedDeclaration?: undefined;
                                    value?: undefined;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": {
                                            "typeIdentifier": string;
                                            "typeString": string;
                                        }[];
                                        "isConstant": boolean;
                                        "isLValue": boolean;
                                        "isPure": boolean;
                                        "lValueRequested": boolean;
                                        "member_name": string;
                                        "referencedDeclaration": number;
                                        "type": string;
                                    };
                                    "children": {
                                        "attributes": {
                                            "argumentTypes": any;
                                            "overloadedDeclarations": any[];
                                            "referencedDeclaration": number;
                                            "type": string;
                                            "value": string;
                                        };
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    }[];
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "id": number;
                        "name": string;
                        "src": string;
                        children?: undefined;
                    })[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                })[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "name": string;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    scope?: undefined;
                    constant?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    modifiers?: undefined;
                };
                "children": ({
                    "children": {
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "name": string;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": ({
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    commonType?: undefined;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    operator?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "commonType": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    };
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "operator": string;
                                    "type": string;
                                    overloadedDeclarations?: undefined;
                                    referencedDeclaration?: undefined;
                                    value?: undefined;
                                };
                                "children": ({
                                    "attributes": {
                                        "argumentTypes": any;
                                        "isConstant": boolean;
                                        "isLValue": boolean;
                                        "isPure": boolean;
                                        "lValueRequested": boolean;
                                        "member_name": string;
                                        "referencedDeclaration": number;
                                        "type": string;
                                        isStructConstructorCall?: undefined;
                                        names?: undefined;
                                        type_conversion?: undefined;
                                    };
                                    "children": {
                                        "attributes": {
                                            "argumentTypes": any;
                                            "isConstant": boolean;
                                            "isLValue": boolean;
                                            "isPure": boolean;
                                            "lValueRequested": boolean;
                                            "type": string;
                                        };
                                        "children": {
                                            "attributes": {
                                                "argumentTypes": any;
                                                "overloadedDeclarations": any[];
                                                "referencedDeclaration": number;
                                                "type": string;
                                                "value": string;
                                            };
                                            "id": number;
                                            "name": string;
                                            "src": string;
                                        }[];
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    }[];
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                } | {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "isConstant": boolean;
                                        "isLValue": boolean;
                                        "isPure": boolean;
                                        "isStructConstructorCall": boolean;
                                        "lValueRequested": boolean;
                                        "names": any[];
                                        "type": string;
                                        "type_conversion": boolean;
                                        member_name?: undefined;
                                        referencedDeclaration?: undefined;
                                    };
                                    "children": ({
                                        "attributes": {
                                            "argumentTypes": {
                                                "typeIdentifier": string;
                                                "typeString": string;
                                            }[];
                                            "isConstant": boolean;
                                            "isLValue": boolean;
                                            "isPure": boolean;
                                            "lValueRequested": boolean;
                                            "type": string;
                                            "value": string;
                                            hexvalue?: undefined;
                                            subdenomination?: undefined;
                                            token?: undefined;
                                        };
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    } | {
                                        "attributes": {
                                            "argumentTypes": any;
                                            "hexvalue": string;
                                            "isConstant": boolean;
                                            "isLValue": boolean;
                                            "isPure": boolean;
                                            "lValueRequested": boolean;
                                            "subdenomination": any;
                                            "token": string;
                                            "type": string;
                                            "value": string;
                                        };
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    })[];
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                })[];
                                "id": number;
                                "name": string;
                                "src": string;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "id": number;
                        "name": string;
                        "src": string;
                        children?: undefined;
                    })[];
                    "id": number;
                    "name": string;
                    "src": string;
                })[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "implemented": boolean;
                    "isConstructor": boolean;
                    "name": string;
                    "payable": boolean;
                    "scope": number;
                    "stateMutability": string;
                    "superFunction": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                    modifiers?: undefined;
                };
                "children": ({
                    "children": {
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "name": string;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                } | {
                    "attributes": {
                        "arguments": any[];
                    };
                    "children": {
                        "attributes": {
                            "argumentTypes": any;
                            "overloadedDeclarations": any[];
                            "referencedDeclaration": number;
                            "type": string;
                            "value": string;
                        };
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": {
                        "attributes": {
                            "argumentTypes": any;
                            "overloadedDeclarations": any[];
                            "referencedDeclaration": number;
                            "type": string;
                            "value": string;
                        };
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                } | {
                    "children": ({
                        "attributes": {
                            "assignments": number[];
                            functionReturnParameters?: undefined;
                        };
                        "children": ({
                            "attributes": {
                                "constant": boolean;
                                "name": string;
                                "scope": number;
                                "stateVariable": boolean;
                                "storageLocation": string;
                                "type": string;
                                "value": any;
                                "visibility": string;
                                argumentTypes?: undefined;
                                isConstant?: undefined;
                                isLValue?: undefined;
                                isPure?: undefined;
                                isStructConstructorCall?: undefined;
                                lValueRequested?: undefined;
                                names?: undefined;
                                type_conversion?: undefined;
                            };
                            "children": {
                                "attributes": {
                                    "contractScope": any;
                                    "name": string;
                                    "referencedDeclaration": number;
                                    "type": string;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        } | {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                                constant?: undefined;
                                name?: undefined;
                                scope?: undefined;
                                stateVariable?: undefined;
                                storageLocation?: undefined;
                                value?: undefined;
                                visibility?: undefined;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "member_name": string;
                                    "referencedDeclaration": any;
                                    "type": string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                    };
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        })[];
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "attributes": {
                            "assignments": number[];
                            functionReturnParameters?: undefined;
                        };
                        "children": ({
                            "attributes": {
                                "constant": boolean;
                                "name": string;
                                "scope": number;
                                "stateVariable": boolean;
                                "storageLocation": string;
                                "type": string;
                                "value": any;
                                "visibility": string;
                                argumentTypes?: undefined;
                                isConstant?: undefined;
                                isLValue?: undefined;
                                isPure?: undefined;
                                isStructConstructorCall?: undefined;
                                lValueRequested?: undefined;
                                names?: undefined;
                                type_conversion?: undefined;
                            };
                            "children": {
                                "attributes": {
                                    "name": string;
                                    "type": string;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        } | {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                                constant?: undefined;
                                name?: undefined;
                                scope?: undefined;
                                stateVariable?: undefined;
                                storageLocation?: undefined;
                                value?: undefined;
                                visibility?: undefined;
                            };
                            "children": {
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        })[];
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    commonType?: undefined;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    operator?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "commonType": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    };
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "operator": string;
                                    "type": string;
                                    overloadedDeclarations?: undefined;
                                    referencedDeclaration?: undefined;
                                    value?: undefined;
                                };
                                "children": ({
                                    "attributes": {
                                        "argumentTypes": any;
                                        "isConstant": boolean;
                                        "isLValue": boolean;
                                        "isPure": boolean;
                                        "lValueRequested": boolean;
                                        "member_name": string;
                                        "referencedDeclaration": number;
                                        "type": string;
                                        isStructConstructorCall?: undefined;
                                        names?: undefined;
                                        type_conversion?: undefined;
                                    };
                                    "children": {
                                        "attributes": {
                                            "argumentTypes": any;
                                            "isConstant": boolean;
                                            "isLValue": boolean;
                                            "isPure": boolean;
                                            "lValueRequested": boolean;
                                            "type": string;
                                        };
                                        "children": {
                                            "attributes": {
                                                "argumentTypes": any;
                                                "overloadedDeclarations": any[];
                                                "referencedDeclaration": number;
                                                "type": string;
                                                "value": string;
                                            };
                                            "id": number;
                                            "name": string;
                                            "src": string;
                                        }[];
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    }[];
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                } | {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "isConstant": boolean;
                                        "isLValue": boolean;
                                        "isPure": boolean;
                                        "isStructConstructorCall": boolean;
                                        "lValueRequested": boolean;
                                        "names": any[];
                                        "type": string;
                                        "type_conversion": boolean;
                                        member_name?: undefined;
                                        referencedDeclaration?: undefined;
                                    };
                                    "children": ({
                                        "attributes": {
                                            "argumentTypes": {
                                                "typeIdentifier": string;
                                                "typeString": string;
                                            }[];
                                            "isConstant": boolean;
                                            "isLValue": boolean;
                                            "isPure": boolean;
                                            "lValueRequested": boolean;
                                            "type": string;
                                            "value": string;
                                            hexvalue?: undefined;
                                            subdenomination?: undefined;
                                            token?: undefined;
                                        };
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    } | {
                                        "attributes": {
                                            "argumentTypes": any;
                                            "hexvalue": string;
                                            "isConstant": boolean;
                                            "isLValue": boolean;
                                            "isPure": boolean;
                                            "lValueRequested": boolean;
                                            "subdenomination": any;
                                            "token": string;
                                            "type": string;
                                            "value": string;
                                        };
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    })[];
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                })[];
                                "id": number;
                                "name": string;
                                "src": string;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                        attributes?: undefined;
                    } | {
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "lValueRequested": boolean;
                                "operator": string;
                                "type": string;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "type": string;
                                    overloadedDeclarations?: undefined;
                                    referencedDeclaration?: undefined;
                                    value?: undefined;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                    };
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                        attributes?: undefined;
                    } | {
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "member_name": string;
                                    "referencedDeclaration": number;
                                    "type": string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                    };
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                        attributes?: undefined;
                    } | {
                        "attributes": {
                            "functionReturnParameters": number;
                            assignments?: undefined;
                        };
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "overloadedDeclarations": any[];
                                "referencedDeclaration": number;
                                "type": string;
                                "value": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    })[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                })[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "implemented": boolean;
                    "isConstructor": boolean;
                    "name": string;
                    "payable": boolean;
                    "scope": number;
                    "stateMutability": string;
                    "superFunction": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                    modifiers?: undefined;
                };
                "children": ({
                    "children": {
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "name": string;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                } | {
                    "attributes": {
                        "parameters": any[];
                        arguments?: undefined;
                    };
                    "children": any[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "attributes": {
                        "arguments": any[];
                        parameters?: undefined;
                    };
                    "children": {
                        "attributes": {
                            "argumentTypes": any;
                            "overloadedDeclarations": any[];
                            "referencedDeclaration": number;
                            "type": string;
                            "value": string;
                        };
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": {
                        "attributes": {
                            "argumentTypes": any;
                            "overloadedDeclarations": any[];
                            "referencedDeclaration": number;
                            "type": string;
                            "value": string;
                        };
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                } | {
                    "children": ({
                        "attributes": {
                            "assignments": number[];
                        };
                        "children": ({
                            "attributes": {
                                "constant": boolean;
                                "name": string;
                                "scope": number;
                                "stateVariable": boolean;
                                "storageLocation": string;
                                "type": string;
                                "value": any;
                                "visibility": string;
                                argumentTypes?: undefined;
                                isConstant?: undefined;
                                isLValue?: undefined;
                                isPure?: undefined;
                                lValueRequested?: undefined;
                                member_name?: undefined;
                                referencedDeclaration?: undefined;
                            };
                            "children": {
                                "attributes": {
                                    "name": string;
                                    "type": string;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        } | {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "lValueRequested": boolean;
                                "member_name": string;
                                "referencedDeclaration": number;
                                "type": string;
                                constant?: undefined;
                                name?: undefined;
                                scope?: undefined;
                                stateVariable?: undefined;
                                storageLocation?: undefined;
                                value?: undefined;
                                visibility?: undefined;
                            };
                            "children": {
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "type": string;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                    };
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        })[];
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "lValueRequested": boolean;
                                "operator": string;
                                "type": string;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "member_name": string;
                                    "referencedDeclaration": number;
                                    "type": string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "isConstant": boolean;
                                        "isLValue": boolean;
                                        "isPure": boolean;
                                        "lValueRequested": boolean;
                                        "type": string;
                                    };
                                    "children": {
                                        "attributes": {
                                            "argumentTypes": any;
                                            "overloadedDeclarations": any[];
                                            "referencedDeclaration": number;
                                            "type": string;
                                            "value": string;
                                        };
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    }[];
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                        attributes?: undefined;
                    } | {
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": {
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                        attributes?: undefined;
                    })[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                })[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "implemented": boolean;
                    "isConstructor": boolean;
                    "name": string;
                    "payable": boolean;
                    "scope": number;
                    "stateMutability": string;
                    "superFunction": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                    modifiers?: undefined;
                };
                "children": ({
                    "children": {
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "name": string;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                } | {
                    "attributes": {
                        "parameters": any[];
                        arguments?: undefined;
                    };
                    "children": any[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "attributes": {
                        "arguments": any[];
                        parameters?: undefined;
                    };
                    "children": {
                        "attributes": {
                            "argumentTypes": any;
                            "overloadedDeclarations": any[];
                            "referencedDeclaration": number;
                            "type": string;
                            "value": string;
                        };
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": ({
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "member_name": string;
                                    "referencedDeclaration": number;
                                    "type": string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                    };
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": {
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    })[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                })[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "implemented": boolean;
                    "isConstructor": boolean;
                    "modifiers": any[];
                    "name": string;
                    "payable": boolean;
                    "scope": number;
                    "stateMutability": string;
                    "superFunction": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                };
                "children": ({
                    "children": {
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "name": string;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": {
                        "attributes": {
                            "functionReturnParameters": number;
                        };
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isInlineArray": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "lValueRequested": boolean;
                                "type": string;
                            };
                            "children": {
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "member_name": string;
                                    "referencedDeclaration": number;
                                    "type": string;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "isConstant": boolean;
                                        "isLValue": boolean;
                                        "isPure": boolean;
                                        "lValueRequested": boolean;
                                        "type": string;
                                    };
                                    "children": {
                                        "attributes": {
                                            "argumentTypes": any;
                                            "overloadedDeclarations": any[];
                                            "referencedDeclaration": number;
                                            "type": string;
                                            "value": string;
                                        };
                                        "id": number;
                                        "name": string;
                                        "src": string;
                                    }[];
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                })[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "implemented": boolean;
                    "isConstructor": boolean;
                    "modifiers": any[];
                    "name": string;
                    "payable": boolean;
                    "scope": number;
                    "stateMutability": string;
                    "superFunction": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                };
                "children": ({
                    "children": {
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "name": string;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": {
                        "attributes": {
                            "functionReturnParameters": number;
                        };
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "lValueRequested": boolean;
                                "member_name": string;
                                "referencedDeclaration": number;
                                "type": string;
                            };
                            "children": {
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "type": string;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                    };
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                })[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "implemented": boolean;
                    "isConstructor": boolean;
                    "modifiers": any[];
                    "name": string;
                    "payable": boolean;
                    "scope": number;
                    "stateMutability": string;
                    "superFunction": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                };
                "children": ({
                    "attributes": {
                        "parameters": any[];
                    };
                    "children": any[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": {
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "length": any;
                                "type": string;
                            };
                            "children": {
                                "attributes": {
                                    "name": string;
                                    "type": string;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                } | {
                    "children": {
                        "attributes": {
                            "functionReturnParameters": number;
                        };
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "arguments": any[];
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": {
                                "attributes": {
                                    "argumentTypes": any[];
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "member_name": string;
                                    "referencedDeclaration": number;
                                    "type": string;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                    };
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            }[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                    attributes?: undefined;
                })[];
                "id": number;
                "name": string;
                "src": string;
            } | {
                "attributes": {
                    "constant": boolean;
                    "implemented": boolean;
                    "isConstructor": boolean;
                    "modifiers": any[];
                    "name": string;
                    "payable": boolean;
                    "scope": number;
                    "stateMutability": string;
                    "superFunction": any;
                    "visibility": string;
                    arguments?: undefined;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    anonymous?: undefined;
                };
                "children": ({
                    "children": ({
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "contractScope": any;
                                "name": string;
                                "referencedDeclaration": number;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "attributes": {
                            "constant": boolean;
                            "name": string;
                            "scope": number;
                            "stateVariable": boolean;
                            "storageLocation": string;
                            "type": string;
                            "value": any;
                            "visibility": string;
                        };
                        "children": {
                            "attributes": {
                                "name": string;
                                "type": string;
                            };
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    })[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": {
                        "attributes": {
                            "functionReturnParameters": number;
                        };
                        "children": {
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "isStructConstructorCall": boolean;
                                "lValueRequested": boolean;
                                "names": any[];
                                "type": string;
                                "type_conversion": boolean;
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": {
                                        "typeIdentifier": string;
                                        "typeString": string;
                                    }[];
                                    "overloadedDeclarations": any[];
                                    "referencedDeclaration": number;
                                    "type": string;
                                    "value": string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                "id": number;
                                "name": string;
                                "src": string;
                                children?: undefined;
                            } | {
                                "attributes": {
                                    "argumentTypes": any;
                                    "isConstant": boolean;
                                    "isLValue": boolean;
                                    "isPure": boolean;
                                    "lValueRequested": boolean;
                                    "member_name": string;
                                    "referencedDeclaration": number;
                                    "type": string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                "children": {
                                    "attributes": {
                                        "argumentTypes": any;
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                    };
                                    "id": number;
                                    "name": string;
                                    "src": string;
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                            })[];
                            "id": number;
                            "name": string;
                            "src": string;
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                    }[];
                    "id": number;
                    "name": string;
                    "src": string;
                })[];
                "id": number;
                "name": string;
                "src": string;
            })[];
            "id": number;
            "name": string;
            "src": string;
        })[];
        "id": number;
        "name": string;
        "src": string;
    };
    "compiler": {
        "name": string;
        "version": string;
    };
    "networks": {
        "70": {
            "events": {
                "0x10919d8a6bfbd0c46213ad51d6258e42af00bbf36133aada8a058bbe4f4a9240": {
                    "anonymous": boolean;
                    "inputs": {
                        "indexed": boolean;
                        "name": string;
                        "type": string;
                    }[];
                    "name": string;
                    "type": string;
                };
                "0x7afbd1e661f2fdce6222afdac74cd28b1847177e232db3d0f0dcf3739e8d8094": {
                    "anonymous": boolean;
                    "inputs": {
                        "indexed": boolean;
                        "name": string;
                        "type": string;
                    }[];
                    "name": string;
                    "type": string;
                };
                "0x3742184d7c9c1646421a0b618adffa131109c009b2c9f9fab3c8d890e295e5dd": {
                    "anonymous": boolean;
                    "inputs": {
                        "indexed": boolean;
                        "name": string;
                        "type": string;
                    }[];
                    "name": string;
                    "type": string;
                };
                "0x1adcf3642077febc29ae94e96f4b266cd0014c4499a4ad57e1e6935efaf73c5c": {
                    "anonymous": boolean;
                    "inputs": {
                        "indexed": boolean;
                        "name": string;
                        "type": string;
                    }[];
                    "name": string;
                    "type": string;
                };
                "0xc265a0634721cf43fbe76b8ab5c6f79b59fabfc8056dea60d2f0d2612fc70b12": {
                    "anonymous": boolean;
                    "inputs": {
                        "indexed": boolean;
                        "name": string;
                        "type": string;
                    }[];
                    "name": string;
                    "type": string;
                };
                "0xd70b180c6a151902a25cf1e39c2d5d75079bb235362289aa42cd258a7e5af921": {
                    "anonymous": boolean;
                    "inputs": {
                        "indexed": boolean;
                        "name": string;
                        "type": string;
                    }[];
                    "name": string;
                    "type": string;
                };
                "0x6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff625": {
                    "anonymous": boolean;
                    "inputs": any[];
                    "name": string;
                    "type": string;
                };
                "0x7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b33": {
                    "anonymous": boolean;
                    "inputs": any[];
                    "name": string;
                    "type": string;
                };
                "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": {
                    "anonymous": boolean;
                    "inputs": {
                        "indexed": boolean;
                        "name": string;
                        "type": string;
                    }[];
                    "name": string;
                    "type": string;
                };
            };
            "links": {};
            "address": string;
        };
    };
    "schemaVersion": string;
    "updatedAt": string;
};
