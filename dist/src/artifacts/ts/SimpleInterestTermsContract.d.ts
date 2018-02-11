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
            };
            id: number;
            name: string;
            src: string;
        } | {
            attributes: {
                SourceUnit: number;
                absolutePath: string;
                file: string;
                scope: number;
                symbolAliases: any[];
                unitAlias: string;
            };
            id: number;
            name: string;
            src: string;
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
                    canonicalName: string;
                    name: string;
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
                };
                children: ({
                    attributes: {
                        name: string;
                        type: string;
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
                                };
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
                                };
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
                        })[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            falseBody: any;
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
                                            };
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
                                }[];
                                id: number;
                                name: string;
                                src: string;
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
                        })[];
                        id: number;
                        name: string;
                        src: string;
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
                                };
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
                            assignments: number[];
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
                            } | {
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
                            } | {
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
                            } | {
                                amortizationUnitType: {
                                    declaration: number;
                                    isOffset: boolean;
                                    isSlot: boolean;
                                    src: string;
                                    valueSize: number;
                                };
                            } | {
                                termLengthInAmortizationUnits: {
                                    declaration: number;
                                    isOffset: boolean;
                                    isSlot: boolean;
                                    src: string;
                                    valueSize: number;
                                };
                            })[];
                            operations: string;
                        };
                        children: any[];
                        id: number;
                        name: string;
                        src: string;
                    } | {
                        attributes: {
                            functionReturnParameters: number;
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
                                };
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
                                        type: string;
                                        value: string;
                                    };
                                    id: number;
                                    name: string;
                                    src: string;
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
                                    };
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
                                            type: string;
                                            value: string;
                                        };
                                        id: number;
                                        name: string;
                                        src: string;
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
                                        };
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
                                                type: string;
                                                value: string;
                                            };
                                            id: number;
                                            name: string;
                                            src: string;
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
                                            };
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
                                                    type: string;
                                                    value: string;
                                                };
                                                id: number;
                                                name: string;
                                                src: string;
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
                                    } | {
                                        attributes: {
                                            falseBody: any;
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
                                                };
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
                                                        type: string;
                                                        value: string;
                                                    };
                                                    id: number;
                                                    name: string;
                                                    src: string;
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
