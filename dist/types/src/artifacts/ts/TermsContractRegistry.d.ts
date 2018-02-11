export declare const TermsContractRegistry: {
    contractName: string;
    abi: {
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
    }[];
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
                TermsContractRegistry: number[];
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
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    lValueRequested: boolean;
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
                                })[];
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
        })[];
        id: number;
        name: string;
        src: string;
    };
    compiler: {
        name: string;
        version: string;
    };
    networks: {
        "70": {
            events: {};
            links: {};
            address: string;
        };
    };
    schemaVersion: string;
    updatedAt: string;
};
