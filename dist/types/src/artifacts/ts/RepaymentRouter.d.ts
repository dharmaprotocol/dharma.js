export declare const RepaymentRouter: {
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
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "stateMutability": string;
        "type": string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
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
                "RepaymentRouter": number[];
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
                    constant?: undefined;
                    name?: undefined;
                    scope?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    visibility?: undefined;
                    canonicalName?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
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
                    arguments?: undefined;
                    canonicalName?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
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
                    "canonicalName": string;
                    "name": string;
                    arguments?: undefined;
                    constant?: undefined;
                    scope?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    visibility?: undefined;
                    anonymous?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                };
                "children": {
                    "attributes": {
                        "name": string;
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
                    constant?: undefined;
                    scope?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    visibility?: undefined;
                    canonicalName?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
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
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    canonicalName?: undefined;
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
                    attributes?: undefined;
                } | {
                    "attributes": {
                        "parameters": any[];
                    };
                    "children": any[];
                    "id": number;
                    "name": string;
                    "src": string;
                } | {
                    "children": {
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
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                    canonicalName?: undefined;
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
                                        "overloadedDeclarations": any[];
                                        "referencedDeclaration": number;
                                        "type": string;
                                        "value": string;
                                        hexvalue?: undefined;
                                        isConstant?: undefined;
                                        isLValue?: undefined;
                                        isPure?: undefined;
                                        lValueRequested?: undefined;
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
                                        overloadedDeclarations?: undefined;
                                        referencedDeclaration?: undefined;
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
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                        attributes?: undefined;
                    } | {
                        "attributes": {
                            "assignments": number[];
                            falseBody?: undefined;
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
                        })[];
                        "id": number;
                        "name": string;
                        "src": string;
                    } | {
                        "attributes": {
                            "falseBody": any;
                            assignments?: undefined;
                            functionReturnParameters?: undefined;
                        };
                        "children": ({
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
                            };
                            "children": ({
                                "attributes": {
                                    "argumentTypes": any;
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
                                                member_name?: undefined;
                                                referencedDeclaration?: undefined;
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
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                                attributes?: undefined;
                            } | {
                                "attributes": {
                                    "functionReturnParameters": number;
                                };
                                "children": {
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
                            "falseBody": any;
                            assignments?: undefined;
                            functionReturnParameters?: undefined;
                        };
                        "children": ({
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
                            };
                            "children": {
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
                                };
                                "children": ({
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
                                        isStructConstructorCall?: undefined;
                                        lValueRequested?: undefined;
                                        names?: undefined;
                                        type_conversion?: undefined;
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
                                                member_name?: undefined;
                                                referencedDeclaration?: undefined;
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
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                                attributes?: undefined;
                            } | {
                                "attributes": {
                                    "functionReturnParameters": number;
                                };
                                "children": {
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
                            "falseBody": any;
                            assignments?: undefined;
                            functionReturnParameters?: undefined;
                        };
                        "children": ({
                            "attributes": {
                                "argumentTypes": any;
                                "isConstant": boolean;
                                "isLValue": boolean;
                                "isPure": boolean;
                                "lValueRequested": boolean;
                                "operator": string;
                                "prefix": boolean;
                                "type": string;
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
                                                member_name?: undefined;
                                                referencedDeclaration?: undefined;
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
                                }[];
                                "id": number;
                                "name": string;
                                "src": string;
                                attributes?: undefined;
                            } | {
                                "attributes": {
                                    "functionReturnParameters": number;
                                };
                                "children": {
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
                        }[];
                        "id": number;
                        "name": string;
                        "src": string;
                        attributes?: undefined;
                    } | {
                        "attributes": {
                            "functionReturnParameters": number;
                            assignments?: undefined;
                            falseBody?: undefined;
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
            "events": {};
            "links": {};
            "address": string;
        };
    };
    "schemaVersion": string;
    "updatedAt": string;
};
