export declare const ERC20: {
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
        anonymous?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
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
                ERC20: number[];
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
                contractDependencies: number[];
                contractKind: string;
                documentation: string;
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
                attributes: {
                    arguments: any[];
                    body?: undefined;
                    constant?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    name?: undefined;
                    payable?: undefined;
                    scope?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    visibility?: undefined;
                    anonymous?: undefined;
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
                    body: any;
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
                    arguments?: undefined;
                    anonymous?: undefined;
                };
                children: {
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
                }[];
                id: number;
                name: string;
                src: string;
            } | {
                attributes: {
                    anonymous: boolean;
                    name: string;
                    arguments?: undefined;
                    body?: undefined;
                    constant?: undefined;
                    implemented?: undefined;
                    isConstructor?: undefined;
                    modifiers?: undefined;
                    payable?: undefined;
                    scope?: undefined;
                    stateMutability?: undefined;
                    superFunction?: undefined;
                    visibility?: undefined;
                };
                children: {
                    children: {
                        attributes: {
                            constant: boolean;
                            indexed: boolean;
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
    };
    compiler: {
        name: string;
        version: string;
    };
    networks: {};
    schemaVersion: string;
    updatedAt: string;
};
