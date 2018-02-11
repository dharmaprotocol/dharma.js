export declare const SimpleInterestTermsContract: {
    contractName: string;
    abi: ({
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
    })[];
    bytecode: string;
    deployedBytecode: string;
    sourceMap: string;
    deployedSourceMap: string;
    source: string;
    sourcePath: string;
    ast: {
        attributes: {
            absolutePath: string;
            exportedSymbols: {
                SimpleInterestTermsContract: number[];
            };
        };
        children: ({
            attributes: {
                literals: string[];
                SourceUnit?: undefined;
                absolutePath?: undefined;
                file?: undefined;
                scope?: undefined;
                symbolAliases?: undefined;
                unitAlias?: undefined;
                baseContracts?: undefined;
                contractDependencies?: undefined;
                contractKind?: undefined;
                documentation?: undefined;
                fullyImplemented?: undefined;
                linearizedBaseContracts?: undefined;
                name?: undefined;
            };
            id: number;
            name: string;
            src: string;
            children?: undefined;
        } | {
            attributes: {
                SourceUnit: number;
                absolutePath: string;
                file: string;
                scope: number;
                symbolAliases: any[];
                unitAlias: string;
                literals?: undefined;
                baseContracts?: undefined;
                contractDependencies?: undefined;
                contractKind?: undefined;
                documentation?: undefined;
                fullyImplemented?: undefined;
                linearizedBaseContracts?: undefined;
                name?: undefined;
            };
            id: number;
            name: string;
            src: string;
            children?: undefined;
        } | {
            attributes: {
                baseContracts: any[];
                contractDependencies: any[];
                contractKind: string;
                documentation: any;
                fullyImplemented: boolean;
                linearizedBaseContracts: number[];
                name: string;
                scope: number;
                literals?: undefined;
                SourceUnit?: undefined;
                absolutePath?: undefined;
                file?: undefined;
                symbolAliases?: undefined;
                unitAlias?: undefined;
            };
            children: ({
                children: ({
                    attributes: {
                        contractScope: any;
                        name: string;
                        referencedDeclaration: number;
                        type: string;
                    };
                    id: number;
                    name: string;
                    src: string;
                } | {
                    attributes: {
                        name: string;
                        type: string;
                        contractScope?: undefined;
                        referencedDeclaration?: undefined;
                    };
                    id: number;
                    name: string;
                    src: string;
                })[];
                id: number;
                name: string;
                src: string;
                attributes?: undefined;
            } | {
                attributes: {
                    canonicalName: string;
                    name: string;
                    constant?: undefined;
                    scope?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    visibility?: undefined;
                    value?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                };
                children: {
                    attributes: {
                        name: string;
                    };
                    id: number;
                    name: string;
                    src: string;
                }[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    name: string;
                    scope: number;
                    stateVariable: boolean;
                    storageLocation: string;
                    type: string;
                    visibility: string;
                    canonicalName?: undefined;
                    value?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                };
                children: ({
                    attributes: {
                        name: string;
                        type: string;
                        argumentTypes?: undefined;
                        hexvalue?: undefined;
                        isConstant?: undefined;
                        isLValue?: undefined;
                        isPure?: undefined;
                        lValueRequested?: undefined;
                        subdenomination?: undefined;
                        token?: undefined;
                        value?: undefined;
                    };
                    id: number;
                    name: string;
                    src: string;
                } | {
                    attributes: {
                        argumentTypes: any;
                        hexvalue: string;
                        isConstant: boolean;
                        isLValue: boolean;
                        isPure: boolean;
                        lValueRequested: boolean;
                        subdenomination: any;
                        token: string;
                        type: string;
                        value: string;
                        name?: undefined;
                    };
                    id: number;
                    name: string;
                    src: string;
                })[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    name: string;
                    scope: number;
                    stateVariable: boolean;
                    storageLocation: string;
                    type: string;
                    value: any;
                    visibility: string;
                    canonicalName?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                };
                children: {
                    attributes: {
                        type: string;
                    };
                    children: {
                        attributes: {
                            name: string;
                            type: string;
                        };
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                }[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    name: string;
                    scope: number;
                    stateVariable: boolean;
                    storageLocation: string;
                    type: string;
                    value: any;
                    visibility: string;
                    canonicalName?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                };
                children: {
                    attributes: {
                        contractScope: any;
                        name: string;
                        referencedDeclaration: number;
                        type: string;
                    };
                    id: number;
                    name: string;
                    src: string;
                }[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    name: string;
                    scope: number;
                    stateVariable: boolean;
                    storageLocation: string;
                    type: string;
                    value: any;
                    visibility: string;
                    canonicalName?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                };
                children: {
                    attributes: {
                        name: string;
                        type: string;
                    };
                    id: number;
                    name: string;
                    src: string;
                }[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    implemented: boolean;
                    isConstructor: boolean;
                    modifiers: any[];
                    name: string;
                    payable: boolean;
                    scope: number;
                    stateMutability: string;
                    superFunction: any;
                    visibility: string;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                };
                children: ({
                    children: {
                        attributes: {
                            constant: boolean;
                            name: string;
                            scope: number;
                            stateVariable: boolean;
                            storageLocation: string;
                            type: string;
                            value: any;
                            visibility: string;
                        };
                        children: {
                            attributes: {
                                name: string;
                                type: string;
                            };
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                    attributes?: undefined;
                } | {
                    attributes: {
                        parameters: any[];
                    };
                    children: any[];
                    id: number;
                    name: string;
                    src: string;
                } | {
                    children: {
                        children: {
                            attributes: {
                                argumentTypes: any;
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                lValueRequested: boolean;
                                operator: string;
                                type: string;
                            };
                            children: ({
                                attributes: {
                                    argumentTypes: any;
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    isStructConstructorCall?: undefined;
                                    lValueRequested?: undefined;
                                    names?: undefined;
                                    type_conversion?: undefined;
                                };
                                id: number;
                                name: string;
                                src: string;
                                children?: undefined;
                            } | {
                                attributes: {
                                    argumentTypes: any;
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    isStructConstructorCall: boolean;
                                    lValueRequested: boolean;
                                    names: any[];
                                    type: string;
                                    type_conversion: boolean;
                                    overloadedDeclarations?: undefined;
                                    referencedDeclaration?: undefined;
                                    value?: undefined;
                                };
                                children: {
                                    attributes: {
                                        argumentTypes: {
                                            typeIdentifier: string;
                                            typeString: string;
                                        }[];
                                        overloadedDeclarations: any[];
                                        referencedDeclaration: number;
                                        type: string;
                                        value: string;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                            })[];
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                    attributes?: undefined;
                })[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    implemented: boolean;
                    isConstructor: boolean;
                    modifiers: any[];
                    name: string;
                    payable: boolean;
                    scope: number;
                    stateMutability: string;
                    superFunction: any;
                    visibility: string;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                };
                children: ({
                    children: {
                        attributes: {
                            constant: boolean;
                            name: string;
                            scope: number;
                            stateVariable: boolean;
                            storageLocation: string;
                            type: string;
                            value: any;
                            visibility: string;
                        };
                        children: {
                            attributes: {
                                name: string;
                                type: string;
                            };
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                } | {
                    children: ({
                        attributes: {
                            falseBody: any;
                            functionReturnParameters?: undefined;
                        };
                        children: ({
                            attributes: {
                                argumentTypes: any;
                                commonType: {
                                    typeIdentifier: string;
                                    typeString: string;
                                };
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                lValueRequested: boolean;
                                operator: string;
                                type: string;
                            };
                            children: ({
                                attributes: {
                                    argumentTypes: any;
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    lValueRequested: boolean;
                                    member_name: string;
                                    referencedDeclaration: any;
                                    type: string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                children: {
                                    attributes: {
                                        argumentTypes: any;
                                        overloadedDeclarations: any[];
                                        referencedDeclaration: number;
                                        type: string;
                                        value: string;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                            } | {
                                attributes: {
                                    argumentTypes: any;
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                id: number;
                                name: string;
                                src: string;
                                children?: undefined;
                            })[];
                            id: number;
                            name: string;
                            src: string;
                        } | {
                            children: {
                                attributes: {
                                    functionReturnParameters: number;
                                };
                                children: {
                                    attributes: {
                                        argumentTypes: any;
                                        hexvalue: string;
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        lValueRequested: boolean;
                                        subdenomination: any;
                                        token: string;
                                        type: string;
                                        value: string;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                            attributes?: undefined;
                        })[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            falseBody: any;
                            functionReturnParameters?: undefined;
                        };
                        children: ({
                            attributes: {
                                argumentTypes: any;
                                commonType: {
                                    typeIdentifier: string;
                                    typeString: string;
                                };
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                lValueRequested: boolean;
                                operator: string;
                                type: string;
                            };
                            children: {
                                attributes: {
                                    argumentTypes: any;
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                };
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        } | {
                            children: ({
                                children: {
                                    attributes: {
                                        argumentTypes: any;
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        lValueRequested: boolean;
                                        operator: string;
                                        type: string;
                                    };
                                    children: ({
                                        attributes: {
                                            argumentTypes: any;
                                            isConstant: boolean;
                                            isLValue: boolean;
                                            isPure: boolean;
                                            lValueRequested: boolean;
                                            type: string;
                                            isStructConstructorCall?: undefined;
                                            names?: undefined;
                                            type_conversion?: undefined;
                                        };
                                        children: {
                                            attributes: {
                                                argumentTypes: any;
                                                overloadedDeclarations: any[];
                                                referencedDeclaration: number;
                                                type: string;
                                                value: string;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
                                        }[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    } | {
                                        attributes: {
                                            argumentTypes: any;
                                            isConstant: boolean;
                                            isLValue: boolean;
                                            isPure: boolean;
                                            isStructConstructorCall: boolean;
                                            lValueRequested: boolean;
                                            names: any[];
                                            type: string;
                                            type_conversion: boolean;
                                        };
                                        children: ({
                                            attributes: {
                                                argumentTypes: {
                                                    typeIdentifier: string;
                                                    typeString: string;
                                                }[];
                                                isConstant: boolean;
                                                isLValue: boolean;
                                                isPure: boolean;
                                                lValueRequested: boolean;
                                                member_name: string;
                                                referencedDeclaration: number;
                                                type: string;
                                                overloadedDeclarations?: undefined;
                                                value?: undefined;
                                            };
                                            children: {
                                                attributes: {
                                                    argumentTypes: any;
                                                    isConstant: boolean;
                                                    isLValue: boolean;
                                                    isPure: boolean;
                                                    lValueRequested: boolean;
                                                    type: string;
                                                };
                                                children: {
                                                    attributes: {
                                                        argumentTypes: any;
                                                        overloadedDeclarations: any[];
                                                        referencedDeclaration: number;
                                                        type: string;
                                                        value: string;
                                                    };
                                                    id: number;
                                                    name: string;
                                                    src: string;
                                                }[];
                                                id: number;
                                                name: string;
                                                src: string;
                                            }[];
                                            id: number;
                                            name: string;
                                            src: string;
                                        } | {
                                            attributes: {
                                                argumentTypes: any;
                                                overloadedDeclarations: any[];
                                                referencedDeclaration: number;
                                                type: string;
                                                value: string;
                                                isConstant?: undefined;
                                                isLValue?: undefined;
                                                isPure?: undefined;
                                                lValueRequested?: undefined;
                                                member_name?: undefined;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
                                            children?: undefined;
                                        })[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    })[];
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                                attributes?: undefined;
                            } | {
                                attributes: {
                                    functionReturnParameters: number;
                                };
                                children: {
                                    attributes: {
                                        argumentTypes: any;
                                        hexvalue: string;
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        lValueRequested: boolean;
                                        subdenomination: any;
                                        token: string;
                                        type: string;
                                        value: string;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                            })[];
                            id: number;
                            name: string;
                            src: string;
                            attributes?: undefined;
                        })[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            functionReturnParameters: number;
                            falseBody?: undefined;
                        };
                        children: {
                            attributes: {
                                argumentTypes: any;
                                hexvalue: string;
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                lValueRequested: boolean;
                                subdenomination: any;
                                token: string;
                                type: string;
                                value: string;
                            };
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    })[];
                    id: number;
                    name: string;
                    src: string;
                })[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    implemented: boolean;
                    isConstructor: boolean;
                    modifiers: any[];
                    name: string;
                    payable: boolean;
                    scope: number;
                    stateMutability: string;
                    superFunction: any;
                    visibility: string;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                };
                children: ({
                    children: {
                        attributes: {
                            constant: boolean;
                            name: string;
                            scope: number;
                            stateVariable: boolean;
                            storageLocation: string;
                            type: string;
                            value: any;
                            visibility: string;
                        };
                        children: {
                            attributes: {
                                name: string;
                                type: string;
                            };
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                } | {
                    children: ({
                        attributes: {
                            assignments: number[];
                            functionReturnParameters?: undefined;
                        };
                        children: ({
                            attributes: {
                                constant: boolean;
                                name: string;
                                scope: number;
                                stateVariable: boolean;
                                storageLocation: string;
                                type: string;
                                value: any;
                                visibility: string;
                                argumentTypes?: undefined;
                                isConstant?: undefined;
                                isLValue?: undefined;
                                isPure?: undefined;
                                isStructConstructorCall?: undefined;
                                lValueRequested?: undefined;
                                names?: undefined;
                                type_conversion?: undefined;
                            };
                            children: {
                                attributes: {
                                    name: string;
                                    type: string;
                                };
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        } | {
                            attributes: {
                                argumentTypes: any;
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                isStructConstructorCall: boolean;
                                lValueRequested: boolean;
                                names: any[];
                                type: string;
                                type_conversion: boolean;
                                constant?: undefined;
                                name?: undefined;
                                scope?: undefined;
                                stateVariable?: undefined;
                                storageLocation?: undefined;
                                value?: undefined;
                                visibility?: undefined;
                            };
                            children: ({
                                attributes: {
                                    argumentTypes: {
                                        typeIdentifier: string;
                                        typeString: string;
                                    }[];
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    lValueRequested: boolean;
                                    member_name: string;
                                    referencedDeclaration: number;
                                    type: string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                children: {
                                    attributes: {
                                        argumentTypes: any;
                                        overloadedDeclarations: any[];
                                        referencedDeclaration: number;
                                        type: string;
                                        value: string;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                            } | {
                                attributes: {
                                    argumentTypes: any;
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                id: number;
                                name: string;
                                src: string;
                                children?: undefined;
                            })[];
                            id: number;
                            name: string;
                            src: string;
                        })[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            assignments: number[];
                            functionReturnParameters?: undefined;
                        };
                        children: ({
                            attributes: {
                                constant: boolean;
                                name: string;
                                scope: number;
                                stateVariable: boolean;
                                storageLocation: string;
                                type: string;
                                typeName: any;
                                value: any;
                                visibility: string;
                                argumentTypes?: undefined;
                                isConstant?: undefined;
                                isLValue?: undefined;
                                isPure?: undefined;
                                isStructConstructorCall?: undefined;
                                lValueRequested?: undefined;
                                names?: undefined;
                                type_conversion?: undefined;
                            };
                            children: any[];
                            id: number;
                            name: string;
                            src: string;
                        } | {
                            attributes: {
                                argumentTypes: any;
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                isStructConstructorCall: boolean;
                                lValueRequested: boolean;
                                names: any[];
                                type: string;
                                type_conversion: boolean;
                                constant?: undefined;
                                name?: undefined;
                                scope?: undefined;
                                stateVariable?: undefined;
                                storageLocation?: undefined;
                                typeName?: undefined;
                                value?: undefined;
                                visibility?: undefined;
                            };
                            children: {
                                attributes: {
                                    argumentTypes: {
                                        typeIdentifier: string;
                                        typeString: string;
                                    }[];
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                };
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        })[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            assignments: number[];
                            functionReturnParameters?: undefined;
                        };
                        children: ({
                            attributes: {
                                constant: boolean;
                                name: string;
                                scope: number;
                                stateVariable: boolean;
                                storageLocation: string;
                                type: string;
                                value: any;
                                visibility: string;
                                argumentTypes?: undefined;
                                isConstant?: undefined;
                                isLValue?: undefined;
                                isPure?: undefined;
                                isStructConstructorCall?: undefined;
                                lValueRequested?: undefined;
                                names?: undefined;
                                type_conversion?: undefined;
                            };
                            children: {
                                attributes: {
                                    name: string;
                                    type: string;
                                };
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        } | {
                            attributes: {
                                argumentTypes: any;
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                isStructConstructorCall: boolean;
                                lValueRequested: boolean;
                                names: any[];
                                type: string;
                                type_conversion: boolean;
                                constant?: undefined;
                                name?: undefined;
                                scope?: undefined;
                                stateVariable?: undefined;
                                storageLocation?: undefined;
                                value?: undefined;
                                visibility?: undefined;
                            };
                            children: {
                                attributes: {
                                    argumentTypes: {
                                        typeIdentifier: string;
                                        typeString: string;
                                    }[];
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                };
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        })[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            assignments: number[];
                            functionReturnParameters?: undefined;
                        };
                        children: ({
                            attributes: {
                                constant: boolean;
                                name: string;
                                scope: number;
                                stateVariable: boolean;
                                storageLocation: string;
                                type: string;
                                value: any;
                                visibility: string;
                                argumentTypes?: undefined;
                                isConstant?: undefined;
                                isLValue?: undefined;
                                isPure?: undefined;
                                isStructConstructorCall?: undefined;
                                lValueRequested?: undefined;
                                names?: undefined;
                                type_conversion?: undefined;
                            };
                            children: {
                                attributes: {
                                    name: string;
                                    type: string;
                                };
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        } | {
                            attributes: {
                                argumentTypes: any;
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                isStructConstructorCall: boolean;
                                lValueRequested: boolean;
                                names: any[];
                                type: string;
                                type_conversion: boolean;
                                constant?: undefined;
                                name?: undefined;
                                scope?: undefined;
                                stateVariable?: undefined;
                                storageLocation?: undefined;
                                value?: undefined;
                                visibility?: undefined;
                            };
                            children: ({
                                attributes: {
                                    argumentTypes: {
                                        typeIdentifier: string;
                                        typeString: string;
                                    }[];
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    lValueRequested: boolean;
                                    member_name: string;
                                    referencedDeclaration: number;
                                    type: string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                children: {
                                    attributes: {
                                        argumentTypes: any;
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        isStructConstructorCall: boolean;
                                        lValueRequested: boolean;
                                        names: any[];
                                        type: string;
                                        type_conversion: boolean;
                                    };
                                    children: ({
                                        attributes: {
                                            argumentTypes: {
                                                typeIdentifier: string;
                                                typeString: string;
                                            }[];
                                            isConstant: boolean;
                                            isLValue: boolean;
                                            isPure: boolean;
                                            lValueRequested: boolean;
                                            member_name: string;
                                            referencedDeclaration: number;
                                            type: string;
                                            overloadedDeclarations?: undefined;
                                            value?: undefined;
                                        };
                                        children: {
                                            attributes: {
                                                argumentTypes: any;
                                                overloadedDeclarations: any[];
                                                referencedDeclaration: number;
                                                type: string;
                                                value: string;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
                                        }[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    } | {
                                        attributes: {
                                            argumentTypes: any;
                                            overloadedDeclarations: any[];
                                            referencedDeclaration: number;
                                            type: string;
                                            value: string;
                                            isConstant?: undefined;
                                            isLValue?: undefined;
                                            isPure?: undefined;
                                            lValueRequested?: undefined;
                                            member_name?: undefined;
                                        };
                                        id: number;
                                        name: string;
                                        src: string;
                                        children?: undefined;
                                    })[];
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                            } | {
                                attributes: {
                                    argumentTypes: any;
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                id: number;
                                name: string;
                                src: string;
                                children?: undefined;
                            })[];
                            id: number;
                            name: string;
                            src: string;
                        })[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            functionReturnParameters: number;
                            assignments?: undefined;
                        };
                        children: {
                            attributes: {
                                argumentTypes: any;
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                isStructConstructorCall: boolean;
                                lValueRequested: boolean;
                                names: any[];
                                type: string;
                                type_conversion: boolean;
                            };
                            children: ({
                                attributes: {
                                    argumentTypes: {
                                        typeIdentifier: string;
                                        typeString: string;
                                    }[];
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    lValueRequested: boolean;
                                    member_name: string;
                                    referencedDeclaration: number;
                                    type: string;
                                    overloadedDeclarations?: undefined;
                                    value?: undefined;
                                };
                                children: {
                                    attributes: {
                                        argumentTypes: any;
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        isStructConstructorCall: boolean;
                                        lValueRequested: boolean;
                                        names: any[];
                                        type: string;
                                        type_conversion: boolean;
                                    };
                                    children: ({
                                        attributes: {
                                            argumentTypes: {
                                                typeIdentifier: string;
                                                typeString: string;
                                            }[];
                                            isConstant: boolean;
                                            isLValue: boolean;
                                            isPure: boolean;
                                            lValueRequested: boolean;
                                            member_name: string;
                                            referencedDeclaration: number;
                                            type: string;
                                            overloadedDeclarations?: undefined;
                                            value?: undefined;
                                        };
                                        children: {
                                            attributes: {
                                                argumentTypes: any;
                                                overloadedDeclarations: any[];
                                                referencedDeclaration: number;
                                                type: string;
                                                value: string;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
                                        }[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    } | {
                                        attributes: {
                                            argumentTypes: any;
                                            overloadedDeclarations: any[];
                                            referencedDeclaration: number;
                                            type: string;
                                            value: string;
                                            isConstant?: undefined;
                                            isLValue?: undefined;
                                            isPure?: undefined;
                                            lValueRequested?: undefined;
                                            member_name?: undefined;
                                        };
                                        id: number;
                                        name: string;
                                        src: string;
                                        children?: undefined;
                                    })[];
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                            } | {
                                attributes: {
                                    argumentTypes: any;
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
                                    member_name?: undefined;
                                };
                                id: number;
                                name: string;
                                src: string;
                                children?: undefined;
                            })[];
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    })[];
                    id: number;
                    name: string;
                    src: string;
                })[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    implemented: boolean;
                    isConstructor: boolean;
                    modifiers: any[];
                    name: string;
                    payable: boolean;
                    scope: number;
                    stateMutability: string;
                    superFunction: any;
                    visibility: string;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                };
                children: ({
                    children: {
                        attributes: {
                            constant: boolean;
                            name: string;
                            scope: number;
                            stateVariable: boolean;
                            storageLocation: string;
                            type: string;
                            value: any;
                            visibility: string;
                        };
                        children: {
                            attributes: {
                                name: string;
                                type: string;
                            };
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                } | {
                    children: {
                        attributes: {
                            functionReturnParameters: number;
                        };
                        children: {
                            attributes: {
                                argumentTypes: any;
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                lValueRequested: boolean;
                                type: string;
                            };
                            children: {
                                attributes: {
                                    argumentTypes: any;
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                };
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                })[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    implemented: boolean;
                    isConstructor: boolean;
                    modifiers: any[];
                    name: string;
                    payable: boolean;
                    scope: number;
                    stateMutability: string;
                    superFunction: any;
                    visibility: string;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                };
                children: ({
                    children: {
                        attributes: {
                            constant: boolean;
                            name: string;
                            scope: number;
                            stateVariable: boolean;
                            storageLocation: string;
                            type: string;
                            value: any;
                            visibility: string;
                        };
                        children: {
                            attributes: {
                                name: string;
                                type: string;
                            };
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                } | {
                    children: ({
                        attributes: {
                            assignments: any[];
                            initialValue: any;
                            externalReferences?: undefined;
                            operations?: undefined;
                            functionReturnParameters?: undefined;
                        };
                        children: {
                            attributes: {
                                constant: boolean;
                                name: string;
                                scope: number;
                                stateVariable: boolean;
                                storageLocation: string;
                                type: string;
                                value: any;
                                visibility: string;
                            };
                            children: {
                                attributes: {
                                    name: string;
                                    type: string;
                                };
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            externalReferences: ({
                                principalPlusInterest: {
                                    declaration: number;
                                    isOffset: boolean;
                                    isSlot: boolean;
                                    src: string;
                                    valueSize: number;
                                };
                                amortizationUnitType?: undefined;
                                termLengthInAmortizationUnits?: undefined;
                            } | {
                                amortizationUnitType: {
                                    declaration: number;
                                    isOffset: boolean;
                                    isSlot: boolean;
                                    src: string;
                                    valueSize: number;
                                };
                                principalPlusInterest?: undefined;
                                termLengthInAmortizationUnits?: undefined;
                            } | {
                                termLengthInAmortizationUnits: {
                                    declaration: number;
                                    isOffset: boolean;
                                    isSlot: boolean;
                                    src: string;
                                    valueSize: number;
                                };
                                principalPlusInterest?: undefined;
                                amortizationUnitType?: undefined;
                            })[];
                            operations: string;
                            assignments?: undefined;
                            initialValue?: undefined;
                            functionReturnParameters?: undefined;
                        };
                        children: any[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            functionReturnParameters: number;
                            assignments?: undefined;
                            initialValue?: undefined;
                            externalReferences?: undefined;
                            operations?: undefined;
                        };
                        children: {
                            attributes: {
                                argumentTypes: any;
                                isConstant: boolean;
                                isInlineArray: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                lValueRequested: boolean;
                                type: string;
                            };
                            children: {
                                attributes: {
                                    argumentTypes: any;
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    isStructConstructorCall: boolean;
                                    lValueRequested: boolean;
                                    names: any[];
                                    type: string;
                                    type_conversion: boolean;
                                };
                                children: ({
                                    attributes: {
                                        argumentTypes: {
                                            typeIdentifier: string;
                                            typeString: string;
                                        }[];
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        lValueRequested: boolean;
                                        type: string;
                                        value: string;
                                        overloadedDeclarations?: undefined;
                                        referencedDeclaration?: undefined;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                } | {
                                    attributes: {
                                        argumentTypes: any;
                                        overloadedDeclarations: any[];
                                        referencedDeclaration: number;
                                        type: string;
                                        value: string;
                                        isConstant?: undefined;
                                        isLValue?: undefined;
                                        isPure?: undefined;
                                        lValueRequested?: undefined;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                })[];
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    })[];
                    id: number;
                    name: string;
                    src: string;
                })[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    constant: boolean;
                    implemented: boolean;
                    isConstructor: boolean;
                    modifiers: any[];
                    name: string;
                    payable: boolean;
                    scope: number;
                    stateMutability: string;
                    superFunction: any;
                    visibility: string;
                    canonicalName?: undefined;
                    stateVariable?: undefined;
                    storageLocation?: undefined;
                    type?: undefined;
                    value?: undefined;
                };
                children: ({
                    children: {
                        attributes: {
                            constant: boolean;
                            name: string;
                            scope: number;
                            stateVariable: boolean;
                            storageLocation: string;
                            type: string;
                            value: any;
                            visibility: string;
                        };
                        children: {
                            attributes: {
                                name: string;
                                type: string;
                            };
                            id: number;
                            name: string;
                            src: string;
                        }[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                } | {
                    children: {
                        children: ({
                            attributes: {
                                argumentTypes: any;
                                commonType: {
                                    typeIdentifier: string;
                                    typeString: string;
                                };
                                isConstant: boolean;
                                isLValue: boolean;
                                isPure: boolean;
                                lValueRequested: boolean;
                                operator: string;
                                type: string;
                            };
                            children: ({
                                attributes: {
                                    argumentTypes: any;
                                    overloadedDeclarations: any[];
                                    referencedDeclaration: number;
                                    type: string;
                                    value: string;
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    isStructConstructorCall?: undefined;
                                    lValueRequested?: undefined;
                                    names?: undefined;
                                    type_conversion?: undefined;
                                };
                                id: number;
                                name: string;
                                src: string;
                                children?: undefined;
                            } | {
                                attributes: {
                                    argumentTypes: any;
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    isStructConstructorCall: boolean;
                                    lValueRequested: boolean;
                                    names: any[];
                                    type: string;
                                    type_conversion: boolean;
                                    overloadedDeclarations?: undefined;
                                    referencedDeclaration?: undefined;
                                    value?: undefined;
                                };
                                children: ({
                                    attributes: {
                                        argumentTypes: {
                                            typeIdentifier: string;
                                            typeString: string;
                                        }[];
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        lValueRequested: boolean;
                                        type: string;
                                        value: string;
                                        member_name?: undefined;
                                        referencedDeclaration?: undefined;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                    children?: undefined;
                                } | {
                                    attributes: {
                                        argumentTypes: any;
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        lValueRequested: boolean;
                                        member_name: string;
                                        referencedDeclaration: any;
                                        type: string;
                                        value?: undefined;
                                    };
                                    children: {
                                        attributes: {
                                            argumentTypes: any;
                                            overloadedDeclarations: any[];
                                            referencedDeclaration: number;
                                            type: string;
                                            value: string;
                                        };
                                        id: number;
                                        name: string;
                                        src: string;
                                    }[];
                                    id: number;
                                    name: string;
                                    src: string;
                                })[];
                                id: number;
                                name: string;
                                src: string;
                            })[];
                            id: number;
                            name: string;
                            src: string;
                        } | {
                            children: {
                                attributes: {
                                    functionReturnParameters: number;
                                };
                                children: {
                                    attributes: {
                                        argumentTypes: any;
                                        overloadedDeclarations: any[];
                                        referencedDeclaration: number;
                                        type: string;
                                        value: string;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                            }[];
                            id: number;
                            name: string;
                            src: string;
                            attributes?: undefined;
                        } | {
                            children: ({
                                attributes: {
                                    argumentTypes: any;
                                    commonType: {
                                        typeIdentifier: string;
                                        typeString: string;
                                    };
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    lValueRequested: boolean;
                                    operator: string;
                                    type: string;
                                };
                                children: ({
                                    attributes: {
                                        argumentTypes: any;
                                        overloadedDeclarations: any[];
                                        referencedDeclaration: number;
                                        type: string;
                                        value: string;
                                        isConstant?: undefined;
                                        isLValue?: undefined;
                                        isPure?: undefined;
                                        isStructConstructorCall?: undefined;
                                        lValueRequested?: undefined;
                                        names?: undefined;
                                        type_conversion?: undefined;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
                                    children?: undefined;
                                } | {
                                    attributes: {
                                        argumentTypes: any;
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        isStructConstructorCall: boolean;
                                        lValueRequested: boolean;
                                        names: any[];
                                        type: string;
                                        type_conversion: boolean;
                                        overloadedDeclarations?: undefined;
                                        referencedDeclaration?: undefined;
                                        value?: undefined;
                                    };
                                    children: ({
                                        attributes: {
                                            argumentTypes: {
                                                typeIdentifier: string;
                                                typeString: string;
                                            }[];
                                            isConstant: boolean;
                                            isLValue: boolean;
                                            isPure: boolean;
                                            lValueRequested: boolean;
                                            type: string;
                                            value: string;
                                            member_name?: undefined;
                                            referencedDeclaration?: undefined;
                                        };
                                        id: number;
                                        name: string;
                                        src: string;
                                        children?: undefined;
                                    } | {
                                        attributes: {
                                            argumentTypes: any;
                                            isConstant: boolean;
                                            isLValue: boolean;
                                            isPure: boolean;
                                            lValueRequested: boolean;
                                            member_name: string;
                                            referencedDeclaration: any;
                                            type: string;
                                            value?: undefined;
                                        };
                                        children: {
                                            attributes: {
                                                argumentTypes: any;
                                                overloadedDeclarations: any[];
                                                referencedDeclaration: number;
                                                type: string;
                                                value: string;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
                                        }[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    })[];
                                    id: number;
                                    name: string;
                                    src: string;
                                })[];
                                id: number;
                                name: string;
                                src: string;
                            } | {
                                children: {
                                    attributes: {
                                        functionReturnParameters: number;
                                    };
                                    children: {
                                        attributes: {
                                            argumentTypes: any;
                                            overloadedDeclarations: any[];
                                            referencedDeclaration: number;
                                            type: string;
                                            value: string;
                                        };
                                        id: number;
                                        name: string;
                                        src: string;
                                    }[];
                                    id: number;
                                    name: string;
                                    src: string;
                                }[];
                                id: number;
                                name: string;
                                src: string;
                                attributes?: undefined;
                            } | {
                                children: ({
                                    attributes: {
                                        argumentTypes: any;
                                        commonType: {
                                            typeIdentifier: string;
                                            typeString: string;
                                        };
                                        isConstant: boolean;
                                        isLValue: boolean;
                                        isPure: boolean;
                                        lValueRequested: boolean;
                                        operator: string;
                                        type: string;
                                    };
                                    children: ({
                                        attributes: {
                                            argumentTypes: any;
                                            overloadedDeclarations: any[];
                                            referencedDeclaration: number;
                                            type: string;
                                            value: string;
                                            isConstant?: undefined;
                                            isLValue?: undefined;
                                            isPure?: undefined;
                                            isStructConstructorCall?: undefined;
                                            lValueRequested?: undefined;
                                            names?: undefined;
                                            type_conversion?: undefined;
                                        };
                                        id: number;
                                        name: string;
                                        src: string;
                                        children?: undefined;
                                    } | {
                                        attributes: {
                                            argumentTypes: any;
                                            isConstant: boolean;
                                            isLValue: boolean;
                                            isPure: boolean;
                                            isStructConstructorCall: boolean;
                                            lValueRequested: boolean;
                                            names: any[];
                                            type: string;
                                            type_conversion: boolean;
                                            overloadedDeclarations?: undefined;
                                            referencedDeclaration?: undefined;
                                            value?: undefined;
                                        };
                                        children: ({
                                            attributes: {
                                                argumentTypes: {
                                                    typeIdentifier: string;
                                                    typeString: string;
                                                }[];
                                                isConstant: boolean;
                                                isLValue: boolean;
                                                isPure: boolean;
                                                lValueRequested: boolean;
                                                type: string;
                                                value: string;
                                                member_name?: undefined;
                                                referencedDeclaration?: undefined;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
                                            children?: undefined;
                                        } | {
                                            attributes: {
                                                argumentTypes: any;
                                                isConstant: boolean;
                                                isLValue: boolean;
                                                isPure: boolean;
                                                lValueRequested: boolean;
                                                member_name: string;
                                                referencedDeclaration: any;
                                                type: string;
                                                value?: undefined;
                                            };
                                            children: {
                                                attributes: {
                                                    argumentTypes: any;
                                                    overloadedDeclarations: any[];
                                                    referencedDeclaration: number;
                                                    type: string;
                                                    value: string;
                                                };
                                                id: number;
                                                name: string;
                                                src: string;
                                            }[];
                                            id: number;
                                            name: string;
                                            src: string;
                                        })[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    })[];
                                    id: number;
                                    name: string;
                                    src: string;
                                } | {
                                    children: {
                                        attributes: {
                                            functionReturnParameters: number;
                                        };
                                        children: {
                                            attributes: {
                                                argumentTypes: any;
                                                overloadedDeclarations: any[];
                                                referencedDeclaration: number;
                                                type: string;
                                                value: string;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
                                        }[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    }[];
                                    id: number;
                                    name: string;
                                    src: string;
                                    attributes?: undefined;
                                } | {
                                    children: ({
                                        attributes: {
                                            argumentTypes: any;
                                            commonType: {
                                                typeIdentifier: string;
                                                typeString: string;
                                            };
                                            isConstant: boolean;
                                            isLValue: boolean;
                                            isPure: boolean;
                                            lValueRequested: boolean;
                                            operator: string;
                                            type: string;
                                            falseBody?: undefined;
                                        };
                                        children: ({
                                            attributes: {
                                                argumentTypes: any;
                                                overloadedDeclarations: any[];
                                                referencedDeclaration: number;
                                                type: string;
                                                value: string;
                                                isConstant?: undefined;
                                                isLValue?: undefined;
                                                isPure?: undefined;
                                                isStructConstructorCall?: undefined;
                                                lValueRequested?: undefined;
                                                names?: undefined;
                                                type_conversion?: undefined;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
                                            children?: undefined;
                                        } | {
                                            attributes: {
                                                argumentTypes: any;
                                                isConstant: boolean;
                                                isLValue: boolean;
                                                isPure: boolean;
                                                isStructConstructorCall: boolean;
                                                lValueRequested: boolean;
                                                names: any[];
                                                type: string;
                                                type_conversion: boolean;
                                                overloadedDeclarations?: undefined;
                                                referencedDeclaration?: undefined;
                                                value?: undefined;
                                            };
                                            children: ({
                                                attributes: {
                                                    argumentTypes: {
                                                        typeIdentifier: string;
                                                        typeString: string;
                                                    }[];
                                                    isConstant: boolean;
                                                    isLValue: boolean;
                                                    isPure: boolean;
                                                    lValueRequested: boolean;
                                                    type: string;
                                                    value: string;
                                                    member_name?: undefined;
                                                    referencedDeclaration?: undefined;
                                                };
                                                id: number;
                                                name: string;
                                                src: string;
                                                children?: undefined;
                                            } | {
                                                attributes: {
                                                    argumentTypes: any;
                                                    isConstant: boolean;
                                                    isLValue: boolean;
                                                    isPure: boolean;
                                                    lValueRequested: boolean;
                                                    member_name: string;
                                                    referencedDeclaration: any;
                                                    type: string;
                                                    value?: undefined;
                                                };
                                                children: {
                                                    attributes: {
                                                        argumentTypes: any;
                                                        overloadedDeclarations: any[];
                                                        referencedDeclaration: number;
                                                        type: string;
                                                        value: string;
                                                    };
                                                    id: number;
                                                    name: string;
                                                    src: string;
                                                }[];
                                                id: number;
                                                name: string;
                                                src: string;
                                            })[];
                                            id: number;
                                            name: string;
                                            src: string;
                                        })[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    } | {
                                        children: {
                                            attributes: {
                                                functionReturnParameters: number;
                                            };
                                            children: {
                                                attributes: {
                                                    argumentTypes: any;
                                                    overloadedDeclarations: any[];
                                                    referencedDeclaration: number;
                                                    type: string;
                                                    value: string;
                                                };
                                                id: number;
                                                name: string;
                                                src: string;
                                            }[];
                                            id: number;
                                            name: string;
                                            src: string;
                                        }[];
                                        id: number;
                                        name: string;
                                        src: string;
                                        attributes?: undefined;
                                    } | {
                                        attributes: {
                                            falseBody: any;
                                            argumentTypes?: undefined;
                                            commonType?: undefined;
                                            isConstant?: undefined;
                                            isLValue?: undefined;
                                            isPure?: undefined;
                                            lValueRequested?: undefined;
                                            operator?: undefined;
                                            type?: undefined;
                                        };
                                        children: ({
                                            attributes: {
                                                argumentTypes: any;
                                                commonType: {
                                                    typeIdentifier: string;
                                                    typeString: string;
                                                };
                                                isConstant: boolean;
                                                isLValue: boolean;
                                                isPure: boolean;
                                                lValueRequested: boolean;
                                                operator: string;
                                                type: string;
                                            };
                                            children: ({
                                                attributes: {
                                                    argumentTypes: any;
                                                    overloadedDeclarations: any[];
                                                    referencedDeclaration: number;
                                                    type: string;
                                                    value: string;
                                                    isConstant?: undefined;
                                                    isLValue?: undefined;
                                                    isPure?: undefined;
                                                    isStructConstructorCall?: undefined;
                                                    lValueRequested?: undefined;
                                                    names?: undefined;
                                                    type_conversion?: undefined;
                                                };
                                                id: number;
                                                name: string;
                                                src: string;
                                                children?: undefined;
                                            } | {
                                                attributes: {
                                                    argumentTypes: any;
                                                    isConstant: boolean;
                                                    isLValue: boolean;
                                                    isPure: boolean;
                                                    isStructConstructorCall: boolean;
                                                    lValueRequested: boolean;
                                                    names: any[];
                                                    type: string;
                                                    type_conversion: boolean;
                                                    overloadedDeclarations?: undefined;
                                                    referencedDeclaration?: undefined;
                                                    value?: undefined;
                                                };
                                                children: ({
                                                    attributes: {
                                                        argumentTypes: {
                                                            typeIdentifier: string;
                                                            typeString: string;
                                                        }[];
                                                        isConstant: boolean;
                                                        isLValue: boolean;
                                                        isPure: boolean;
                                                        lValueRequested: boolean;
                                                        type: string;
                                                        value: string;
                                                        member_name?: undefined;
                                                        referencedDeclaration?: undefined;
                                                    };
                                                    id: number;
                                                    name: string;
                                                    src: string;
                                                    children?: undefined;
                                                } | {
                                                    attributes: {
                                                        argumentTypes: any;
                                                        isConstant: boolean;
                                                        isLValue: boolean;
                                                        isPure: boolean;
                                                        lValueRequested: boolean;
                                                        member_name: string;
                                                        referencedDeclaration: any;
                                                        type: string;
                                                        value?: undefined;
                                                    };
                                                    children: {
                                                        attributes: {
                                                            argumentTypes: any;
                                                            overloadedDeclarations: any[];
                                                            referencedDeclaration: number;
                                                            type: string;
                                                            value: string;
                                                        };
                                                        id: number;
                                                        name: string;
                                                        src: string;
                                                    }[];
                                                    id: number;
                                                    name: string;
                                                    src: string;
                                                })[];
                                                id: number;
                                                name: string;
                                                src: string;
                                            })[];
                                            id: number;
                                            name: string;
                                            src: string;
                                        } | {
                                            children: {
                                                attributes: {
                                                    functionReturnParameters: number;
                                                };
                                                children: {
                                                    attributes: {
                                                        argumentTypes: any;
                                                        overloadedDeclarations: any[];
                                                        referencedDeclaration: number;
                                                        type: string;
                                                        value: string;
                                                    };
                                                    id: number;
                                                    name: string;
                                                    src: string;
                                                }[];
                                                id: number;
                                                name: string;
                                                src: string;
                                            }[];
                                            id: number;
                                            name: string;
                                            src: string;
                                            attributes?: undefined;
                                        })[];
                                        id: number;
                                        name: string;
                                        src: string;
                                    })[];
                                    id: number;
                                    name: string;
                                    src: string;
                                    attributes?: undefined;
                                })[];
                                id: number;
                                name: string;
                                src: string;
                                attributes?: undefined;
                            })[];
                            id: number;
                            name: string;
                            src: string;
                            attributes?: undefined;
                        })[];
                        id: number;
                        name: string;
                        src: string;
                    }[];
                    id: number;
                    name: string;
                    src: string;
                })[];
                id: number;
                name: string;
                src: string;
            })[];
            id: number;
            name: string;
            src: string;
        })[];
        id: number;
        name: string;
        src: string;
    };
    compiler: {
        name: string;
        version: string;
    };
    networks: {};
    schemaVersion: string;
    updatedAt: string;
};
