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
                baseContracts?: undefined;
                contractDependencies?: undefined;
                contractKind?: undefined;
                documentation?: undefined;
                fullyImplemented?: undefined;
                linearizedBaseContracts?: undefined;
                name?: undefined;
                scope?: undefined;
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
                    implemented: boolean;
                    isConstructor: boolean;
                    modifiers: any[];
                    name: string;
                    payable: boolean;
                    scope: number;
                    stateMutability: string;
                    superFunction: any;
                    visibility: string;
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
                                    isConstant: boolean;
                                    isLValue: boolean;
                                    isPure: boolean;
                                    lValueRequested: boolean;
                                    type: string;
                                    overloadedDeclarations?: undefined;
                                    referencedDeclaration?: undefined;
                                    value?: undefined;
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
                                            overloadedDeclarations: any[];
                                            referencedDeclaration: number;
                                            type: string;
                                            value: string;
                                            hexvalue?: undefined;
                                            isConstant?: undefined;
                                            isLValue?: undefined;
                                            isPure?: undefined;
                                            lValueRequested?: undefined;
                                            subdenomination?: undefined;
                                            token?: undefined;
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
                                            overloadedDeclarations?: undefined;
                                            referencedDeclaration?: undefined;
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
                                    isConstant?: undefined;
                                    isLValue?: undefined;
                                    isPure?: undefined;
                                    lValueRequested?: undefined;
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
                                        overloadedDeclarations: any[];
                                        referencedDeclaration: number;
                                        type: string;
                                        value: string;
                                        hexvalue?: undefined;
                                        isConstant?: undefined;
                                        isLValue?: undefined;
                                        isPure?: undefined;
                                        lValueRequested?: undefined;
                                        subdenomination?: undefined;
                                        token?: undefined;
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
                                        overloadedDeclarations?: undefined;
                                        referencedDeclaration?: undefined;
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
